import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Preloader.module.css';

const BRAND = 'DirectiveFilms';
const GOLD_INDICES = [0, 9]; // D and F

const premium = [0.25, 0.1, 0.25, 1] as const;

const PHASE_HOLD = 800;

type Phase = 'skip' | 'active' | 'exit' | 'done';

export default function Preloader() {
  const [phase, setPhase] = useState<Phase>('skip');

  const pageReady = useRef(false);
  const minAnimDone = useRef(false);
  const exitTriggered = useRef(false);

  const tryExit = () => {
    if (pageReady.current && minAnimDone.current && !exitTriggered.current) {
      exitTriggered.current = true;
      sessionStorage.setItem('preloaderSeen', '1');
      setPhase('exit');
      setTimeout(() => {
        setPhase('done');
        document.body.style.overflow = '';
      }, 600);
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem('preloaderSeen')) return;

    setPhase('active');
    document.body.style.overflow = 'hidden';

    const onReady = () => {
      pageReady.current = true;
      tryExit();
    };

    if (document.readyState === 'complete') {
      pageReady.current = true;
    } else {
      window.addEventListener('load', onReady);
    }

    const t1 = setTimeout(() => {
      minAnimDone.current = true;
      tryExit();
    }, PHASE_HOLD);

    const tSafety = setTimeout(() => {
      if (!exitTriggered.current) {
        exitTriggered.current = true;
        sessionStorage.setItem('preloaderSeen', '1');
        setPhase('done');
        document.body.style.overflow = '';
      }
    }, 4000);

    return () => {
      [t1, tSafety].forEach(clearTimeout);
      window.removeEventListener('load', onReady);
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    if (phase === 'active' && pageReady.current && minAnimDone.current) {
      tryExit();
    }
  }, [phase]);

  if (phase === 'skip' || phase === 'done') return null;

  const isExiting = phase === 'exit';

  return (
    <AnimatePresence>
      <motion.div
        className={styles.overlay}
        animate={isExiting ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.6, ease: premium }}
      >
        <div className={styles.center}>
          <div className={styles.wordmark}>
            {BRAND.split('').map((char, i) => (
              <motion.span
                key={i}
                className={`${styles.letter} ${GOLD_INDICES.includes(i) ? styles.letterGold : ''}`}
                initial={{ opacity: 0, y: 12 }}
                animate={
                  isExiting
                    ? { opacity: 0, y: -12 }
                    : { opacity: 1, y: 0 }
                }
                transition={{
                  duration: isExiting ? 0.3 : 0.4,
                  delay: isExiting ? i * 0.015 : i * 0.03 + 0.1,
                  ease: premium,
                }}
              >
                {char}
              </motion.span>
            ))}
          </div>
        </div>

        <motion.div
          className={styles.progressBar}
          initial={{ scaleX: 0 }}
          animate={isExiting ? { scaleX: 1, opacity: 0 } : { scaleX: 0.6 }}
          transition={{ duration: isExiting ? 0.3 : 0.8, ease: premium }}
        />
      </motion.div>
    </AnimatePresence>
  );
}
