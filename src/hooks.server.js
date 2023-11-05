import { JWT_ACCESS_SECRET } from '$env/static/private';
import jwt from 'jsonwebtoken';

import { db } from '$lib/db';

const handle = async ({ event, resolve }) => {
	// Check for the AuthorizationToken cookie
	const authCookie = event.cookies.get('AuthorizationToken');

	if (authCookie) {
		// Remove the Bearer prefix
		const token = authCookie.split(' ')[1];

		try {
			// Verify the JWT token
			const jwtUser = jwt.verify(token, JWT_ACCESS_SECRET);

			if (typeof jwtUser === 'string') {
				throw new Error('Invalid token');
			}

			// Retrieve user information from the database using the JWT user's ID
			const user = await db.user.findUnique({
				where: { id: jwtUser.id }
			});

			if (!user) {
				throw new Error('User not found');
			}

			// Create a session user object with essential user information
			const sessionUser = {
				id: user.id,
				email: user.email
			};

			// Store the session user in event.locals for use in subsequent requests
			event.locals.user = sessionUser;
		} catch (error) {
			// Handle any errors during token verification or user retrieval
			console.error(error);
		}
	}

	// Continue processing the request
	return await resolve(event);
};

export { handle };
