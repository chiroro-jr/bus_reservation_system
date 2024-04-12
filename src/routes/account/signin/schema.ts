import { z } from 'zod'

export const formSchema = z.object({
	email: z
		.string({ required_error: 'must be provided' })
		.email({ message: 'must be a valid email' })
		.min(1, { message: 'must be provided' }),
	password: z.string({ required_error: 'must be provided' }).min(1, { message: 'must be provided' })
})

export type FormSchema = typeof formSchema
