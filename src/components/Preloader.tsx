import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Preloader.module.css';

const BRAND = 'DirectiveFilms';
const GOLD_INDICES = [0, 9]; // D and F

const expo = [0.87, 0, 0.13, 1] as const;
const premium = [0.25, 0.1, 0.25, 1] as const;

// Minimum animation durations (ms) — these overlap with real loading
const PHASE_LINE = 600;
const PHASE_LETTERS = 1000;
const PHASE_HOLD = 500;

type Phase = 'skip' | 'line' | 'letters' | 'hold' | 'exit' | 'done';

export default function Preloader() {
  const [phase, setPhase] = useState<Phase>('skip');

  const pageReady = useRef(false);
  const minAnimDone = useRef(false);
  const exitTriggered = useRef(false);

  // Try to trigger exit — only fires when BOTH page is ready AND minimum animation played
  const tryExit = () => {
    if (pageReady.current && minAnimDone.current && !exitTriggered.current) {
      exitTriggered.current = true;
      sessionStorage.setItem('preloaderSeen', '1');
      setPhase('exit');
      setTimeout(() => {
        setPhase('done');
        document.body.style.overflow = '';
      }, 900);
    }
  };

  // Client-only: check sessionStorage and start animation timeline if first visit
  useEffect(() => {
    if (sessionStorage.getItem('preloaderSeen')) return;

    setPhase('line');
    document.body.style.overflow = 'hidden';

    // Listen for page readiness (fonts + critical assets)
    const onReady = () => {
      pageReady.current = true;
      tryExit();
    };

    if (document.readyState === 'complete') {
      pageReady.current = true;
    } else {
      window.addEventListener('load', onReady);
    }

    // Animation timeline — runs concurrently with page load
    const t1 = setTimeout(() => setPhase('letters'), PHASE_LINE);
    const t2 = setTimeout(() => setPhase('hold'), PHASE_LINE + PHASE_LETTERS);
    const t3 = setTimeout(() => {
      minAnimDone.current = true;
      tryExit();
    }, PHASE_LINE + PHASE_LETTERS + PHASE_HOLD);

    // Safety: force exit if something goes wrong (e.g. animation stall)
    const tSafety = setTimeout(() => {
      if (!exitTriggered.current) {
        exitTriggered.current = true;
        sessionStorage.setItem('preloaderSeen', '1');
        setPhase('done');
        document.body.style.overflow = '';
      }
    }, 5000);

    return () => {
      [t1, t2, t3, tSafety].forEach(clearTimeout);
      window.removeEventListener('load', onReady);
      document.body.style.overflow = '';
    };
  }, []);

  // For 'hold' phase: page might become ready while we're animating
  useEffect(() => {
    if (phase === 'hold' && pageReady.current && minAnimDone.current) {
      tryExit();
    }
  }, [phase]);

  if (phase === 'skip' || phase === 'done') return null;

  const isExiting = phase === 'exit';

  return (
    <AnimatePresence>
      <motion.div
          className={styles.overlay}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Top half */}
          <motion.div
            className={`${styles.half} ${styles.halfTop}`}
            animate={isExiting ? { y: '-100%' } : { y: 0 }}
            transition={{ duration: 0.9, ease: expo }}
          />

          {/* Bottom half */}
          <motion.div
            className={`${styles.half} ${styles.halfBottom}`}
            animate={isExiting ? { y: '100%' } : { y: 0 }}
            transition={{ duration: 0.9, ease: expo }}
          />

          {/* Gold sweep line */}
          <motion.div
            className={styles.line}
            initial={{ width: 0, left: '50%', x: '-50%' }}
            animate={
              isExiting
                ? { width: '100vw', opacity: 0 }
                : phase === 'line'
                  ? { width: '60vw' }
                  : { width: '100vw' }
            }
            transition={
              isExiting
                ? { duration: 0.5, ease: premium }
                : { duration: phase === 'line' ? 0.6 : 0.8, ease: expo }
            }
          />

          {/* Brand wordmark — letters stagger in */}
          <div className={styles.center}>
            <div className={styles.wordmark}>
              {BRAND.split('').map((char, i) => (
                <motion.span
                  key={i}
                  className={`${styles.letter} ${GOLD_INDICES.includes(i) ? styles.letterGold : ''}`}
                  animate={
                    phase !== 'line'
                      ? isExiting
                        ? { opacity: 0, y: '-100%' }
                        : { opacity: 1, y: 0 }
                      : { opacity: 0, y: '100%' }
                  }
                  transition={{
                    duration: isExiting ? 0.4 : 0.5,
                    delay: isExiting ? i * 0.02 : i * 0.04,
                    ease: premium,
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Tagline */}
          <motion.span
            className={styles.tagline}
            initial={{ opacity: 0 }}
            animate={
              phase === 'letters' || phase === 'hold'
                ? { opacity: 1 }
                : { opacity: 0 }
            }
            transition={{ duration: 0.4, delay: phase === 'letters' ? 0.5 : 0, ease: premium }}
          >
            Growth Systems for Ambitious Brands
          </motion.span>
        </motion.div>
    </AnimatePresence>
  );
}
