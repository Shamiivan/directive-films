import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { scrollReveal } from '../../../utils/animations';
import styles from './section-faq.module.css';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

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

  return (
    <section className={styles.faqSection}>
      <div className={styles.container}>
        {/* Header */}
        <motion.div className={styles.header} {...scrollReveal}>
          <h2 className={styles.title}>
            Questions? We have <span className={styles.gold}>answers</span>
          </h2>
        </motion.div>

        {/* FAQ List */}
        <div className={styles.faqList}>
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className={`${styles.faqItem} ${openIndex === index ? styles.open : ''}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <button
                className={styles.question}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className={styles.questionText}>{faq.question}</span>
                <span className={styles.icon}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19 9L12 16L5 9"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    className={styles.answerWrapper}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <p className={styles.answer}>{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
