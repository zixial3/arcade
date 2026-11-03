export interface NavLink {
	label: string;
	href: '/' | '/crossword' | '/2048' | '/about' | '/contact';
}

export const navLinks: NavLink[] = [
	{ label: 'home', href: '/' },
	{ label: 'crossword', href: '/crossword' },
	{ label: '2048', href: '/2048' },
	{ label: 'about', href: '/about' },
	{ label: 'contact', href: '/contact' }
];
