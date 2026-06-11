/**
 * Reusable Framer Motion animation variants
 * Premium animations with award-winning techniques
 */
import { useRef } from "react";
import { useScroll, useTransform, useReducedMotion } from "framer-motion";

// Professional easing curves (setting the vibe/mood)
export const easings = {
  // Premium smooth easing
  premium: [0.25, 0.1, 0.25, 1],
  // Bounce for playful interactions
  bounce: [0.68, -0.55, 0.265, 1.55],
  // Smooth expo for elegant movements
  expo: [0.87, 0, 0.13, 1],
  // Snappy for quick interactions
  snappy: [0.4, 0.0, 0.2, 1],
  // Elastic for attention-grabbing
  elastic: [0.68, -0.6, 0.32, 1.6],
};

export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: easings.premium },
};

export const fadeInScale = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.6, ease: easings.premium },
};

export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const scaleOnHover = {
  rest: { scale: 1 },
  hover: {
    scale: 1.02,
    transition: {
      duration: 0.4,
      ease: easings.expo,
    }
  },
};

export const scaleOnHoverSubtle = {
  rest: { scale: 1 },
  hover: {
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: easings.premium,
    }
  },
};

// For scroll-triggered animations
export const scrollReveal = {
  initial: { opacity: 0, y: 40, scale: 0.95 },
  whileInView: { opacity: 1, y: 0, scale: 1 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as any },
};

export const scrollRevealLeft = {
  initial: { opacity: 0, x: -40, scale: 0.98 },
  whileInView: { opacity: 1, x: 0, scale: 1 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as any },
};

export const scrollRevealRight = {
  initial: { opacity: 0, x: 40, scale: 0.98 },
  whileInView: { opacity: 1, x: 0, scale: 1 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as any },
};

// Premium zoom effect for images/videos
export const imageZoom = {
  initial: { scale: 1.1, opacity: 0 },
  whileInView: { scale: 1, opacity: 1 },
  viewport: { once: true },
  transition: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] as any },
};

// Stagger children in a grid
export const gridStagger = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
  viewport: { once: true, margin: "-50px" },
};

// Stagger with depth effect - creates 3D perception
export const gridStaggerDepth = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
  viewport: { once: true, margin: "-80px" },
};

// Scroll reveal with depth - for use with custom delays
export const scrollRevealDepth = (index: number) => ({
  initial: { opacity: 0, y: 60, scale: 0.92, rotateX: 10 },
  whileInView: { opacity: 1, y: 0, scale: 1, rotateX: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: {
    duration: 0.8,
    delay: (index % 3) * 0.15 + Math.floor(index / 3) * 0.1, // Diagonal stagger
    ease: [0.25, 0.1, 0.25, 1] as any,
  },
});

// --- Foundation: scroll-reveal helpers for the redesign (services rows, etc.) ---

/**
 * Masked image reveal — the image wipes up from behind a clip-path mask with a
 * subtle settle from scale. Pair with a parallax drift for the full effect.
 */
export const maskWipeIn = {
  initial: { clipPath: "inset(0 0 100% 0)", scale: 1.08, opacity: 0.5 },
  whileInView: { clipPath: "inset(0 0 0% 0)", scale: 1, opacity: 1 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.9, ease: easings.expo as any },
};

/**
 * Checklist / list stagger. Apply `staggerListContainer` to the list element
 * and `staggerListItem` to each child so items rise in one-by-one.
 */
export const staggerListContainer = {
  initial: {},
  whileInView: {
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
  viewport: { once: true, margin: "-80px" },
};

export const staggerListItem = {
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: easings.premium as any },
};

/**
 * Reduced-motion-aware parallax. Attach the returned `ref` to the scroll
 * container and bind the `y` motion value to the element you want to drift.
 * Returns y = 0 throughout when the user prefers reduced motion.
 */
export function useParallax(distance = 60) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [0, 0] : [distance, -distance]
  );
  return { ref, y };
}

// Utility functions

/**
 * Map function - Transform a value from one range to another
 * Essential for scroll-based animations
 * @param value - Current value
 * @param inMin - Input range minimum
 * @param inMax - Input range maximum
 * @param outMin - Output range minimum
 * @param outMax - Output range maximum
 */
export const mapRange = (
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number => {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
};

/**
 * Lerp (Linear Interpolation) - Smooth value interpolation
 * Perfect for cursor following, smooth animations
 * @param start - Start value
 * @param end - End value
 * @param factor - Interpolation factor (0-1)
 */
export const lerp = (start: number, end: number, factor: number): number => {
  return start * (1 - factor) + end * factor;
};

/**
 * Clamp - Restrict a value to a range
 * @param value - Value to clamp
 * @param min - Minimum value
 * @param max - Maximum value
 */
export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};
