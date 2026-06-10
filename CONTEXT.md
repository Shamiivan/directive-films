# Directive Films Context

## Component Organization

Use `src/components` as the source of truth for UI. Keep new components close to their intended reuse level.

### Route Pages

Route-level page shells live in `src/components/pages/<page>/`.

Examples:

- `src/components/pages/home/home-page.tsx`
- `src/components/pages/services/services-page.tsx`
- `src/components/pages/sandbox/home/sandbox-home-page.tsx`

These files should compose sections. Avoid putting large reusable section markup directly inside a page shell once it becomes useful outside that one page.

### Reusable Page Sections

New reusable marketing/page sections should live in `src/components/sections/<section-name>/`.

Use this when a section may move between sandbox, homepage, services, or another public page.

Example:

- `src/components/sections/home-services/home-services.tsx`
- `src/components/sections/home-services/home-services.module.css`

Name files after the folder:

- `home-services/home-services.tsx`
- `home-services/home-services.module.css`

Default export the section component unless the folder intentionally exposes multiple components.

### Shared Components

Small reusable UI pieces that are not full page sections live in `src/components/shared/<component-name>/`.

Use `shared` for things like logo rows, buttons, cards, media widgets, or repeatable primitives used by multiple pages/sections.

Example:

- `src/components/shared/logo-row/logo-row.tsx`
- `src/components/shared/logo-row/logo-row.module.css`

### Existing Legacy Page Sections

The repo still has older page-specific section folders:

- `src/components/page-home/`
- `src/components/page-services/`
- `src/components/page-about/`
- `src/components/page-shared/`

Treat these as existing/legacy locations. It is fine to maintain them when editing existing pages, but prefer `src/components/sections/` for new reusable public sections.

If a legacy section becomes reusable, extract or copy it into `src/components/sections/<section-name>/` and leave the original alone until the page is ready to migrate.

### Sandbox Workflow

Use `/sandbox/home` for homepage experiments.

When building a candidate homepage section:

1. Create or update the reusable section under `src/components/sections/<section-name>/`.
2. Import it into `src/components/pages/sandbox/home/sandbox-home-page.tsx`.
3. Iterate in sandbox until approved.
4. Move the approved section into the real homepage page shell.

Do not replace production homepage sections directly while the design is still being explored.

### Styling

Use CSS modules next to the component:

- `component-name.tsx`
- `component-name.module.css`

Prefer existing design tokens and variables from the app before adding new hard-coded colors, spacing, or typography. If copying a section from an old commit, keep the visual structure intact first, then adapt tokens only when needed.

### Imports

Use the `@/` alias for cross-tree imports when it improves clarity.

Use relative imports for sibling files in the same component folder, especially CSS modules:

```tsx
import styles from './home-services.module.css';
```

Keep route/page composition imports readable. For shared reusable sections, prefer importing from their stable folder path:

```tsx
import HomeServicesSection from '@/components/sections/home-services/home-services';
```

## Current State — Sandbox Home Reassembly

The sandbox home (`/sandbox/home`) is the **client-shareable design preview**. The
production homepage stays on **coming-soon**; the sandbox is the link sent to the client
to review the design. Approved sections later migrate into the real homepage shell.

Decisions driving the current work:

- **Content is static for now** — sections hardcode their data (no Convex/i18n wiring yet),
  except `home-services` which is already CMS/i18n-wired and left as-is.
- **Gold is the only accent. Zero indigo.** The earlier `#4f46e5` indigo drift was removed
  everywhere in favor of `var(--color-gold)` / `var(--gold-deep)`.
- **Everything is tokenized.** Raw hex/px were replaced with design tokens. New light-section
  tokens live in `globals.css`: `--color-bg-light`, `--color-bg-light-card`,
  `--color-text-on-light-secondary`, `--color-text-on-light-muted`, `--color-border-on-light`,
  `--color-border-on-light-strong`.

### Shared primitives (`src/components/shared/`)

- `cta-button/` — gold pill button, the single source for all CTAs (`variant`: gold | outline).
- `video-card/` — 9:16 Vimeo card used by the video reels.
- `section-header/` — the one header treatment (eyebrow + title + optional intro + scroll-reveal
  motion). Props: `eyebrow`, `eyebrowDescription?`, `title`, `intro?`, `align` (left|center),
  `tone` (dark|light). **All sections use this** — do not hand-roll section headers.
- `logo-row/` — client logo marquee (pre-existing).

### Sandbox home composition (`pages/sandbox/home/sandbox-home-page.tsx`)

Clean section list, in order (background rhythm in brackets):

1. `home-hero` [dark] — bg video + glass panel + gold CTA
2. `logo-row` [strip]
3. `offer` [**light**] — metrics, gold-deep numbers
4. `home-how-it-works` [dark]
5. `home-services` [dark] — CMS/i18n-wired (untouched)
6. `home-video-reel` [**light**] — `tone="light"`, the produced-ads rail
7. `home-video-reel` [dark] — `align="center"`, the client-story rail (same component, reused)
8. `home-testimonials` [dark] — text quote cards
9. `team-sections` [dark]
10. `home-cta` [dark] — bg video + gold CTA

`sandbox-home-page.module.css` is intentionally a ~6-line `.page` shell only; all section
styling lives in the section folders.

### Left alone deliberately

- `page-about/section-team/` — the about page's localized team section. Different component for a
  different page, not a duplicate of the sandbox `team-sections`.
- `page-home/`, `page-services/`, `page-about/` legacy sections — the hidden/legacy homepage set.
  Untouched while the design is explored in sandbox.
