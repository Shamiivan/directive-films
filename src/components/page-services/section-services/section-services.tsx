import { motion } from 'framer-motion';
import MagneticButton from '@/components/MagneticButton';
import { scrollReveal } from '@/utils/animations';
import { servicePhases } from '../services-data';
import type { ServiceCard } from '../services-data';
import styles from './section-services.module.css';

function ServiceCardComponent({ service, index }: { service: ServiceCard; index: number }) {
  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className={styles.cardImage}>
        <img
          src={service.image}
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
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.div className={styles.header} {...scrollReveal}>
          <span className={styles.label}>Our services</span>
          <h2 className={styles.title}>
            Same method. <em className={styles.titleAccent}>Different starting point.</em>
          </h2>
          <p className={styles.subtitle}>
            Pick the one that matches where you are.
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
