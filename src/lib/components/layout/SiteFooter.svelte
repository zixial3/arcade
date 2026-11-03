<script lang="ts">
	interface Props {
		owner: string;
	}

	let { owner }: Props = $props();
</script>

<footer class="site-footer">
	<p>© 2026 {owner}</p>
</footer>

<style>
	.site-footer {
		padding-block: var(--space-6);
		color: var(--color-muted);
		font-size: var(--step--1);
	}

	@media (min-width: 48rem) {
		.site-footer {
			grid-column: 3;
		}
	}
</style>
