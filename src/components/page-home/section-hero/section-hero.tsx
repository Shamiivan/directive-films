import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useLocalePath } from '../../../hooks/useLocalePath';
import styles from './section-hero.module.css';

type HeroStat = {
  value: string;
  accent?: string;
  label: string;
};

export default function HeroSection() {
  const l = useLocalePath();
  const { t } = useTranslation('home');
  const stats = t('hero.stats', { returnObjects: true }) as HeroStat[];

  return (
    <section className={styles.hero}>
      <div className={styles.herobg}>
        <div className={`${styles.hbLayer} ${styles.hb1}`} />
        <div className={`${styles.hbLayer} ${styles.hb2}`} />
        <div className={styles.hbSweep} />
        <div className={styles.hbBokeh}>
          <span /><span /><span /><span /><span /><span />
        </div>
      </div>
      <div className={styles.heroveil} />
      <div className={styles.grain} />

      <div className={styles.wrap}>
        <div className={styles.heroflex}>
          <div>
            <span className={styles.eyebrow}>{t('hero.eyebrow')}</span>
            <h1 className={styles.heroTitle}>
              {t('hero.title.line1')}<br />
              <span className={styles.exSerif}>{t('hero.title.accent')}</span> {t('hero.title.line2')}
            </h1>
            <p className={styles.lead}>
              {t('hero.lead')}{' '}
              <b className={styles.gold}>{t('hero.leadStrong')}</b>
            </p>
            <div className={styles.herocta}>
              <Link to={l('/contact')} className={styles.btn}>{t('hero.ctaPrimary')}</Link>
              <a className={styles.btnGhost} href="#work">{t('hero.ctaSecondary')}</a>
            </div>
          </div>

          <div className={styles.herometa}>
            <div className={styles.statline}>
              {stats.slice(0, 2).map((stat) => (
                <div key={stat.label}>
                  <div className={styles.statN}>{stat.accent ? <><span className={styles.gold}>{stat.value}</span>{stat.accent}</> : stat.value}</div>
                  <div className={styles.statL}>{stat.label}</div>
                </div>
              ))}
            </div>
            <div className={styles.statlineNoBorder}>
              {stats.slice(2).map((stat) => (
                <div key={stat.label}>
                  <div className={styles.statN}>{stat.accent ? <>{stat.value}<span className={styles.gold}>{stat.accent}</span></> : stat.value}</div>
                  <div className={styles.statL}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

