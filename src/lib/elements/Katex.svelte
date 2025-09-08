<script>
	import katex from 'katex';
	import { onMount } from 'svelte';

	const { children } = $props();

	let childrenElement = $state();
	let renderKatex = $state();

	onMount(() => {
		let text = childrenElement.innerText;

		renderKatex = katex.renderToString(text, {
			displayMode: true,
			throwOnError: false,
			output: 'mathml'
		});
	});

</script>
<main>
	<div class="hidden" bind:this={childrenElement}>{@render children()}</div>
	{@html renderKatex}
</main>