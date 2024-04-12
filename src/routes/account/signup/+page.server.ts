import { superValidate } from 'sveltekit-superforms'
import type { PageServerLoad } from '../signup/$types'
import { zod } from 'sveltekit-superforms/adapters'
import { fail, redirect } from '@sveltejs/kit'
import { formSchema } from './schema'
import { db } from '@/server/db'
import { users, roles } from '@/server/db/schema'
import { eq } from 'drizzle-orm'
import httpStatus from 'http-status'
import argon2 from 'argon2'

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod(formSchema))

	return { form }
}

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(formSchema))

		if (!form.valid) {
			return fail(httpStatus.BAD_REQUEST, { form })
		}

		try {
			const user = await db.query.users.findFirst({ where: eq(users.email, form.data.email) })

			if (user) {
				form.message = 'Email already in use. Sign In.'
				return fail(httpStatus.CONFLICT, { form })
			}

			const userRole = await db.query.roles.findFirst({ where: eq(roles.name, 'user') })

			if (!userRole) {
				form.message = 'Something went wrong. Try later.'
				return fail(httpStatus.INTERNAL_SERVER_ERROR, { form })
			}

			const passwordHash = await argon2.hash(form.data.password)
			await db.insert(users).values({
				email: form.data.email,
				firstName: form.data.firstName,
				lastName: form.data.lastName,
				passwordHash,
				roleId: userRole.id
			})
		} catch (err) {
			form.message = 'Something went wrong. Try later.'
			return fail(400, {
				form
			})
		}

		redirect(httpStatus.MULTIPLE_CHOICES, '/account/signin')
	}
}
