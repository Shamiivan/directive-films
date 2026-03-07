import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import MagneticButton from '../../MagneticButton';
import RotatingProofLine from '../../RotatingProofLine';
import { scrollReveal } from '../../../utils/animations';
import styles from './section-cta.module.css';

export default function CtaSection() {
  const { t } = useTranslation('home');

  return (
    <section className={styles.ctaSection}>
      <div className={styles.container}>
        <motion.div
          className={styles.content}
          {...scrollReveal}
        >
          <h2 className={styles.title}>
            {t('ctaSection.title')}
          </h2>
          <p className={styles.riskReversal}>
            {t('ctaSection.riskReversal')}
          </p>
          <RotatingProofLine />
          <motion.div
            className={styles.ctaWrapper}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <MagneticButton href="/contact" className={styles.ctaButton}>
              {t('ctaSection.button')}
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
