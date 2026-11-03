<script lang="ts">
	import Crossword from '#lib/components/crossword/Crossword.svelte';
</script>

<svelte:head>
	<title>Crossword | The Arcade | Zixiao Liu</title>
	<meta name="description" content="A playable 5×5 mini crossword." />
</svelte:head>

<h1 class="page-title">crossword</h1>
<p>Fill in the grid; check or reveal the answers whenever you like.</p>

<Crossword />
