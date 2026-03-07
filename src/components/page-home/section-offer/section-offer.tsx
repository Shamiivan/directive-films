import { motion } from 'framer-motion';
import { Search, Video, MonitorPlay, BarChart3, Globe } from 'lucide-react';
import { useState } from 'react';
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

const services = [
  {
    title: 'Audit',
    description: 'We look at your online presence and tell you what\'s actually working. Honest assessment, clear next steps.',
    href: '/services',
  },
  {
    title: 'Coach',
    description: 'We set up your team to make their own content. Studio, playbook, training. Then they\'re on their own.',
    href: '/services',
  },
  {
    title: 'Create',
    description: 'We make the videos. Scripted around how you actually sell.',
    href: '/services',
  },
  {
    title: 'Optimize',
    description: 'We set up your CRM so leads don\'t fall through the cracks. Sequences, follow-ups, dashboards.',
    href: '/services',
  },
  {
    title: 'Build',
    description: 'Websites that say what you do, load fast, and capture leads.',
    href: '/services',
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
          <SectionEyebrow label="Services" description="What we do" />
          <h2 className={styles.title}>What we actually do</h2>
          <p className={styles.subtitle}>
            Five things. They're designed to connect, but you don't need all of them.
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
              Not sure where to start?
              <br />
              We can help you figure that out.
            </p>
            <MagneticButton href="/contact" className={styles.ctaButton}>
              Let's talk
            </MagneticButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
