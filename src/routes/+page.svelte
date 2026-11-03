<script lang="ts">
	import { asset, resolve } from '$app/paths';
	import GameLink from '#lib/components/GameLink.svelte';

	const previewTiles = [64, 128, 256, 2048];
</script>

<svelte:head>
	<title>The Arcade | Zixiao Liu</title>
	<meta name="description" content="A small arcade of browser games by Zixiao Liu." />
</svelte:head>

<h1 class="page-title">welcome</h1>
<p>A small arcade of browser games, built by hand.</p>

<ul class="games">
	<li>
		<GameLink href={resolve('/crossword')} label="play the mini crossword">
			<img
				src={asset('crossword-preview.svg')}
				width="240"
				height="240"
				alt="Preview of the five by five mini crossword grid."
			/>
		</GameLink>
	</li>
	<li>
		<GameLink href={resolve('/2048')} label="play 2048">
			<span class="preview-2048" aria-hidden="true">
				{#each previewTiles as value (value)}
					<span style:background-color="var(--tile-{value})">{value}</span>
				{/each}
			</span>
		</GameLink>
	</li>
</ul>

<style>
	.games {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-6);
		margin-top: var(--space-7);
		list-style: none;
	}

	.preview-2048 {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 2px;
		height: 100%;
		border: 2px solid var(--color-ink);
		background-color: var(--color-ink);
	}

	.preview-2048 span {
		display: grid;
		place-items: center;
		color: #ffffff;
		font-family: var(--font-serif);
		font-size: var(--step-1);
	}

	.preview-2048 span:first-child {
		color: var(--color-ink);
	}
</style>
