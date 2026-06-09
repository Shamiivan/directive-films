import { useTranslation } from 'react-i18next';
import styles from './section-open-positions.module.css';

type Job = {
  title: string;
  meta: string;
  tag: string;
};

export default function OpenPositionsSection() {
  const { t } = useTranslation('careers');
  const jobs = t('openRoles.jobs', { returnObjects: true }) as Job[];

  return (
    <section className={styles.section} id="apply">
      <div className={styles.wrap}>
        <span className={styles.eyebrow}>{t('openRoles.eyebrow')}</span>
        <div className={styles.jobs}>
          {jobs.map((job) => (
            <div key={job.title} className={styles.job}>
              <div>
                <h3>{job.title}</h3>
                <div className={styles.meta}>{job.meta}</div>
              </div>
              <div className={styles.jobRight}>
                <span className={styles.pill}>{job.tag}</span>
                <a href="mailto:info@directivefilms.com" className={styles.btn}>{t('openRoles.apply')}</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

