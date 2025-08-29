<script>
	import { setObject} from '$lib/layout-slots.svelte.js';

	setObject({ heading, sidemenu});
</script>

Here will be the explanation of the forward pass

{#snippet heading()}
	Forwardpass
{/snippet}

{#snippet sidemenu()}
	Side menu from Forwardpass
{/snippet}
