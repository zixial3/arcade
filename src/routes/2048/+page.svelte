<script lang="ts">
	import type { Direction } from '@zixial3/arcade-core';
	import { onMount } from 'svelte';
	import ToggleButton from '#lib/components/ToggleButton.svelte';
	import ArrowPad from '#lib/components/game/ArrowPad.svelte';
	import GameBoard from '#lib/components/game/GameBoard.svelte';
	import GameMessage from '#lib/components/game/GameMessage.svelte';
	import ScoreBoard from '#lib/components/game/ScoreBoard.svelte';
	import SeedForm from '#lib/components/game/SeedForm.svelte';
	import { game } from '#lib/game/game.svelte.js';

	const keyToDirection: Record<string, Direction> = {
		ArrowUp: 'up',
		ArrowDown: 'down',
		ArrowLeft: 'left',
		ArrowRight: 'right'
	};

	onMount(() => {
		if (!game.ready) game.load();
	});

	function handleKeydown(event: KeyboardEvent) {
		const direction = keyToDirection[event.key];
		if (!direction || event.altKey || event.ctrlKey || event.metaKey) return;
		// Leave arrow keys alone while the player is typing a seed.
		if (event.target instanceof HTMLInputElement) return;
		event.preventDefault();
		game.move(direction);
	}
</script>

<svelte:head>
	<title>2048 | The Arcade | Zixiao Liu</title>
	<meta name="description" content="Play 2048: slide the tiles and merge your way to 2048." />
</svelte:head>

<svelte:window onkeydown={handleKeydown} />

<h1 class="page-title">2048</h1>
<p>Use the arrow keys or swipe; equal tiles merge.</p>

<div class="game">
	<div class="topbar">
		<ScoreBoard score={game.score} best={game.best} />
		<ToggleButton onclick={() => game.newGame()}>new game</ToggleButton>
	</div>

	<GameBoard tiles={game.tiles} board={game.board} onswipe={(direction) => game.move(direction)}>
		{#if game.over}
			<GameMessage kind="over" onnewgame={() => game.newGame()} />
		{:else if game.won && !game.keepPlaying}
			<GameMessage
				kind="won"
				onnewgame={() => game.newGame()}
				oncontinue={() => game.continueAfterWin()}
			/>
		{/if}
	</GameBoard>

	<ArrowPad
		board={game.board}
		disabled={game.paused}
		onmove={(direction) => game.move(direction)}
	/>

	<p class="visually-hidden" aria-live="polite">{game.announcement}</p>

	<SeedForm seed={game.seed} onstart={(seed) => game.newGame(seed)} />
</div>

<style>
	.game {
		display: flex;
		flex-direction: column;
		gap: var(--space-5);
		margin-top: var(--space-6);
	}

	.topbar {
		display: flex;
		flex-wrap: wrap;
		align-items: flex-end;
		justify-content: space-between;
		gap: var(--space-3);
		width: min(100%, 24rem);
	}
</style>
