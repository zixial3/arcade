<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		onclick: () => void;
		/** Omit for a plain action button; pass a boolean for an on/off toggle. */
		pressed?: boolean;
		children: Snippet;
	}

	let { onclick, pressed, children }: Props = $props();
</script>

<button type="button" class="text-button" class:on={pressed} aria-pressed={pressed} {onclick}>
	{@render children()}
</button>

<style>
	.text-button {
		display: inline-flex;
		align-items: center;
		min-height: var(--tap-target);
		padding: 0;
		border: 0;
		background: none;
		color: var(--color-ink);
		font-family: var(--font-serif);
		font-size: var(--step-1);
		font-weight: 300;
		cursor: pointer;
		transition: color var(--transition);
	}

	.text-button:hover {
		color: var(--color-accent);
	}

	.on {
		color: var(--color-accent);
		text-decoration: underline;
		text-decoration-thickness: 1px;
		text-underline-offset: 0.2em;
	}
</style>
