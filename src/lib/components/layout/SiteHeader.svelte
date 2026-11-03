<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import type { NavLink } from '#lib/nav.js';

	interface Props {
		name: { first: string; last: string };
		links: NavLink[];
	}

	let { name, links }: Props = $props();

	const trim = (path: string) => path.replace(/\/$/, '') || '/';
	let currentPath = $derived(trim(page.url.pathname));
</script>

<header class="site-header">
	<a class="wordmark" href={resolve('/')}>
		<span class="wordmark__first">{name.first}</span>
		<span>{name.last}</span>
	</a>
	<nav aria-label="Primary">
		<ul class="nav-list">
			{#each links as link (link.href)}
				{@const href = resolve(link.href)}
				<li>
					<a class="nav-link" {href} aria-current={trim(href) === currentPath ? 'page' : undefined}>
						{link.label}
					</a>
				</li>
			{/each}
		</ul>
	</nav>
</header>

<style>
	/* Mobile first: name on top, nav fixed to the bottom of the screen */
	.site-header {
		position: sticky;
		top: 0;
		z-index: 10;
		margin-inline: calc(-1 * var(--space-4));
		padding: var(--space-3) var(--space-4);
		background-color: var(--color-bg);
		border-bottom: 1px solid var(--color-line);
	}

	.wordmark {
		display: inline-flex;
		flex-wrap: wrap;
		column-gap: 0.3em;
		font-family: var(--font-serif);
		font-size: var(--step-1);
		font-weight: 300;
		line-height: 0.95;
		text-decoration: none;
	}

	.wordmark:hover {
		color: var(--color-ink);
	}

	.wordmark__first {
		color: var(--color-accent);
	}

	.nav-list {
		position: fixed;
		right: 0;
		bottom: 0;
		left: 0;
		display: flex;
		justify-content: space-around;
		padding: 0 var(--space-1) env(safe-area-inset-bottom, 0px);
		list-style: none;
		background-color: var(--color-bg);
		border-top: 1px solid var(--color-line);
	}

	.nav-link {
		display: flex;
		align-items: center;
		justify-content: center;
		min-width: var(--tap-target);
		min-height: var(--mobile-nav-height);
		padding-inline: var(--space-1);
		font-family: var(--font-serif);
		font-size: 1rem;
		font-weight: 300;
		text-decoration: none;
	}

	.nav-link:focus-visible {
		outline-offset: -4px;
	}

	/* Current page: red and underlined, never colour alone */
	.nav-link[aria-current='page'] {
		color: var(--color-accent);
		text-decoration: underline;
		text-decoration-thickness: 1px;
	}

	@media (min-width: 48rem) {
		.site-header {
			top: var(--space-8);
			grid-column: 2;
			grid-row: 1 / span 2;
			align-self: start;
			display: flex;
			flex-direction: column;
			align-items: flex-end;
			gap: var(--space-6);
			margin: 0;
			padding: var(--space-2) var(--space-6) var(--space-2) 0;
			border-bottom: 0;
			border-right: 1px solid var(--color-muted);
			text-align: right;
		}

		.wordmark {
			flex-direction: column;
			font-size: 2.6rem;
		}

		.nav-list {
			position: static;
			flex-direction: column;
			align-items: flex-end;
			padding: 0;
			border-top: 0;
		}

		.nav-link {
			justify-content: flex-end;
			min-height: var(--tap-target);
			padding-inline: 0;
			font-size: 1.9rem;
		}

		.nav-link:focus-visible {
			outline-offset: 2px;
		}
	}
</style>
