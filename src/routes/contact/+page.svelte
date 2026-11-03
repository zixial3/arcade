<script lang="ts">
	const channels = ['email', 'github', 'linkedin'];
</script>

<svelte:head>
	<title>Contact | The Arcade | Zixiao Liu</title>
	<meta name="description" content="How to reach Zixiao Liu." />
</svelte:head>

<h1 class="page-title">contact</h1>

<dl class="contact-list">
	{#each channels as channel (channel)}
		<div class="contact-item">
			<dt>{channel}</dt>
			<dd></dd>
		</div>
	{/each}
</dl>

<style>
	.contact-list {
		display: flex;
		flex-direction: column;
		margin-top: var(--space-6);
	}

	.contact-item {
		display: grid;
		grid-template-columns: 7rem 1fr;
		gap: var(--space-4);
		padding-block: var(--space-3);
		border-top: 1px solid var(--color-line);
	}

	dt {
		font-family: var(--font-serif);
		font-size: var(--step-1);
		font-weight: 300;
	}
</style>
