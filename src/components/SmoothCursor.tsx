import { useEffect, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';

export default function SmoothCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  useEffect(() => {
    const hasHover = window.matchMedia('(hover: hover)').matches;
    const isMobile = /Android|webOS|iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (isMobile || !hasHover) return;

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const onMouseOut = () => setIsVisible(false);
    const onMouseOver = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseOut);
    document.addEventListener('mouseenter', onMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseOut);
      document.removeEventListener('mouseenter', onMouseOver);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Precision Dot - Zero Lag */}
      <motion.div
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: 8,
          height: 8,
          backgroundColor: '#FDB714',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 10000,
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          // Use mixBlendMode difference for visibility on all backgrounds
          mixBlendMode: 'difference',
        }}
      />

      {/* Aesthetic Ring - Subtle smoothing */}
      <motion.div
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: 32,
          height: 32,
          border: '1px solid #FDB714',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: 0.5,
        }}
        transition={{
          type: 'spring',
          damping: 30,
          stiffness: 250,
          mass: 0.5,
        }}
      />
    </>
  );
}
