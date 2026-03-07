import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import MagneticButton from '../../MagneticButton';
import { scrollReveal } from '../../../utils/animations';
import styles from './section-cta.module.css';

export default function CtaSection() {
  const { t } = useTranslation('services');

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.div
          className={styles.content}
          {...scrollReveal}
        >
          <h2 className={styles.title}>
            {t('cta.title')} <span className={styles.highlight}>{t('cta.highlight')}</span>
          </h2>
          <p className={styles.subtitle}>
            {t('cta.subtitle')}
          </p>
          <MagneticButton href="/contact" className={styles.ctaButton}>
            {t('cta.button')}
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
