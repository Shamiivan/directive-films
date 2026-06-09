import { useTranslation } from 'react-i18next';
import styles from './section-testimonials.module.css';

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  initials: string;
};

export default function TestimonialsSection() {
  const { t } = useTranslation('services');
  const testimonials = t('testimonials.items', { returnObjects: true }) as Testimonial[];

  return (
    <section className={styles.section}>
      <div className={styles.wrap}>
        <span className={styles.eyebrow}>{t('testimonials.eyebrow')}</span>
        <h2 className={styles.heading}>{t('testimonials.title')}</h2>

        <div className={styles.quotes}>
          {testimonials.map((item) => (
            <div key={item.name} className={styles.quote}>
              <div className={styles.stars}>★★★★★</div>
              <p>{item.quote}</p>
              <div className={styles.who}>
                <div className={styles.av}>{item.initials}</div>
                <div>
                  <b>{item.name}</b>
                  <span>{item.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

