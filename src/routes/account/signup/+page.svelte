<script lang="ts">
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms'
	import { Button } from '$lib/components/ui/button/index.js'
	import { Input } from '$lib/components/ui/input/index.js'

	import * as Form from '$lib/components/ui/form'
	import { formSchema, type FormSchema } from './schema'
	import { zodClient } from 'sveltekit-superforms/adapters'

	export let data: SuperValidated<Infer<FormSchema>>

	const form = superForm(data, {
		dataType: 'json',
		validators: zodClient(formSchema)
	})

	const { form: formData, enhance, message } = form
</script>

<svelte:head>
	<title>Zvinoreva - Create An Account</title>
</svelte:head>

<form class="grid gap-6" method="post" use:enhance>
	<div class="grid gap-2 text-center">
		<h1 class="text-3xl font-bold">Sign Up</h1>
		<p class="text-balance text-muted-foreground">Enter your details to create your account</p>
	</div>
	<div class="grid gap-4">
		{#if $message}
			<p class="text-center text-sm text-red-500">{$message}</p>
		{/if}

		<div class="grid grid-cols-2 gap-4">
			<Form.Field {form} name="firstName">
				<Form.Control let:attrs>
					<Form.Label>First Name</Form.Label>
					<Input {...attrs} bind:value={$formData.firstName} placeholder="John" />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="lastName">
				<Form.Control let:attrs>
					<Form.Label>Last Name</Form.Label>
					<Input {...attrs} bind:value={$formData.lastName} placeholder="Doe" />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
		</div>

		<Form.Field {form} name="email">
			<Form.Control let:attrs>
				<Form.Label>Email</Form.Label>
				<Input
					{...attrs}
					bind:value={$formData.email}
					placeholder="johndoe@gmail.com"
					type="email"
				/>
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Field {form} name="password">
			<Form.Control let:attrs>
				<Form.Label>Password</Form.Label>
				<Input {...attrs} bind:value={$formData.password} type="password" />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>

		<Button type="submit" class="w-full">Sign Up</Button>
	</div>
	<div class="mt-2 text-center text-sm">
		Already have an account?
		<a href="/account/signin" class="underline"> Sign In </a>
	</div>
</form>
