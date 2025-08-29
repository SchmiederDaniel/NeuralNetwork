<script>
</script>

<div class="flex w-screen h-screen flex-col text-center items-center justify-center">
	<div class="max-w-120 flex flex-col items-center">
		<div class="title">
			Neural Network Animation
		</div>
		<p class="max-w-80">This project is build around a library project I made in javascript and can be used without dependencies.</p>
		<div class="flex wrap-normal items-center gap-4">
			<div class="project-card">
				<p>Some examples on how to use the library and what you can do with it.</p>
				<a href="/examples">Examples</a>
			</div>
			<div class="project-card">
				<p>Step by step animated tutorials which explain the math behind Neural Networks.</p>
				<a href="/tutorials">Tutorials</a>
			</div>
		</div>
	</div>
</div>
<style lang="postcss">
  @reference "tailwindcss";

  p {
	  font-size: 0.95em;
  }

  .project-card {
	  @apply bg-slate-100 rounded-md shadow-md p-4;
  }

  .project-card > p {
	  @apply text-gray-600 font-semibold;
  }

  a {
    @apply bg-white rounded-md shadow-md p-2;
  }
</style>