import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useLocalePath } from '../../../hooks/useLocalePath';
import styles from './section-cta.module.css';

export default function CtaSection() {
  const l = useLocalePath();
  const { t } = useTranslation('home');

  return (
    <section className={styles.bigcta} id="work">
      <div className={styles.wrap}>
        <h2 className={styles.heading}>
          {t('finalCta.titleLine1')}<br />{t('finalCta.titleLine2')} <span className={styles.serifIt}>{t('finalCta.accent')}</span>
        </h2>
        <p className={styles.lead}>{t('finalCta.lead')}</p>
        <div className={styles.ctarow}>
          <Link to={l('/contact')} className={styles.btn}>{t('finalCta.primary')}</Link>
          <Link to={l('/services')} className={styles.btnGhost}>{t('finalCta.secondary')}</Link>
        </div>
      </div>
    </section>
  );
}

