import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import SectionEyebrow from '../../SectionEyebrow';
import { scrollReveal, gridStagger } from '@/utils/animations';
import styles from './section-process.module.css';

interface ProcessStep {
  title: string;
  description: string;
}

const processStepImages = [
  '/images/pre-production.jpg',
  '/images/production.jpg',
  '/images/post-production.jpg',
];

export default function ProcessSection() {
  const { t } = useTranslation('about');
  const localizedSteps = t('process.steps', { returnObjects: true }) as ProcessStep[];

  const processSteps = localizedSteps.map((step, i) => ({
    ...step,
    image: processStepImages[i] || processStepImages[0],
  }));

  return (
    <section className={styles.processSection}>
      <div className={styles.container}>
        <motion.div className={styles.header} {...scrollReveal}>
          <SectionEyebrow label={t('process.eyebrow')} description={t('process.description')} />
          <h2 className={styles.title}>
            {t('process.title')}{' '}
            <em className={styles.titleAccent}>{t('process.accent')}</em>
          </h2>
          <p className={styles.subtitle}>
            {t('process.subtitle')}
          </p>
        </motion.div>

        <motion.div
          className={styles.grid}
          variants={gridStagger}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: "-100px" }}
        >
          {processSteps.map((step, index) => (
            <motion.div
              key={step.title}
              className={styles.card}
              variants={scrollReveal}
            >
              <div className={styles.imageWrapper}>
                <img
                  src={step.image}
                  alt={step.title}
                  className={styles.image}
                />
              </div>
              <div className={styles.content}>
                <h3 className={styles.cardTitle}>{step.title}</h3>
                <p className={styles.cardDescription}>{step.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
