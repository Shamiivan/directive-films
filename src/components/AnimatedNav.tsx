'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedNavProps {
  children: ReactNode;
  className?: string;
}

export default function AnimatedNav({ children, className }: AnimatedNavProps) {
  const { scrollY } = useScroll();

  // Transform scroll position to opacity and blur values
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ['rgba(0, 0, 0, 0.7)', 'rgba(0, 0, 0, 0.95)']
  );

  const blur = useTransform(
    scrollY,
    [0, 100],
    ['blur(5px)', 'blur(15px)']
  );

  return (
    <motion.nav
      className={className}
      style={{
        backgroundColor,
        backdropFilter: blur,
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.nav>
  );
}
