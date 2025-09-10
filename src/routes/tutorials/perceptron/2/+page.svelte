<script>
	import gsap from 'gsap';
	import { setObject } from '$lib/object-storage.svelte.js';
	import { onMount } from 'svelte';
	import { setupNetworkWeights } from '$lib/network/NetworkConfig.js';
	import Katex from '$lib/elements/Katex.svelte';

	setObject({
		sidemenu, sidebutton, button: {
			previousLink: '/tutorials/perceptron/1', previousText: '< Chapter',
			nextLink: '/tutorials/perceptron/3', nextText: 'Chapter >'
		}
	});

	let networkContainer = $state();
	let timeLine;
	let network;
	let useless = $state();

	function createTimeline() {
		let timeLine = gsap.timeline({
			repeat: -1
		});
		let inputData = [2];

		timeLine
			.call(() => {
				if (network)
					network.onDestroy();
				const weights = [null, [[0.5]]];
				network = setupNetworkWeights(networkContainer, weights, [1, 1], false);
			})
			.to(useless, { delay: 1.5 })
			.call(() => {
				network.setInputData(inputData);
			})
			.to(useless, { delay: 1.5 })
			.call(() => {
				network.forward(inputData);
			})
			.to(useless, { delay: 1.5 })
		;
		return timeLine;
	}

	onMount(() => {
		timeLine = createTimeline();

		return () => {
			timeLine.kill();
			network.onDestroy();
		};
	});
</script>

<div class="grid grid-cols-1">
	<div bind:this={networkContainer}></div>
</div>

<div class="hidden" bind:this={useless}></div>

{#snippet sidemenu()}
	<p>How most neural network algorithms learn is basically:</p>
	<ul class="pl-4 pb-4 list-disc -indent-4 list-inside">
		<li><b>Input data</b>: Inserting input data into our network which we want the
			neural network to make use off.
		</li>
		<li><b>Prediction</b>: Our neural network will produce a output based on your input.</li>
		<li><b>Error</b>: We calculate a error which is the difference between the output we wanted and the predicted value.
		</li>
		<li><b>Training</b>: We feed our error back through the neural network to adjust the weights.</li>
	</ul>
	<p>When the neural network learns, the "prediction" part can be thought of as a function, similar to:</p>
	<div class="text-2xl">
		<Katex>f(2) = 1</Katex>
	</div>
	<p>Where 2 is our input data and 1 our output.</p>
{/snippet}

{#snippet sidebutton()}{/snippet}
