export interface Clue {
	number: number;
	text: string;
	length: number;
	/** Id of the first square of the answer. */
	start: string;
}

export interface Cell {
	id: string;
	row: number;
	col: number;
	block: boolean;
	answer: string;
	number?: number;
	across?: number;
	down?: number;
}

/** '#' marks a black square. */
const solution = ['##WEB', '#NODE', 'FORGE', 'ISLE#', 'RED##'];

const acrossText: Record<number, string> = {
	1: 'Spider’s creation',
	4: '___.js runtime',
	5: 'Blacksmith’s workshop',
	6: 'Small island',
	7: 'Color of an error'
};

const downText: Record<number, string> = {
	1: '“Hello, ___!”',
	2: 'Microsoft browser',
	3: 'Spelling ___',
	4: 'Follow your ___',
	5: 'Evergreen tree'
};

const size = solution.length;
const isOpen = (row: number, col: number) =>
	row >= 0 && col >= 0 && row < size && col < size && solution[row][col] !== '#';

function buildCells(): Cell[] {
	const cells: Cell[] = [];
	const numbers = new Map<string, number>();
	let next = 1;

	for (let row = 0; row < size; row++) {
		for (let col = 0; col < size; col++) {
			const id = `r${row + 1}c${col + 1}`;
			if (!isOpen(row, col)) {
				cells.push({ id, row, col, block: true, answer: '' });
				continue;
			}
			const startsAcross = !isOpen(row, col - 1) && isOpen(row, col + 1);
			const startsDown = !isOpen(row - 1, col) && isOpen(row + 1, col);
			const number = startsAcross || startsDown ? next++ : undefined;
			if (number) numbers.set(id, number);
			cells.push({ id, row, col, block: false, answer: solution[row][col], number });
		}
	}

	// Each open square belongs to the across and down word that starts nearest to it.
	for (const cell of cells) {
		if (cell.block) continue;
		let col = cell.col;
		while (isOpen(cell.row, col - 1)) col--;
		cell.across = numbers.get(`r${cell.row + 1}c${col + 1}`);
		let row = cell.row;
		while (isOpen(row - 1, cell.col)) row--;
		cell.down = numbers.get(`r${row + 1}c${cell.col + 1}`);
	}
	return cells;
}

export const cells = buildCells();

function buildClues(direction: 'across' | 'down', text: Record<number, string>): Clue[] {
	return Object.entries(text).map(([key, clueText]) => {
		const number = Number(key);
		const members = cells.filter((cell) => cell[direction] === number);
		return { number, text: clueText, length: members.length, start: members[0].id };
	});
}

export const acrossClues = buildClues('across', acrossText);
export const downClues = buildClues('down', downText);
export const gridSize = size;
