'use client';

import { motion } from 'framer-motion';
import { Search, Target, FileText, TrendingUp, Users } from 'lucide-react';
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

  return (
    <section className={styles.offerSection}>
      <div className={styles.container}>
        {/* Header */}
        <motion.div className={styles.header} {...scrollReveal}>
          <h2 className={styles.title}>How we help businesses grow</h2>
          <p className={styles.subtitle}>
            "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."
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
              <motion.div
                key={index}
                className={styles.serviceCard}
                variants={scrollReveal}
                whileHover={{
                  scale: 1.02,
                  borderColor: '#3b82f6',
                  boxShadow: '0 0 30px rgba(59, 130, 246, 0.4)',
                }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <div className={styles.icon}>
                  <IconComponent size={48} strokeWidth={1.5} />
                </div>
                <h3 className={styles.serviceTitle}>{service.title}</h3>
                <p className={styles.serviceDescription}>{service.description}</p>
              </motion.div>
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
