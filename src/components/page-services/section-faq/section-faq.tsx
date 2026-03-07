import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionEyebrow from '../../SectionEyebrow';
import { scrollReveal } from '@/utils/animations';
import { faqItems } from '../services-data';
import styles from './section-faq.module.css';

function FaqItem({
  question,
  answer,
  index,
}: {
  question: string;
  answer: string;
  index: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      className={styles.item}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
    >
      <button
        className={`${styles.question} ${open ? styles.questionOpen : ''}`}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className={styles.questionNumber}>
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className={styles.questionText}>{question}</span>
        <span className={`${styles.icon} ${open ? styles.iconOpen : ''}`}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <line
              x1="7"
              y1="0"
              x2="7"
              y2="14"
              stroke="currentColor"
              strokeWidth="1"
              className={styles.iconVertical}
            />
            <line
              x1="0"
              y1="7"
              x2="14"
              y2="7"
              stroke="currentColor"
              strokeWidth="1"
            />
          </svg>
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.answerWrapper}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <p className={styles.answer}>{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FaqSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.layout}>
          <motion.div className={styles.left} {...scrollReveal}>
            <SectionEyebrow label="FAQ" description="Common questions" />
            <h2 className={styles.title}>
              Common{' '}
              <em className={styles.titleAccent}>Questions</em>
            </h2>
            <p className={styles.subtitle}>
              Everything you need to know before we start working together.
            </p>
          </motion.div>

          <div className={styles.right}>
            {faqItems.map((faq, i) => (
              <FaqItem
                key={i}
                question={faq.question}
                answer={faq.answer}
                index={i}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
