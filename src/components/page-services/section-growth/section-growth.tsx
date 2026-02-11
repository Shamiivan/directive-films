'use client';

import { motion } from 'framer-motion';
import { Video, Target, Users, TrendingUp, Lightbulb, ArrowRight } from 'lucide-react';
import MagneticButton from '../../MagneticButton';
import { scrollReveal, gridStagger } from '../../../utils/animations';
import styles from './section-growth.module.css';

export default function GrowthSection() {
  const iconComponents = [
    Video,      // Video Sales Systems
    Target,     // Performance Campaigns
    Users,      // Sales Team Enablement
    TrendingUp, // Growth Strategy
    Lightbulb,  // Creative Consulting
  ];

  const services = [
    {
      title: 'Video Sales Systems',
      description: 'Complete video marketing system with sequences, objection-handling library, email campaigns, and strategic positioning. Packaged as a system, not scattered deliverables that sit unused.',
    },
    {
      title: 'Performance Video Campaigns',
      description: 'Hyper-focused campaigns designed to maximize a specific target: leads, demos, or closed deals. Includes creative, media buying consultation, and landing page strategy. Everything points to growth.',
    },
    {
      title: 'Sales Team Video Enablement',
      description: 'Give your reps video superpowers. Custom templates for outreach, follow-ups, and objection handling. Includes training, scripts, and a content library they\'ll actually use.',
    },
    {
      title: 'Growth Strategy Consulting',
      description: 'Not sure where video fits in your funnel? We audit your sales process, identify gaps, and build a strategic roadmap. Know exactly what to create and when to deploy it.',
    },
    {
      title: 'Creative Problem Solving',
      description: 'Stuck on how to explain something complex? Need to differentiate in a crowded market? We solve creative challenges that drive business results, not just make pretty videos.',
    },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Header */}
        <motion.div className={styles.header} {...scrollReveal}>
          <h2 className={styles.title}>How we help businesses grow</h2>
          <p className={styles.subtitle}>
            Strategic video production that plugs directly into your sales process and drives measurable revenue
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
                <div className={styles.arrow}>
                  <ArrowRight size={24} strokeWidth={2} color="#666" />
                </div>
              </motion.div>
            );
          })}

        </motion.div>
      </div>
    </section>
  );
}
