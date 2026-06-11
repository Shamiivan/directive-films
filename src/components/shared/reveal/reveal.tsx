import { useRef, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { easings } from "@/utils/animations";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** vertical travel distance in px */
  y?: number;
  /** seconds */
  delay?: number;
  duration?: number;
  as?: "div" | "li" | "section" | "span";
};

/**
 * Scroll-reveal that fires ONLY when the element genuinely enters the viewport.
 * Uses the useInView hook (ref-based) instead of whileInView, which on a
 * pre-rendered page tends to mis-fire at hydration and finish before the user
 * ever scrolls to it. Reduced-motion shows content immediately.
 */
export default function Reveal({
  children,
  className,
  y = 32,
  delay = 0,
  duration = 0.65,
  as = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  const MotionTag = motion[as] as typeof motion.div;

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      ref={ref as never}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration, delay, ease: easings.premium as never }}
    >
      {children}
    </MotionTag>
  );
}
