<script lang="ts">
	import { scale } from 'svelte/transition';
	import type { Tile } from '#lib/game/game.svelte.js';

	interface Props {
		tile: Tile;
	}

	let { tile }: Props = $props();

	let background = $derived(tile.value > 4096 ? 'var(--tile-super)' : `var(--tile-${tile.value})`);
	let lightText = $derived(tile.value >= 128);
	let digits = $derived(String(tile.value).length);
</script>

<!-- The outer element slides (CSS transform); the inner one pops in (Svelte transition). -->
<div class="tile" class:consumed={tile.consumed} style:--row={tile.row} style:--col={tile.col}>
	{#if tile.merged}
		<span
			class="face"
			class:light={lightText}
			style:background-color={background}
			style:--digits={digits}
			in:scale={{ start: 0.6, delay: 80, duration: 160 }}
		>
			{tile.value}
		</span>
	{:else if tile.spawned}
		<span
			class="face"
			class:light={lightText}
			style:background-color={background}
			style:--digits={digits}
			in:scale={{ start: 0, delay: 100, duration: 160 }}
		>
			{tile.value}
		</span>
	{:else}
		<span
			class="face"
			class:light={lightText}
			style:background-color={background}
			style:--digits={digits}
		>
			{tile.value}
		</span>
	{/if}
</div>

<style>
	.tile {
		position: absolute;
		top: var(--gap);
		left: var(--gap);
		z-index: 2;
		width: calc((100% - 5 * var(--gap)) / 4);
		aspect-ratio: 1;
		transform: translate(
			calc(var(--col) * (100% + var(--gap))),
			calc(var(--row) * (100% + var(--gap)))
		);
		transition: transform 110ms ease-in-out;
	}

	.consumed {
		z-index: 1;
	}

	.face {
		display: grid;
		place-items: center;
		width: 100%;
		height: 100%;
		color: var(--color-ink);
		font-family: var(--font-serif);
		font-size: calc(clamp(1.4rem, 7vw, 2.2rem) * min(1, 3 / var(--digits)));
		line-height: 1;
	}

	.light {
		color: #ffffff;
	}
</style>
