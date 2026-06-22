import { useTranslation } from 'react-i18next';
import SectionHeader from '@/components/shared/section-header/section-header';
import styles from './section-ad-proof.module.css';

const AD_COUNT = 20;

// A repeating rhythm of card heights + tilt so the strip reads as a
// hand-arranged float, not a uniform filmstrip. Center-aligned cards of
// varied height stagger along both edges for a masonry feel.
const VARIANTS = [
  { height: styles.tall, tilt: styles.tiltLeft },
  { height: styles.mid, tilt: styles.tiltRight },
  { height: styles.short, tilt: styles.tiltLeft },
  { height: styles.mid, tilt: styles.tiltRight },
  { height: styles.tall, tilt: styles.tiltRight },
  { height: styles.short, tilt: styles.tiltLeft },
];

const ads = Array.from({ length: AD_COUNT }, (_, i) => {
  const n = String(i + 1).padStart(2, '0');
  const variant = VARIANTS[i % VARIANTS.length];
  return { src: `/ads/meta-ad-${n}.png`, ...variant };
});

type Ad = (typeof ads)[number];

function AdCard({ src, height, tilt }: Ad) {
  return (
    <div className={[styles.card, height, tilt].join(' ')}>
      <img src={src} alt="" className={styles.cardImg} loading="lazy" decoding="async" />
    </div>
  );
}

function AdRow() {
  return (
    <div className={styles.row} aria-hidden="true">
      {ads.map((ad) => (
        <AdCard key={ad.src} {...ad} />
      ))}
    </div>
  );
}

export default function AdProofSection() {
  const { t } = useTranslation('services');

  return (
    <section className={styles.section} aria-label={t('adProof.heading')}>
      <div className={styles.intro}>
        <SectionHeader
          tone="dark"
          align="center"
          title={t('adProof.heading')}
          intro={t('adProof.intro')}
        />
      </div>
      <div className={styles.strip}>
        <div className={styles.track}>
          <AdRow />
          <AdRow />
        </div>
      </div>
    </section>
  );
}
