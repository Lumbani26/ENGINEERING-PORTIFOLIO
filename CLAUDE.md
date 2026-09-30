# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Single-page personal portfolio for a civil/structural engineer, deployed to Vercel at https://lumbani-ceng.vercel.app/. Plain static site: `index.html`, `style.css`, `app.js` — no framework, no build step, no package manager, no tests or linter.

## Running locally

Open `index.html` directly, or serve the folder so asset paths resolve like production:

```bash
python -m http.server 8000
```

Deployment happens by pushing to `main` (Vercel serves the repo root as-is).

## Architecture

- **Progressive enhancement:** `app.js` adds a `js` class to `<html>`; the `.reveal` fade-in styles in `style.css` are scoped under `.js .reveal`, so content stays visible without JavaScript. `IntersectionObserver` adds `.visible` on scroll.
- **"My Story" timeline photos are self-pruning:** each `.chapter` in `index.html` lists `<figure><img>` entries under `.chapter-photos`, often pointing at images that don't exist yet (e.g. `chiradzulu1.jpeg`, `rm1.jpeg`). `app.js` removes figures whose images fail to load, then:
  - 0 left → adds `.no-photos` to the chapter (text rendered as a centred card),
  - 1 left → shown statically,
  - 2+ left → wrapped in a `.carousel-track` and auto-advanced every `SLIDE_INTERVAL_MS`.
  To add a photo to a chapter, drop the file in `assets/images/` using the filename already referenced in the HTML — no code change needed.
- **SEO metadata lives in `index.html`'s `<head>`:** description, canonical URL, Open Graph tags, and a JSON-LD `Person` block. Keep these in sync with page content (job title, employer, degrees). `sitemap.xml` and `robots.txt` reference the Vercel URL; `google3768731e1431b5cf.html` is a Google Search Console verification file and must not be removed or renamed.
- The resume PDF at `assets/LKANOCK_RESUME_UPDATED.pdf` is linked from both the hero and the contact section.

## Gotchas

- **Filename case matters in production.** Development happens on Windows (case-insensitive) but Vercel is case-sensitive; an image path whose case differs from the file on disk works locally and 404s live. When renaming only the case of a file, use `git mv` via an intermediate name so git records the change.
- `Claude outputs/` holds scratch previews/screenshots from earlier sessions, not site content.
