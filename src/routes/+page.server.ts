import { db } from '$lib/server/db'
// import { redirect } from '@sveltejs/kit'
// import httpStatus from 'http-status'

export const load = async ({ locals }) => {
	const routes = await db.query.routes.findMany({
		with: {
			destination: true,
			origin: true
		}
	})

	return {
		user: locals.user,
		routes
	}
}
