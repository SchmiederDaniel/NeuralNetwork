<script>
	import { setObject } from '$lib/object-storage.svelte.js';
	import { onMount } from 'svelte';
	import { setupNetwork } from '$lib/network/NetworkConfig.js';

	setObject({
		sidemenu,
		sidebutton,
		button: {
			// These buttons will be shown in the sidemenu
			previousLink: '/tutorials/introduction/1', previousText: 'Previous chapter',
			nextLink: '/tutorials/introduction/3', nextText: 'Next chapter'
		}
	});

	let networkContainer = $state();

	onMount(() => {
		// You can create a neural network easily with the following code.
		/*
			Note that the neural network needs to be destroyed properly with "onDestroy()" when the
			page unloads which is made inside the return callback below.
		*/
		const network = setupNetwork(networkContainer, 42, [1, 3, 2]);

		const input = [2];
		network.setInputData(input);
		network.forward(input);

		return () => {
			network.onDestroy();
		};
	});
</script>

<p>You can write text here which will be shown on the right side of the screen. The neural network will be shown below
	too.</p>
<div bind:this={networkContainer}></div>

{#snippet sidemenu()}
	<p>Here can be the text which will be shown on the left side inside the sidemenu</p>
{/snippet}

{#snippet sidebutton()}{/snippet}
