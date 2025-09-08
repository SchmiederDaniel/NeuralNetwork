<script>
	import { setObject } from '$lib/object-storage.svelte.js';
	import { onMount } from 'svelte';
	import { setupNetwork, setupNetworkWeights } from '$lib/network/NetworkConfig.js';
	import Katex from '$lib/elements/Katex.svelte';

	setObject({
		sidemenu, sidebutton, button: {
			previousLink: '/tutorials/forwardpass/1', previousText: '< Chapter',
			nextLink: '/tutorials/forwardpass/3', nextText: 'Chapter >'
		}
	});

	let networkContainer = $state();
	onMount(() => {
		const weights = [null, [[0.5]]];
		const network = setupNetworkWeights(networkContainer, weights, [1, 1], false);

		return () => {
			network.onDestroy();
		};
	});
</script>

<div class="grid grid-cols-1">
	<Katex>f(2) = 1 </Katex>
	<div bind:this={networkContainer}></div>
</div>

{#snippet sidemenu()}
	<h5>Forwardpass</h5>
	<p>A neural network in a nutshell works similar to a function whose content we do not know.</p>
	<p>So similar to a function we have <b>input (2)</b> and <b>output (1)</b>.</p>
{/snippet}

{#snippet sidebutton()}{/snippet}

<style>
	:global {
    .katex {
      font-size: 2em;
    }
	}
</style>