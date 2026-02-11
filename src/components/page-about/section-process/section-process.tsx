'use client';

import { motion } from 'framer-motion';
import { scrollReveal, gridStagger } from '@/utils/animations';
import styles from './section-process.module.css';

const processSteps = [
  {
    title: 'Pre-Production',
    description: 'Craft a solid foundation with meticulous planning, scripting, and storyboarding to ensure your project starts on the right foot.',
    image: '/images/pre-production.jpg',
  },
  {
    title: 'Production',
    description: 'Watch your idea come to life as our expert crew captures every moment with precision and creativity on set.',
    image: '/images/production.jpg',
  },
  {
    title: 'Post-Production',
    description: 'Polish your project to perfection with cutting-edge editing, color grading, and sound design that elevates your vision.',
    image: '/images/post-production.jpg',
  },
];

export default function ProcessSection() {
  return (
    <section className={styles.processSection}>
      <div className={styles.container}>
        <motion.div className={styles.header} {...scrollReveal}>
          <h2 className={styles.title}>From ideation to creation.</h2>
          <p className={styles.subtitle}>
            We take care of everything you need to bring your vision to life.
          </p>
        </motion.div>

        <motion.div
          className={styles.grid}
          variants={gridStagger}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: "-100px" }}
        >
          {processSteps.map((step, index) => (
            <motion.div
              key={step.title}
              className={styles.card}
              variants={scrollReveal}
            >
              <div className={styles.imageWrapper}>
                <img
                  src={step.image}
                  alt={step.title}
                  className={styles.image}
                />
              </div>
              <div className={styles.content}>
                <h3 className={styles.cardTitle}>{step.title}</h3>
                <p className={styles.cardDescription}>{step.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
