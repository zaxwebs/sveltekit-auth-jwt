import { JWT_ACCESS_SECRET } from '$env/static/private';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '$lib/db.js';

const createUser = async (email, password) => {
	try {
		// Check if the user exists
		const existingUser = await db.user.findUnique({
			where: { email }
		});

		if (existingUser) {
			return { error: 'User already exists' };
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = await db.user.create({
			data: {
				email,
				password: hashedPassword
			}
		});

		return { user: newUser };
	} catch (error) {
		return { error: 'Something went wrong' };
	}
};

const loginUser = async (email, password) => {
	try {
		// Check if the user exists
		const user = await db.user.findUnique({
			where: { email }
		});

		if (!user) {
			return { error: 'Invalid email' };
		}

		// Verify the password
		const passwordIsValid = await bcrypt.compare(password, user.password);

		if (!passwordIsValid) {
			return { error: 'Invalid credentials' };
		}

		const jwtUser = { id: user.id, email: user.email };

		const token = jwt.sign(jwtUser, JWT_ACCESS_SECRET, { expiresIn: '1d' });

		return { token };
	} catch (error) {
		return { error: 'Something went wrong' };
	}
};

export { createUser, loginUser };
