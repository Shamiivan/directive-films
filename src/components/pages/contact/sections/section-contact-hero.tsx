import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { scrollReveal } from '../../../../utils/animations';
import { EditableTranslation, useEditableTranslationField } from '@/cms/EditableTranslation';
import styles from './section-contact-hero.module.css';

export default function ContactHeroSection() {
  const { t } = useTranslation('contact');
  const emailField = useEditableTranslationField({ pageSlug: "contact", namespace: "contact", path: "hero.info.email.value" });
  const phoneField = useEditableTranslationField({ pageSlug: "contact", namespace: "contact", path: "hero.info.phone.value" });

  return (
    <section className={styles.contactHero}>
      <div className={styles.grain} />
      <div className={styles.container}>
        <motion.div
          className={styles.content}
          {...scrollReveal}
        >
          <div className={styles.leftSide}>
            <EditableTranslation pageSlug="contact" namespace="contact" path="hero.label" label="Hero label" as="span" className={styles.heroLabel} />
            <h1 className={styles.title}>
              <EditableTranslation pageSlug="contact" namespace="contact" path="hero.title" label="Hero title" />
              {' '}
              <em className={styles.titleAccent}>
                <EditableTranslation pageSlug="contact" namespace="contact" path="hero.accent" label="Hero accent" />
              </em>
            </h1>
            <EditableTranslation pageSlug="contact" namespace="contact" path="hero.description" label="Hero description" kind="text" as="p" className={styles.description} />

            <div className={styles.contactInfo}>
              <div className={styles.infoItem}>
                <div className={styles.iconWrapper}>
                  <Mail size={24} strokeWidth={1.5} />
                </div>
                <div className={styles.infoText}>
                  <EditableTranslation pageSlug="contact" namespace="contact" path="hero.info.email.label" label="Email label" as="h3" className={styles.infoLabel} />
                  <a href={`mailto:${emailField.value}`} className={styles.infoValue}>
                    <EditableTranslation pageSlug="contact" namespace="contact" path="hero.info.email.value" label="Email value" />
                  </a>
                </div>
              </div>

              <div className={styles.infoItem}>
                <div className={styles.iconWrapper}>
                  <Phone size={24} strokeWidth={1.5} />
                </div>
                <div className={styles.infoText}>
                  <EditableTranslation pageSlug="contact" namespace="contact" path="hero.info.phone.label" label="Phone label" as="h3" className={styles.infoLabel} />
                  <a href={`tel:${phoneField.value.replace(/\s/g, '')}`} className={styles.infoValue}>
                    <EditableTranslation pageSlug="contact" namespace="contact" path="hero.info.phone.value" label="Phone value" />
                  </a>
                </div>
              </div>

              <div className={styles.infoItem}>
                <div className={styles.iconWrapper}>
                  <MapPin size={24} strokeWidth={1.5} />
                </div>
                <div className={styles.infoText}>
                  <EditableTranslation pageSlug="contact" namespace="contact" path="hero.info.location.label" label="Location label" as="h3" className={styles.infoLabel} />
                  <EditableTranslation pageSlug="contact" namespace="contact" path="hero.info.location.value" label="Location value" kind="text" as="p" className={styles.infoValue} />
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
            <EditableTranslation pageSlug="contact" namespace="contact" path="hero.form.title" label="Form title" as="h2" className={styles.formTitle} />
            <EditableTranslation pageSlug="contact" namespace="contact" path="hero.form.subtitle" label="Form subtitle" kind="text" as="p" className={styles.formSubtitle} />

            <form className={styles.form}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <span className={styles.label}>
                    <EditableTranslation pageSlug="contact" namespace="contact" path="hero.form.fields.name.label" label="Name label" />
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
                    <EditableTranslation pageSlug="contact" namespace="contact" path="hero.form.fields.email.label" label="Email label" />
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
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <span className={styles.label}>
                    <EditableTranslation pageSlug="contact" namespace="contact" path="hero.form.fields.company.label" label="Company label" />
                  </span>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    className={styles.input}
                    placeholder={t('hero.form.fields.company.placeholder')}
                  />
                </div>

                <div className={styles.formGroup}>
                  <span className={styles.label}>
                    <EditableTranslation pageSlug="contact" namespace="contact" path="hero.form.fields.phone.label" label="Phone label" />
                  </span>
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
                <span className={styles.label}>
                  <EditableTranslation pageSlug="contact" namespace="contact" path="hero.form.fields.message.label" label="Message label" />
                </span>
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
                <EditableTranslation pageSlug="contact" namespace="contact" path="hero.form.submit" label="Submit button" />
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
