import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { EditableTranslation } from '@/cms/EditableTranslation';
import { scrollReveal } from '@/utils/animations';
import styles from './section-problem.module.css';

export default function SectionProblem() {
  const { t } = useTranslation('services');
  const symptoms = t('problem.symptoms', { returnObjects: true }) as string[];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.symptomsCol}>
            {symptoms.map((_symptom, i) => (
              <motion.div
                key={i}
                className={styles.symptom}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <span className={styles.dash} />
                <EditableTranslation
                  pageSlug="services"
                  namespace="services"
                  path={`problem.symptoms.${i}`}
                  label={`Symptom ${i + 1}`}
                  kind="text"
                  as="p"
                  className={styles.symptomText}
                />
              </motion.div>
            ))}
          </div>

          <motion.div className={styles.reframeCol} {...scrollReveal}>
            <div className={styles.goldDivider} />
            <p className={styles.reframeText}>
              <EditableTranslation
                pageSlug="services"
                namespace="services"
                path="problem.reframeLead"
                label="Reframe lead"
              />{' '}
              <strong>
                <EditableTranslation
                  pageSlug="services"
                  namespace="services"
                  path="problem.reframeEmphasis"
                  label="Reframe emphasis"
                />
              </strong>
            </p>
            <EditableTranslation
              pageSlug="services"
              namespace="services"
              path="problem.bridge"
              label="Bridge"
              kind="text"
              as="p"
              className={styles.bridge}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
