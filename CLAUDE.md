# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

DirectiveFilms is a Next.js 16 web application using the App Router with TinaCMS as a headless content management system. The site is built with React 19, TypeScript, and uses the React Compiler for optimized builds.

## Development Commands

```bash
# Start development server (includes TinaCMS)
pnpm dev
# Runs on http://localhost:3000
# TinaCMS admin UI available at http://localhost:3000/admin

# Type checking
pnpm type-check

# Linting
pnpm lint          # Check for issues
pnpm lint:fix      # Auto-fix issues

# Build and validate
pnpm build         # Production build
pnpm check         # Run lint:fix + type-check + build (full validation)

# Production server
pnpm start
```

## Architecture

### Next.js App Router Structure

- **App Router**: File-system based routing using `/src/app/`
- **Server Components by default**: All components in `app/` are Server Components unless marked with `'use client'`
- **Layout system**: Root layout at `src/app/layout.tsx` wraps all pages
- **Client components**: Mark with `'use client'` directive at top of file when using hooks, event handlers, or browser APIs

### TinaCMS Integration

**Content Management Flow**:
1. Content is stored as Markdown files in `/content/` directory
2. TinaCMS schema defined in `/tina/config.ts` specifies collections and fields
3. Generated TypeScript client at `/tina/__generated__/client` provides type-safe queries
4. Server Components fetch content using TinaCMS client
5. Admin UI at `/admin` allows editing (built to `/public/admin/`)

**Content Schema**:
- Collections defined in `tina/config.ts` under `schema.collections`
- Each collection maps to a content directory (e.g., `content/pages/`)
- Fields define the editor interface and data structure
- Generated types ensure type safety across the app

**Example Page Pattern**:
```typescript
// Server Component fetches data
import client from "../../tina/__generated__/client";
import ClientPage from "./client-page";

export default async function Page() {
  const { data, query, variables } = await client.queries.page({
    relativePath: "home.md"
  });
  return <ClientPage data={data} query={query} variables={variables} />;
}
```

### Design System

- **Design tokens**: Centralized in `/src/tokens.js`
- **Token categories**: colors, typography, spacing, borderRadius, shadows, transitions, zIndex, animations
- **Usage**: Import tokens into components: `import { colors, typography, animations } from '@/tokens'`
- **Design system page**: View at `/design-system` to see all tokens in use

### Animation System

This project uses **award-winning animation techniques** based on industry best practices (80/20 rule - 80% of great animations come from 20% of techniques).

**Animation Stack:**
- **Framer Motion** - React animation library for scroll tracking, viewport detection, springs
- **Lenis** - Smooth scroll (industry standard for award-winning sites)
- **split-type** - Text splitting for granular typography animations

**Core Techniques Implemented:**

1. **Scroll Tracking** - Track scroll progress and transform it into animations
   - Uses `useScroll` + `useTransform` from Framer Motion
   - Parallax effects, scale/opacity transforms
   - Files: `client-page.tsx`, `AnimatedNav.tsx`

2. **Viewport Detection** - Trigger animations when elements enter viewport
   - Uses `whileInView` (Intersection Observer API)
   - All scroll-triggered reveals
   - Files: `ResultsSection.tsx`, animation variants

3. **Sticky Position** - CSS sticky for pinned scroll effects
   - Native, bug-free, OP technique
   - Files: `AnimatedNav.tsx`, `StickySection.tsx`

4. **Professional Easings** - Custom easing curves set mood/vibe
   - 5 curves: premium, bounce, expo, snappy, elastic
   - Files: `utils/animations.ts`

5. **Text Splitting** - Split text into lines/words/characters for animation
   - Library: `split-type`
   - Files: `client-page.tsx` (hero title), `SplitText.tsx`

**Bonus Techniques:**

6. **Map Function** - Transform value ranges mathematically
   - `useTransform`, `mapRange()` utility
   - Files: `utils/animations.ts`

