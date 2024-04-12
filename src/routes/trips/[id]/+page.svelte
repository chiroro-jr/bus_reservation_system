<script lang="ts">
	import NavBar from '@/components/NavBar.svelte'
	import type { PageData } from '../$types'
	import { Button } from '@/components/ui/button'
	import arrowIcon from '@/assets/arrow.svg'

	export let data: PageData
</script>

<NavBar signedIn={!!data.user} />

<section class="container space-y-4 py-6">
	<h1 class="text-3xl font-bold text-green-700">Schedule for {data.trips[0].route.name}</h1>
	<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
		{#each data.trips as trip}
			<form action="/bookings" method="post">
				<input type="hidden" name="tripId" value={trip.id} />
				<input type="hidden" name="userId" value={data.user?.id} />
				<div class="space-y-2">
					<div class="flex items-center gap-10">
						<div class="flex flex-col">
							<span class="text-xs font-bold text-gray-700">origin</span>
							<span class="text-2xl font-bold text-gray-800">{trip.departureTime}Hrs</span>
							<span class="text-lg">{trip.route.origin.name}</span>
						</div>
						<div class="text-gray-900">
							<img class="w-16" src={arrowIcon} alt="arrow" />
						</div>
						<div class="flex flex-col">
							<span class="text-xs font-bold text-gray-700">destination</span>
							<span class="text-2xl font-bold text-gray-800">{trip.arrivalTime}Hrs</span>
							<span>{trip.route.destination.name}</span>
						</div>
					</div>
					<div>
						<Button variant="secondary" type="submit" class="px-10">Book Trip</Button>
					</div>
				</div>
			</form>
		{/each}
	</div>
</section>
