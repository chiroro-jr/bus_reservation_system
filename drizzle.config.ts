import { defineConfig } from 'drizzle-kit'

import * as dotenv from 'dotenv'
dotenv.config()

export default defineConfig({
	schema: './src/lib/server/db/schema.ts',
	out: './migrations',
	driver: 'pg',
	dbCredentials: {
		connectionString: process.env.DATABASE_URL!
	},
	verbose: true,
	strict: true
})
