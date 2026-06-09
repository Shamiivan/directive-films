import { Banknote, Target, Rocket } from 'lucide-react';
import { useTranslation } from 'react-i18next';
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

export default function WhatYouGetSection() {
  const { t } = useTranslation('careers');
  const perks = t('pay.perks', { returnObjects: true }) as Perk[];
  const stats = t('pay.stats', { returnObjects: true }) as PayStat[];

  return (
    <section className={styles.section}>
      <div className={styles.wrap}>
        <div className={styles.commbox}>
          <span className={styles.eyebrow}>{t('pay.eyebrow')}</span>
          <h2>{t('pay.title')}</h2>
          <p className={styles.lead}>{t('pay.lead')}</p>
          <div className={styles.commrow}>
            {stats.map((stat) => (
              <div className={styles.commstat} key={stat.value}>
                <div className={styles.n}>{stat.value}</div>
                <div className={styles.l}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <span className={styles.perksEyebrow}>{t('pay.perksEyebrow')}</span>
        <div className={styles.perks}>
          {perks.map((perk, index) => {
            const Icon = icons[index];
            return (
              <div key={perk.title} className={styles.perk}>
                <div className={styles.ico}><Icon size={22} strokeWidth={1.5} /></div>
                <h3>{perk.title}</h3>
                <p>{perk.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

