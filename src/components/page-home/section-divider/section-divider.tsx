'use client';

import { motion } from 'framer-motion';
import styles from './section-divider.module.css';

export default function DividerSection() {
  return (
    <section className={styles.dividerSection}>
      <div className={styles.container}>
        <motion.div
          className={styles.line}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        />
      </div>
    </section>
  );
}
