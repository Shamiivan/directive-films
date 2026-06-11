import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { staggerListContainer, staggerListItem } from '@/utils/animations';
import styles from './section-open-positions.module.css';

type Job = {
  title: string;
  meta: string;
  tag: string;
};

export default function OpenPositionsSection() {
  const { t } = useTranslation('careers');
  const jobs = t('openRoles.jobs', { returnObjects: true }) as Job[];

  return (
    <section className={styles.section} id="apply">
      <div className={styles.wrap}>
        <div className={styles.head}>
          <span className={styles.eyebrow}>{t('openRoles.eyebrow')}</span>
          <span className={styles.count}>
            <strong>{jobs.length}</strong> open
          </span>
        </div>

        <motion.div
          className={styles.jobs}
          variants={staggerListContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={staggerListContainer.viewport}
        >
          {jobs.map((job) => (
            <motion.a
              key={job.title}
              href="mailto:info@directivefilms.com"
              className={styles.job}
              variants={staggerListItem}
            >
              <span className={styles.tag}>{job.tag}</span>
              <span className={styles.body}>
                <span className={styles.title}>{job.title}</span>
                <span className={styles.meta}>{job.meta}</span>
              </span>
              <span className={styles.apply}>
                {t('openRoles.apply')}
                <ArrowUpRight size={16} strokeWidth={2} />
              </span>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
