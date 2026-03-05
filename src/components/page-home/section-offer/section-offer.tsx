import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Search, Target, FileText, TrendingUp, Users } from 'lucide-react';
import { useState } from 'react';
import MagneticButton from '../../MagneticButton';
import { scrollReveal } from '../../../utils/animations';
import styles from './section-offer.module.css';

const iconComponents = [
  Search,
  Target,
  FileText,
  TrendingUp,
  Users,
];

const services = [
  {
    title: 'Sales Process Diagnosis',
    description: 'Most businesses are losing deals and don\'t even know why. We sit down, look at your sales process, and find the exact moment prospects ghost you. Is it after the first call? After they see pricing? We find the leak, then we plug it with video.',
  },
  {
    title: 'Strategic Video Mapping',
    description: 'We don\'t make "content." We make conversion tools. This video gets cold prospects to raise their hand. That video handles the "it\'s too expensive" objection. This one closes deals while you sleep. Each piece targets a specific moment in your pipeline where money\'s being left on the table.',
  },
  {
    title: 'Sales-Driven Scripting',
    description: 'Our scripts use the same frameworks that work on sales calls. Hit the pain point. Show the solution. Handle objections before they come up, proven sales psychology adapted for video.',
  },
  {
    title: 'Conversion Optimization',
    description: 'We track real metrics: how many viewers become leads, how many video-assisted deals close, how fast prospects move through your pipeline. Then we test and tweak. Better hooks. Stronger CTAs. We treat it like A/B testing a sales pitch until it converts.',
  },
  {
    title: 'Sales Team Integration',
    description: 'Video doesn\'t replace your closers—it clones them. Now they can follow up with 50 prospects in 10 minutes. Demos get reinforced automatically. Objections get handled before the call. Your reps spend time closing, not explaining the same thing 40 times a week.',
  },
];

function ServiceCard3D({ service, IconComponent, index }: { service: typeof services[0]; IconComponent: typeof Search; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7.5deg', '-7.5deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7.5deg', '7.5deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className={styles.serviceCard}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      whileHover={{
        scale: 1.02,
        borderColor: 'rgba(253, 183, 20, 0.5)',
        boxShadow: '0 0 30px rgba(253, 183, 20, 0.15)',
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
    </motion.div>
  );
}

export default function OfferSection() {
  return (
    <section className={styles.offerSection}>
      <div className={styles.container}>
        {/* Header */}
        <motion.div className={styles.header} {...scrollReveal}>
          <h2 className={styles.title}>How we help businesses grow</h2>
          <p className={styles.subtitle}>
            Compelling visual stories that connect with your audience, elevate your brand, and drive measurable results across every platform.
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
              Start <span className={styles.growing}>growing</span>
              <br />
              your business today
            </p>
            <MagneticButton href="/contact" className={styles.ctaButton}>
              See our Process
            </MagneticButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
