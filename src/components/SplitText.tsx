'use client';

import { useEffect, useRef, ReactNode } from 'react';
import SplitType from 'split-type';
import { motion } from 'framer-motion';

interface SplitTextProps {
  children: string;
  className?: string;
  delay?: number;
  type?: 'lines' | 'words' | 'chars' | 'lines,words' | 'lines,chars' | 'words,chars';
}

export default function SplitText({
  children,
  className = '',
  delay = 0,
  type = 'lines,words',
}: SplitTextProps) {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    // Split the text
    const split = new SplitType(textRef.current, {
      types: type,
      tagName: 'span',
    });

    // Cleanup function
    return () => {
      split.revert();
    };
  }, [type]);

  // Animation variants for staggering
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: delay,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <motion.div
      ref={textRef}
      className={className}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      style={{ display: 'inline-block' }}
    >
      {children}
    </motion.div>
  );
}
