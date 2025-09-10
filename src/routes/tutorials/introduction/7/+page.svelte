<script>
	import { setObject } from '$lib/object-storage.svelte.js';
	import { onMount } from 'svelte';
	import { hideElement, highlightElement } from '$lib/animations';
	import { setupNetwork } from '$lib/network/NetworkConfig.js';

	setObject({
		sidemenu,
		sidebutton,
		button: {
			previousLink: '/tutorials/introduction/6', previousText: '< Chapter',
			nextLink: '/tutorials/perceptron/1', nextText: 'Tutorial >'
		}
	});

	let networkContainer = $state();

	onMount(() => {
		const network = setupNetwork(networkContainer, 42, [1, 3, 2]);
		const input = [2];
		network.setInputData(input);
		network.forward(input);

		const resetCallbacks = [
			hideElement('.node'),
			highlightElement(".weight-line")
		];
		return () => {
			resetCallbacks.forEach(resetCallback => resetCallback());
			network.onDestroy();
		};
	});
</script>

<div bind:this={networkContainer}></div>

{#snippet sidemenu()}
	<h5>Weights</h5>
	<p>And finally we have the <b>Weights</b></p>
	<p>The Weights are the connections between the Nodes and each Weight has one randomly generated value. </p>
	<p>The weights are
		the parameters of the neural network. So while training these values will be
		adjusted slowly to produce the right output we want.</p>
	<p>So this was the first Tutorial. Next I will explain the "Forward pass" with some examples.</p>
{/snippet}

{#snippet sidebutton()}{/snippet}
