import { motion } from 'framer-motion';
import SectionEyebrow from '../../SectionEyebrow';
import styles from './section-testimonials.module.css';

export default function TestimonialsSection() {
  // TODO: Replace with real client testimonials when available
  const testimonials: {
    quote: string;
    author: string;
    role: string;
    image: string;
  }[] = [];

  if (testimonials.length === 0) return null;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <SectionEyebrow label="Testimonials" description="What clients say" />
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