7. **Lerp** - Linear interpolation for smooth animations
   - `lerp()` utility, spring physics
   - Files: `SmoothCursor.tsx`, `MagneticButton.tsx`

8. **Custom Cursor** - Smooth cursor with lerp-based following
   - Files: `SmoothCursor.tsx`

**Animation Components:**
```
src/components/
├── SmoothScroll.tsx       # Lenis smooth scroll wrapper
├── SmoothCursor.tsx       # Custom cursor with lerp
├── SplitText.tsx          # Text splitting component
├── MagneticButton.tsx     # Magnetic hover effect
├── StickySection.tsx      # Sticky scroll section
├── AnimatedNav.tsx        # Nav with scroll-based blur
└── ResultsSection.tsx     # Scroll-triggered reveals
```

**Animation Utilities:**
```typescript
// src/utils/animations.ts
import { easings, mapRange, lerp, clamp } from '@/utils/animations';

// Easing curves
easings.premium  // [0.25, 0.1, 0.25, 1] - smooth, professional
easings.bounce   // [0.68, -0.55, 0.265, 1.55] - playful
easings.expo     // [0.87, 0, 0.13, 1] - elegant
easings.snappy   // [0.4, 0.0, 0.2, 1] - quick
easings.elastic  // [0.68, -0.6, 0.32, 1.6] - attention-grabbing

// Math utilities
mapRange(value, inMin, inMax, outMin, outMax) // Transform ranges
lerp(start, end, factor)                       // Linear interpolation
clamp(value, min, max)                         // Restrict to range
```

**Using Animations:**

```typescript
// Scroll tracking
import { useScroll, useTransform } from 'framer-motion';

const { scrollYProgress } = useScroll({
  target: ref,
  offset: ["start start", "end start"]
});
const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

// Viewport detection
import { scrollReveal } from '@/utils/animations';
<motion.div {...scrollReveal}>Content</motion.div>

// Magnetic button
import MagneticButton from '@/components/MagneticButton';
<MagneticButton className={styles.button}>Click</MagneticButton>

// Text splitting
import SplitText from '@/components/SplitText';
<SplitText type="lines,words">Animated Text</SplitText>
```

**Performance Best Practices:**
- Smooth scroll eliminates janky animations
- `will-change` CSS property on animated elements
- GPU-accelerated properties (transform, opacity)
- Respects `prefers-reduced-motion` for accessibility
- Custom cursor hidden on touch devices

**Documentation:**
- `ANIMATIONS.md` - Initial animation features
- `AWARD-WINNING-ANIMATIONS.md` - Complete guide to all techniques

### Key Directories

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout (wraps all pages, includes smooth scroll + cursor)
│   ├── page.tsx           # Homepage (fetches from TinaCMS)
│   ├── client-page.tsx    # Client component for homepage (scroll effects, text splitting)
│   ├── hero.module.css    # Hero section styles with animations
│   ├── globals.css        # Global styles (smooth scroll, cursor hiding)
│   ├── design-system/     # Design tokens showcase
│   └── admin/             # TinaCMS admin route config
├── components/            # Reusable components
│   ├── SmoothScroll.tsx   # Lenis smooth scroll wrapper
│   ├── SmoothCursor.tsx   # Custom cursor with lerp
│   ├── SplitText.tsx      # Text splitting component
│   ├── MagneticButton.tsx # Magnetic hover effect button
│   ├── StickySection.tsx  # Sticky scroll section
│   ├── AnimatedNav.tsx    # Nav with scroll-based blur
│   ├── PageTransition.tsx # Page transition wrapper
│   └── ResultsSection.tsx # Results section with scroll animations
├── utils/
│   └── animations.ts      # Animation variants, easings, utilities (mapRange, lerp, clamp)
├── pages/                 # Legacy pages router (if needed)
└── tokens.js              # Design system tokens (includes animations object)

content/
├── pages/                 # Page content (Markdown)
└── posts/                 # Blog posts (Markdown)

