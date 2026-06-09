import { Link } from 'react-router';
import { Search, Clapperboard, TrendingUp, Settings2, Bot, Handshake } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLocalePath } from '../../../hooks/useLocalePath';
import styles from './section-offer.module.css';

type OfferCard = {
  tag?: string;
  title: string;
  description: string;
};

const icons = [Search, Clapperboard, TrendingUp, Settings2, Bot, Handshake];

export default function OfferSection() {
  const l = useLocalePath();
  const { t } = useTranslation('home');
  const cards = t('offerPreview.cards', { returnObjects: true }) as OfferCard[];

  return (
    <section className={styles.section} id="services-preview">
      <div className={styles.wrap}>
        <span className={styles.eyebrow}>{t('offerPreview.eyebrow')}</span>
        <h2 className={styles.heading}>{t('offerPreview.title')}</h2>
        <p className={styles.lead}>{t('offerPreview.lead')}</p>

        <div className={styles.svc}>
          {cards.map((card, index) => {
            const Icon = icons[index];
            return (
              <div key={card.title} className={`${styles.card} ${index === 0 ? styles.cardFeature : ''}`}>
                {card.tag ? <span className={styles.tag}>{card.tag}</span> : null}
                <div className={styles.ico}><Icon size={22} strokeWidth={1.5} /></div>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
                <Link to={l('/services')} className={styles.more}>{t('offerPreview.learnMore')}</Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

