import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import MagneticButton from '../../MagneticButton';
import styles from './section-about-hero.module.css';

export default function AboutHeroSection() {
  const { t } = useTranslation('about');

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
          <span className={styles.label}>{t('hero.label')}</span>
          <h1 className={styles.title}>
            {t('hero.title')}{' '}
            <em className={styles.titleAccent}>{t('hero.accent')}</em>
          </h1>
          <p className={styles.description}>
            {t('hero.description')}
          </p>
          <motion.div
            className={styles.ctaWrapper}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <MagneticButton href="/contact" className={styles.ctaButton}>
              {t('hero.cta')}
            </MagneticButton>
          </motion.div>
        </motion.div>

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
