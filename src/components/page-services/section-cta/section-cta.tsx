import { useTranslation } from 'react-i18next';
import CtaButton from '@/components/shared/cta-button/cta-button';
import styles from './section-cta.module.css';

export default function ServicesCta() {
  const { t } = useTranslation('services');

  return (
    <section className={styles.bigcta}>
      <div className={styles.wrap}>
        <h2 className={styles.heading}>{t('pageCta.title')}</h2>
        <p className={styles.lead}>{t('pageCta.lead')}</p>
        <div className={styles.ctarow}>
          <CtaButton to="/audit">{t('pageCta.button')}</CtaButton>
        </div>
      </div>
    </section>
  );
}
