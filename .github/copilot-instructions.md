# Copilot Instructions

## Build, test, and lint commands

- Install dependencies: `pnpm install`
- Use `pnpm` for package tasks (the repo is pinned to pnpm via `packageManager` and `pnpm-lock.yaml`).
- Run local dev server: `pnpm dev`
- Build production site: `pnpm build`
- Preview production build: `pnpm preview`
- Run Astro CLI tasks: `pnpm astro -- <args>`
- Type-check the project: `pnpm astro -- check`
- No dedicated `test` or `lint` scripts exist yet.

## High-level architecture

- Astro 5 static site with file-based routing, content collections, and Tailwind via `@tailwindcss/vite`.
- `astro.config.mjs` enables `@astrojs/mdx` + `@astrojs/sitemap`, hover prefetching, and experimental Google font provisioning (`fontProviders`).
- Blog content lives in `src/content/blog/*.{md,mdx}` and is validated by `src/content.config.ts` using `glob()` loader.
- Blog rendering pipeline:
  - `src/pages/blog/index.astro` lists posts sorted by `pubDate` descending.
  - `src/pages/blog/[...slug].astro` uses `getStaticPaths()` + `render()` to build individual post routes.
  - `src/layouts/BlogPost.astro` provides the shared article layout (also reused by `about.astro` with inline props).
  - `src/pages/rss.xml.js` generates RSS from the same blog collection.
- Shared page shell:
  - `src/components/BaseHead.astro` injects `global.css`, SEO/OG metadata, and `ClientRouter` (Astro view transitions).
  - `Header` (with `transition:persist`) and `Footer` are reused across all pages/layouts.
- Homepage (`src/pages/index.astro`) is a scroll-snap landing page with a hero section, image carousel, featured blog cards, and an about section. Scroll snap and the carousel are disabled on mobile (<760px).

## CSS and styling

- Tailwind is imported via `@import "tailwindcss"` in `global.css`, but the site uses **hand-written CSS classes with CSS custom properties** (not Tailwind utility classes in markup). Follow this pattern when adding styles.
- Design tokens are CSS custom properties on `:root` (`--bg`, `--text`, `--accent`, `--line`, etc.). Use these instead of hardcoded colors.
- Typography: `Archivo` (sans-serif) for body text, `Instrument Serif` for the brand name in the header. Both are loaded via Google Fonts in `BaseHead.astro`.

## Animation patterns

Two animation systems are used, both respecting `prefers-reduced-motion`:

1. **CSS entrance animations** (`anim-fade-up`, `anim-fade-down`, `anim-slide-right`): controlled via `--delay` custom property on elements. Skipped on SPA back-navigation via a `has-visited` class set by an inline script in `BaseHead.astro`.
2. **Scroll reveal** (`.reveal` → `.is-visible`): driven by an `IntersectionObserver` in `index.astro`'s inline script.

When editing animations, preserve the `has-visited` skip logic and the `prefers-reduced-motion` overrides at the end of `global.css`.

## Key conventions

- Site-level copy and profile links live in `src/consts.ts`; always import from there rather than hardcoding.
- `.astro` components use typed `Props` interfaces and `Astro.props` destructuring.
- Blog frontmatter schema (in `src/content.config.ts`):
  - Required: `title`, `description`, `pubDate`
  - Optional: `updatedDate`, `heroImage`
  - `heroImage` uses Astro's `image()` schema helper (imported asset references, not URL strings).
  - Dates are parsed with `z.coerce.date()`.
- Images use `astro:assets` (`Image`/`Picture`). Blog list and detail views share `transition:name={`post-image-${post.id}`}` for view transition continuity — keep these in sync.
- `Header.astro` uses `transition:persist` so it survives page navigations. When editing header or scroll listener logic, preserve the `astro:before-swap` cleanup in `index.astro`.
- `HeaderLink.astro` computes `isActive` by comparing normalized pathnames; it handles both exact matches and prefix matches (for nested routes like `/blog/...`).
