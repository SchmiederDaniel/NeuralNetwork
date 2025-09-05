<script>
	import tutorials from './tutorials.svelte.json';
	import { getObjectReference } from '$lib/object-storage.svelte.js';

	let { children } = $props();

	let burgerMenuOpen = $state(false);
	const slots = getObjectReference();
	let sideMenuOpen = $state(true);

	function toggleSideMenu() {
		sideMenuOpen = !sideMenuOpen;
	}
</script>

<div class="flex flex-col-reverse h-screen">
	<div class="h-full tutorial-container overflow-hidden">
		<!-- Main content -->
		<div class="main-content  grid place-items-center">
			<div>
				{@render children()}
			</div>
		</div>
		<!-- Side menu -->
		{#if slots.button}
			<div
				class="side-menu custom-shadow max-w-94 min-w-fit grid p-3 bg-violet-100 relative font-semibold max-h-full overflow-y-hidden"
				style="grid-template-rows: 1fr min-content">
				<!--				<button class="absolute w-11 h-11 hover:bg-violet-500/90 bg-violet-500/50 rounded-md top-1 text-white"-->
				<!--				        style="right: -52px;"-->
				<!--				        onclick={toggleSideMenu}>-->
				<!--					{#if sideMenuOpen}-->
				<!--						{@html minusIcon}-->
				<!--					{:else}-->
				<!--						{@html plusIcon}-->
				<!--					{/if}-->
				<!--				</button>-->
				{#if sideMenuOpen}
					<div class="overflow-y-auto">
						{@render slots.sidemenu()}
					</div>
					<div class="w-full flex items-center justify-center gap-3 pt-3">
						<a href={slots.button.previousLink}
						   class="navigation-button custom-shadow {slots.button.previousLink ? '' : 'disabled'}">{slots.button.previousText}</a>
						<div class="grow-1"></div>
						<a href={slots.button.nextLink}
						   class="navigation-button navigation-button-right custom-shadow {slots.button.nextLink ? '' : 'disabled'}">{slots.button.nextText}</a>
					</div>
				{/if}
			</div>
		{/if}
	</div>
	<!-- The Header/Title bar -->
	<div class="w-screen bg-violet-500 flex justify-center relative h-12 min-h-12 custom-shadow text-white">
		<h1>{@render slots.heading()}</h1>
		<div class="right-2 absolute flex content-center items-center justify-center h-full">
			{#if burgerMenuOpen}
				<button class="heroicons-outline--x text-white" aria-label="button"
				        onclick={() => burgerMenuOpen = !burgerMenuOpen}></button>
				<div class="top-12 absolute right-0 p-4 rounded-b-md text-white bg-violet-600 custom-shadow">
					<nav class="gap-2 nav-separator">
						<a href="/tutorials">Overview</a>
					</nav>
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
	<!-- Hidden div element which uses the "disabled" class so svelte doesn't optimize and remove it on build. -->
	<div class="disabled" style="visibility: hidden"></div>
</div>

<style lang="postcss">
  @reference "tailwindcss";

  .navigation-button {
    @apply px-2.5 py-1.5 hover:bg-violet-600 transition-all bg-violet-500 text-white font-semibold rounded-md whitespace-nowrap;
  }

  .tutorial-container {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-areas: "sidemenu main";
    overflow-y: hidden;
  }

  .main-content {
    overflow: auto;
    min-width: fit-content;
    grid-area: main;
  }

  .side-menu {
    grid-area: sidemenu;
  }

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

  .disabled {
		@apply  bg-violet-300 pointer-events-none;
  }
</style>