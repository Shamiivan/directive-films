'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import { scrollReveal } from '../../../../utils/animations';
import styles from './section-contact-hero.module.css';

export default function ContactHeroSection() {
  return (
    <section className={styles.contactHero}>
      <div className={styles.container}>
        <motion.div
          className={styles.content}
          {...scrollReveal}
        >
          <div className={styles.leftSide}>
            <h1 className={styles.title}>Get in touch</h1>
            <p className={styles.description}>
              Ready to create video content that drives real business results? Let's talk about your project and how we can help you grow.
            </p>

            <div className={styles.contactInfo}>
              <div className={styles.infoItem}>
                <div className={styles.iconWrapper}>
                  <Mail size={24} strokeWidth={1.5} />
                </div>
                <div className={styles.infoText}>
                  <h3 className={styles.infoLabel}>Email</h3>
                  <a href="mailto:info@directivefilms.com" className={styles.infoValue}>
                    info@directivefilms.com
                  </a>
                </div>
              </div>

              <div className={styles.infoItem}>
                <div className={styles.iconWrapper}>
                  <Phone size={24} strokeWidth={1.5} />
                </div>
                <div className={styles.infoText}>
                  <h3 className={styles.infoLabel}>Phone</h3>
                  <a href="tel:+15145550100" className={styles.infoValue}>
                    +1 514-555-0100
                  </a>
                </div>
              </div>

              <div className={styles.infoItem}>
                <div className={styles.iconWrapper}>
                  <MapPin size={24} strokeWidth={1.5} />
                </div>
                <div className={styles.infoText}>
                  <h3 className={styles.infoLabel}>Location</h3>
                  <p className={styles.infoValue}>
                    Montreal, QC
                  </p>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            className={styles.formCard}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h2 className={styles.formTitle}>Send us a message</h2>
            <p className={styles.formSubtitle}>
              Tell us about your project and we'll get back to you within 24 hours.
            </p>

            <form className={styles.form}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="name" className={styles.label}>Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className={styles.input}
                    placeholder="Your name"
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
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="company" className={styles.label}>Company</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    className={styles.input}
                    placeholder="Your company"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="phone" className={styles.label}>Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className={styles.input}
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message" className={styles.label}>Message *</label>
                <textarea
                  id="message"
                  name="message"
                  className={styles.textarea}
                  placeholder="Tell us about your project..."
                  rows={5}
                  required
                ></textarea>
              </div>

              <motion.button
                className={styles.submitButton}
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
