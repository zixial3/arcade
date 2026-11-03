<script lang="ts">
	import '../app.css';
	import SiteFooter from '#lib/components/layout/SiteFooter.svelte';
	import SiteHeader from '#lib/components/layout/SiteHeader.svelte';
	import SkipLink from '#lib/components/layout/SkipLink.svelte';
	import { navLinks } from '#lib/nav.js';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<SkipLink />
<SiteHeader name={{ first: 'zixiao', last: 'liu' }} links={navLinks} />

<main id="main">
	{@render children()}
</main>

<SiteFooter owner="Zixiao Liu" />
