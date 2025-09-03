<script>
	import { setObject } from '$lib/object-storage.svelte.js';

	setObject({
		sidemenu, sidebutton, button: {
			previousLink: '/tutorials/', previousText: 'Overview',
			nextLink: '/tutorials/forwardpass/2', text: 'Next chapter'
		}
	});
</script>
{#snippet sidemenu()}
	<p>Look!</p>
	<p>This neural network is much cuter now. 🥺</p>
	<p>It only consists of one input layer and one output layer.</p>
{/snippet}

{#snippet sidebutton()}{/snippet}
