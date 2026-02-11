'use client';

import { useEffect, useRef } from 'react';
import { useInView, useMotionValue, useSpring } from 'framer-motion';

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

/**
 * AnimatedCounter Component
 * Animates a number from 0 to target value when it enters the viewport
 *
 * @example
 * <AnimatedCounter value={500} suffix="+" />
 * <AnimatedCounter value={1200} suffix="+ Videos" duration={2500} />
 */
export default function AnimatedCounter({
  value,
  suffix = '',
  duration = 2000,
  className = ''
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    duration: duration,
    bounce: 0
  });
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.round(latest).toLocaleString() + suffix;
      }
    });

    return () => unsubscribe();
  }, [springValue, suffix]);

  return <span ref={ref} className={className}>0{suffix}</span>;
}
