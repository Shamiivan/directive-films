import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import SectionEyebrow from '../../SectionEyebrow';
import { scrollReveal } from '../../../utils/animations';
import styles from './section-faq.module.css';

interface FaqItemType {
  question: string;
  answer: string;
}

function FaqItem({
  question,
  answer,
  index,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      className={styles.item}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
    >
      <button
        className={`${styles.question} ${isOpen ? styles.questionOpen : ''}`}
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className={styles.questionNumber}>
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className={styles.questionText}>{question}</span>
        <span className={`${styles.icon} ${isOpen ? styles.iconOpen : ''}`}>
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
        {isOpen && (
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
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { t } = useTranslation('home');
  const faqs = t('faq.items', { returnObjects: true }) as FaqItemType[];

  return (
    <section className={styles.faqSection}>
      <div className={styles.container}>
        <div className={styles.layout}>
          <motion.div className={styles.left} {...scrollReveal}>
            <SectionEyebrow label={t('faq.eyebrow')} description="" />
            <h2 className={styles.title}>
              {t('faq.title')}{' '}
              <em className={styles.titleAccent}>{t('faq.accent')}</em>
            </h2>
          </motion.div>

          <div className={styles.right}>
            {faqs.map((faq, i) => (
              <FaqItem
                key={i}
                question={faq.question}
                answer={faq.answer}
                index={i}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
