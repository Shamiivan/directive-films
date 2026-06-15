import { useTranslation } from 'react-i18next';
import styles from './section-selected-work.module.css';

type WorkItem = {
  title: string;
  category: string;
  image: string;
};

// A restrained "Our Work" band for the About page. Cinematic stills in an
// editorial grid, surgical gold on the category labels. Content seeded from the
// services work gallery (about.selectedWork) so the About page owns its copy.
// NOTE: images are still Unsplash placeholders — swap for real project stills
// before this ships, per the "the page has to look like the work is good" brief.
export default function SelectedWorkSection() {
  const { t } = useTranslation('about');
  const items = t('selectedWork.items', { returnObjects: true }) as WorkItem[];

  return (
    <section className={styles.section}>
      <div className={styles.wrap}>
        <header className={styles.head}>
          <h2 className={styles.heading}>
            {t('selectedWork.title')}{' '}
            <em className={styles.accent}>{t('selectedWork.accent')}</em>
          </h2>
          <p className={styles.subtitle}>{t('selectedWork.subtitle')}</p>
        </header>

        <div className={styles.grid}>
          {items.map((item) => (
            <article className={styles.card} key={item.title}>
              <div className={styles.media}>
                <img
                  src={item.image}
                  alt={item.title}
                  className={styles.image}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className={styles.meta}>
                <span className={styles.category}>{item.category}</span>
                <h3 className={styles.title}>{item.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
