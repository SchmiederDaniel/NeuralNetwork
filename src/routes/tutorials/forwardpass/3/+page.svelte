<script>
	import { setObject } from '$lib/object-storage.svelte.js';
	import { onMount } from 'svelte';
	import { setupNetwork } from '$lib/network/NetworkConfig.js';
	import Katex from '$lib/elements/Katex.svelte';

	setObject({
		sidemenu, sidebutton, button: {
			previousLink: '/tutorials/forwardpass/2', previousText: '< Chapter',
			nextLink: '/tutorials/forwardpass/4', nextText: 'Chapter >'
		}
	});

	let networkContainer = $state();
	onMount(() => {
		const network = setupNetwork(networkContainer, 42, [1, 1], false);

		const input = [2];
		network.setInputData(input);
		network.forward(input);

		let newText = ["y", "x"];
		network.layers.forEach(layer => {
			layer.nodes.forEach(node => {
				node.self.innerText = newText.pop();
				if(node.weights) {
					node.weights.forEach(weight => {
						weight.text.innerText = "w";
					})
				}
			});
		});
		return () => {
			network.onDestroy();
		};
	});
</script>

<div class="grid grid-cols-1">
	<div class="text-4xl">
		<Katex>f(x) = y </Katex>
	</div>
	<div bind:this={networkContainer}></div>
</div>

{#snippet sidemenu()}
	<p>But we can also call the inputs <b class="text-xl">x</b> and the outputs <b class="text-xl">y</b>.</p>
	<p>And our Weight can be shortened to just <b>w</b>.</p>
{/snippet}

{#snippet sidebutton()}{/snippet}

<style>
</style>