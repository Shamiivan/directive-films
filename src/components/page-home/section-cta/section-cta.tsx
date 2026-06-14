import { useTranslation } from 'react-i18next';
import CtaButton from '@/components/shared/cta-button/cta-button';
import styles from './section-cta.module.css';

export default function CtaSection() {
  const { t } = useTranslation('home');

  return (
    <section className={styles.bigcta} id="work">
      <div className={styles.wrap}>
        <h2 className={styles.heading}>
          {t('finalCta.titleLine1')}<br />{t('finalCta.titleLine2')} <span className={styles.serifIt}>{t('finalCta.accent')}</span>
        </h2>
        <p className={styles.lead}>{t('finalCta.lead')}</p>
        <div className={styles.ctarow}>
          <CtaButton to="/contact">{t('finalCta.primary')}</CtaButton>
          <CtaButton to="/services" variant="outline">{t('finalCta.secondary')}</CtaButton>
        </div>
      </div>
    </section>
  );
}
