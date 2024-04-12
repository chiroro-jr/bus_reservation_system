import { db } from '@/server/db'
import type { PageServerLoad } from './$types'
import { eq } from 'drizzle-orm'
import { bookings } from '@/server/db/schema'

export const load = (async ({ params, locals }) => {
	const { id } = params

	const booking = await db.query.bookings.findFirst({
		where: eq(bookings.id, Number(id)),
		with: {
			trip: {
				with: {
					route: {
						with: {
							destination: true,
							origin: true,
							dropPoints: {
								with: {
									location: true
								}
							}
						}
					}
				}
			}
		}
	})

	return {
		booking,
		user: locals.user
	}
}) satisfies PageServerLoad
