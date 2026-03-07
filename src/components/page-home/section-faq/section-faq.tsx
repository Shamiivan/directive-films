import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionEyebrow from '../../SectionEyebrow';
import { scrollReveal } from '../../../utils/animations';
import styles from './section-faq.module.css';

const faqs = [
  {
    question: 'Why do you do five things instead of just one?',
    answer: 'Because they\'re connected. A great video doesn\'t help if your website can\'t capture the lead. A great website doesn\'t help if your CRM loses the follow-up. We do all five so nothing breaks the chain between someone finding you and becoming a customer.',
  },
  {
    question: 'Do I need all five?',
    answer: 'No. We start by looking at your business and figuring out what will make the biggest difference right now. Sometimes that\'s a website. Sometimes it\'s your CRM. Sometimes it\'s video. We tell you where to start and you decide how far to go.',
  },
  {
    question: 'How fast will I see results?',
    answer: 'Sprint clients get a finished deliverable in 2 weeks. Growth Partner clients usually see real movement within 30-60 days — more leads, faster closes, higher conversion. It gets better over time as the pieces start working together.',
  },
  {
    question: 'Can you work with the tools and team I already have?',
    answer: 'Yes. We plug into whatever CRM, platform, or setup you\'re already running. If you have a team that could be making content, our coaching gets them producing on their own.',
  },
  {
    question: 'Who do you typically work with?',
    answer: 'B2B companies, professional services, SaaS, and businesses that are growing but know their online presence and sales process aren\'t keeping up. If you sell something that takes trust to close, we\'re a good fit.',
  },
  {
    question: 'How do we get started?',
    answer: 'A 30-minute call. We learn what you\'re working on, look at where you are, and tell you what we\'d focus on first. No pitch deck — just a straight conversation about your business.',
  },
];

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

  return (
    <section className={styles.faqSection}>
      <div className={styles.container}>
        <div className={styles.layout}>
          <motion.div className={styles.left} {...scrollReveal}>
            <SectionEyebrow label="FAQ" description="" />
            <h2 className={styles.title}>
              Questions?{' '}
              <em className={styles.titleAccent}>We have answers</em>
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
