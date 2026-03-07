import { motion } from 'framer-motion';
import { Video, Target, Users, TrendingUp, Lightbulb } from 'lucide-react';
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
      description: 'A full video library for your sales team. Objection handlers, case studies, demos, and email sequences. One system, not scattered files that sit unused.',
    },
    {
      title: 'Performance Video Campaigns',
      description: 'Campaigns built around one goal: more leads, demos, or closed deals. Creative, media buying consultation, and landing page strategy. Everything points to one number.',
    },
    {
      title: 'Sales Team Video Enablement',
      description: 'Give your reps video superpowers. Custom templates for outreach, follow-ups, and objection handling. Includes training, scripts, and a content library they\'ll actually use.',
    },
    {
      title: 'Growth Strategy Consulting',
      description: 'Not sure where video fits in your funnel? We audit your sales process, find the gaps, and tell you exactly what to create and when to deploy it.',
    },
    {
      title: 'Creative Problem Solving',
      description: 'Stuck on how to explain something complex? Need to stand out in a crowded market? We solve the hard creative problems, the ones where "make it pretty" isn\'t enough.',
    },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Header */}
        <motion.div className={styles.header} {...scrollReveal}>
          <h2 className={styles.title}>Where video meets your sales process</h2>
          <p className={styles.subtitle}>
            Every service is built to plug into your pipeline and move a specific number.
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
                }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <div className={styles.icon}>
                  <IconComponent size={48} strokeWidth={1.5} />
                </div>
                <h3 className={styles.serviceTitle}>{service.title}</h3>
                <p className={styles.serviceDescription}>{service.description}</p>
                <span className={styles.learnMore}>Learn More →</span>
              </motion.div>
            );
          })}

        </motion.div>
      </div>
    </section>
  );
}
