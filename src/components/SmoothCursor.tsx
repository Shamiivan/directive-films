import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { clamp, mapRange, lerp } from '../utils/animations';

type CursorState = 'default' | 'link' | 'button' | 'video' | 'sticky';

let pulseId = 0;

export default function SmoothCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorState, setCursorState] = useState<CursorState>('default');
  const [pulses, setPulses] = useState<{ id: number; x: number; y: number }[]>([]);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  // Spring for smooth cursor follow
  const springConfig = { damping: 25, stiffness: 150 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Velocity-based squeeze
  const squeezeScaleX = useMotionValue(1);
  const squeezeScaleY = useMotionValue(1);
  const squeezeRotate = useMotionValue(0);

  const squeezeSpringConfig = { damping: 20, stiffness: 300 };
  const scaleXSpring = useSpring(squeezeScaleX, squeezeSpringConfig);
  const scaleYSpring = useSpring(squeezeScaleY, squeezeSpringConfig);
  const rotateSpring = useSpring(squeezeRotate, squeezeSpringConfig);

  const prevPos = useRef({ x: 0, y: 0, time: Date.now() });

  const removePulse = useCallback((id: number) => {
    setPulses(prev => prev.filter(p => p.id !== id));
  }, []);

  useEffect(() => {
    const hasHover = window.matchMedia('(hover: hover)').matches;
    const isMobile = /Android|webOS|iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (isMobile || !hasHover) return;

    setIsVisible(true);

    const moveCursor = (e: MouseEvent) => {
      const now = Date.now();
      const dt = Math.max(now - prevPos.current.time, 1);
      const vx = (e.clientX - prevPos.current.x) / dt;
      const vy = (e.clientY - prevPos.current.y) / dt;
      const speed = Math.sqrt(vx * vx + vy * vy) * 1000; // px/s

      prevPos.current = { x: e.clientX, y: e.clientY, time: now };

      // Velocity squeeze — subtle stretch in movement direction
      const sx = clamp(mapRange(speed, 0, 1500, 1, 1.2), 1, 1.2);
      squeezeScaleX.set(sx);
      squeezeScaleY.set(1 / sx); // volume preservation
      squeezeRotate.set(Math.atan2(vy, vx) * (180 / Math.PI));

      // Sticky cursor logic
      const target = e.target as HTMLElement;
      const stickyEl = target.closest('[data-sticky-cursor]') as HTMLElement | null;

      if (stickyEl) {
        const rect = stickyEl.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        cursorX.set(lerp(e.clientX, centerX, 0.35));
        cursorY.set(lerp(e.clientY, centerY, 0.35));
        setCursorState('sticky');
        return;
      }

      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      // Detect cursor state
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

    const handleMouseDown = () => {
      const x = cursorXSpring.get();
      const y = cursorYSpring.get();
      setPulses(prev => [...prev, { id: ++pulseId, x, y }]);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, [cursorX, cursorY, cursorXSpring, cursorYSpring, squeezeScaleX, squeezeScaleY, squeezeRotate]);

  if (!isVisible) return null;

  const variants = {
    default: {
      width: 12,
      height: 12,
      backgroundColor: '#FDB714',
      border: 'none',
      boxShadow: 'none',
    },
    link: {
      width: 80,
      height: 80,
      backgroundColor: 'rgba(253, 183, 20, 0.15)',
      border: '2px solid #FDB714',
      boxShadow: 'none',
    },
    button: {
      width: 60,
      height: 60,
      backgroundColor: '#FDB714',
      boxShadow: '0 0 30px rgba(253, 183, 20, 0.6)',
      border: 'none',
    },
    video: {
      width: 80,
      height: 80,
      backgroundColor: 'rgba(253, 183, 20, 0.2)',
      border: '2px solid #FDB714',
      boxShadow: 'none',
    },
    sticky: {
      width: 14,
      height: 14,
      backgroundColor: '#FDB714',
      border: 'none',
      boxShadow: 'none',
    },
  };

  const ringVariants = {
    default: { width: 40, height: 40, opacity: 0.5 },
    link: { width: 100, height: 100, opacity: 0.3 },
    button: { width: 80, height: 80, opacity: 0.7 },
    video: { width: 100, height: 100, opacity: 0.4 },
    sticky: { width: 44, height: 44, opacity: 0.4 },
  };

  return (
    <>
      {/* Main cursor dot — with velocity squeeze */}
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
          scaleX: scaleXSpring,
          scaleY: scaleYSpring,
          rotate: rotateSpring,
          mixBlendMode: cursorState === 'default' ? 'difference' : 'normal',
        }}
        animate={cursorState}
        variants={variants}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      >
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

      {/* Cursor trail ring — stays circular (no squeeze) */}
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

      {/* Click pulse rings */}
      <AnimatePresence>
        {pulses.map(pulse => (
          <motion.div
            key={pulse.id}
            initial={{ scale: 0, opacity: 0.35 }}
            animate={{ scale: 2, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            onAnimationComplete={() => removePulse(pulse.id)}
            style={{
              position: 'fixed',
              left: pulse.x,
              top: pulse.y,
              width: 20,
              height: 20,
              borderRadius: '50%',
              border: '1px solid #FDB714',
              pointerEvents: 'none',
              zIndex: 9997,
              translateX: '-50%',
              translateY: '-50%',
            }}
          />
        ))}
      </AnimatePresence>
    </>
  );
}
