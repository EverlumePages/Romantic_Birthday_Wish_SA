# 💗 A Birthday in Pink

A cinematic, fully-animated birthday wish — from him, to her. Built with
**React + Vite + TypeScript**. Every single colour on screen is a tint or shade
of hot pink (`#ff1493`). No other hues anywhere.

## The experience

Four hand-made scenes that flow into one another:

1. **The Envelope** — a glowing title and a wax-sealed envelope she taps to open.
2. **The Cake** — a pink layer cake with flickering candles she blows out one by
   one (each puff bursts a little confetti); blow them all out to make a wish.
3. **The Letter** — a glass card whose love-letter types itself out, word by word,
   tilting gently as she moves the mouse.
4. **The Finale** — shimmering "Happy Birthday", her name, a heart-rain of
   confetti, and an endless marquee of reasons.

Everything is custom-built — no template, no UI kit:

- A canvas **particle engine** of rising hearts + twinkling sparkles.
- A physics-based **confetti** system (hearts, ribbons, gradient fall).
- A procedural **sound engine** (Web Audio) — soft music-box ambience plus
  chimes, a candle "whoosh", and a finale fanfare. **No audio files.**
- Glassmorphism, an animated aurora background, shimmer text, and full
  `prefers-reduced-motion` support.

## Run it

```bash
npm install
npm run dev      # open the printed http://localhost:5173
```

Build for sharing:

```bash
npm run build    # outputs to dist/
npm run preview
```

## Make it yours (the only file you need)

Open **`src/config.ts`** and edit:

| Field        | What it does                                         |
| ------------ | ---------------------------------------------------- |
| `herName`    | Her name — shown big and used in the letter          |
| `fromName`   | How you sign the letter                              |
| `turningAge` | Her age (or `null` to hide it)                       |
| `intro`      | The line under the opening title                     |
| `wishHints`  | Words that float over the cake                       |
| `letter`     | The love letter — one string per paragraph           |
| `reasons`    | The things you love, scrolling in the finale         |
| `finale`     | The big closing line                                 |

Tip: 🔊 use the music button (top-right) — it starts on the first tap.
