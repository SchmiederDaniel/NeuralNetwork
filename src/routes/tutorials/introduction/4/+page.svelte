<script>
	import { setObject } from '$lib/object-storage.svelte.js';
	import { onMount } from 'svelte';
	import { hideElement, highlightElement } from '$lib/animations';
	import { setupNetwork } from '$lib/network/NetworkConfig.js';

	setObject({
		sidemenu,
		sidebutton,
		button: {
			previousLink: '/tutorials/introduction/3', previousText: '< Chapter',
			nextLink: '/tutorials/introduction/5', nextText: 'Chapter >'
		}
	});

	let networkContainer = $state();

	onMount(() => {
		const network = setupNetwork(networkContainer, 42, [1, 3, 2]);
		const input = [2];
		network.setInputData(input);
		network.forward(input);

		const resetCallbacks = [
			highlightElement('.node'),
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
	<p>Every layer can have multiple <b>Nodes</b> (or also called <b>Neurons</b>) which aren't mathematically required,
		but we will use them here for visualization purpose.</p>
	<p>The input layers <b>Nodes</b> are only here to save/show us what the input data for our our
		neural network is.</p>
	<p>The <b>nodes</b> from the hidden and output layer can be thought of as placeholders where we save our
		intermediate values.</p>

	<p>And the colors of each node is as follows:</p>
	<div class="flex flex-wrap">
		<div>Bias
			<div class="lesson-node lesson-bias">1</div>
		</div>
		<div>Input
			<div class="lesson-node lesson-input">1</div>
		</div>
		<div>Hidden
			<div class="lesson-node lesson-hidden">1</div>
		</div>
		<div>Output
			<div class="lesson-node lesson-output">1</div>
		</div>
	</div>
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

  .lesson-hidden {
    background-color: rgb(35, 88, 255);
  }

  .lesson-output {
    background-color: rgb(255, 187, 0);
  }
</style>