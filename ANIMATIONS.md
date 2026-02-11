# Premium Animations Added to DirectiveFilms Website

This document outlines all the premium animations and interactions added to enhance the user experience.

## 🎬 Animation Library

**Framer Motion** has been integrated for smooth, performant animations.

## 📦 Animation Utilities (`src/utils/animations.ts`)

Reusable animation variants for consistency across the site:

- **fadeInUp** - Fade in with upward motion
- **fadeInScale** - Fade in with subtle scale
- **staggerContainer** - Stagger child animations
- **scaleOnHover** - Hover zoom (5%)
- **scaleOnHoverSubtle** - Subtle hover zoom (2%)
- **scrollReveal** - Scroll-triggered fade + zoom from below
- **scrollRevealLeft** - Scroll-triggered from left
- **scrollRevealRight** - Scroll-triggered from right
- **imageZoom** - Premium image reveal with zoom out effect
- **gridStagger** - Staggered grid item animations

## 🎨 Animation Features by Section

### Navigation Bar
- **Slide down** entrance animation on page load
- **Dynamic background blur** that intensifies on scroll
- **Logo hover** - subtle scale effect
- **Nav links** - scale on hover
- **Get Started button** - hover scale + color transition, tap feedback

### Hero Section
- **Staggered content reveal** - Title, subtitle, button, video appear in sequence
- **Parallax photo reel** - Background images move slower than page scroll, creating depth
- **Photo reel opacity fade** - Gradually fades as user scrolls
- **Individual photo hover** - Each photo zooms and becomes full color on hover
- **CTA button**:
  - Pulsing glow effect (continuous subtle animation)
  - Hover zoom with enhanced glow
  - Tap feedback (scale down)
- **Video container** - Hover zoom effect (2%)
- **Brand logos** - Individual hover zoom + opacity increase

### Results Section
- **Title** - Scroll-triggered fade in with zoom
- **Hero image**:
  - Initial zoom-out effect when scrolling into view
  - Hover zoom (5%)
- **Service cards**:
  - Staggered entrance (cards appear one by one)
  - Scroll-triggered reveal with zoom
  - Hover effects:
    - Scale up (5%)
    - Float up (8px)
    - Enhanced shadow with gold tint
  - Icon rotation (5°) on hover
- **CTA button**:
  - Pulsing glow effect
  - Hover scale + enhanced glow
  - Tap feedback

## 🎯 Design Tokens Updated (`src/tokens.js`)

New animation tokens added for consistency:

```javascript
animations: {
  easing: {
    premium: [0.25, 0.1, 0.25, 1],
    smooth: [0.4, 0.0, 0.2, 1],
    bounce: [0.68, -0.55, 0.265, 1.55],
  },
  duration: {
    fast: 0.2,
    base: 0.3,
    slow: 0.6,
    slower: 1.2,
  },
  spring: {
    gentle: { stiffness: 100, damping: 15 },
    snappy: { stiffness: 300, damping: 25 },
    bouncy: { stiffness: 400, damping: 10 },
  },
}
```

## ⚡ Performance Optimizations

1. **Smooth scroll** behavior enabled globally
2. **`will-change` CSS property** added to animated elements
3. **Respects user preferences** - Animations disabled for users with `prefers-reduced-motion`
4. **Optimized transforms** - Using GPU-accelerated properties (transform, opacity)

## 🎭 Premium Touch Details

### Easing Curves
All animations use a premium cubic-bezier easing `[0.25, 0.1, 0.25, 1]` for smooth, natural motion.

### Pulsing Glow
CTA buttons feature a continuous subtle pulse animation (3s cycle) to draw attention without being distracting.

### Parallax Effects
The hero background photo reel has parallax scrolling that creates depth and premium feel.

### Micro-interactions
Every interactive element has hover and/or tap feedback for better user experience.

## 🎨 Animation Choreography

1. **Page Load**: Nav slides down → Hero content staggers in
2. **Scroll**: Parallax background → Sections reveal as you scroll
3. **Hover**: Subtle zoom on all interactive elements
4. **Tap**: Satisfying feedback on buttons

## 🚀 How to Use

### In Components
```tsx
import { motion } from 'framer-motion';
import { scrollReveal, fadeInUp } from '../utils/animations';

// Scroll-triggered animation
<motion.div {...scrollReveal}>
  Content here
</motion.div>

// Page load animation
<motion.h1 variants={fadeInUp} initial="initial" animate="animate">
  Title
</motion.h1>

// Hover effect
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Click me
</motion.button>
```

## 📱 Responsive Behavior

All animations work seamlessly across device sizes. Reduced animation complexity on mobile for better performance.

---

**Result**: A premium, polished website that feels alive and engaging! ✨
