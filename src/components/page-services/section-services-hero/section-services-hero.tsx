import { motion } from 'framer-motion';
import MagneticButton from '../../MagneticButton';
import styles from './section-services-hero.module.css';

export default function ServicesHeroSection() {
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
          <span className={styles.label}>Our Services</span>
          <h1 className={styles.title}>
            We fix how you{' '}
            <em className={styles.titleAccent}>sell online</em>
          </h1>
          <p className={styles.description}>
            You're good at what you do. Your online presence just doesn't show it yet. We fix that.
          </p>
          <ul className={styles.outcomes}>
            <li>A website that actually represents your work</li>
            <li>Content built around how you sell</li>
            <li>A system you can see working</li>
          </ul>
          <motion.div
            className={styles.ctaWrapper}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.6,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            <MagneticButton href="/contact" className={styles.ctaButton}>
              Tell us what you need
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* Decorative vertical line */}
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
