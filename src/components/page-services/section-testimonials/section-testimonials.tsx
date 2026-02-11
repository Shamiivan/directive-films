'use client';

import { motion } from 'framer-motion';
import styles from './section-testimonials.module.css';

export default function TestimonialsSection() {
  const testimonials = [
    {
      quote: 'DirectiveFilms transformed our sales process. Our close rate doubled in just 3 months.',
      author: 'Sarah Chen',
      role: 'VP of Sales, TechCorp',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop'
    },
    {
      quote: 'The ROI was immediate. Best marketing investment we\'ve ever made.',
      author: 'Michael Rodriguez',
      role: 'CEO, GrowthLabs',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'
    },
    {
      quote: 'They didn\'t just make beautiful videos—they built us a complete growth system.',
      author: 'Emily Watson',
      role: 'CMO, Scale Ventures',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop'
    },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          What Our Clients Say
        </motion.h2>
        <div className={styles.testimonialsGrid}>
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className={styles.testimonialCard}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <div className={styles.quoteIcon}>"</div>
              <p className={styles.quote}>{testimonial.quote}</p>
              <div className={styles.author}>
                <img
                  src={testimonial.image}
                  alt={testimonial.author}
                  className={styles.authorImage}
                />
                <div className={styles.authorInfo}>
                  <div className={styles.authorName}>{testimonial.author}</div>
                  <div className={styles.authorRole}>{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
