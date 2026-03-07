import { motion } from 'framer-motion';
import styles from './SectionEyebrow.module.css';

interface SectionEyebrowProps {
  label: string;
  description?: string;
}

export default function SectionEyebrow({ label, description }: SectionEyebrowProps) {
  return (
    <motion.div
      className={styles.sectionDivider}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4 }}
    >
      <span className={styles.dividerLabel}>{label}</span>
      <span className={styles.dividerLine} />
      {description && <span className={styles.dividerDesc}>{description}</span>}
    </motion.div>
  );
}
