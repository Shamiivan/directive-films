'use client';

import { motion } from 'framer-motion';
import MagneticButton from '../../MagneticButton';
import { scrollReveal } from '../../../utils/animations';
import styles from './section-cta.module.css';

export default function CtaSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.div
          className={styles.content}
          {...scrollReveal}
        >
          <h2 className={styles.title}>
            Ready to Drive <span className={styles.highlight}>Real Growth</span>?
          </h2>
          <p className={styles.subtitle}>
            Let's discuss how video can transform your business
          </p>
          <MagneticButton className={styles.ctaButton}>
            Schedule a Strategy Call
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
