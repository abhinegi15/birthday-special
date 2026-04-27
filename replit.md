# Happy Birthday — A Love Letter

A simple React + Vite + Tailwind CSS website. A romantic birthday letter with animations, photos, panda stickers, and interactive sections.

## Stack
- React 19
- Vite 7
- Tailwind CSS v4
- Framer Motion (animations)
- Lucide React (icons)
- canvas-confetti (cake celebration)

## Project layout
```
index.html
vite.config.ts
tsconfig.json
src/
  main.tsx          // entry
  App.tsx           // renders <Home />
  index.css         // tailwind + theme tokens
  pages/home.tsx    // the actual letter
  components/       // BirthdayCake, Countdown, IntroStory, etc.
  assets/           // photos & panda stickers
```

## Scripts
- `npm install` — install dependencies
- `npm run dev` — start the dev server
- `npm run build` — production build into `dist/`
- `npm run preview` — preview the production build

## Deploying to Vercel
This project uses standard Vite defaults. Push to a Git repo and import it in Vercel — it will auto-detect the framework and use the settings in `vercel.json`. No env vars required.
