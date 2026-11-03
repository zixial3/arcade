<script lang="ts">
	import { fade } from 'svelte/transition';
	import ToggleButton from '#lib/components/ToggleButton.svelte';

	interface Props {
		kind: 'won' | 'over';
		onnewgame: () => void;
		oncontinue?: () => void;
	}

	let { kind, onnewgame, oncontinue }: Props = $props();

	/** Moves keyboard focus into the message so its buttons are one key press away. */
	function focusFirstButton(node: HTMLElement) {
		node.querySelector('button')?.focus();
	}
</script>

<div class="message" transition:fade={{ duration: 200 }} {@attach focusFirstButton}>
	<p class="title">{kind === 'won' ? 'you made 2048.' : 'game over.'}</p>
	<div class="actions">
		{#if kind === 'won'}
			<ToggleButton onclick={() => oncontinue?.()}>keep playing</ToggleButton>
		{/if}
		<ToggleButton onclick={onnewgame}>new game</ToggleButton>
	</div>
</div>

<style>
	.message {
		position: absolute;
		inset: 0;
		z-index: 3;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: var(--space-3);
		background-color: rgb(255 255 255 / 0.9);
	}

	.title {
		font-family: var(--font-serif);
		font-size: var(--step-2);
		font-weight: 300;
	}

	.actions {
		display: flex;
		gap: var(--space-5);
	}
</style>
