import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import MagneticButton from '@/components/MagneticButton';
import SectionEyebrow from '../../SectionEyebrow';
import { scrollReveal } from '@/utils/animations';
import styles from './section-services.module.css';

interface ServiceCardData {
  id: string;
  name: string;
  outcome: string;
  description: string;
  ctaLabel: string;
}

interface ServicePhaseData {
  phase: string;
  label: string;
  services: ServiceCardData[];
}

const serviceImages: Record<string, string> = {
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

function ServiceCardComponent({ service, index }: { service: ServiceCardData; index: number }) {
  return (
    <motion.div
      id={service.id}
      className={styles.card}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className={styles.cardImage}>
        <img
          src={serviceImages[service.id] || serviceImages.audit}
          alt={service.name}
          loading="lazy"
        />
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
    </motion.div>
  );
}

export default function SectionServices() {
  const { t } = useTranslation('services');
  const servicePhases = t('phases', { returnObjects: true }) as ServicePhaseData[];

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

        {servicePhases.map((phase) => (
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
                <ServiceCardComponent key={service.id} service={service} index={i} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
