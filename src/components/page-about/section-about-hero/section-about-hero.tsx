import { motion } from 'framer-motion';
import MagneticButton from '../../MagneticButton';
import styles from './section-about-hero.module.css';

export default function AboutHeroSection() {
  return (
    <section className={styles.heroSection}>
      <div className={styles.overlay} />
      <div className={styles.grain} />
      <div className={styles.container}>
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <span className={styles.label}>About Us</span>
          <h1 className={styles.title}>
            We came from sales. Not marketing{' '}
            <em className={styles.titleAccent}>school.</em>
          </h1>
          <p className={styles.description}>
            We've closed deals, built pipelines, and generated revenue.<br />
            Then we built the systems to do it at scale.
          </p>
          <motion.div
            className={styles.ctaWrapper}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <MagneticButton href="/contact" className={styles.ctaButton}>
              Get Your Free Audit
            </MagneticButton>
          </motion.div>
        </motion.div>

        <motion.div
          className={styles.verticalLine}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.2, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        />
      </div>
    </section>
  );
}
