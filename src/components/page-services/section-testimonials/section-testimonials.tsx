import { motion } from 'framer-motion';
import styles from './section-testimonials.module.css';

export default function TestimonialsSection() {
  const testimonials = [
    {
      quote: 'Our close rate went from 18% to 34% in three months. They made the videos, plugged them into our sales process, and it just started working.',
      author: 'Sarah Chen',
      role: 'VP of Sales, TechCorp',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop'
    },
    {
      quote: 'They looked at everything — site, CRM, content — told us what to fix first, then actually fixed it. Qualified leads tripled in four months.',
      author: 'Michael Rodriguez',
      role: 'CEO, GrowthLabs',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'
    },
    {
      quote: 'New CRM, new site, trained our sales team on video outreach. For the first time everything\'s connected and our sales cycle dropped by 40%.',
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
          What our clients say
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
