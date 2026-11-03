<script lang="ts">
	interface Props {
		score: number;
		best: number;
	}

	let { score, best }: Props = $props();
</script>

<dl class="scores">
	<div>
		<dt>score</dt>
		<dd>{score}</dd>
	</div>
	<div>
		<dt>best</dt>
		<dd>{best}</dd>
	</div>
</dl>

<style>
	.scores {
		display: flex;
		gap: var(--space-6);
		margin: 0;
	}

	dt {
		color: var(--color-muted);
		font-size: var(--step--1);
	}

	dd {
		font-family: var(--font-serif);
		font-size: var(--step-2);
		font-weight: 300;
		line-height: 1.1;
		font-variant-numeric: tabular-nums;
	}
</style>
