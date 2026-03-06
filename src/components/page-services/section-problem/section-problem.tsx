import { motion } from 'framer-motion';
import { scrollReveal } from '@/utils/animations';
import styles from './section-problem.module.css';

const symptoms = [
  'Your site looks fine but doesn\'t book meetings',
  'Content happens when someone remembers to post',
  'Leads come in but follow-up is manual and inconsistent',
  'You can\'t tell which marketing is actually working',
  'Your competitors\' online presence looks better than yours',
  'Your sales team explains the same thing on every call',
];

export default function SectionProblem() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.div className={styles.header} {...scrollReveal}>
          <span className={styles.label}>Sound familiar?</span>
        </motion.div>

        <div className={styles.grid}>
          <div className={styles.symptomsCol}>
            {symptoms.map((symptom, i) => (
              <motion.div
                key={i}
                className={styles.symptom}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <span className={styles.dash} />
                <p className={styles.symptomText}>{symptom}</p>
              </motion.div>
            ))}
          </div>

          <motion.div className={styles.reframeCol} {...scrollReveal}>
            <div className={styles.goldDivider} />
            <p className={styles.reframeText}>
              These aren't effort problems. <strong>They're system problems.</strong>
            </p>
            <p className={styles.bridge}>We fix them the same way every time.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
