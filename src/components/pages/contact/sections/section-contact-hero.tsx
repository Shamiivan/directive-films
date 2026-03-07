import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { scrollReveal } from '../../../../utils/animations';
import styles from './section-contact-hero.module.css';

export default function ContactHeroSection() {
  const { t } = useTranslation('contact');

  return (
    <section className={styles.contactHero}>
      <div className={styles.grain} />
      <div className={styles.container}>
        <motion.div
          className={styles.content}
          {...scrollReveal}
        >
          <div className={styles.leftSide}>
            <span className={styles.heroLabel}>{t('hero.label')}</span>
            <h1 className={styles.title}>
              {t('hero.title')} <em className={styles.titleAccent}>{t('hero.accent')}</em>
            </h1>
            <p className={styles.description}>
              {t('hero.description')}
            </p>

            <div className={styles.contactInfo}>
              <div className={styles.infoItem}>
                <div className={styles.iconWrapper}>
                  <Mail size={24} strokeWidth={1.5} />
                </div>
                <div className={styles.infoText}>
                  <h3 className={styles.infoLabel}>{t('hero.info.email.label')}</h3>
                  <a href={`mailto:${t('hero.info.email.value')}`} className={styles.infoValue}>
                    {t('hero.info.email.value')}
                  </a>
                </div>
              </div>

              <div className={styles.infoItem}>
                <div className={styles.iconWrapper}>
                  <Phone size={24} strokeWidth={1.5} />
                </div>
                <div className={styles.infoText}>
                  <h3 className={styles.infoLabel}>{t('hero.info.phone.label')}</h3>
                  <a href={`tel:${t('hero.info.phone.value').replace(/\s/g, '')}`} className={styles.infoValue}>
                    {t('hero.info.phone.value')}
                  </a>
                </div>
              </div>

              <div className={styles.infoItem}>
                <div className={styles.iconWrapper}>
                  <MapPin size={24} strokeWidth={1.5} />
                </div>
                <div className={styles.infoText}>
                  <h3 className={styles.infoLabel}>{t('hero.info.location.label')}</h3>
                  <p className={styles.infoValue}>
                    {t('hero.info.location.value')}
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
            <h2 className={styles.formTitle}>{t('hero.form.title')}</h2>
            <p className={styles.formSubtitle}>
              {t('hero.form.subtitle')}
            </p>

            <form className={styles.form}>
              <div className={styles.formRow}>
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
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="company" className={styles.label}>{t('hero.form.fields.company.label')}</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    className={styles.input}
                    placeholder={t('hero.form.fields.company.placeholder')}
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
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message" className={styles.label}>{t('hero.form.fields.message.label')}</label>
                <textarea
                  id="message"
                  name="message"
                  className={styles.textarea}
                  placeholder={t('hero.form.fields.message.placeholder')}
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
                {t('hero.form.submit')}
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
