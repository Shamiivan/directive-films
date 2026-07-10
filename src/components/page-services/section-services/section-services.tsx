import { Search, Target, PenLine, TrendingUp, Settings2, Bot, Handshake } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import styles from './section-services.module.css';

interface ServiceCard {
  tag?: string;
  title: string;
  description: string;
  features: string[];
}

const cardIcons = [Search, Target, PenLine, TrendingUp, Settings2, Bot, Handshake];

export default function SectionServices() {
  const { t } = useTranslation('services');
  const cards = t('servicesGrid.cards', { returnObjects: true }) as ServiceCard[];

  return (
    <section className={styles.section}>
      <div className={styles.wrap}>
        <div className={styles.svc}>
          {cards.map((card, index) => {
            const IconComponent = cardIcons[index] || cardIcons[0];
            return (
              <div className={styles.card} key={card.title}>
                {card.tag ? <span className={styles.tag}>{card.tag}</span> : null}
                <div className={styles.ico}><IconComponent size={22} strokeWidth={1.5} /></div>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
                <ul>
                  {card.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
