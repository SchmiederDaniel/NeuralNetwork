<script>
	import { setObject} from '$lib/layout-slots.svelte.js';

	setObject({ heading, sidemenu});
</script>

Here will be the introduction of the tutorials

{#snippet heading()}
	Introduction
{/snippet}

{#snippet sidemenu()}
	Side menu from Introduction
{/snippet}
