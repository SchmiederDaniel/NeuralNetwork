<script>
	import gsap from 'gsap';
	import { setObject } from '$lib/object-storage.svelte.js';
	import { onMount } from 'svelte';
	import { setupNetworkWeights } from '$lib/network/NetworkConfig.js';
	import Katex from '$lib/elements/Katex.svelte';
	import { cloneFloatAnimation } from '$lib/animations.js';

	setObject({
		sidemenu, sidebutton, button: {
			previousLink: '/tutorials/forwardpass/3', previousText: '< Chapter',
			nextLink: '', nextText: 'Chapter >'
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
				x.innerHTML = 'x';
				w.innerHTML = 'w';
				y.innerHTML = 'y';
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

		// animationLoop();
		timeLine = createTimeline();

		return () => {
			timeLine.kill();
			network.onDestroy();
		};
	});
</script>

<div class="grid grid-cols-1">
	<div class="custom-shadow sm:rounded-lg">
		<table class="w-full text-2xl text-center">
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
					<div bind:this={x} class="cloned-cell">x</div>
				</td>
				<td>*</td>
				<td>
					<div bind:this={w} class="cloned-cell">w</div>
				</td>
				<td>=</td>
				<td>
					<div bind:this={y} class="cloned-cell">y</div>
				</td>
			</tr>
			</tbody>
		</table>
	</div>
	<div bind:this={networkContainer}></div>
</div>

{#snippet sidemenu()}
	<p>The output of our neural network is calculated as follows:</p>
	<div style="font-size: 1.2em;">
		<Katex>y = x * w</Katex>
		<Katex>output = input * weight</Katex>
	</div>
	<p>Where y is our from the neural network produced output.</p>
{/snippet}

{#snippet sidebutton()}{/snippet}

<style lang="postcss">
  @reference "tailwindcss";
  th {
    font-weight: 500;
  }

  .cloned-cell {
    width: 65px;
    height: 40px;
  }

  table {
    text-align: center;
    box-sizing: border-box;
    border-spacing: 0;
    border-radius: 8px;
    border-collapse: separate;
    overflow: hidden;
  }

  th, td {
    padding: 10px 14px;
    font-size: 1.2em;
  }

  thead th {
    @apply bg-violet-500;
    color: white;
  }

  tbody tr:nth-child(2n) {
    @apply bg-violet-100;
  }

  tr {
    background-color: white;
  }
</style>