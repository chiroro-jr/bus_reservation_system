<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js'
	import Button from '@/components/ui/button/button.svelte'
	import { goto } from '$app/navigation'
	import NavBar from '@/components/NavBar.svelte'

	export let data
</script>

<NavBar signedIn={!!data.user} />

<section class="py-6">
	<div class="container space-y-4">
		<h1 class="text-3xl font-bold text-green-700">Select a route</h1>
		<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
			{#each data.routes as route}
				<Card.Root class="overflow-hidden">
					<Card.Header class="p-0">
						<img
							src="https://busbud.imgix.net/city-hires/1474307214322-NewYork,NewYork,UnitedStates.jpg?h=268&w=403&auto=format,compress"
							alt="placeholder"
							class="h-200px object-cover"
						/>
					</Card.Header>
					<Card.Content class="grid gap-4 p-4 pb-0">
						<p>{route.name}</p>
						<p>From: {route.origin.name}</p>
						<p>To: {route.destination.name}</p>
						<p>Distance: {route.distance}</p>
						<p>Duration: {route.duration}</p>
					</Card.Content>
					<Card.Footer class="p-4">
						<Button class="w-full" on:click={() => goto(`/trips/${route.id}`)}>View Schedule</Button
						>
					</Card.Footer>
				</Card.Root>
			{/each}
		</div>
	</div>
</section>
