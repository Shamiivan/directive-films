import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import CtaButton from '@/components/shared/cta-button/cta-button';
import { staggerListContainer, staggerListItem } from '@/utils/animations';
import styles from './section-careers-hero.module.css';

export default function CareersHeroSection() {
  const { t } = useTranslation('careers');

  return (
    <section className={styles.banner}>
      <motion.div
        className={styles.wrap}
        variants={staggerListContainer}
        initial="initial"
        whileInView="whileInView"
        viewport={staggerListContainer.viewport}
      >
        <motion.span className={styles.eyebrow} variants={staggerListItem}>
          {t('hero.eyebrow')}
        </motion.span>
        <motion.h1 className={styles.heading} variants={staggerListItem}>
          {t('hero.titleLine1')}<br />
          {t('hero.titleLine2')} <span className={styles.serifIt}>{t('hero.accent')}</span>
        </motion.h1>
        <motion.p className={styles.lead} variants={staggerListItem}>
          {t('hero.description')}
        </motion.p>
        <motion.div className={styles.ctarow} variants={staggerListItem}>
          <CtaButton href="#apply">{t('hero.cta')}</CtaButton>
          <CtaButton to="/audit" variant="outline">{t('ctaFreeAudit', { ns: 'common' })}</CtaButton>
        </motion.div>
      </motion.div>
    </section>
  );
}
