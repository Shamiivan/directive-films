import { useTranslation } from 'react-i18next';
import styles from './section-careers-hero.module.css';

export default function CareersHeroSection() {
  const { t } = useTranslation('careers');

  return (
    <section className={styles.banner}>
      <div className={styles.wrap}>
        <span className={styles.eyebrow}>{t('hero.eyebrow')}</span>
        <h1 className={styles.heading}>
          {t('hero.titleLine1')}<br />
          {t('hero.titleLine2')} <span className={styles.serifIt}>{t('hero.accent')}</span>
        </h1>
        <p className={styles.lead}>{t('hero.description')}</p>
        <div className={styles.ctarow}>
          <a href="#apply" className={styles.btn}>{t('hero.cta')}</a>
        </div>
      </div>
    </section>
  );
}

