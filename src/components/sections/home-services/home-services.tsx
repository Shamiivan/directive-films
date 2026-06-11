import { Bot, ChartNoAxesCombined, Clapperboard, Handshake, Search, Settings2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import SectionEyebrow from '../../SectionEyebrow';
import Reveal from '@/components/shared/reveal/reveal';
import { EditableTranslation } from '@/cms/EditableTranslation';
import { useIsEditing } from '@/cms/EditModeProvider';
import styles from './home-services.module.css';

const serviceMeta = [
  { Icon: Search, tag: 'Free to start' },
  { Icon: Clapperboard },
  { Icon: ChartNoAxesCombined },
  { Icon: Settings2 },
  { Icon: Bot, tag: 'AI' },
  { Icon: Handshake },
];

interface Service {
  tag?: string;
  title: string;
  description: string;
  href: string;
}

function ServiceCard3D({ service, meta, index }: { service: Service; meta: (typeof serviceMeta)[number]; index: number }) {
  const editMode = useIsEditing();
  const IconComponent = meta.Icon;
  const tag = service.tag ?? meta.tag;

  return (
    <Reveal
      as="a"
      href={service.href}
      delay={(index % 3) * 0.08}
      className={styles.serviceCard}
      onClick={editMode ? (e: React.MouseEvent) => e.preventDefault() : undefined}
    >
      {tag ? <span className={styles.tag}>{tag}</span> : null}
      <div className={styles.icon}>
        <IconComponent size={30} strokeWidth={1.55} />
      </div>
      <EditableTranslation
        pageSlug="home"
        namespace="home"
        path={`offer.services.${index}.title`}
        label={`Service ${index + 1} title`}
        as="h3"
        className={styles.serviceTitle}
      />
      <EditableTranslation
        pageSlug="home"
        namespace="home"
        path={`offer.services.${index}.description`}
        label={`Service ${index + 1} description`}
        kind="text"
        as="p"
        className={styles.serviceDescription}
      />
      <span className={styles.learnMore}>
        <EditableTranslation
          pageSlug="home"
          namespace="home"
          path="offer.learnMore"
          label="Learn more label"
        />
        {' '}&rarr;
      </span>
    </Reveal>
  );
}

export default function HomeServicesSection({ id = 'services' }: { id?: string } = {}) {
  const { t } = useTranslation('home');
  const services = t('offer.services', { returnObjects: true }) as Service[];

  return (
    <section className={styles.offerSection} id={id}>
      <div className={styles.container}>
        <Reveal className={styles.header}>
          <SectionEyebrow
            label={
              <EditableTranslation
                pageSlug="home"
                namespace="home"
                path="offer.eyebrow"
                label="Offer eyebrow"
              />
            }
            description={
              <EditableTranslation
                pageSlug="home"
                namespace="home"
                path="offer.tagline"
                label="Offer tagline"
              />
            }
          />
          <EditableTranslation pageSlug="home" namespace="home" path="offer.title" label="Offer title" as="h2" className={styles.title} />
          <EditableTranslation pageSlug="home" namespace="home" path="offer.subtitle" label="Offer subtitle" kind="text" as="p" className={styles.subtitle} />
        </Reveal>

        <div className={styles.servicesGrid}>
          {services.map((service, index) => (
            <ServiceCard3D
              key={service.title}
              service={service}
              meta={serviceMeta[index] ?? serviceMeta[0]}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
