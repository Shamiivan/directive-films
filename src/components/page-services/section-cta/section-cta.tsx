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
            Ready to fix your <span className={styles.highlight}>pipeline</span>?
          </h2>
          <p className={styles.subtitle}>
            30 minutes. We'll find where you're losing deals and map out the fix.
          </p>
          <MagneticButton className={styles.ctaButton}>
            Schedule a Strategy Call
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
