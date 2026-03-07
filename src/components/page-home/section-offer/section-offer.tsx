import { motion } from 'framer-motion';
import { Search, Video, MonitorPlay, BarChart3, Globe } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import MagneticButton from '../../MagneticButton';
import SectionEyebrow from '../../SectionEyebrow';
import { scrollReveal } from '../../../utils/animations';
import { useTilt } from '../../../hooks/useTilt';
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

function ServiceCard3D({ service, IconComponent, index, learnMoreText }: { service: Service; IconComponent: typeof Search; index: number; learnMoreText: string }) {
  const [isHovered, setIsHovered] = useState(false);
  const { style: tiltStyle, onMouseMove, onMouseLeave: tiltLeave } = useTilt();

  const handleMouseLeave = () => {
    setIsHovered(false);
    tiltLeave();
  };

  return (
    <motion.a
      href={service.href}
      className={styles.serviceCard}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={tiltStyle}
      whileHover={{
        scale: 1.02,
        y: -2,
      }}
    >
      <motion.div
        className={styles.icon}
        animate={isHovered ? {
          scale: [1, 1.2, 1.1],
          rotate: [0, -10, 5, 0],
          filter: ['brightness(1)', 'brightness(1.3)', 'brightness(1)'],
        } : {}}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <IconComponent size={48} strokeWidth={1.5} />
      </motion.div>
      <h3 className={styles.serviceTitle}>{service.title}</h3>
      <p className={styles.serviceDescription}>{service.description}</p>
      <span className={styles.learnMore}>{learnMoreText} &rarr;</span>
    </motion.a>
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
          <SectionEyebrow label={t('offer.eyebrow')} description={t('offer.tagline')} />
          <h2 className={styles.title}>{t('offer.title')}</h2>
          <p className={styles.subtitle}>
            {t('offer.subtitle')}
          </p>
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
                learnMoreText={t('offer.learnMore')}
              />
            );
          })}

          {/* CTA Card */}
          <motion.div
            className={styles.ctaCard}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            whileHover={{ scale: 1.02 }}
          >
            <p className={styles.ctaText}>
              {t('offer.cta.text').split('\n').map((line, i) => (
                <span key={i}>
                  {i > 0 && <br />}
                  {line}
                </span>
              ))}
            </p>
            <MagneticButton href="/contact" className={styles.ctaButton}>
              {t('offer.cta.button')}
            </MagneticButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
