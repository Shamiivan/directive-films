import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { scrollReveal } from '../../../../utils/animations';
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
            <h1 className={styles.title}>{t('hero.title')}</h1>
            <p className={styles.description}>
              {t('hero.description')}
            </p>
          </div>

          <motion.div
            className={styles.formCard}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h2 className={styles.formTitle}>{t('hero.form.title')}</h2>
            <p className={styles.formSubtitle}>
              {t('hero.form.subtitle')}
            </p>

            <form className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.label}>{t('hero.form.fields.name.label')}</label>
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
                <label htmlFor="email" className={styles.label}>{t('hero.form.fields.email.label')}</label>
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
                <label htmlFor="phone" className={styles.label}>{t('hero.form.fields.phone.label')}</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className={styles.input}
                  placeholder={t('hero.form.fields.phone.placeholder')}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="linkedin" className={styles.label}>{t('hero.form.fields.linkedin.label')}</label>
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
                {t('hero.form.submit')}
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
