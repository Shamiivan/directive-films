import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { clamp, mapRange } from '../utils/animations';

type CursorState = 'default';

let pulseId = 0;

export default function SmoothCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorState] = useState<CursorState>('default');
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

      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
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
  };

  const ringVariants = {
    default: { width: 40, height: 40, opacity: 0.5 },
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
