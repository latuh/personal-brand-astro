# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm install          # Install dependencies (pnpm is pinned; don't use npm/yarn)
pnpm dev              # Start dev server at localhost:4321
pnpm build            # Build production site to ./dist/
pnpm preview          # Preview production build
pnpm astro -- check   # Type-check the project
```

No test or lint scripts are configured.

## Architecture

Astro 5 static site — Aaron Mompié's personal brand. File-based routing with a content collection for blog posts.

**Key config:** `astro.config.mjs` enables MDX, sitemap, hover prefetching, and Tailwind via `@tailwindcss/vite` (not a plugin — `@import "tailwindcss"` in `global.css`).

**Page shell:**
- `src/components/BaseHead.astro` — injects `global.css`, SEO/OG metadata, `ClientRouter` (view transitions), and the `has-visited` SPA back-navigation script
- `Header.astro` uses `transition:persist` to survive page navigations; contains `astro:before-swap` cleanup logic in `index.astro` — preserve both
- `src/consts.ts` — all site-level copy, social links, and projects data; always import from here

**Blog pipeline:**
- Content: `src/content/blog/*.{md,mdx}`, validated by `src/content.config.ts` (`glob()` loader)
- Schema requires `title`, `description`, `pubDate`; optional `updatedDate`, `heroImage` (Astro `image()` helper, not a URL), `draft` (bool), `tags` (string[])
- `src/pages/blog/index.astro` — sorted list; `src/pages/blog/[...slug].astro` — static paths; `src/pages/blog/tag/[tag].astro` — tag filter
- `src/layouts/BlogPost.astro` — shared article layout with TOC, reading time, tags
- `src/pages/rss.xml.js` — RSS feed from the same collection

**Homepage** (`src/pages/index.astro`) — scroll-snap layout with hero, image carousel, featured posts, about section. Scroll snap and carousel are disabled below 760px.

## Styling Conventions

- Use **hand-written CSS classes with CSS custom properties** — not Tailwind utility classes in markup
- Design tokens live on `:root` in `global.css` (`--bg`, `--text`, `--accent`, `--line`, etc.) — use these instead of hardcoded values
- Typography: `Archivo` (body), `Instrument Serif` (brand/header) — both loaded via Google Fonts in `BaseHead.astro`

## Animation Patterns

Two systems, both respecting `prefers-reduced-motion` (overrides at end of `global.css`):

1. **CSS entrance animations** — `anim-fade-up`, `anim-fade-down`, `anim-slide-right` classes; stagger via `--delay` custom property. Skipped on SPA back-navigation via `has-visited` class set in `BaseHead.astro`.
2. **Scroll reveal** — `.reveal` → `.is-visible` via `IntersectionObserver` (used in `index.astro` and `projects.astro`)

## Key Conventions

- `.astro` components use typed `Props` interfaces with `Astro.props` destructuring
- Blog image transitions use `transition:name={`post-image-${post.id}`}` on both the list and detail views — keep these in sync
- `HeaderLink.astro` computes `isActive` by normalizing pathnames; handles exact and prefix matches (e.g., `/blog/...`)
- Images use `astro:assets` (`Image`/`Picture`) with `avif`/`webp` formats
- `src/utils/reading-time.ts` calculates reading time at 200 wpm from raw markdown body text
