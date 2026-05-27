import { motion } from 'framer-motion';
import MagneticButton from '../../MagneticButton';
import RotatingProofLine from '../../RotatingProofLine';
import { EditableTranslation } from '@/cms/EditableTranslation';
import { scrollReveal } from '../../../utils/animations';
import styles from './section-cta.module.css';

export default function CtaSection() {
  return (
    <section className={styles.ctaSection}>
      <div className={styles.container}>
        <motion.div
          className={styles.content}
          {...scrollReveal}
        >
          <EditableTranslation
            pageSlug="home"
            namespace="home"
            path="ctaSection.title"
            label="CTA title"
            kind="text"
            as="h2"
            className={styles.title}
          />
          <EditableTranslation
            pageSlug="home"
            namespace="home"
            path="ctaSection.riskReversal"
            label="Risk reversal"
            kind="text"
            as="p"
            className={styles.riskReversal}
          />
          <RotatingProofLine />
          <motion.div
            className={styles.ctaWrapper}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <MagneticButton href="/contact" className={styles.ctaButton}>
              <EditableTranslation
                pageSlug="home"
                namespace="home"
                path="ctaSection.button"
                label="CTA button"
              />
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
