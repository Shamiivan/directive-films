import { motion } from 'framer-motion';
import { Search, Video, MonitorPlay, BarChart3, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import MagneticButton from '../../MagneticButton';
import SectionEyebrow from '../../SectionEyebrow';
import { EditableTranslation } from '@/cms/EditableTranslation';
import { useIsEditing } from '@/cms/EditModeProvider';
import { scrollReveal } from '../../../utils/animations';
import styles from './section-offer.module.css';

const iconComponents = [
  Search,
  Video,
  MonitorPlay,
  BarChart3,
  Globe,
];

interface Service {
  title: string;
  description: string;
  href: string;
}

function ServiceCard3D({ service, IconComponent, index }: { service: Service; IconComponent: typeof Search; index: number }) {
  const editMode = useIsEditing();
  return (
    <a
      href={service.href}
      className={styles.serviceCard}
      onClick={editMode ? (e) => e.preventDefault() : undefined}
    >
      <div className={styles.icon}>
        <IconComponent size={48} strokeWidth={1.5} />
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
    </a>
  );
}

export default function OfferSection() {
  const { t } = useTranslation('home');
  const services = t('offer.services', { returnObjects: true }) as Service[];

  return (
    <section className={styles.offerSection}>
      <div className={styles.container}>
        {/* Header */}
        <motion.div className={styles.header} {...scrollReveal}>
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
        </motion.div>

        {/* Services Grid */}
        <div className={styles.servicesGrid}>
          {services.map((service, index) => {
            const IconComponent = iconComponents[index];
            return (
              <ServiceCard3D
                key={index}
                service={service}
                IconComponent={IconComponent}
                index={index}
              />
            );
          })}

          {/* CTA Card */}
          <div className={styles.ctaCard}>
            <EditableTranslation
              pageSlug="home"
              namespace="home"
              path="offer.cta.text"
              label="Offer CTA copy"
              kind="text"
              as="p"
              className={styles.ctaText}
            />
            <MagneticButton href="/contact" className={styles.ctaButton}>
              <EditableTranslation
                pageSlug="home"
                namespace="home"
                path="offer.cta.button"
                label="Offer CTA button"
              />
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
