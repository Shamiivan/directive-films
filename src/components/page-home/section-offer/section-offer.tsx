'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Search, Target, FileText, TrendingUp, Users } from 'lucide-react';
import { useState } from 'react';
import MagneticButton from '../../MagneticButton';
import { scrollReveal, gridStagger } from '../../../utils/animations';
import styles from './section-offer.module.css';

export default function OfferSection() {
  const iconComponents = [
    Search,      // Sales Process Diagnosis
    Target,      // Strategic Video Mapping
    FileText,    // Sales-Driven Scripting
    TrendingUp,  // Conversion Optimization
    Users,       // Sales Team Integration
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

  // 3D Card Component with Tilt Effect
  function ServiceCard3D({ service, IconComponent }: { service: any; IconComponent: any }) {
    const [isHovered, setIsHovered] = useState(false);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7.5deg', '-7.5deg']);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7.5deg', '7.5deg']);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const xPct = mouseX / width - 0.5;
      const yPct = mouseY / height - 0.5;
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
        variants={scrollReveal}
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
          borderColor: '#3b82f6',
          boxShadow: '0 0 30px rgba(59, 130, 246, 0.4)',
        }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
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
        <motion.div
          className={styles.servicesGrid}
          variants={gridStagger}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: "-50px" }}
        >
          {services.map((service, index) => {
            const IconComponent = iconComponents[index];
            return (
              <ServiceCard3D key={index} service={service} IconComponent={IconComponent} />
            );
          })}

          {/* CTA Card */}
          <motion.div
            className={styles.ctaCard}
            variants={scrollReveal}
            whileHover={{
              scale: 1.02,
            }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
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
        </motion.div>
      </div>
    </section>
  );
}
