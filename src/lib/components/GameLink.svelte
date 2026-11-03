<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		href: string;
		label: string;
		children: Snippet;
	}

	let { href, label, children }: Props = $props();
</script>

<a class="game-link" {href}>
	<span class="preview">{@render children()}</span>
	<span class="label">{label}</span>
</a>

<style>
	.game-link {
		display: inline-flex;
		flex-direction: column;
		gap: var(--space-3);
		font-family: var(--font-serif);
		font-size: var(--step-1);
		font-weight: 300;
		/* Underline only the words, not the preview artwork */
		text-decoration: none;
	}

	.label {
		text-decoration: underline;
		text-decoration-thickness: 1px;
		text-underline-offset: 0.2em;
	}

	.preview {
		display: block;
		width: 10rem;
		aspect-ratio: 1;
		transition: transform var(--transition);
	}

	.game-link:hover .preview {
		transform: translateY(-3px);
	}
</style>
