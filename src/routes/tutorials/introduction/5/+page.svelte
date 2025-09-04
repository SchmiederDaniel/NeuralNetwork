<script>
	import { setObject } from '$lib/object-storage.svelte.js';
	import { onMount } from 'svelte';
	import { hideElement, highlightElement } from '$lib/animations';
	import { setupNetwork } from '$lib/network/NetworkConfig.js';

	setObject({
		sidemenu,
		sidebutton,
		button: {
			previousLink: '/tutorials/introduction/4', previousText: '< Chapter',
			nextLink: '/tutorials/introduction/6', nextText: 'Chapter >'
		}
	});

	let networkContainer = $state();

	onMount(() => {
		const network = setupNetwork(networkContainer, 42, [1, 3, 2, 2]);
		const input = [2];
		network.setInputData(input);
		network.forward(input);

		const resetCallbacks = [
			highlightElement('.bias'),
			hideElement('.node:not(.bias, .input)'),
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
	<p>We also have one red node which is called <b>Bias</b>. This node will be explained later in the tutorial
		and its value is always 1.</p>
	<div class="lesson-node lesson-bias">1</div>
	<p>But even though the input layer has two nodes, only the green one counts as input.</p>
	<div class="lesson-node lesson-input">2</div>
	<p>Some neural network implementations don't have an extra node for the bias but instead use one learnable value for
		calculations, but in this tutorial we will stick to this implementation as it is easier to understand.</p>
{/snippet}

{#snippet sidebutton()}{/snippet}

<style>
  .lesson-node {
    aspect-ratio: 1/1;
    width: 46px;
    border: 3px solid rgba(0, 0, 0, 0.5);
    border-radius: 50%;
    margin: 10px;
    font-weight: 600;

    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .lesson-bias {
    background-color: rgb(255, 80, 80);
  }

  .lesson-input {
    background-color: rgb(0, 177, 0);
  }
</style>