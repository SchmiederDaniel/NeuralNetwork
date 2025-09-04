<script>
	import { setObject } from '$lib/object-storage.svelte.js';
	import { onMount } from 'svelte';
	import { highlightElement } from '$lib/animations';
	import { setupNetwork } from '$lib/network/NetworkConfig.js';

	setObject({
		sidemenu, sidebutton, button: {
			previousLink: '/tutorials/', previousText: 'Overview',
			nextLink: '/tutorials/introduction/2', nextText: 'Chapter >'
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
	<h5>Welcome to this neural network tutorial!</h5>
	<p>In this tutorial I want to show people the math behind Neural-Networks and who knows,
		maybe you'll find it quite simple in the end. </p>
	<p>But first of all, I want to explain the tutorials controls.</p>
	<p>You can see at the bottom is a button with <b>"Next chapter"</b> which you can use to step to the next chapter.
	</p>
	<p>Let's try it out. :3</p>
	<p>Please press the <b>"Chapter >"</b> button below.</p>
{/snippet}

{#snippet sidebutton()}{/snippet}
