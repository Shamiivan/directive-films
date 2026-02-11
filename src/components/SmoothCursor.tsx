'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function SmoothCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  // Use spring for smooth lerp-like interpolation (LERP technique from video)
  const springConfig = { damping: 25, stiffness: 150 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only show on desktop (hover support)
    const hasHover = window.matchMedia('(hover: hover)').matches;
    setIsVisible(hasHover);

    if (!hasHover) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: 12,
          height: 12,
          borderRadius: '50%',
          backgroundColor: '#FDB714',
          pointerEvents: 'none',
          zIndex: 9999,
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
          mixBlendMode: 'difference',
        }}
      />
      {/* Cursor trail ring - slower follow (LERP effect) */}
      <motion.div
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: 40,
          height: 40,
          borderRadius: '50%',
          border: '2px solid #FDB714',
          pointerEvents: 'none',
          zIndex: 9998,
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
          opacity: 0.5,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 80 }}
      />
    </>
  );
}
