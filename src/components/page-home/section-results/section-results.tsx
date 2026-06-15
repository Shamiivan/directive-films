import { useTranslation } from 'react-i18next';
import styles from './section-results.module.css';

type Metric = {
  value: string;
  label: string;
  sub: string;
  gold?: boolean;
  suffix?: string;
};

export default function ResultsSection() {
  const { t } = useTranslation('home');
  const metrics = t('results.metrics', { returnObjects: true }) as Metric[];

  return (
    <section className={styles.results}>
      <div className={styles.wrap}>
        <div className={styles.sectionH}>
          <h2 className={styles.heading}>
            {t('results.headingLine1')}<br />
            {t('results.headingLine2')} <span className={styles.serifIt}>{t('results.headingAccent')}</span>
          </h2>
          <p className={styles.lead}>{t('results.lead')}</p>
        </div>

        <div className={styles.metrics}>
          {metrics.map((metric) => (
            <div className={styles.metric} key={metric.label}>
              <div className={styles.big}>
                {metric.gold ? <span className={styles.gold}>{metric.value}</span> : metric.value}
                {metric.suffix ? <span className={styles.gold}>{metric.suffix}</span> : null}
              </div>
              <div className={styles.cap}>{metric.label}</div>
              <div className={styles.sub}>{metric.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
