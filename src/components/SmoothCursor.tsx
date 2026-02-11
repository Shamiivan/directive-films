'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

type CursorState = 'default' | 'link' | 'button' | 'video';

export default function SmoothCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorState, setCursorState] = useState<CursorState>('default');
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  // Use spring for smooth lerp-like interpolation (LERP technique)
  const springConfig = { damping: 25, stiffness: 150 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only show on desktop (hover support) - skip on mobile
    const hasHover = window.matchMedia('(hover: hover)').matches;
    const isMobile = /Android|webOS|iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (isMobile || !hasHover) {
      return; // Don't initialize cursor on mobile at all
    }

    setIsVisible(hasHover);

    if (!hasHover) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      // Detect cursor state based on element
      const target = e.target as HTMLElement;

      // Only show video cursor for actual video elements, not images
      const isActualVideo = target.tagName === 'VIDEO' || (target.closest('video') && !target.closest('img'));
      const isButton = target.tagName === 'BUTTON' || target.closest('button') || target.classList.contains('ctaButton');
      const isLink = target.tagName === 'A' || target.closest('a');

      if (isButton) {
        setCursorState('button');
      } else if (isActualVideo) {
        setCursorState('video');
      } else if (isLink) {
        setCursorState('link');
      } else {
        setCursorState('default');
      }
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  // Cursor variants based on state
  const variants = {
    default: {
      width: 12,
      height: 12,
      backgroundColor: '#FDB714',
      border: 'none',
    },
    link: {
      width: 80,
      height: 80,
      backgroundColor: 'rgba(253, 183, 20, 0.15)',
      border: '2px solid #FDB714',
    },
    button: {
      width: 60,
      height: 60,
      backgroundColor: '#FDB714',
      boxShadow: '0 0 30px rgba(253, 183, 20, 0.6)',
    },
    video: {
      width: 80,
      height: 80,
      backgroundColor: 'rgba(253, 183, 20, 0.2)',
      border: '2px solid #FDB714',
    },
  };

  const ringVariants = {
    default: {
      width: 40,
      height: 40,
      opacity: 0.5,
    },
    link: {
      width: 100,
      height: 100,
      opacity: 0.3,
    },
    button: {
      width: 80,
      height: 80,
      opacity: 0.7,
    },
    video: {
      width: 100,
      height: 100,
      opacity: 0.4,
    },
  };

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
          mixBlendMode: cursorState === 'default' ? 'difference' : 'normal',
        }}
        animate={cursorState}
        variants={variants}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {/* Show text hint for links */}
        {cursorState === 'link' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: '10px',
              fontWeight: 600,
              color: '#FDB714',
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            View
          </motion.div>
        )}

        {/* Show play icon for video */}
        {cursorState === 'video' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: '12px',
              color: '#FDB714',
            }}
          >
            ▶
          </motion.div>
        )}
      </motion.div>

      {/* Cursor trail ring - slower follow (LERP effect) */}
      <motion.div
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          borderRadius: '50%',
          border: '2px solid #FDB714',
          pointerEvents: 'none',
          zIndex: 9998,
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={cursorState}
        variants={ringVariants}
        transition={{ type: 'spring', damping: 30, stiffness: 80 }}
      />
    </>
  );
}
