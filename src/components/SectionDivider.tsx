'use client';

import { motion } from 'framer-motion';
import styles from './SectionDivider.module.css';

interface SectionDividerProps {
  className?: string;
  variant?: 'gold' | 'white' | 'gradient';
}

/**
 * SectionDivider Component
 * Animated gradient divider between sections
 *
 * @example
 * <SectionDivider variant="gold" />
 * <SectionDivider variant="gradient" />
 */
export default function SectionDivider({
  className = '',
  variant = 'gold'
}: SectionDividerProps) {
  return (
    <motion.div
      className={`${styles.divider} ${styles[variant]} ${className}`}
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 0.6 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
    />
  );
}
