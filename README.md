# Sunscreen Timer

A UV-aware, personalized sunscreen reapplication timer. Live UV index from
[currentuvindex.com](https://currentuvindex.com) (NOAA-sourced), Fitzpatrick
skin type, activity, and SPF — calibrated to the dermatologist 2-hour
standard.

## Stack

- Next.js 14 (App Router)
- React 18
- TypeScript (strict)
- Tailwind CSS 3.4
- Deploys to Vercel out of the box

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build & typecheck

```bash
npm run typecheck
npm run build
npm run start
```

## Deploy to Vercel

1. Push this repo to GitHub.
2. Import the repo in Vercel — no configuration needed.
3. Set `NEXT_PUBLIC_SITE_URL` to the production URL (e.g. `https://sunscreentimer.app`).
4. Vercel auto-detects Next.js and deploys.

After deploy:

- Add the domain in Vercel → Settings → Domains.
- Verify in [Google Search Console](https://search.google.com/search-console), submit `/sitemap.xml`.
- Once you have 30+ days of real traffic, apply for AdSense.

## Project structure

- `src/app/page.tsx` — homepage (hero + tool + content + FAQ schema)
- `src/app/[slug]/page.tsx` — dynamic SEO subpages (15 routes, statically generated)
- `src/components/SunscreenTimer.tsx` — the calculator + countdown + notifications
- `src/lib/calculate.ts` — reapply-window math (base 120 min, activity / UV / skin type multipliers)
- `src/lib/uv.ts` — currentuvindex.com client + geolocation helper
- `src/lib/subpages.ts` — content for all 15 long-tail SEO pages
- `src/app/sitemap.ts`, `src/app/robots.ts`, `src/app/manifest.ts` — SEO + PWA primitives
- `src/app/opengraph-image.tsx` — branded 1200×630 OG image (dynamic, no asset to maintain)

## Calculation rules (from the brief)

Base = 120 minutes. Then multiplied by:

- **Activity:** indoor near window 1.5 · light outdoor 1.0 · beach 0.83 · sports 0.67 · swimming 0.5
- **UV index:** 0–2 → 1.5 · 3–5 → 1.0 · 6–7 → 0.83 · 8–10 → 0.67 · 11+ → 0.5
- **Fitzpatrick skin type:** I–II → 0.83 · III–VI → 1.0

Rounded to nearest 5 minutes. Floor 30, cap 180.

## Notifications

Permission is only requested when the user taps **Start Timer** — never on
page load. The 10-minute warning and the at-zero alert fire via the
Notifications API, audible beeps via Web Audio, and a visual flash on the
card. Background-safe because the countdown uses a target end timestamp,
not a tick counter.

## License

MIT for the code. UV data via currentuvindex.com under CC BY 4.0 — attribution
in the site footer.
