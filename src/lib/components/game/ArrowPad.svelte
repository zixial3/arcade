<script lang="ts">
	import { canMove, type Board, type Direction } from '@zixial3/arcade-core';

	interface Props {
		board: Board;
		disabled: boolean;
		onmove: (direction: Direction) => void;
	}

	let { board, disabled, onmove }: Props = $props();

	const arrows: { direction: Direction; symbol: string }[] = [
		{ direction: 'up', symbol: '↑' },
		{ direction: 'left', symbol: '←' },
		{ direction: 'down', symbol: '↓' },
		{ direction: 'right', symbol: '→' }
	];
</script>

<!-- On-screen arrows, shown only on touch devices (see the media query below). -->
<div class="pad" role="group" aria-label="Move tiles">
	{#each arrows as { direction, symbol } (direction)}
		<button
			type="button"
			class="arrow arrow--{direction}"
			aria-label="Move {direction}"
			disabled={disabled || !canMove(board, direction)}
			onclick={() => onmove(direction)}
		>
			{symbol}
		</button>
	{/each}
</div>

<style>
	.pad {
		display: none;
		grid-template-areas:
			'. up .'
			'left down right';
		grid-template-columns: repeat(3, 3.5rem);
		gap: var(--space-2);
		justify-content: center;
		width: min(100%, 24rem);
	}

	@media (hover: none) and (pointer: coarse) {
		.pad {
			display: grid;
		}
	}

	.arrow {
		min-height: 3.5rem;
		border: 1px solid var(--color-ink);
		background-color: var(--color-bg);
		color: var(--color-ink);
		font-size: var(--step-1);
		cursor: pointer;
	}

	.arrow:active {
		background-color: var(--color-accent-wash);
	}

	.arrow:disabled {
		border-color: var(--color-line);
		color: var(--color-muted);
	}

	.arrow--up {
		grid-area: up;
	}

	.arrow--left {
		grid-area: left;
	}

	.arrow--down {
		grid-area: down;
	}

	.arrow--right {
		grid-area: right;
	}
</style>
