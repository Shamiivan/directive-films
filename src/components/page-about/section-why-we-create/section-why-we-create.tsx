'use client';

import { motion } from 'framer-motion';
import { scrollReveal, gridStagger } from '@/utils/animations';
import styles from './section-why-we-create.module.css';

const features = [
  {
    icon: '01',
    title: 'Audience-First Strategy',
    description: 'We don\'t just create content — we craft strategic narratives designed to captivate your target audience and drive measurable results.',
  },
  {
    icon: '02',
    title: 'Data-Driven Production',
    description: 'Every frame is intentional. We leverage analytics and market insights to ensure your video resonates and converts.',
  },
  {
    icon: '03',
    title: 'Storytelling That Converts',
    description: 'Compelling narratives combined with proven sales psychology to turn viewers into customers and customers into advocates.',
  },
  {
    icon: '04',
    title: 'Measurable Impact',
    description: 'Track ROI with clarity. Our videos are designed with clear KPIs and performance metrics that matter to your bottom line.',
  },
];

export default function WhyWeCreateSection() {
  return (
    <section className={styles.whyWeCreateSection}>
      <div className={styles.container}>
        <motion.div className={styles.header} {...scrollReveal}>
          <p className={styles.eyebrow}>Values</p>
          <h2 className={styles.title}>Why We Create Videos That Sell</h2>
        </motion.div>

        <motion.div
          className={styles.featuresGrid}
          variants={gridStagger}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.icon}
              className={styles.featureCard}
              variants={scrollReveal}
            >
              <div className={styles.icon}>{feature.icon}</div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div className={styles.imageWrapper} {...scrollReveal}>
          <img
            src="/images/video-editing-workspace.jpg"
            alt="Professional video editing workspace"
            className={styles.heroImage}
          />
        </motion.div>

        <motion.div className={styles.cta} {...scrollReveal}>
          <p className={styles.ctaText}>
            Get started now and see how simple video production can be with the right partner.
          </p>
          <button className={styles.ctaButton}>
            Get Your Free Video Strategy Session
          </button>
        </motion.div>
      </div>
    </section>
  );
}
