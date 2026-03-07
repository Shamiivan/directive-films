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
            Know what to <span className={styles.highlight}>fix first</span>
          </h2>
          <p className={styles.subtitle}>
            30 minutes. We'll tell you what we'd focus on first.
          </p>
          <MagneticButton href="/contact" className={styles.ctaButton}>
            Let's talk
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
