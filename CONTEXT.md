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
