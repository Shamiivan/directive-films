import { Banknote, Target, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import SectionHeader from '@/components/shared/section-header/section-header';
import { gridStagger, staggerListContainer, staggerListItem } from '@/utils/animations';
import styles from './section-what-you-get.module.css';

type Perk = {
  title: string;
  body: string;
};

type PayStat = {
  value: string;
  label: string;
};

const icons = [Banknote, Target, Rocket];

const perkItem = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as any },
};

export default function WhatYouGetSection() {
  const { t } = useTranslation('careers');
  const perks = t('pay.perks', { returnObjects: true }) as Perk[];
  const stats = t('pay.stats', { returnObjects: true }) as PayStat[];

  return (
    <section className={styles.section}>
      <div className={styles.wrap}>
        <SectionHeader
          tone="light"
          eyebrow={t('pay.eyebrow')}
          title={t('pay.title')}
          intro={t('pay.lead')}
        />

        {/* Comp model — three load-bearing cards that fill their space: a big
            value word up top, the meaning below, no empty bottoms. */}
        <motion.div
          className={styles.comp}
          variants={staggerListContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={staggerListContainer.viewport}
        >
          {stats.map((stat, i) => (
            <motion.div
              className={[styles.compCard, i === 1 ? styles.compJoin : ''].join(' ')}
              key={stat.value}
              variants={staggerListItem}
            >
              <span className={styles.compIndex}>{`0${i + 1}`}</span>
              <span className={styles.compValue}>{stat.value}</span>
              <span className={styles.compLabel}>{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>

        <div className={styles.perksHead}>
          <span className={styles.perksEyebrow}>{t('pay.perksEyebrow')}</span>
        </div>
        <motion.div
          className={styles.perks}
          variants={gridStagger}
          initial="initial"
          whileInView="whileInView"
          viewport={gridStagger.viewport}
        >
          {perks.map((perk, index) => {
            const Icon = icons[index];
            return (
              <motion.div
                key={perk.title}
                className={styles.perk}
                variants={perkItem}
              >
                <div className={styles.ico}><Icon size={22} strokeWidth={1.5} /></div>
                <h3>{perk.title}</h3>
                <p>{perk.body}</p>
                <span className={styles.perkRule} aria-hidden="true" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
