import { useTranslation } from 'react-i18next';
import CtaButton from '@/components/shared/cta-button/cta-button';
import styles from './section-hero.module.css';

type HeroStat = {
  value: string;
  accent?: string;
  label: string;
};

export default function HeroSection() {
  const { t } = useTranslation('home');
  const stats = t('hero.stats', { returnObjects: true }) as HeroStat[];

  return (
    <section className={styles.hero}>
      <div className={styles.herobg}>
        <video
          className={styles.heroVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/website_landing_bg.jpg"
          aria-hidden="true"
        >
          <source src="/videos/show_reel.mp4" type="video/mp4" />
        </video>
      </div>
      <div className={styles.heroveil} />
      <div className={styles.grain} />

      <div className={styles.wrap}>
        <div className={styles.heroflex}>
          <div>
            <h1 className={styles.heroTitle}>
              {t('hero.title.line1')}<br />
              <span className={styles.exSerif}>{t('hero.title.accent')}</span> {t('hero.title.line2')}
            </h1>
            <p className={styles.lead}>
              {t('hero.lead')}{' '}
              <b className={styles.gold}>{t('hero.leadStrong')}</b>
            </p>
            <div className={styles.herocta}>
              <CtaButton to="/contact">{t('hero.ctaPrimary')}</CtaButton>
              <CtaButton href="#work" variant="outline">{t('hero.ctaSecondary')}</CtaButton>
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
