import { useTranslation } from 'react-i18next';
import styles from './section-why-we-create.module.css';

interface ValueItem {
  title: string;
  description: string;
}

export default function WhyWeCreateSection() {
  const { t } = useTranslation('about');
  const values = t('why.features', { returnObjects: true }) as ValueItem[];

  return (
    <section className={styles.section}>
      <div className={styles.wrap}>
        <span className={styles.eyebrow}>{t('why.eyebrow')}</span>
        <h2 className={styles.heading}>{t('why.title')}</h2>

        <div className={styles.vals}>
          {values.map((v) => (
            <div key={v.title} className={styles.val}>
              <h3>{v.title}</h3>
              <p>{v.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
