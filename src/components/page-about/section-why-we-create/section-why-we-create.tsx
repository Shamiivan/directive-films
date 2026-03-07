import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import SectionEyebrow from '../../SectionEyebrow';
import { scrollReveal, gridStagger } from '@/utils/animations';
import styles from './section-why-we-create.module.css';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

export default function WhyWeCreateSection() {
  const { t } = useTranslation('about');
  const features = t('why.features', { returnObjects: true }) as Feature[];

  return (
    <section className={styles.whyWeCreateSection}>
      <div className={styles.container}>
        <motion.div className={styles.header} {...scrollReveal}>
          <SectionEyebrow label={t('why.eyebrow')} description={t('why.description')} />
          <h2 className={styles.title}>
            {t('why.title')}{' '}
            <em className={styles.titleAccent}>{t('why.accent')}</em>
          </h2>
        </motion.div>

        <motion.div
          className={styles.featuresGrid}
          variants={gridStagger}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.icon}
              className={styles.featureCard}
              variants={scrollReveal}
            >
              <div className={styles.icon}>{feature.icon}</div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
