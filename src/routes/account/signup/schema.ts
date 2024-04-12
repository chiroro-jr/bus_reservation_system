import { z } from 'zod'

export const formSchema = z.object({
	firstName: z
		.string({ required_error: 'must be provided' })
		.min(2, { message: 'must be a minimum of 2 character' })
		.max(255, { message: 'must be a minimum of 255 characters' }),
	lastName: z
		.string({ required_error: 'must be provided' })
		.min(2, { message: 'must be a minimum of 2 character' })
		.max(255, { message: 'must be a minimum of 255 characters' }),
	email: z
		.string({ required_error: 'must be provided' })
		.email({ message: 'must be a valid email' }),
	password: z
		.string({ required_error: 'must be provided' })
		.min(8, { message: 'must be a minimum of 8 characters' })
		.max(50, { message: 'must be a maximum of 50 characters' })
		.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/, {
			message:
				'must be at least 8 characters long and contain a lowercase letter, uppercase letter, and a digit.'
		})
})

export type FormSchema = typeof formSchema
