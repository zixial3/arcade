<script lang="ts">
	import { fade } from 'svelte/transition';
	import ToggleButton from '#lib/components/ToggleButton.svelte';
	import { acrossClues, cells, downClues, gridSize } from '#lib/crossword/puzzle.js';
	import ClueList from './ClueList.svelte';
	import CrosswordCell from './CrosswordCell.svelte';

	const openCells = cells.filter((cell) => !cell.block);

	let entries = $state<Record<string, string>>({});
	let checking = $state(false);
	let revealed = $state(false);
	let focusedId = $state<string | null>(null);
	let grid: HTMLDivElement;

	let focusedCell = $derived(cells.find((cell) => cell.id === focusedId));
	let solved = $derived(openCells.every((cell) => entries[cell.id] === cell.answer));

	function statusOf(id: string, answer: string) {
		const value = entries[id];
		if (!checking || revealed || !value) return null;
		return value === answer ? 'right' : 'wrong';
	}

	function focusOffset(id: string, offset: number) {
		const index = openCells.findIndex((cell) => cell.id === id);
		const target = openCells[index + offset];
		if (target) grid.querySelector<HTMLInputElement>(`#${target.id}`)?.focus();
	}

	function handleInput(id: string, letter: string) {
		entries[id] = letter;
		if (letter) focusOffset(id, 1);
	}

	function clear() {
		entries = {};
		checking = false;
		revealed = false;
	}
</script>

<div class="crossword">
	<div
		class="grid"
		role="group"
		aria-label="Crossword grid, {gridSize} rows by {gridSize} columns"
		style:--size={gridSize}
		bind:this={grid}
	>
		{#each cells as cell (cell.id)}
			<CrosswordCell
				{cell}
				value={entries[cell.id] ?? ''}
				status={statusOf(cell.id, cell.answer)}
				highlighted={!cell.block && cell.across === focusedCell?.across}
				{revealed}
				oninput={handleInput}
				onfocus={(id) => (focusedId = id)}
				onbackspace={(id) => focusOffset(id, -1)}
			/>
		{/each}
	</div>

	<p class="status" role="status">
		{#if solved}
			<span transition:fade>solved.</span>
		{/if}
	</p>

	<div class="controls">
		<ToggleButton pressed={checking} onclick={() => (checking = !checking)}>check</ToggleButton>
		<ToggleButton onclick={clear}>clear</ToggleButton>
		<ToggleButton pressed={revealed} onclick={() => (revealed = !revealed)}>reveal</ToggleButton>
	</div>

	<section class="clues" aria-labelledby="clues-title">
		<h2 id="clues-title" class="visually-hidden">Clues</h2>
		<ClueList title="across" clues={acrossClues} active={focusedCell?.across} />
		<ClueList title="down" clues={downClues} active={focusedCell?.down} />
	</section>
</div>

<style>
	.crossword {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
		margin-top: var(--space-6);
	}

	/* The ink background shows through 1px gaps as the rule lines */
	.grid {
		display: grid;
		grid-template-columns: repeat(var(--size), 1fr);
		gap: 1px;
		width: min(100%, 20rem);
		border: 1px solid var(--color-ink);
		background-color: var(--color-ink);
	}

	.status {
		min-height: 1.6em;
		color: var(--color-success);
		font-family: var(--font-serif);
		font-size: var(--step-1);
	}

	.controls {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-1) var(--space-5);
	}

	.clues {
		display: grid;
		gap: var(--space-5);
		margin-top: var(--space-3);
	}

	@media (min-width: 30rem) {
		.clues {
			grid-template-columns: repeat(2, minmax(0, 1fr));
			gap: var(--space-6);
		}
	}
</style>
