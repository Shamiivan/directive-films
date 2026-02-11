'use client';

import { motion } from 'framer-motion';
import MagneticButton from '../../MagneticButton';
import { scrollReveal } from '../../../utils/animations';
import styles from './section-cta.module.css';

export default function CtaSection() {
  return (
    <section className={styles.ctaSection}>
      <div className={styles.container}>
        <motion.div
          className={styles.content}
          {...scrollReveal}
        >
          <h2 className={styles.title}>
            Let's build your video strategy
          </h2>
          <p className={styles.subtitle}>
            30-minute call. We'll map your sales process, find where prospects ghost you,<br />
            and show you exactly which videos close those gaps.
          </p>
          <motion.div
            className={styles.ctaWrapper}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <MagneticButton href="/contact" className={styles.ctaButton}>
              Book Your Strategy Call
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
