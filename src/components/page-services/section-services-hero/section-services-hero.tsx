import { useTranslation } from 'react-i18next';
import styles from './section-services-hero.module.css';

export default function ServicesHeroSection() {
  const { t } = useTranslation('services');

  return (
    <section className={styles.banner}>
      <div className={styles.wrap}>
        <span className={styles.eyebrow}>{t('hero.label')}</span>
        <h1 className={styles.heading}>
          {t('hero.titleLine1')}<br />
          {t('hero.titleLine2')} <span className={styles.serifIt}>{t('hero.accent')}</span>
        </h1>
        <p className={styles.lead}>{t('hero.description')}</p>
      </div>
    </section>
  );
}

