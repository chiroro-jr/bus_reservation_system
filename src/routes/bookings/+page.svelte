<script lang="ts">
	import NavBar from '@/components/NavBar.svelte'
	import * as Table from '$lib/components/ui/table/index.js'
	import type { PageData } from './$types'
	import { Button } from '@/components/ui/button'
	import { goto } from '$app/navigation'

	export let data: PageData
</script>

<NavBar signedIn={!!data.user} />

<section class="container space-y-4 py-6">
	<h1 class="text-3xl font-bold text-green-700">
		All bookings made by {data.user?.firstName}
		{data.user?.lastName}
	</h1>

	<div>
		<Table.Root>
			<Table.Caption>A list of your recent bookings.</Table.Caption>
			<Table.Header>
				<Table.Row>
					<Table.Head class="w-[150px]">Booking No</Table.Head>
					<Table.Head>Date</Table.Head>
					<Table.Head>Departure Time</Table.Head>
					<Table.Head>Arrival Time</Table.Head>
					<Table.Head>Origin</Table.Head>
					<Table.Head>Destination</Table.Head>
					<Table.Head></Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each data.bookings as booking}
					<Table.Row>
						<Table.Cell class="font-medium">{booking.id}</Table.Cell>
						<Table.Cell>{booking.date}</Table.Cell>
						<Table.Cell>{booking.trip.departureTime}</Table.Cell>
						<Table.Cell>{booking.trip.arrivalTime}</Table.Cell>
						<Table.Cell>{booking.trip.route.origin.name}</Table.Cell>
						<Table.Cell>{booking.trip.route.destination.name}</Table.Cell>
						<Table.Cell class="text-right"
							><span class="text-sm font-semibold text-green-500">Booked</span></Table.Cell
						>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
</section>
