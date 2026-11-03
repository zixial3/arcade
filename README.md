# The Arcade

A SvelteKit app with small browser games: a mini crossword and 2048.
The 2048 rules come from my own package, [`@zixial3/arcade-core`](https://www.npmjs.com/package/@zixial3/arcade-core).

## Routes

| Route        | Page               |
| ------------ | ------------------ |
| `/`          | Landing page       |
| `/crossword` | 5×5 mini crossword |
| `/2048`      | 2048               |
| `/about`     | About              |
| `/contact`   | Contact            |

## Structure

```
src/
  app.css                     design tokens and base styles
  routes/                     one folder per page (+layout.svelte holds the nav)
  lib/
    components/layout/        SiteHeader, SiteFooter, SkipLink
    components/crossword/     Crossword, CrosswordCell, ClueList
    components/game/          GameBoard, GameTile, ScoreBoard, ArrowPad, GameMessage, SeedForm
    game/game.svelte.ts       shared 2048 state ($state / $derived), saved to localStorage
    crossword/puzzle.ts       puzzle data and clue numbering
```

## 2048 features

- Arrow keys on desktop; swipe or on-screen arrows on touch screens
- Tiles slide between cells and pop in when they merge or spawn
- Score, best score and the whole game are saved in `localStorage`
- Seeds: the same seed spawns the same tiles for the same moves
- Score and game-over changes are announced through an `aria-live` region

## Develop

```bash
npm install
npm run dev
npm run check   # svelte-check
npm run build   # static site in build/
```

Every push to `main` builds and deploys to GitHub Pages through `.github/workflows/deploy.yml`.
