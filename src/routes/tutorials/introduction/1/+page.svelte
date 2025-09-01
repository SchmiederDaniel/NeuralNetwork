<script>
	import { setObject } from '$lib/object-storage.svelte.js';
	import { onMount } from 'svelte';
	import { highlightElement } from '$lib/animations.js';

	setObject({
		sidemenu, sidebutton, button: {nextLink: "/tutorials/introduction/2", text: "Next chapter"}
	});

	onMount(() => {
		const resetCallback = highlightElement(".tutorial-button");

		return () => {
			resetCallback();
		}
	})
</script>



{#snippet sidemenu()}
	<p>Welcome to this neural network tutorial.</p>
	<p>In this tutorial I want to show people the math behind Neural-Networks and who knows,
		maybe you'll find it quite simple in the end. </p>
	<p>But first of I want to explain the tutorials controls.
		You can see at the bottom is a button with <b>"Next chapter"</b> which you can use to step to the next chapter in this
		lesson.
	</p>
	<p>Let's try it out. :3</p>
	<p>Please press the <b>"Next chapter"</b> button below.</p>
{/snippet}

{#snippet sidebutton()}{/snippet}
