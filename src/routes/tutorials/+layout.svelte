<script>
	import tutorials from './tutorials.svelte.json';
	import { getObjectReference } from '$lib/layout-slots.svelte.js';

	let { children } = $props();
	let burgerMenuOpen = $state(false);
	const slots = getObjectReference();
</script>

<div class="flex flex-col-reverse h-screen">
	<div class="flex flex-row-reverse h-full w-full">
		<div class="grow-1">
			{@render children()}
		</div>
		<div class="sidemenu bg-violet-100 custom-shadow">
			<h1>{@render slots.sidemenu()}</h1>
		</div>
	</div>
	<div class="w-screen bg-violet-500 flex justify-center relative h-12 min-h-12 custom-shadow">
		<h1>{@render slots.heading()}</h1>
		<div class="right-2 absolute flex content-center items-center justify-center h-full">
			{#if burgerMenuOpen}
				<button class="heroicons-outline--x text-white" aria-label="button"
				        onclick={() => burgerMenuOpen = !burgerMenuOpen}></button>
				<div class="top-12 absolute right-0 p-4 rounded-b-md text-white bg-violet-600 custom-shadow">
					<h1>Tutorials</h1>
					<nav class="gap-2 nav-separator">
						{#each tutorials as tutorial}
							<a href="{tutorial.link}">{tutorial.title}</a>
						{/each}
					</nav>
				</div>
			{:else}
				<button class="heroicons-outline--menu text-white" aria-label="button"
				        onclick={() => burgerMenuOpen = !burgerMenuOpen}></button>
			{/if}
		</div>
	</div>
</div>

<style>
  .heroicons-outline--x {
    display: inline-block;
    width: 40px;
    height: 40px;
    --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath stroke='currentcolor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M6 18L18 6M6 6l12 12'/%3E%3C/svg%3E");
    background-color: currentColor;
    -webkit-mask-image: var(--svg);
    mask-image: var(--svg);
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    -webkit-mask-size: 100% 100%;
    mask-size: 100% 100%;
  }

  .heroicons-outline--menu {
    display: inline-block;
    width: 40px;
    height: 40px;
    --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath stroke='currentcolor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M4 6h16M4 12h16M4 18h16'/%3E%3C/svg%3E");
    background-color: currentColor;
    -webkit-mask-image: var(--svg);
    mask-image: var(--svg);
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    -webkit-mask-size: 100% 100%;
    mask-size: 100% 100%;
  }
</style>