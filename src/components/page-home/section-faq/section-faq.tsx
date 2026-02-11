'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { scrollReveal } from '../../../utils/animations';
import styles from './section-faq.module.css';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'How long does video production take?',
      answer: 'Timeline varies by project complexity. A simple video typically takes 2-3 weeks from concept to delivery, while more complex productions with multiple locations and custom animations may take 4-6 weeks. We provide detailed timelines during consultation.',
    },
    {
      question: 'What\'s included in your video packages?',
      answer: 'All packages include script development, professional filming, editing, color grading, and revisions. Higher tiers add on-location shooting, custom graphics, advanced VFX, and ongoing video content strategy. We tailor each package to your specific goals.',
    },
    {
      question: 'Do you provide the equipment and crew?',
      answer: 'Yes! We come fully equipped with professional cameras, lighting, audio equipment, and experienced crew members. From directors to cinematographers to editors, our team handles every aspect of production.',
    },
    {
      question: 'Can you help with video distribution and marketing?',
      answer: 'Absolutely. Beyond production, we offer video SEO optimization, multi-platform distribution strategies, performance analytics, and ongoing consultation to ensure your videos reach the right audience and drive measurable results.',
    },
    {
      question: 'What if I need revisions?',
      answer: 'Revisions are included in all packages. Starter includes 2 rounds, Growth includes unlimited revisions, and Enterprise includes priority revisions with expedited turnaround. We work closely with you to ensure the final product exceeds expectations.',
    },
    {
      question: 'Do you work with businesses in my industry?',
      answer: 'We have experience across B2B, professional services, SaaS, e-commerce, and more. Our industry-specific playbooks provide proven frameworks and templates tailored to your sector, ensuring faster deployment and better results.',
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
