import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useLocalePath } from '../../../hooks/useLocalePath';
import styles from './section-cta.module.css';

export default function ServicesCta() {
  const l = useLocalePath();
  const { t } = useTranslation('services');

  return (
    <section className={styles.bigcta}>
      <div className={styles.wrap}>
        <h2 className={styles.heading}>{t('pageCta.title')}</h2>
        <p className={styles.lead}>{t('pageCta.lead')}</p>
        <div className={styles.ctarow}>
          <Link to={l('/contact')} className={styles.btn}>{t('pageCta.button')}</Link>
        </div>
      </div>
    </section>
  );
}

