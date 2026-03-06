import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { scrollReveal } from '@/utils/animations';
import styles from './section-faq.module.css';

const faqs = [
  {
    question: 'How do I know which service I need?',
    answer: "Start with a strategy call. We'll look at where you are, where the gaps are, and recommend the right starting point. Most clients start with Diagnose — because you need to know what's broken before you fix it.",
  },
  {
    question: 'Can I bundle multiple services?',
    answer: "Yes — and most clients do. The five services are designed to work together as a growth system. We'll build a package around what actually moves the needle for your business.",
  },
  {
    question: 'What does pricing look like?',
    answer: "It depends on scope. An audit starts in the low four figures. Full production or CRM buildouts are higher. We'll give you a clear quote after our strategy call — no surprises, no hidden fees.",
  },
  {
    question: 'How long does each service take?',
    answer: 'Audits take 1-2 weeks. Video production averages 2-3 weeks from script to delivery. CRM setup is typically 2 weeks. Coaching programs run 4-6 weeks. Web builds are 3-4 weeks. We move fast without cutting corners.',
  },
  {
    question: 'Do you work with businesses outside of video production?',
    answer: "Absolutely. Video is one piece. We also build websites, set up CRMs, coach teams on content, and audit your entire online presence. The goal is a connected growth system — not just a nice video.",
  },
  {
    question: 'What if I already have a website / CRM / content team?',
    answer: "Great — we'll work with what you have. We don't rip and replace unless it's necessary. If your existing tools just need optimization, that's what we do.",
  },
];

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
            <span className={styles.label}>FAQ</span>
            <h2 className={styles.title}>
              Common{' '}
              <em className={styles.titleAccent}>Questions</em>
            </h2>
            <p className={styles.subtitle}>
              Everything you need to know before we start working together.
            </p>
          </motion.div>

          <div className={styles.right}>
            {faqs.map((faq, i) => (
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
