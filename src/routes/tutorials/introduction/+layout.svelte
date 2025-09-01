<script>
	import { setObject } from '$lib/object-storage.svelte.js';

	let { children } = $props();
	setObject({ heading});
</script>
{@render children()}
{#snippet heading()}
	Introduction
{/snippet}
