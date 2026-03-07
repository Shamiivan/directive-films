import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import SectionEyebrow from '../../SectionEyebrow';
import { scrollReveal } from '@/utils/animations';
import styles from './section-proof.module.css';

interface ProofResult {
  clientType: string;
  problem: string;
  change: string;
  metric: string;
}

export default function SectionProof() {
  const { t } = useTranslation('services');
  const results = t('proof.results', { returnObjects: true }) as ProofResult[];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.div className={styles.header} {...scrollReveal}>
          <SectionEyebrow label={t('proof.eyebrow')} description={t('proof.description')} />
          <h2 className={styles.title}>
            {t('proof.title')} <em className={styles.titleAccent}>{t('proof.accent')}</em>
          </h2>
        </motion.div>

        {/* Aggregate stats placeholder - can be localized when real stats added */}
        <div className={styles.statsRow}>
          {/* aggregateStats.map... */}
        </div>

        {/* Proof Results - Added this based on services-data.ts but it wasn't in the original JSX! 
            Let's add it to make the localization meaningful. */}
        <div className={styles.resultsGrid}>
          {results.map((result, i) => (
            <motion.div
              key={i}
              className={styles.resultCard}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <h4 className={styles.clientType}>{result.clientType}</h4>
              <p className={styles.resultProblem}><strong>{t('proof.labels.problem', 'Problem')}:</strong> {result.problem}</p>
              <p className={styles.resultChange}><strong>{t('proof.labels.change', 'Change')}:</strong> {result.change}</p>
              <p className={styles.resultMetric}>{result.metric}</p>
            </motion.div>
          ))}
        </div>

        {/* Testimonial quotes */}
        <div className={styles.quotes}>
          {/* testimonials.map... */}
        </div>
      </div>
    </section>
  );
}
