<script>
	import { setObject } from '$lib/object-storage.svelte.js';
	import { onMount } from 'svelte';
	import { highlightElement } from '$lib/animations.js';
	import { setupNetwork } from '$lib/network/NetworkConfig.js';

	setObject({
		sidemenu, sidebutton, button: {
			previousLink: '/tutorials', previousText: 'Overview',
			nextLink: '/tutorials/forwardpass/2', nextText: 'Chapter >'
		}
	});

	let networkContainer = $state();
	onMount(() => {
		const resetCallback = highlightElement('.navigation-button-right');
		const network = setupNetwork(networkContainer, 42, [1,  1], false);

		const input = [2];
		network.setInputData(input);
		network.forward(input);

		return () => {
			resetCallback();
			network.onDestroy();
		};
	});
</script>

<div bind:this={networkContainer}></div>

{#snippet sidemenu()}
	<h5>Welcome back!</h5>
	<p>In this tutorial I want to explain how the <b>Forwardpass</b> is being calculated.</p>
	<p>And look!</p>
	<p>I simplified the neural network. It's much cuter now, right? 🥺</p>
	<p>It only consists of one input layer and one output layer.</p>
{/snippet}

{#snippet sidebutton()}{/snippet}
