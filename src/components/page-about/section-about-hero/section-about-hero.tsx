import { useTranslation } from 'react-i18next';
import styles from './section-about-hero.module.css';

export default function AboutHeroSection() {
  const { t } = useTranslation('about');

  return (
    <section className={styles.banner}>
      <div className={styles.wrap}>
        <span className={styles.eyebrow}>{t('hero.label')}</span>
        <h1 className={styles.heading}>
          {t('hero.title')}<br />
          <span className={styles.serifIt}>{t('hero.accent')}</span>
        </h1>
        <p className={styles.lead}>{t('hero.description')}</p>
      </div>
    </section>
  );
}
