import {
	createBoard,
	createRng,
	hasMoves,
	maxTile,
	moveWithDetails,
	spawn,
	startBoard,
	type Board,
	type Direction,
	type Position,
	type SeededRng
} from '@zixial3/arcade-core';

export interface Tile {
	id: number;
	value: number;
	row: number;
	col: number;
	/** Created by a merge on the last move. */
	merged: boolean;
	/** Dropped onto the board after the last move. */
	spawned: boolean;
	/** Slid into a merge on the last move; drawn underneath, removed on the next move. */
	consumed: boolean;
}

interface SavedGame {
	tiles: Tile[];
	score: number;
	best: number;
	seed: number;
	rngState: number;
	keepPlaying: boolean;
}

const SIZE = 4;
const WINNING_TILE = 2048;
const STORAGE_KEY = 'arcade:2048';

const key = ({ row, col }: Position) => `${row},${col}`;

function boardFromTiles(tiles: Tile[]): Board {
	const board = createBoard(SIZE);
	for (const tile of tiles) {
		if (!tile.consumed) board[tile.row][tile.col] = tile.value;
	}
	return board;
}

const randomSeed = () => Math.floor(Math.random() * 1_000_000);

/**
 * All 2048 state for the app. Components read from it and call its methods;
 * every value that can be computed from other values is $derived.
 */
class Game2048 {
	tiles = $state<Tile[]>([]);
	score = $state(0);
	best = $state(0);
	seed = $state(0);
	keepPlaying = $state(false);
	ready = $state(false);

	board = $derived(boardFromTiles(this.tiles));
	won = $derived(maxTile(this.board) >= WINNING_TILE);
	over = $derived(this.ready && !hasMoves(this.board));
	paused = $derived(this.over || (this.won && !this.keepPlaying));
	announcement = $derived.by(() => {
		if (!this.ready) return '';
		if (this.over) return `Game over. Final score ${this.score}.`;
		if (this.won && !this.keepPlaying) return `You made ${WINNING_TILE}! Score ${this.score}.`;
		return `Score ${this.score}.`;
	});

	#rng: SeededRng = createRng(0);
	#nextId = 1;

	/** Restores a saved game from localStorage, or starts a new one. */
	load() {
		const saved = readSave();
		if (saved) {
			this.tiles = saved.tiles.filter((tile) => !tile.consumed);
			this.score = saved.score;
			this.best = saved.best;
			this.seed = saved.seed;
			this.keepPlaying = saved.keepPlaying;
			this.#rng = createRng(saved.rngState);
			this.#nextId = Math.max(0, ...this.tiles.map((tile) => tile.id)) + 1;
		} else {
			this.newGame();
		}
		this.ready = true;
	}

	newGame(seed = randomSeed()) {
		this.seed = seed;
		this.#rng = createRng(seed);
		this.tiles = this.#tilesFrom(startBoard(this.#rng, SIZE), { spawned: true });
		this.score = 0;
		this.keepPlaying = false;
		this.ready = true;
		this.#save();
	}

	continueAfterWin() {
		this.keepPlaying = true;
		this.#save();
	}

	move(direction: Direction) {
		if (!this.ready || this.paused) return;

		const live = this.tiles.filter((tile) => !tile.consumed);
		const result = moveWithDetails(boardFromTiles(live), direction);
		if (!result.changed) return;

		const byPosition = new Map(live.map((tile) => [key(tile), tile]));
		const mergedAt = new Set(result.merges.map(({ at }) => key(at)));

		const moved = result.moves.map(({ from, to }): Tile => {
			const tile = byPosition.get(key(from))!;
			return { ...tile, ...to, merged: false, spawned: false, consumed: mergedAt.has(key(to)) };
		});

		const merged = result.merges.map(({ at, value }): Tile => ({
			id: this.#nextId++,
			value,
			...at,
			merged: true,
			spawned: false,
			consumed: false
		}));

		const withSpawn = spawn(result.board, this.#rng);
		const spawned = this.#tilesFrom(withSpawn, { spawned: true }).filter(
			(tile) => result.board[tile.row][tile.col] === 0
		);

		this.tiles = [...moved, ...merged, ...spawned];
		this.score += result.points;
		this.best = Math.max(this.best, this.score);
		this.#save();
	}

	#tilesFrom(board: Board, flags: Partial<Tile>): Tile[] {
		const tiles: Tile[] = [];
		board.forEach((row, r) =>
			row.forEach((value, c) => {
				if (value === 0) return;
				tiles.push({
					id: this.#nextId++,
					value,
					row: r,
					col: c,
					merged: false,
					spawned: false,
					consumed: false,
					...flags
				});
			})
		);
		return tiles;
	}

	#save() {
		const save: SavedGame = {
			tiles: this.tiles.filter((tile) => !tile.consumed),
			score: this.score,
			best: this.best,
			seed: this.seed,
			rngState: this.#rng.state,
			keepPlaying: this.keepPlaying
		};
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(save));
		} catch {
			// Storage can be unavailable (private mode, quota); the game still works.
		}
	}
}

function readSave(): SavedGame | null {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return null;
		const save = JSON.parse(raw) as SavedGame;
		return Array.isArray(save.tiles) && Number.isFinite(save.score) ? save : null;
	} catch {
		return null;
	}
}

export const game = new Game2048();
