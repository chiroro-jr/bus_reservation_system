<script lang="ts">
	import { goto } from '$app/navigation'
	import { Button } from '@/components/ui/button'
	import logoImage from '@/assets/logo.png'

	export let signedIn: boolean
</script>

<nav class="py-4">
	<div class="container flex items-center justify-between">
		<a href="/">
			<img src={logoImage} alt="busify logo" class="w-40" />
		</a>
		<div>
			{#if signedIn}
				<div class="flex gap-2">
					<Button type="button" variant="link" on:click={() => goto('/bookings')}
						>My Bookings</Button
					>
					<form action="/account/signout" method="post">
						<Button type="submit">Logout</Button>
					</form>
				</div>
			{:else}
				<div class="space-x-2">
					<Button type="button" on:click={() => goto('/account/signin')}>Sign In</Button>
					<Button type="button" variant="outline" on:click={() => goto('/account/signup')}
						>SIgn Up</Button
					>
				</div>
			{/if}
		</div>
	</div>
</nav>
