import { error } from '@sveltejs/kit';

export const load = (event) => {
	const user = event.locals.user;

	if (!user) {
		throw error(401, {
			message: 'You must be logged in to view this page'
		});
	}

	return {
		user
	};
};