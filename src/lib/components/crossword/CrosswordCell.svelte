<script lang="ts">
	import type { Cell } from '#lib/crossword/puzzle.js';

	interface Props {
		cell: Cell;
		value: string;
		status: 'right' | 'wrong' | null;
		highlighted: boolean;
		revealed: boolean;
		oninput: (id: string, letter: string) => void;
		onfocus: (id: string) => void;
		onbackspace: (id: string) => void;
	}

	let { cell, value, status, highlighted, revealed, oninput, onfocus, onbackspace }: Props =
		$props();

	function handleInput(event: Event & { currentTarget: HTMLInputElement }) {
		const letters = event.currentTarget.value.replace(/[^a-z]/gi, '');
		const letter = letters.slice(-1).toUpperCase();
		event.currentTarget.value = letter;
		oninput(cell.id, letter);
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Backspace' && value === '') onbackspace(cell.id);
	}
</script>

{#if cell.block}
	<div class="cell cell--block"></div>
{:else}
	<div
		class="cell"
		class:cell--highlighted={highlighted}
		class:cell--right={status === 'right'}
		class:cell--wrong={status === 'wrong'}
		class:cell--revealed={revealed}
	>
		{#if cell.number}
			<span class="number" aria-hidden="true">{cell.number}</span>
		{/if}
		<input
			id={cell.id}
			type="text"
			maxlength="1"
			autocomplete="off"
			autocapitalize="characters"
			spellcheck="false"
			readonly={revealed}
			value={revealed ? cell.answer : value}
			aria-label="Row {cell.row + 1}, column {cell.col + 1}: {cell.across} Across, {cell.down} Down"
			aria-describedby="clue-a{cell.across} clue-d{cell.down}"
			aria-invalid={status === 'wrong' ? 'true' : undefined}
			oninput={handleInput}
			onkeydown={handleKeydown}
			onfocus={() => onfocus(cell.id)}
		/>
		{#if status}
			<span class="mark" aria-hidden="true">{status === 'right' ? '✓' : '✗'}</span>
		{/if}
	</div>
{/if}

<style>
	.cell {
		position: relative;
		min-width: var(--tap-target);
		aspect-ratio: 1;
		background-color: var(--color-bg);
		transition: background-color var(--transition);
	}

	.cell--block {
		background-color: var(--color-ink);
	}

	.cell--highlighted {
		background-color: var(--color-wash);
	}

	.number {
		position: absolute;
		top: 0.15rem;
		left: 0.25rem;
		color: var(--color-muted);
		font-size: 0.7rem;
		line-height: 1;
		pointer-events: none;
	}

	input {
		display: block;
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0.3em 0 0;
		border: 0;
		border-radius: 0;
		background-color: transparent;
		color: var(--color-ink);
		caret-color: var(--color-accent);
		font-family: var(--font-serif);
		font-size: 1.6rem;
		line-height: 1;
		text-align: center;
		text-transform: uppercase;
	}

	input:focus-visible {
		outline: 2px solid var(--color-accent);
		outline-offset: -2px;
		background-color: var(--color-accent-wash);
	}

	.cell--revealed input {
		color: var(--color-accent);
	}

	.cell--right input {
		color: var(--color-success);
	}

	.cell--wrong input {
		color: var(--color-error);
		text-decoration: line-through;
		text-decoration-thickness: 1px;
	}

	.mark {
		position: absolute;
		right: 0.2rem;
		bottom: 0.1rem;
		font-size: 0.7rem;
		line-height: 1;
		pointer-events: none;
	}

	.cell--right .mark {
		color: var(--color-success);
	}

	.cell--wrong .mark {
		color: var(--color-error);
	}
</style>
