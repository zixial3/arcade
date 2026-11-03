<script lang="ts">
	import type { Clue } from '#lib/crossword/puzzle.js';

	interface Props {
		title: 'across' | 'down';
		clues: Clue[];
		active: number | undefined;
	}

	let { title, clues, active }: Props = $props();
	let prefix = $derived(title === 'across' ? 'a' : 'd');
</script>

<div class="clue-group">
	<h3>{title}</h3>
	<ul>
		{#each clues as clue (clue.number)}
			<li id="clue-{prefix}{clue.number}" class:active={clue.number === active}>
				<label for={clue.start}>
					<span class="number">{clue.number}</span>
					{clue.text}
					<span class="length">({clue.length})</span>
				</label>
			</li>
		{/each}
	</ul>
</div>

<style>
	h3 {
		margin-bottom: var(--space-2);
	}

	ul {
		list-style: none;
	}

	li {
		transition: background-color var(--transition);
	}

	li.active {
		background-color: var(--color-accent-wash);
	}

	label {
		display: flex;
		align-items: baseline;
		gap: var(--space-2);
		min-height: var(--tap-target);
		padding: var(--space-2);
		cursor: pointer;
	}

	label:hover {
		color: var(--color-accent);
	}

	.number {
		min-width: 1rem;
		color: var(--color-muted);
	}

	.length {
		color: var(--color-muted);
	}
</style>
