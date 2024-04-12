<script lang="ts">
	import NavBar from '@/components/NavBar.svelte'
	import type { PageData } from './$types'
	import arrowImage from '@/assets/arrow.svg'

	export let data: PageData
</script>

<NavBar signedIn={!!data.user} />

<section class="container space-y-4">
	<h1 class="text-3xl font-bold text-green-700">
		Booking #{data.booking?.id} for {data.user?.firstName}
		{data.user?.lastName}
	</h1>
	<div class="flex flex-col gap-10">
		<div class="item flex flex-col">
			<span class="text-xs font-bold text-gray-700">start</span>
			<span class="text-2xl font-bold text-gray-800">{data.booking?.trip.departureTime}Hrs</span>
			<span class="text-lg">{data.booking?.trip.route.origin.name}</span>
		</div>
		<div>
			<img src={arrowImage} alt="arrow" class="w-20 rotate-90" />
		</div>
		<div class="flex flex-col">
			<span class="text-xs font-bold text-gray-700">end</span>
			<span class="text-2xl font-bold text-gray-800">{data.booking?.trip.arrivalTime}Hrs</span>
			<span class="text-lg">{data.booking?.trip.route.destination.name}</span>
		</div>
	</div>
</section>
