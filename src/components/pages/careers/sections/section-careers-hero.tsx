import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { scrollReveal } from '../../../../utils/animations';
import { EditableTranslation } from '@/cms/EditableTranslation';
import styles from './section-careers-hero.module.css';

export default function CareersHeroSection() {
  const { t } = useTranslation('careers');

  return (
    <section className={styles.careersHero}>
      <div className={styles.container}>
        <motion.div
          className={styles.content}
          {...scrollReveal}
        >
          <div className={styles.leftSide}>
            <EditableTranslation pageSlug="careers" namespace="careers" path="hero.title" label="Hero title" as="h1" className={styles.title} />
            <EditableTranslation pageSlug="careers" namespace="careers" path="hero.description" label="Hero description" kind="text" as="p" className={styles.description} />
          </div>

          <motion.div
            className={styles.formCard}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <EditableTranslation pageSlug="careers" namespace="careers" path="hero.form.title" label="Form title" as="h2" className={styles.formTitle} />
            <EditableTranslation pageSlug="careers" namespace="careers" path="hero.form.subtitle" label="Form subtitle" kind="text" as="p" className={styles.formSubtitle} />

            <form className={styles.form}>
              <div className={styles.formGroup}>
                <span className={styles.label}>
                  <EditableTranslation pageSlug="careers" namespace="careers" path="hero.form.fields.name.label" label="Name label" />
                </span>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className={styles.input}
                  placeholder={t('hero.form.fields.name.placeholder')}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <span className={styles.label}>
                  <EditableTranslation pageSlug="careers" namespace="careers" path="hero.form.fields.email.label" label="Email label" />
                </span>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={styles.input}
                  placeholder={t('hero.form.fields.email.placeholder')}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <span className={styles.label}>
                  <EditableTranslation pageSlug="careers" namespace="careers" path="hero.form.fields.phone.label" label="Phone label" />
                </span>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className={styles.input}
                  placeholder={t('hero.form.fields.phone.placeholder')}
                />
              </div>

              <div className={styles.formGroup}>
                <span className={styles.label}>
                  <EditableTranslation pageSlug="careers" namespace="careers" path="hero.form.fields.linkedin.label" label="LinkedIn label" />
                </span>
                <input
                  type="url"
                  id="linkedin"
                  name="linkedin"
                  className={styles.input}
                  placeholder={t('hero.form.fields.linkedin.placeholder')}
                />
              </div>

              <motion.button
                className={styles.submitButton}
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <EditableTranslation pageSlug="careers" namespace="careers" path="hero.form.submit" label="Submit button" />
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
