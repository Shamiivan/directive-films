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
            Your business looks like a{' '}
            <em className={styles.titleAccent}>$10M operation</em>
            <br />
            in 30 days
          </h1>
          <p className={styles.description}>
            Audit, video, websites, CRM, and coaching — five services
            engineered to turn your pipeline into a revenue machine.
          </p>
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
              Book a Strategy Call
            </MagneticButton>
            <span className={styles.ctaNote}>30 min. No commitment.</span>
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
