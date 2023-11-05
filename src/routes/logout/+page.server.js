import { error, redirect } from '@sveltejs/kit';

export const load = (event) => {
	event.cookies.delete('AuthorizationToken');

	throw redirect(302, '/login');
};
