<script>
	import { setObject } from '$lib/object-storage.svelte.js';
	import { onMount } from 'svelte';
	import { setupNetwork } from '$lib/network/NetworkConfig';
	import { highlightElement } from '$lib/animations';

	setObject({
		sidemenu,
		sidebutton,
		button: {
			previousLink: '/tutorials/introduction/1', previousText: '< Chapter',
			nextLink: '/tutorials/introduction/3', nextText: 'Chapter >'
		}
	});

	let networkContainer = $state();

	onMount(() => {
		const network = setupNetwork(networkContainer, 42, [1, 3, 2]);
		const input = [2];
		network.setInputData(input);
		network.forward(input);

		const resetCallbacks = [
			highlightElement('.side-menu'),
			highlightElement('.network')
		];

		return () => {
			resetCallbacks.forEach(resetCallback => resetCallback());
			network.onDestroy();
		};
	});
</script>

<div bind:this={networkContainer}></div>

{#snippet sidemenu()}
	<p>Like you probably already noticed, is that the explanation and information will be shown on the left side
		of the screen. Here you can see the explanations for all the lessons.</p>
	<p>Here highlighted the right side of the screen you can see a visualization of a <b>Neural Network</b>.</p>
	<p>But don't be scared, we will simplify it a lot later when we look at the so called "Forward pass".</p>
	<p>In the following chapters I want to explain the components of a neural network.</p>
	<p>But for now lets proceed by clicking <b>"Chapter >"</b> down below.</p>
{/snippet}

{#snippet sidebutton()}{/snippet}
