<script>
	import { setObject } from '$lib/object-storage.svelte.js';
	import { onMount } from 'svelte';
	import { highlightElement } from '$lib/animations.js';
	import { setupNetwork } from '$lib/network/NetworkConfig.js';

	setObject({
		sidemenu, sidebutton, button: {
			previousLink: '/tutorials/forwardpass/1', previousText: '< Chapter',
			nextLink: '', nextText: 'Chapter >'
		}
	});

	let networkContainer = $state();
	onMount(() => {
		const network = setupNetwork(networkContainer, 42, [1,  1], false);

		const input = [2];
		network.setInputData(input);
		network.forward(input);

		return () => {
			network.onDestroy();
		};
	});
</script>

<div bind:this={networkContainer}></div>

{#snippet sidemenu()}
	<h5>Forwardpass</h5>

{/snippet}

{#snippet sidebutton()}{/snippet}
