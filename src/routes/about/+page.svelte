<script lang="ts">
	import { resolve } from '$app/paths';
</script>

<svelte:head>
	<title>About | The Arcade | Zixiao Liu</title>
	<meta name="description" content="About Zixiao Liu." />
</svelte:head>

<h1 class="page-title">about</h1>

<section aria-labelledby="experience-title">
	<h2 id="experience-title">experience</h2>
	<h3>projects</h3>
	<h4>cs 5610 · web development</h4>
	<h5>project 1</h5>
	<h6><a href={resolve('/crossword')}>the mini crossword</a></h6>
	<h5>project 2</h5>
	<h6><a href={resolve('/2048')}>2048</a></h6>
</section>

<section aria-labelledby="education-title">
	<h2 id="education-title">education</h2>
</section>

<style>
	section {
		padding-block: var(--space-5);
		border-top: 1px solid var(--color-line);
	}

	section:first-of-type {
		margin-top: var(--space-6);
	}

	h2 {
		margin-bottom: var(--space-4);
	}

	h3,
	h4,
	h5,
	h6 {
		margin-top: var(--space-2);
	}

	/* Each heading level steps in a little */
	h4 {
		padding-left: var(--space-4);
	}

	h5 {
		padding-left: var(--space-6);
	}

	h6 {
		padding-left: calc(var(--space-6) + var(--space-4));
	}
</style>
