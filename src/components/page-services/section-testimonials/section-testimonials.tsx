import { useTranslation } from 'react-i18next';
import SectionHeader from '@/components/shared/section-header/section-header';
import ReviewsMarquee from '@/components/shared/reviews/reviews-marquee';
import styles from './section-testimonials.module.css';

export default function TestimonialsSection() {
  const { t } = useTranslation('services');

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <SectionHeader
          tone="light"
          eyebrow={t('testimonials.eyebrow')}
          title={t('testimonials.title')}
        />
      </div>
      <ReviewsMarquee />
    </section>
  );
}
