import { z } from 'zod'

export const formSchema = z.object({
	tripId: z.number(),
	userId: z.number()
})

export type FormSchema = typeof formSchema
