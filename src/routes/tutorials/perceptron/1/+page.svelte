<script>
	import { setObject } from '$lib/object-storage.svelte.js';
	import { onMount } from 'svelte';
	import { setupNetworkWeights } from '$lib/network/NetworkConfig.js';
	import { hideElement, highlightElement } from '$lib/animations.js';

	setObject({
		sidemenu, sidebutton, button: {
			previousLink: '/tutorials', previousText: 'Overview',
			nextLink: '/tutorials/perceptron/2', nextText: 'Chapter >'
		}
	});

	let networkContainer = $state();
	onMount(() => {
		const weights = [null, [[0.5]]];
		const network = setupNetworkWeights(networkContainer, weights, [1, 1], false);

		const input = [2];
		network.setInputData(input);
		network.forward(input);

		let resetCallbacks = [
			hideElement(network.layers[0].nodes[0].self),
			highlightElement(network.layers[1].nodes[0].weights[0].line),
			highlightElement(network.layers[1].nodes[0].self),
		]

		return () => {
			resetCallbacks.forEach(e => e());
			network.onDestroy();
		};
	});
</script>

<div bind:this={networkContainer}></div>

{#snippet sidemenu()}
	<p>Welcome back!</p>
	<p>In this tutorial I want to explain how a single <b>neuron</b> (Also called <b>node</b> or <b>perceptron</b>) works.</p>
	<p>We will start really simple and will increase the complexity when the tutorial goes on.</p>
	<p>So on the right side you can see a neural network which only consists of one input and one output node.</p>
	<p>A perceptron is just a single neuron with it's corresponding weights. (highlighted on the right side)</p>
{/snippet}

{#snippet sidebutton()}{/snippet}
