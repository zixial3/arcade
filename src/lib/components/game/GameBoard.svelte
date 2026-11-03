<script lang="ts">
	import type { Board, Direction } from '@zixial3/arcade-core';
	import type { Snippet } from 'svelte';
	import type { Tile } from '#lib/game/game.svelte.js';
	import GameTile from './GameTile.svelte';

	interface Props {
		tiles: Tile[];
		board: Board;
		onswipe: (direction: Direction) => void;
		/** Overlay drawn on top of the board (win / game over). */
		children?: Snippet;
	}

	let { tiles, board, onswipe, children }: Props = $props();

	const SWIPE_DISTANCE = 30;
	let start: { x: number; y: number } | null = null;

	let description = $derived(
		board
			.map(
				(row, r) =>
					`Row ${r + 1}: ${row.map((value) => (value === 0 ? 'empty' : value)).join(', ')}`
			)
			.join('. ')
	);

	function handlePointerDown(event: PointerEvent) {
		if (event.pointerType === 'mouse') return;
		start = { x: event.clientX, y: event.clientY };
	}

	function handlePointerUp(event: PointerEvent) {
		if (!start) return;
		const dx = event.clientX - start.x;
		const dy = event.clientY - start.y;
		start = null;
		if (Math.max(Math.abs(dx), Math.abs(dy)) < SWIPE_DISTANCE) return;
		if (Math.abs(dx) > Math.abs(dy)) onswipe(dx > 0 ? 'right' : 'left');
		else onswipe(dy > 0 ? 'down' : 'up');
	}
</script>

<div class="board-wrap">
	<div
		class="board"
		role="img"
		aria-label="2048 board. {description}."
		onpointerdown={handlePointerDown}
		onpointerup={handlePointerUp}
		onpointercancel={() => (start = null)}
	>
		{#each { length: 16 }, index (index)}
			<div class="slot"></div>
		{/each}
		{#each tiles as tile (tile.id)}
			<GameTile {tile} />
		{/each}
	</div>
	{@render children?.()}
</div>

<style>
	/* The overlay sits beside the board, not inside role="img", so its buttons stay reachable */
	.board-wrap {
		position: relative;
		width: min(100%, 24rem);
	}

	.board {
		--gap: 6px;
		position: relative;
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: var(--gap);
		padding: var(--gap);
		background-color: var(--color-ink);
		/* Swipes move tiles instead of scrolling the page */
		touch-action: none;
		user-select: none;
	}

	.slot {
		aspect-ratio: 1;
		background-color: var(--color-slot);
	}
</style>
