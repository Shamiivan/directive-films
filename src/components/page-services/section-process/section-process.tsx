'use client';

import { motion } from 'framer-motion';
import { Search, Lightbulb, Video, TrendingUp, ArrowRight } from 'lucide-react';
import MagneticButton from '../../MagneticButton';
import { scrollReveal, gridStagger } from '../../../utils/animations';
import styles from './section-process.module.css';

export default function ProcessSection() {
  const iconComponents = [
    Search,      // Discovery
    Lightbulb,   // Strategy
    Video,       // Production
    TrendingUp,  // Optimization
  ];

  const steps = [
    {
      title: 'Discovery',
      description: 'We dive deep into your business, understanding your goals, audience, and what makes you unique. No cookie-cutter approaches—just a custom strategy built for your specific challenges.',
    },
    {
      title: 'Strategy',
      description: 'We craft a video strategy aligned with your sales process and designed to convert at every stage. Each video has a purpose, a place in your funnel, and measurable objectives.',
    },
    {
      title: 'Production',
      description: 'Our award-winning team brings your story to life with cinematic quality and attention to detail. Professional production values that elevate your brand and command respect.',
    },
    {
      title: 'Optimization',
      description: 'We track, test, and refine to maximize performance and ensure your videos drive real results. Data-driven improvements that compound over time.',
    },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Header */}
        <motion.div className={styles.header} {...scrollReveal}>
          <h2 className={styles.title}>A Proven Video Production Process</h2>
          <p className={styles.subtitle}>
            From concept to conversion, our battle-tested process delivers videos that drive growth
          </p>
        </motion.div>

        {/* Process Grid */}
        <motion.div
          className={styles.processGrid}
          variants={gridStagger}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: "-50px" }}
        >
          {steps.map((step, index) => {
            const IconComponent = iconComponents[index];
            return (
              <motion.div
                key={index}
                className={styles.processCard}
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
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.description}>{step.description}</p>
                <div className={styles.arrow}>
                  <ArrowRight size={24} strokeWidth={2} color="#666" />
                </div>
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
              Ready to <span className={styles.transform}>transform</span>
              <br />
              your business?
            </p>
            <MagneticButton className={styles.ctaButton}>
              Schedule a Call
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
