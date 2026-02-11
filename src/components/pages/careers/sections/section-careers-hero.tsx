'use client';

import { motion } from 'framer-motion';
import { scrollReveal } from '../../../../utils/animations';
import styles from './section-careers-hero.module.css';

export default function CareersHeroSection() {
  return (
    <section className={styles.careersHero}>
      <div className={styles.container}>
        <motion.div
          className={styles.content}
          {...scrollReveal}
        >
          <div className={styles.leftSide}>
            <h1 className={styles.title}>Join our team</h1>
            <p className={styles.description}>
              We're looking for talented individuals who are passionate about creating
              compelling video content. Join us in shaping the future of video marketing.
            </p>
          </div>

          <motion.div
            className={styles.formCard}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h2 className={styles.formTitle}>Boost your career</h2>
            <p className={styles.formSubtitle}>
              Send us your information and we'll get in touch about open positions.
            </p>

            <form className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.label}>Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className={styles.input}
                  placeholder="Your full name"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.label}>Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={styles.input}
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="phone" className={styles.label}>Phone number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className={styles.input}
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="linkedin" className={styles.label}>LinkedIn link</label>
                <input
                  type="url"
                  id="linkedin"
                  name="linkedin"
                  className={styles.input}
                  placeholder="linkedin.com/in/yourprofile"
                />
              </div>

              <motion.button
                className={styles.submitButton}
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                Apply now
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
