import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import MagneticButton from '@/components/MagneticButton';
import SectionEyebrow from '../../SectionEyebrow';
import { CardEditPanel } from '@/cms/CardEditPanel';
import { PanelImageField, PanelTextField, PanelTextareaField } from '@/cms/PanelField';
import { useIsEditing } from '@/cms/EditModeProvider';
import cardStyles from '@/cms/CardEditPanel.module.css';
import { scrollReveal } from '@/utils/animations';
import styles from './section-services.module.css';

interface ServiceCardData {
  id: string;
  name: string;
  outcome: string;
  description: string;
  ctaLabel: string;
  image?: string;
}

interface ServicePhaseData {
  phase: string;
  label: string;
  services: ServiceCardData[];
}

const fallbackImages: Record<string, string> = {
  audit: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop',
  competitor: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop',
  conversion: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=500&fit=crop',
  video: 'https://images.unsplash.com/photo-1579566346927-c68383817a25?w=800&h=500&fit=crop',
  web: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=500&fit=crop',
  coaching: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=500&fit=crop',
  crm: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=500&fit=crop',
  automation: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=800&h=500&fit=crop',
  analytics: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop&q=80',
};

function resolveImage(service: ServiceCardData) {
  return service.image || fallbackImages[service.id] || fallbackImages.audit;
}

type EditingTarget = { phaseIndex: number; serviceIndex: number };

function ServiceCardComponent({
  service,
  index,
  editMode,
  onEdit,
}: {
  service: ServiceCardData;
  index: number;
  editMode: boolean;
  onEdit: () => void;
}) {
  const cardContent = (
    <>
      <div className={styles.cardImage}>
        <img src={resolveImage(service)} alt={service.name} loading="lazy" />
      </div>

      <div className={styles.cardContent}>
        <h3 className={styles.cardName}>{service.name}</h3>
        <p className={styles.cardOutcome}>{service.outcome}</p>
        <p className={styles.cardDescription}>{service.description}</p>

        <div className={styles.cardFooter}>
          <MagneticButton href="/contact" className={styles.cardCta}>
            {service.ctaLabel}
          </MagneticButton>
        </div>
      </div>
    </>
  );

  if (!editMode) {
    return (
      <motion.div
        id={service.id}
        className={styles.card}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        {cardContent}
      </motion.div>
    );
  }

  return (
    <motion.button
      id={service.id}
      type="button"
      onClick={onEdit}
      className={`${styles.card} ${cardStyles.cardHoverable}`}
      data-edit-label="Edit service"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{
        background: 'transparent',
        border: 0,
        padding: 0,
        textAlign: 'left',
        font: 'inherit',
        color: 'inherit',
        cursor: 'pointer',
        width: '100%',
      }}
    >
      {cardContent}
    </motion.button>
  );
}

export default function SectionServices() {
  const { t } = useTranslation('services');
  const editMode = useIsEditing();
  const servicePhases = t('phases', { returnObjects: true }) as ServicePhaseData[];
  const [editing, setEditing] = useState<EditingTarget | null>(null);

  const currentService =
    editing != null ? servicePhases[editing.phaseIndex]?.services[editing.serviceIndex] : null;

  const pathPrefix =
    editing != null ? `phases.${editing.phaseIndex}.services.${editing.serviceIndex}` : '';

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.div className={styles.header} {...scrollReveal}>
          <SectionEyebrow label={t('list.eyebrow')} description={t('list.description')} />
          <h2 className={styles.title}>
            {t('list.title')} <em className={styles.titleAccent}>{t('list.accent')}</em>
          </h2>
          <p className={styles.subtitle}>
            {t('list.subtitle')}
          </p>
        </motion.div>

        {servicePhases.map((phase, phaseIndex) => (
          <div key={phase.phase} className={styles.phaseGroup}>
            <motion.div
              className={styles.phaseHeader}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4 }}
            >
              <span className={styles.phaseName}>{phase.phase}</span>
              <span className={styles.phaseDivider} />
              <span className={styles.phaseLabel}>{phase.label}</span>
            </motion.div>

            <div className={styles.cards}>
              {phase.services.map((service, i) => (
                <ServiceCardComponent
                  key={service.id}
                  service={service}
                  index={i}
                  editMode={editMode}
                  onEdit={() => setEditing({ phaseIndex, serviceIndex: i })}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <CardEditPanel
        open={editing !== null}
        onClose={() => setEditing(null)}
        eyebrow="Service"
        title={currentService?.name || 'Service'}
      >
        {editing !== null && (
          <>
            <PanelImageField
              pageSlug="services"
              namespace="services"
              path={`${pathPrefix}.image`}
              label="Cover image"
            />
            <PanelTextField
              pageSlug="services"
              namespace="services"
              path={`${pathPrefix}.name`}
              label="Title"
            />
            <PanelTextField
              pageSlug="services"
              namespace="services"
              path={`${pathPrefix}.outcome`}
              label="Outcome"
            />
            <PanelTextareaField
              pageSlug="services"
              namespace="services"
              path={`${pathPrefix}.description`}
              label="Description"
            />
            <PanelTextField
              pageSlug="services"
              namespace="services"
              path={`${pathPrefix}.ctaLabel`}
              label="CTA label"
            />
          </>
        )}
      </CardEditPanel>
    </section>
  );
}
