<script>
	import { setObject } from '$lib/object-storage.svelte.js';
	import { onMount } from 'svelte';
	import { setupNetworkWeights } from '$lib/network/NetworkConfig.js';
	import Katex from '$lib/elements/Katex.svelte';

	setObject({
		sidemenu, sidebutton, button: {
			previousLink: '/tutorials/perceptron/4', previousText: '< Chapter',
			nextLink: '/tutorials/perceptron/6', nextText: 'Chapter >'
		}
	});
	let network;

	let networkContainer = $state();
	onMount(() => {
		const weights = [null, [[0.5]]];
		network = setupNetworkWeights(networkContainer, weights, [1, 1], false);

		const input = [2];
		network.setInputData(input);
		network.forward(input);

		return () => {
			network.onDestroy();
		};
	});
</script>

<div class="grid grid-cols-1">
	<div class="custom-shadow sm:rounded-lg">
		<table class="text-xl custom-table">
			<thead>
			<tr class="w-full">
				<th>
					Predicted
				</th>
				<th>-</th>
				<th>
					Wanted
				</th>
				<th>=</th>
				<th>
					Error
				</th>
			</tr>
			</thead>
			<tbody>
			<tr>
				<td>y_pred</td>
				<td>-</td>
				<td>y_true</td>
				<td>=</td>
				<td>error</td>
			</tr>
			<tr>
				<td>1</td>
				<td>-</td>
				<td>-1</td>
				<td>=</td>
				<td>2</td>
			</tr>
			</tbody>
		</table>
	</div>
	<div bind:this={networkContainer}></div>
</div>

{#snippet sidemenu()}
	<p>Next we need to calculate the error.</p>
	<p>To be able to calculate the error we require the prediction (<b>y_true</b>) from our neural network and the value
		we
		want our network to produce for the corresponding input (<b>y_pred</b>).</p>
	<div class="text-xl pb-4">
		<Katex>error = y\_pred - y\_true</Katex>
	</div>
	<p>So for example when our network produced 1 as output but we actually wanted the input 2 to produce -1 as output we
		calculate it like:</p>
	<div class="text-xl pb-4">
		<Katex>2 = 1 - -1</Katex>
	</div>
	<p>Two times minus is actually plus which gives us 2.</p>
	<p>Now we need to propagate this error backwards though our neural network.</p>
{/snippet}

{#snippet sidebutton()}{/snippet}

<style lang="postcss">
  @reference "tailwindcss";
</style>