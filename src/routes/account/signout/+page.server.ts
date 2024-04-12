import { lucia } from '$lib/server/lucia'
import { fail, redirect } from '@sveltejs/kit'
import type { Actions } from './$types'
import httpStatus from 'http-status'

export const load = async () => {
	return {}
}

export const actions: Actions = {
	default: async (data) => {
		const session = data.locals.session
		if (!session) return fail(httpStatus.UNAUTHORIZED)

		await lucia.invalidateSession(session.id) // invalidate session
		const sessionCookie = lucia.createBlankSessionCookie()
		data.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '/',
			...sessionCookie.attributes
		})
		redirect(httpStatus.SEE_OTHER, '/account/signin')
	}
}
