import { setMessage, superValidate } from 'sveltekit-superforms'
import type { PageServerLoad } from '../signup/$types'
import { zod } from 'sveltekit-superforms/adapters'
import { fail, redirect } from '@sveltejs/kit'
import { formSchema } from './schema'
import { db } from '@/server/db'
import { eq } from 'drizzle-orm'
import { users } from '@/server/db/schema'
import httpStatus from 'http-status'
import argon2 from 'argon2'
import { lucia } from '@/server/lucia'

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod(formSchema))

	return { form }
}

export const actions = {
	default: async ({ request, cookies }) => {
		const form = await superValidate(request, zod(formSchema))

		if (!form.valid) {
			return fail(400, { form })
		}

		try {
			const user = await db.query.users.findFirst({ where: eq(users.email, form.data.email) })

			if (!user) {
				setMessage(form, 'Email or password incorrect. Try again', {
					status: httpStatus.UNAUTHORIZED
				})
				return fail(httpStatus.UNAUTHORIZED, { form })
			}

			const passwordMatches = await argon2.verify(user.passwordHash, form.data.password)
			if (!passwordMatches) {
				setMessage(form, 'Email or password incorrect. Try again', {
					status: httpStatus.UNAUTHORIZED
				})
				return fail(httpStatus.UNAUTHORIZED, { form })
			}

			const session = await lucia.createSession(user.id, {})
			const sessionCookie = lucia.createSessionCookie(session.id)
			cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes
			})
		} catch (err) {
			console.log(err)
			return fail(httpStatus.INTERNAL_SERVER_ERROR, { form })
		}

		redirect(httpStatus.SEE_OTHER, '/')
	}
}
