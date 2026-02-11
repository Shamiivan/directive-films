'use client';

import { motion } from 'framer-motion';
import MagneticButton from '../../MagneticButton';
import styles from './section-services-hero.module.css';

export default function ServicesHeroSection() {
  return (
    <section className={styles.heroSection}>
      <div className={styles.overlay}></div>
      <div className={styles.container}>
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <h1 className={styles.title}>
            Driven By Purpose
          </h1>
          <h2 className={styles.subtitle}>
            Videos That Drive <span className={styles.growth}>Growth</span>
          </h2>
          <p className={styles.description}>
            Strategic video production that transforms your business.<br />
            From concept to conversion, we deliver results that matter.
          </p>
          <motion.div
            className={styles.ctaWrapper}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <MagneticButton className={styles.ctaButton}>
              See Our Services
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