tina/
├── config.ts              # TinaCMS schema and configuration
└── __generated__/         # Auto-generated TinaCMS client

docs/
├── ANIMATIONS.md                    # Initial animation documentation
└── AWARD-WINNING-ANIMATIONS.md     # Complete guide to animation techniques
```

## Technical Details

### React Compiler

- **Enabled**: `reactCompiler: true` in `next.config.ts`
- **Purpose**: Automatic optimization of React components
- **Effect**: Better performance without manual memoization

### TypeScript

- **Strict mode**: Enabled in `tsconfig.json`
- **Type checking**: Run `pnpm type-check` before committing
- **Generated types**: TinaCMS auto-generates types in `/tina/__generated__/`

### Content Editing Workflow

1. Run `pnpm dev` to start both Next.js and TinaCMS
2. Navigate to `http://localhost:3000/admin` for content editing
3. Content changes are saved to Markdown files in `/content/`
4. Git commit the updated Markdown files
5. TinaCMS can be configured for Git-based or API-based workflows

### Environment Variables

Required for TinaCMS:
- `NEXT_PUBLIC_TINA_CLIENT_ID` - TinaCMS client ID (get from tina.io)
- `TINA_TOKEN` - TinaCMS API token (get from tina.io)
- `TINA_PUBLIC_IS_LOCAL` - Set to `true` for local development (set in dev script)

### Adding New Content Types

To add a new content collection:

1. Update `tina/config.ts`:
```typescript
schema: {
  collections: [
    {
      name: 'newType',
      label: 'New Type',
      path: 'content/newType',
      fields: [
        {
          type: 'string',
          name: 'title',
          label: 'Title',
          isTitle: true,
          required: true,
        },
        // Add more fields...
      ],
    },
  ],
}
```

2. Create content directory: `mkdir content/newType`
3. TinaCMS will auto-regenerate types in `/tina/__generated__/`
4. Query in Server Components using the generated client

## Development Practices

### Server vs Client Components

- **Default to Server Components**: Better performance, smaller bundle
- **Use Client Components when**:
  - Using React hooks (useState, useEffect, etc.)
  - Handling browser events
  - Using browser-only APIs
  - Need interactivity
  - **Using animations** (Framer Motion requires client components)

### Animation Guidelines

**When adding new animations:**

1. **Choose the right technique**:
   - Scroll tracking → Use `useScroll` + `useTransform`
   - Viewport trigger → Use `whileInView` or `scrollReveal` variant
   - Sticky section → Use CSS `position: sticky` + scroll effects
   - Text animation → Use `SplitText` component or `split-type`
   - Smooth following → Use `lerp` or spring physics
   - Button effects → Use `MagneticButton` component

2. **Use consistent easings**:
   ```typescript
   import { easings } from '@/utils/animations';

   // Choose based on desired feel:
   transition={{ duration: 0.6, ease: easings.premium }}  // Professional
   transition={{ duration: 0.4, ease: easings.snappy }}   // Quick
   transition={{ duration: 0.8, ease: easings.bounce }}   // Playful
   ```

3. **Respect accessibility**:
   - All animations respect `prefers-reduced-motion`
   - Custom cursor hidden on touch devices
   - Smooth scroll can be disabled if needed

4. **Optimize performance**:
   - Use `will-change` CSS on animated elements
   - Prefer `transform` and `opacity` (GPU-accelerated)
   - Avoid animating `width`, `height`, `top`, `left`
   - Use `whileInView` with `once: true` for one-time reveals

5. **Reuse components**:
   - Don't recreate scroll effects - use existing components
   - Import from `utils/animations.ts` for consistency
   - Check existing components before building new ones

**Common Patterns:**

