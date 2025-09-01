<script>
	let { links, currentIndex, children } = $props();

	function buttonClicked() {

	}
</script>

<main>
	<button onclick={buttonClicked} aria-label="Next page">
		{@render children()}
	</button>
</main>

<style>
</style>