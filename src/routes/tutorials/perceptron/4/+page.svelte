<script>
	import gsap from 'gsap';
	import { setObject } from '$lib/object-storage.svelte.js';
	import { onMount } from 'svelte';
	import { setupNetworkWeights } from '$lib/network/NetworkConfig.js';
	import Katex from '$lib/elements/Katex.svelte';
	import { cloneFloatAnimation } from '$lib/animations.js';

	setObject({
		sidemenu, sidebutton, button: {
			previousLink: '/tutorials/perceptron/3', previousText: '< Chapter',
			nextLink: '/tutorials/perceptron/5', nextText: 'Chapter >'
		}
	});
	let network;
	let timeLine;

	let x = $state();
	let w = $state();
	let y = $state();

	function createTimeline() {
		let timeLine = gsap.timeline({
			repeat: -1
		});

		const inputText = network.layers[0].nodes[0].text;
		const outputNode = network.layers[1].nodes[0];
		const outputText = outputNode.text;
		const weightText = outputNode.weights[0].text;

		timeLine.to([x, y, w], {
			opacity: 0,
			duration: 1.5,
			delay: 3
		})
			.call(() => {
				x.innerHTML = '';
				w.innerHTML = '';
				y.innerHTML = '';
			})
			.to([x, y, w], {
				opacity: 1
			})
			.call(() => {
				cloneFloatAnimation(inputText, x, 1.5);
				cloneFloatAnimation(weightText, w, 1.5);
				cloneFloatAnimation(outputText, y, 1.5);
			})
			.to([x, y, w], {
				duration: 1.5,
				opacity: 0,
				delay: 3
			})
			.call(() => {
				x.innerHTML = 'X';
				w.innerHTML = 'w';
				y.innerHTML = 'y_pred';
			})
			.to([x, w, y], {
				opacity: 1
			});
		return timeLine;
	}

	let networkContainer = $state();
	onMount(() => {
		const weights = [null, [[0.5]]];
		network = setupNetworkWeights(networkContainer, weights, [1, 1], false);

		const input = [2];
		network.setInputData(input);
		network.forward(input);

		timeLine = createTimeline();

		return () => {
			timeLine.kill();
			network.onDestroy();
		};
	});
</script>

<div class="grid grid-cols-1">
	<div class="custom-shadow sm:rounded-lg">
		<table class="w-full custom-table text-2xl">
			<thead>
			<tr class="w-full">
				<th colspan="3">
					<Katex>f(2)</Katex>
				</th>
				<th>=</th>
				<th>
					<Katex>1</Katex>
				</th>
			</tr>
			</thead>
			<tbody>
			<tr>
				<td>
					<div bind:this={x} class="cloned-cell">X</div>
				</td>
				<td>*</td>
				<td>
					<div bind:this={w} class="cloned-cell">w</div>
				</td>
				<td>=</td>
				<td>
					<div bind:this={y} style="height: 40px; width: 86px;">y_pred</div>
				</td>
			</tr>
			</tbody>
		</table>
	</div>
	<div bind:this={networkContainer}></div>
</div>

{#snippet sidemenu()}
	<p>So to calculate our output (<b>y_pred</b>) we have to multiply our input (<b>X</b>) with our weights (<b>w</b>) like
		this:</p>
	<div style="font-size: 1.2em;" class="pb-4">
		<Katex>y\_pred = X * w</Katex>
		<br>
		<Katex>output = input * weight</Katex>
		<br>
		<Katex>2 = 1 * 0.5</Katex>
	</div>
	<p>On the right you can see the visualization of the process.</p>
{/snippet}

{#snippet sidebutton()}{/snippet}

<style lang="postcss">
  @reference "tailwindcss";

  .cloned-cell {
    width: 65px;
    height: 40px;
  }
</style>