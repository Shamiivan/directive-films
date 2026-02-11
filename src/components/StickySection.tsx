'use client';

import { ReactNode, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface StickySectionProps {
  children: ReactNode;
  className?: string;
}

export default function StickySection({ children, className = '' }: StickySectionProps) {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  // Scale up effect as section becomes sticky
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.9, 1, 1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  return (
    <div ref={sectionRef} className={className} style={{ minHeight: '200vh' }}>
      <motion.div
        style={{
          scale,
          opacity,
          position: 'sticky',
          top: '20vh',
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
