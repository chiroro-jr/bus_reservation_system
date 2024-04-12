import { fail, superValidate } from 'sveltekit-superforms'
import type { PageServerLoad } from './$types'
import { formSchema } from './schema'
import { zod } from 'sveltekit-superforms/adapters'
import { db } from '@/server/db'
import * as schema from '@/server/db/schema'
import httpStatus from 'http-status'
import { redirect } from '@sveltejs/kit'
import { eq } from 'drizzle-orm'

export const load = (async ({ locals }) => {
	const bookings = await db.query.bookings.findMany({
		where: eq(schema.bookings.customerId, locals.user?.id || 0),
		with: {
			customer: true,
			trip: {
				with: {
					route: {
						with: {
							destination: true,
							origin: true
						}
					}
				}
			}
		}
	})

	return {
		user: locals.user,
		bookings
	}
}) satisfies PageServerLoad

export const actions = {
	default: async ({ request, locals }) => {
		if (!locals.user) {
			return redirect(httpStatus.SEE_OTHER, '/account/signin')
		}

		const form = await superValidate(request, zod(formSchema))

		if (!form.valid) {
			return fail(400, { form })
		}

		try {
			await db
				.insert(schema.bookings)
				.values({
					customerId: form.data.userId,
					tripId: form.data.tripId,
					paymentStatus: 'PENDING',
					seatNumber: 1,
					date: new Date()
				})
				.returning()
		} catch (err) {
			console.log(err)
			return fail(httpStatus.INTERNAL_SERVER_ERROR, { form })
		}

		redirect(httpStatus.SEE_OTHER, `/bookings`)
	}
}
