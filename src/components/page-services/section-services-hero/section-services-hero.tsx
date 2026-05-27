import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import MagneticButton from '../../MagneticButton';
import { EditableTranslation } from '@/cms/EditableTranslation';
import styles from './section-services-hero.module.css';

export default function ServicesHeroSection() {
  const { t } = useTranslation('services');
  const outcomes = t('hero.outcomes', { returnObjects: true }) as string[];

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
          <EditableTranslation pageSlug="services" namespace="services" path="hero.label" label="Hero label" as="span" className={styles.label} />
          <h1 className={styles.title}>
            <EditableTranslation pageSlug="services" namespace="services" path="hero.title" label="Hero title" />
            {' '}
            <em className={styles.titleAccent}>
              <EditableTranslation pageSlug="services" namespace="services" path="hero.accent" label="Hero accent" />
            </em>
          </h1>
          <EditableTranslation pageSlug="services" namespace="services" path="hero.description" label="Hero description" kind="text" as="p" className={styles.description} />
          <ul className={styles.outcomes}>
            {outcomes.map((outcome, i) => (
              <li key={i}>
                <EditableTranslation
                  pageSlug="services"
                  namespace="services"
                  path={`hero.outcomes.${i}`}
                  label={`Outcome ${i + 1}`}
                />
              </li>
            ))}
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
              <EditableTranslation pageSlug="services" namespace="services" path="hero.cta" label="Hero button" />
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
