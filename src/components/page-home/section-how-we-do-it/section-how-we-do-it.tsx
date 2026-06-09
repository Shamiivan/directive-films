import { useTranslation } from 'react-i18next';
import styles from './section-how-we-do-it.module.css';

type Step = {
  title: string;
  description: string;
};

export default function HowWeDoItSection() {
  const { t } = useTranslation('home');
  const steps = t('process.steps', { returnObjects: true }) as Step[];

  return (
    <section className={styles.section}>
      <div className={styles.wrap}>
        <span className={styles.eyebrow}>{t('process.eyebrow')}</span>
        <h2 className={styles.heading}>{t('process.title')}</h2>

        <div className={styles.steps}>
          {steps.map((step, index) => (
            <div className={styles.step} key={step.title}>
              <div className={styles.num}>{String(index + 1).padStart(2, '0')}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

