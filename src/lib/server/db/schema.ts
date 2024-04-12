import { relations } from 'drizzle-orm'
import {
	integer,
	pgTable,
	serial,
	text,
	time,
	timestamp,
	varchar,
	pgEnum,
	primaryKey
} from 'drizzle-orm/pg-core'

export const roles = pgTable('roles', {
	id: serial('id').primaryKey(),
	name: varchar('name', { length: 256 }).unique().notNull()
})

export const users = pgTable('users', {
	id: serial('id').primaryKey(),
	firstName: varchar('first_name', { length: 256 }).notNull(),
	lastName: varchar('last_name', { length: 256 }).notNull(),
	email: varchar('email', { length: 256 }).unique().notNull(),
	passwordHash: varchar('password_hash', { length: 256 }).notNull(),
	roleId: integer('role_id')
		.notNull()
		.references(() => roles.id),
	createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).defaultNow(),
	updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'date' }).defaultNow()
})

export const usersRelations = relations(users, ({ one, many }) => ({
	role: one(roles, {
		fields: [users.roleId],
		references: [roles.id]
	}),
	sessions: many(sessions),
	bookings: many(bookings)
}))

export const sessions = pgTable('sessions', {
	id: text('id').primaryKey(),
	userId: integer('user_id')
		.notNull()
		.references(() => users.id),
	expiresAt: timestamp('expires_at', {
		withTimezone: true,
		mode: 'date'
	}).notNull()
})

export const sessionsRelations = relations(sessions, ({ one }) => ({
	user: one(users, {
		fields: [sessions.userId],
		references: [users.id]
	})
}))

export const routes = pgTable('routes', {
	id: serial('id').primaryKey(),
	name: varchar('name', { length: 256 }).notNull(),
	slug: varchar('slug', { length: 256 }).notNull().unique(),
	origin_id: integer('origin_id')
		.notNull()
		.references(() => locations.id),
	destination_id: integer('destination_id')
		.notNull()
		.references(() => locations.id),
	distance: integer('distance').notNull(),
	duration: time('duration').notNull()
})

export const routesRelations = relations(routes, ({ many, one }) => ({
	trips: many(trips),
	dropPoints: many(dropPoints),
	origin: one(locations, {
		fields: [routes.origin_id],
		references: [locations.id],
		relationName: 'origin'
	}),
	destination: one(locations, {
		fields: [routes.destination_id],
		references: [locations.id],
		relationName: 'destination'
	})
}))

export const trips = pgTable('trips', {
	id: serial('id').primaryKey(),
	routeId: integer('route_id')
		.notNull()
		.references(() => routes.id),
	departureTime: varchar('departure_time', { length: 4 }).notNull(),
	arrivalTime: varchar('arrival_time', { length: 4 }).notNull(),
	total_seats: integer('total_seats').notNull()
})

export const tripsRelations = relations(trips, ({ one, many }) => ({
	route: one(routes, {
		fields: [trips.routeId],
		references: [routes.id]
	}),
	bookings: many(bookings)
}))

export const paymentStatusEnum = pgEnum('payment_status', ['PAID', 'PENDING'])

export const bookings = pgTable('bookings', {
	id: serial('id').primaryKey(),
	customerId: integer('customer_id')
		.notNull()
		.references(() => users.id),
	tripId: integer('trip_id')
		.notNull()
		.references(() => trips.id),
	seatNumber: integer('seat_number').notNull(),
	date: timestamp('date', { withTimezone: true, mode: 'date' }),
	paymentStatus: paymentStatusEnum('payment_status').notNull()
})

export const bookingsRelations = relations(bookings, ({ one }) => ({
	customer: one(users, {
		fields: [bookings.customerId],
		references: [users.id]
	}),
	trip: one(trips, {
		fields: [bookings.tripId],
		references: [trips.id]
	})
}))

export const dropPoints = pgTable(
	'drop_points',
	{
		route_id: integer('route_id')
			.notNull()
			.references(() => routes.id),
		location_id: integer('location_id')
			.notNull()
			.references(() => locations.id),
		position: integer('position').notNull()
	},
	(table) => ({
		pk: primaryKey({ columns: [table.route_id, table.location_id] })
	})
)

export const dropPointsRelations = relations(dropPoints, ({ one }) => ({
	route: one(routes, {
		fields: [dropPoints.route_id],
		references: [routes.id]
	}),
	location: one(locations, {
		fields: [dropPoints.location_id],
		references: [locations.id]
	})
}))

export const locations = pgTable('locations', {
	id: serial('id').primaryKey(),
	name: varchar('name', { length: 256 })
})

export const locationsRelations = relations(locations, ({ many }) => ({
	routes_destinations: many(routes, { relationName: 'destination' }),
	routes_origins: many(routes, { relationName: 'origin' }),
	dropPoints: many(dropPoints)
}))
