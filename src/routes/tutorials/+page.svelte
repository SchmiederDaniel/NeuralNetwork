<script>
	import { setObject} from '$lib/layout-slots.svelte.js';

	setObject({ heading, sidemenu });
</script>

Here is a overview page of all tutorials

{#snippet heading()}
	Overview
{/snippet}

{#snippet sidemenu()}
	Side menu from Overview
{/snippet}
