<script>
	import { setObject } from '$lib/object-storage.svelte.js';
	import { onMount } from 'svelte';
	import { setupNetworkWeights } from '$lib/network/NetworkConfig.js';
	import Katex from '$lib/elements/Katex.svelte';

	setObject({
		sidemenu, sidebutton, button: {
			previousLink: '/tutorials/perceptron/5', previousText: '< Chapter',
			nextLink: '', nextText: 'Chapter >'
		}
	});
	let network;

	let networkContainer = $state();
	onMount(() => {
		const weights = [null, [[0.5]]];
		network = setupNetworkWeights(networkContainer, weights, [1, 1], false);

		const input = [2];
		network.setInputData(input);
		network.forward(input);

		return () => {
			network.onDestroy();
		};
	});
</script>

<div class="grid grid-cols-1">
	<div bind:this={networkContainer}></div>
</div>

{#snippet sidemenu()}
	<p>To understand how we can adjust the networks weights we have to understand the chain rule.</p>
	<div class="pb-4 text-xl">
		<Katex>0.5 * 2 * 4 = 4</Katex>
	</div>
	<p>You can see at the top example that every value in this <b>chain</b> is being multiplied with each other.</p>
	<p>So every value in this chain influences the output value. But what if we want to know how much the first value <b>0.5</b>
		would have to change to produce the output 2 instead of 4?</p>
	<p></p>
{/snippet}

{#snippet sidebutton()}{/snippet}

<style lang="postcss">
  @reference "tailwindcss";
</style>