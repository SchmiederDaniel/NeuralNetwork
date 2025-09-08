<script>
	import { setObject } from '$lib/object-storage.svelte.js';
	import { onMount } from 'svelte';
	import { hideElement, highlightElement } from '$lib/animations';
	import { setupNetwork } from '$lib/network/NetworkConfig.js';

	setObject({
		sidemenu,
		sidebutton,
		button: {
			previousLink: '/tutorials/introduction/5', previousText: '< Chapter',
			nextLink: '/tutorials/introduction/7', nextText: 'Chapter >'
		}
	});

	let networkContainer = $state();

	onMount(() => {
		const network = setupNetwork(networkContainer, 42, [1, 3, 2, 2]);
		const input = [2];
		network.setInputData(input);
		network.forward(input);

		const resetCallbacks = [
			highlightElement('.node:not(.output, .input)'),
			highlightElement('.hidden'),
			hideElement('.output'),
			hideElement('.input'),
			hideElement('.weight-line')
		];
		return () => {
			resetCallbacks.forEach(resetCallback => resetCallback());
			network.onDestroy();
		};
	});
</script>

<div bind:this={networkContainer}></div>

{#snippet sidemenu()}
	<h5>Definable properties</h5>
	<p>
		The hidden layer and node count is what we as a developer can define for our neural networks.
	</p>
	<p>While usually neural networks only have one <b>input</b> and one <b>output</b> layer, we can define the amount of
		hidden layers
		ourself. For example here is a neural network with two hidden layers.</p>
	<p>We can also choose how many nodes a layer can have per layer. The first <b>hidden</b> layer for example has 3 nodes
		and the second hidden layer has only 2.</p>
{/snippet}

{#snippet sidebutton()}{/snippet}
