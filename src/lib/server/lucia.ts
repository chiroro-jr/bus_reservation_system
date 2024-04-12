import { Lucia } from 'lucia'
import { dev } from '$app/environment'
import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle'
import { db } from './db'
import { sessions, users } from './db/schema'

const adapter = new DrizzlePostgreSQLAdapter(db, sessions, users) // your adapter

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			secure: !dev
		}
	},
	getUserAttributes: (attributes) => {
		return {
			id: attributes.id,
			email: attributes.email,
			firstName: attributes.firstName,
			lastName: attributes.lastName
		}
	}
})

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia
		UserId: number
		DatabaseUserAttributes: DatabaseUserAttributes
	}
}

interface DatabaseUserAttributes {
	id: number
	email: string
	firstName: string
	lastName: string
}
