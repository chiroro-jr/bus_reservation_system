<script lang="ts">
	import busImage from '$lib/assets/bus.jpg'
	import logoImage from '$lib/assets/logo.png'
	import AccountFormWrapper from '@/components/AccountFormWrapper.svelte'
</script>

<div class="h-screen w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
	<div class="flex flex-col gap-28 px-4 py-6">
		<nav>
			<a href="/">
				<img src={logoImage} alt="busify logo" class="w-40" />
			</a>
		</nav>
		<AccountFormWrapper>
			<slot />
		</AccountFormWrapper>
	</div>
	<div class="hidden bg-muted lg:block">
		<img
			src={busImage}
			alt="placeholder"
			width="1920"
			height="1080"
			class="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
		/>
	</div>
</div>
