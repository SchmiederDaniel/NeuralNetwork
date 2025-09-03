<script>
	import { setObject } from '$lib/object-storage.svelte.js';
	import { onMount } from 'svelte';
	import { highlightElement } from '$lib/animations.js';
	import { setupNetwork } from '$lib/network/NetworkConfig.js';

	setObject({
		sidemenu,
		sidebutton,
		button: {
			previousLink: "/tutorials/introduction/1", previousText: "Previous chapter",
			nextLink: "/tutorials/introduction/3", nextText: "Next chapter"
		}
	});

	let networkContainer = $state();

	onMount(() => {
		const resetCallback = highlightElement('.navigation-button-right');
		const network = setupNetwork(networkContainer, 42, [1, 3, 2]);

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
	<p>Like you probably already noticed, is that the explanation and information will be shown on the left side
		of the screen. Here you can see the explanations for all the lessons.</p>
	<p>Here highlighted the right side of the screen you can see a visualization of a <b>Neural Network</b>.</p>
	<p>But don't be scared, we will simplify it a lot later when I will explain the "Forward pass".</p>
	<p>For now lets press "Next >" again for the next chapter.</p>
{/snippet}

{#snippet sidebutton()}{/snippet}
