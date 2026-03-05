import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import styles from './RotatingProofLine.module.css';

const messages = [
  'Clients see results in 30 days on average',
  '500+ projects delivered',
  '98% of clients stay past year one',
];

type Phase = 'typing' | 'holding' | 'erasing' | 'waiting';

export default function RotatingProofLine() {
  const [displayText, setDisplayText] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);
  const stateRef = useRef({ messageIndex: 0, charIndex: 0, phase: 'typing' as Phase });
  const prefersReducedMotion = useRef(false);
  const [isReduced, setIsReduced] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    prefersReducedMotion.current = reduced;
    setIsReduced(reduced);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion.current) return;

    let timer: ReturnType<typeof setTimeout>;

    function tick() {
      const s = stateRef.current;
      const msg = messages[s.messageIndex];

      switch (s.phase) {
        case 'typing':
          if (s.charIndex < msg.length) {
            s.charIndex++;
            setDisplayText(msg.slice(0, s.charIndex));
            timer = setTimeout(tick, 40);
          } else {
            s.phase = 'holding';
            timer = setTimeout(tick, 3000);
          }
          break;

        case 'holding':
          s.phase = 'erasing';
          timer = setTimeout(tick, 25);
          break;

        case 'erasing':
          if (s.charIndex > 0) {
            s.charIndex--;
            setDisplayText(msg.slice(0, s.charIndex));
            timer = setTimeout(tick, 25);
          } else {
            s.phase = 'waiting';
            timer = setTimeout(tick, 500);
          }
          break;

        case 'waiting':
          s.messageIndex = (s.messageIndex + 1) % messages.length;
          s.phase = 'typing';
          timer = setTimeout(tick, 40);
          break;
      }
    }

    tick();
    return () => clearTimeout(timer);
  }, []);

  if (isReduced) {
    return (
      <div className={styles.proofLine}>
        {messages[0]}
      </div>
    );
  }

  return (
    <motion.div
      className={styles.proofLine}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {displayText}
      <span className={styles.cursor}>|</span>
    </motion.div>
  );
}
