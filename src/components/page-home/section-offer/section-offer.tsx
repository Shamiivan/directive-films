import { motion } from 'framer-motion';
import { Search, Video, MonitorPlay, BarChart3, Globe } from 'lucide-react';
import { useState } from 'react';
import MagneticButton from '../../MagneticButton';
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

const services = [
  {
    title: 'Audit',
    description: 'We look at your website, socials, and messaging and tell you what\'s actually working and what isn\'t. You get a clear plan — and we help you run it.',
    href: '/services/diagnose',
  },
  {
    title: 'Coach',
    description: 'We set up your studio, train your team, and give them a playbook. After that, they make professional content on their own.',
    href: '/services/coach',
  },
  {
    title: 'Create',
    description: 'We produce the videos. Scripted around your sales process.',
    href: '/services/create',
  },
  {
    title: 'Optimize',
    description: 'We set up your CRM properly — sequences, follow-ups, dashboards. So you always know what\'s working and leads don\'t fall through.',
    href: '/services/optimize',
  },
  {
    title: 'Build',
    description: 'Fast websites that say what you do, capture leads, and book meetings.',
    href: '/services/build',
  },
];

function ServiceCard3D({ service, IconComponent, index }: { service: typeof services[0]; IconComponent: typeof Search; index: number }) {
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
      <span className={styles.learnMore}>Learn more &rarr;</span>
    </motion.a>
  );
}

export default function OfferSection() {
  return (
    <section className={styles.offerSection}>
      <div className={styles.container}>
        {/* Header */}
        <motion.div className={styles.header} {...scrollReveal}>
          <h2 className={styles.title}>How we get you there</h2>
          <p className={styles.subtitle}>
            We do five things and we make sure they actually work together. Here's what that looks like.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className={styles.servicesGrid}>
          {services.map((service, index) => {
            const IconComponent = iconComponents[index];
            return (
              <ServiceCard3D key={index} service={service} IconComponent={IconComponent} index={index} />
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
              Ready to <span className={styles.growing}>grow</span>?
              <br />
              Let's figure out where to start.
            </p>
            <MagneticButton href="/contact" className={styles.ctaButton}>
              Book a Free Strategy Call
            </MagneticButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
