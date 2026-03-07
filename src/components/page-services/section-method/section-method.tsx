import { motion } from 'framer-motion';
import { Search, Lightbulb, Wrench, HeartHandshake } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import SectionEyebrow from '../../SectionEyebrow';
import { scrollReveal } from '@/utils/animations';
import styles from './section-method.module.css';

interface MethodStep {
  number: string;
  title: string;
  description: string;
}

const stepIcons = [Search, Lightbulb, Wrench, HeartHandshake];

export default function SectionMethod() {
  const { t } = useTranslation('services');
  const methodSteps = t('method.steps', { returnObjects: true }) as MethodStep[];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.div className={styles.header} {...scrollReveal}>
          <SectionEyebrow label={t('method.eyebrow')} description={t('method.description')} />
          <h2 className={styles.title}>
            {t('method.title')} <em className={styles.titleAccent}>{t('method.accent')}</em>
          </h2>
        </motion.div>

        <div className={styles.steps}>
          {methodSteps.map((step, i) => {
            const Icon = stepIcons[i] || stepIcons[0];
            return (
              <motion.div
                key={step.number}
                className={styles.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className={styles.stepIcon}>
                  <Icon size={40} strokeWidth={1.5} />
                </div>
                <div className={styles.stepNumber}>{step.number}</div>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDescription}>{step.description}</p>
                {i < methodSteps.length - 1 && (
                  <div className={styles.connector} />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
