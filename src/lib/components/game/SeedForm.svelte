<script lang="ts">
	interface Props {
		seed: number;
		onstart: (seed: number) => void;
	}

	let { seed, onstart }: Props = $props();

	let value = $state('');
	let valid = $derived(/^\d{1,9}$/.test(value.trim()));

	function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		if (!valid) return;
		onstart(Number(value.trim()));
		value = '';
	}
</script>

<form class="seed-form" onsubmit={handleSubmit}>
	<label for="seed-input">seed</label>
	<input
		id="seed-input"
		type="text"
		inputmode="numeric"
		autocomplete="off"
		placeholder={String(seed)}
		aria-describedby="seed-help"
		bind:value
	/>
	<button type="submit" disabled={!valid}>play seed</button>
	<p id="seed-help" class="help">Current seed {seed}. The same seed spawns the same tiles.</p>
</form>

<style>
	.seed-form {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--space-2) var(--space-3);
	}

	label {
		font-family: var(--font-serif);
		font-size: var(--step-1);
		font-weight: 300;
	}

	input {
		width: 8rem;
		min-height: var(--tap-target);
		padding: 0 var(--space-2);
		border: 1px solid var(--color-muted);
		border-radius: 0;
		background-color: var(--color-bg);
		color: var(--color-ink);
	}

	input::placeholder {
		color: var(--color-muted);
	}

	button {
		min-height: var(--tap-target);
		padding: 0 var(--space-3);
		border: 1px solid var(--color-ink);
		background-color: var(--color-bg);
		color: var(--color-ink);
		cursor: pointer;
	}

	button:hover:not(:disabled) {
		border-color: var(--color-accent);
		color: var(--color-accent);
	}

	button:disabled {
		border-color: var(--color-line);
		color: var(--color-muted);
		cursor: default;
	}

	.help {
		flex-basis: 100%;
		color: var(--color-muted);
		font-size: var(--step--1);
	}
</style>
