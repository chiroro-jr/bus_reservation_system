import { db } from '@/server/db'
import type { PageServerLoad } from './$types'
import * as schema from '@/server/db/schema'
import { eq } from 'drizzle-orm'

export const load = (async ({ params, locals }) => {
	const { id } = params
	const trips = await db.query.trips.findMany({
		where: eq(schema.trips.routeId, Number(id)),
		with: {
			route: {
				with: {
					destination: true,
					origin: true,
					dropPoints: true
				}
			}
		}
	})

	return {
		trips,
		user: locals.user
	}
}) satisfies PageServerLoad
