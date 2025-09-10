<script>
	import { setObject } from '$lib/object-storage.svelte.js';
	import { onMount } from 'svelte';
	import { setupNetwork } from '$lib/network/NetworkConfig.js';
	import Katex from '$lib/elements/Katex.svelte';

	setObject({
		sidemenu, sidebutton, button: {
			previousLink: '/tutorials/perceptron/2', previousText: '< Chapter',
			nextLink: '/tutorials/perceptron/4', nextText: 'Chapter >'
		}
	});

	let networkContainer = $state();
	onMount(() => {
		const network = setupNetwork(networkContainer, 42, [1, 1], false);

		const input = [2];
		network.setInputData(input);
		network.forward(input);

		let newText = ['y_pred', 'X'];
		network.layers.forEach(layer => {
			layer.nodes.forEach(node => {
				node.self.innerText = newText.pop();
				if (node.self.innerText.length > 3)
					node.self.style.fontSize = '0.75em';
				if (node.weights) {
					node.weights.forEach(weight => {
						weight.text.innerText = 'w';
					});
				}
			});
		});
		return () => {
			network.onDestroy();
		};
	});
</script>

<div class="grid grid-cols-1">
	<div bind:this={networkContainer}></div>
</div>

{#snippet sidemenu()}
	<p>In mathematical notation the input data is being called <b>X</b>, while the output data is <b>y_pred</b> which
		comes from "<b>pred</b>-iction".</p>
	<p>We also have <b>y_true</b> which are our true values which we want our network to produce. Usually when we have
		training data, the data comes in pairs with <b>input</b> (X) and corresponding <b>output</b> (y_true)</p>
	<p>The weights of the network are called <b>w</b>.</p>
	<p>On the right you can see the variables are inside our perceptron.</p>
	<p>So our mathematical function would look like this:</p>
	<div class="text-xl">
		<Katex>f(X) = y</Katex>
	</div>
	<p>And here a fun fact:</p>
	<p>Sometimes you also hear neural networks being referred to as "function approximators" as neural networks
		theoretically mimik every function given enough layers, nodes and compute resources.</p>
{/snippet}

{#snippet sidebutton()}{/snippet}

<style>
</style>