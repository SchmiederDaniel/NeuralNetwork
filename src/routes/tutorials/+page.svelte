<script>
	import { resolve } from '$app/paths';
	import { setObject } from '$lib/object-storage.svelte.js';
	import tutorials from './tutorials.svelte.json';

	setObject({ heading, sidemenu, sidebutton, button: null });
</script>

<div class="flex flex-col text-center items-center justify-center">
	<div class="max-w-120 flex flex-col items-center">
		<h1 class="max-w-100">Here is a list with all the tutorials:</h1>
		<div class="flex flex-col wrap-normal items-center gap-2">
			{#each tutorials as tutorial, i}
				{@const link = tutorial.link}
				<!-- Ignore this linter error. Svelte linter issues. -->
				<a href={resolve(link)} class="text-blue-500 hover:text-blue-300">{i + 1}. {tutorial.title}</a>
			{/each}
		</div>
	</div>
</div>

{#snippet heading()}
	Overview
{/snippet}

{#snippet sidebutton()}{/snippet}

{#snippet sidemenu()}{/snippet}

<style>
</style>
