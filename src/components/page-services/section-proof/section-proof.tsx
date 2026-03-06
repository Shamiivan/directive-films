import { motion } from 'framer-motion';
import { scrollReveal } from '@/utils/animations';
import { proofResults, testimonials, aggregateStats } from '../services-data';
import styles from './section-proof.module.css';

export default function SectionProof() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.div className={styles.header} {...scrollReveal}>
          <span className={styles.label}>Results</span>
          <h2 className={styles.title}>
            Numbers, not <em className={styles.titleAccent}>promises</em>
          </h2>
        </motion.div>

        {/* Aggregate stats */}
        <div className={styles.statsRow}>
          {aggregateStats.map((stat, i) => (
            <motion.div
              key={i}
              className={styles.statItem}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Case results */}
        <div className={styles.results}>
          {proofResults.map((result, i) => (
            <motion.div
              key={i}
              className={styles.resultCard}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
            >
              <span className={styles.clientType}>{result.clientType}</span>
              <div className={styles.resultFlow}>
                <span className={styles.resultProblem}>{result.problem}</span>
                <span className={styles.resultArrow}>&rarr;</span>
                <span className={styles.resultChange}>{result.change}</span>
              </div>
              <div className={styles.resultMetric}>{result.metric}</div>
            </motion.div>
          ))}
        </div>

        {/* Testimonial quotes */}
        <div className={styles.quotes}>
          {testimonials.map((t, i) => (
            <motion.blockquote
              key={i}
              className={styles.quoteCard}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <span className={styles.quoteIcon}>&ldquo;</span>
              <p className={styles.quoteText}>{t.quote}</p>
              <footer className={styles.quoteFooter}>
                <span className={styles.quoteAccent} />
                <div>
                  <span className={styles.quoteAuthor}>{t.author}</span>
                  <span className={styles.quoteRole}>{t.role}</span>
                </div>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