```typescript
// Scroll-triggered reveal
import { scrollReveal } from '@/utils/animations';
<motion.div {...scrollReveal}>Content</motion.div>

// Staggered grid
import { gridStagger } from '@/utils/animations';
<motion.div variants={gridStagger} initial="initial" whileInView="whileInView">
  {items.map(item => (
    <motion.div key={item.id} variants={scrollReveal}>
      {item.content}
    </motion.div>
  ))}
</motion.div>

// Parallax scroll effect
const { scrollYProgress } = useScroll({ target: ref });
const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
<motion.div style={{ y }}>Parallax content</motion.div>

// Magnetic button
import MagneticButton from '@/components/MagneticButton';
<MagneticButton className={styles.cta}>Click me</MagneticButton>
```

### Data Fetching

- **Server Components**: Fetch data directly with async/await
- **No caching by default**: Use `fetch()` with `cache: 'no-store'` for dynamic data
- **TinaCMS queries**: Always in Server Components, pass data to Client Components as props

### Routing

- **File-based**: Create `page.tsx` in `app/` directory for new routes
- **Dynamic routes**: Use `[param]/page.tsx` for dynamic segments
- **Layouts**: Use `layout.tsx` for shared UI across routes
- **Navigation**: Import from `next/navigation`, use in Client Components with `'use client'`

---

## Quick Reference: Animation Tasks

### Add scroll-triggered fade-in to element
```typescript
import { motion } from 'framer-motion';
import { scrollReveal } from '@/utils/animations';

<motion.div {...scrollReveal}>
  Content fades in when scrolled into view
</motion.div>
```

### Add parallax effect to section
```typescript
import { motion, useScroll, useTransform } from 'framer-motion';

const ref = useRef(null);
const { scrollYProgress } = useScroll({
  target: ref,
  offset: ["start start", "end start"]
});
const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

<section ref={ref}>
  <motion.div style={{ y }}>Moves slower than scroll</motion.div>
</section>
```

### Add magnetic button
```typescript
import MagneticButton from '@/components/MagneticButton';

<MagneticButton className={styles.button}>
  Follows mouse on hover
</MagneticButton>
```

### Add text animation (words appear one by one)
```typescript
import SplitText from '@/components/SplitText';

<SplitText type="words" delay={0.2}>
  Each word animates in sequentially
</SplitText>
```

### Add staggered grid animation
```typescript
import { motion } from 'framer-motion';
import { gridStagger, scrollReveal } from '@/utils/animations';

<motion.div
  variants={gridStagger}
  initial="initial"
  whileInView="whileInView"
  viewport={{ once: true }}
>
  {items.map(item => (
    <motion.div key={item.id} variants={scrollReveal}>
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

### Add sticky section with scale effect
```typescript
import StickySection from '@/components/StickySection';

<StickySection className={styles.section}>
  <div>Pins during scroll with scale animation</div>
</StickySection>
```

### Add custom easing to animation
```typescript
import { motion } from 'framer-motion';
import { easings } from '@/utils/animations';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: easings.premium }}
>
  Smooth professional easing
</motion.div>
```

### Transform scroll to multiple values
```typescript
const { scrollYProgress } = useScroll({ target: ref });
const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.5]);
const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

<motion.div style={{ scale, opacity, y }}>
  Multiple properties transform together
</motion.div>
```

---

## Troubleshooting

### Animations feel janky
- Ensure Lenis smooth scroll is enabled (wrapped in layout.tsx)
- Check that you're animating `transform` and `opacity` (not width/height)
- Add `will-change` CSS property to animated elements

### Text splitting creates layout shift
- Ensure parent has fixed dimensions or `min-height`
- Text splitting component handles cleanup on unmount
- Check that split elements have proper `display` property

### Custom cursor not showing
- Only visible on desktop (hover-capable devices)
- Check that `cursor: none` is in globals.css
- Cursor component must be in layout.tsx

### Scroll animations not triggering
- Ensure element has `whileInView` prop
- Check `viewport` offset (default: `"-100px"`)
- Verify smooth scroll isn't conflicting

### TypeScript errors with animations
- Easing arrays need `as any` for custom cubic-bezier
- Import types from `'framer-motion'` if needed
- Check that motion components use correct props
