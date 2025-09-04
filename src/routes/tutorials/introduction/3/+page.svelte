<script>
	import { setObject } from '$lib/object-storage.svelte.js';
	import { onMount } from 'svelte';
	import { highlightElement } from '$lib/animations';
	import { setupNetwork } from '$lib/network/NetworkConfig.js';

	setObject({
		sidemenu,
		sidebutton,
		button: {
			previousLink: '/tutorials/introduction/2', previousText: '< Chapter',
			nextLink: '/tutorials/introduction/4', nextText: 'Chapter >'
		}
	});

	let networkContainer = $state();

	onMount(() => {
		const network = setupNetwork(networkContainer, 42, [1, 3, 2]);
		const input = [2];
		network.setInputData(input);
		network.forward(input);

		const resetCallbacks = [
			highlightElement('.layer'),
		];
		return () => {
			resetCallbacks.forEach(resetCallback => resetCallback());
			network.onDestroy();
		};
	});
</script>

<div bind:this={networkContainer}></div>

{#snippet sidemenu()}
	<h5>Layers</h5>
	<p>A Neural Network consists of multiple sub parts, but let's start with <b>layers</b>.</p>
	<p>And like you can see there are three types of layers <b>Input</b>, <b>Hidden</b> and <b>Output</b>.</p>
	<p>For visualization purpose I added the <b>Input</b> layer too, even though it will not be used for any
		calculation.</p>
	<p>The <b>Hidden</b> layer is where all the magic computations take place.</p>
	<p>And finally the <b>Output</b> layer is where some extra magic comes to use which I will explain later.
		For now just imagine the output layer to be the output which our Neural Network gives us.</p>
	<p>For now, you can think of the <b>Input</b> layer to just be the input data we feed into our neural network.</p>
{/snippet}

{#snippet sidebutton()}{/snippet}
