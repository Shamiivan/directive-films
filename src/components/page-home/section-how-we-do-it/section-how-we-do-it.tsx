'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { scrollReveal } from '../../../utils/animations';
import styles from './section-how-we-do-it.module.css';

export default function HowWeDoItSection() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      number: '01',
      title: 'Pre-Production',
      description: 'We start by gathering your insights, discussing goals, and setting a clear direction to ensure alignment with everyone involved to set the stage for a successful project.',
      image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&h=800&fit=crop', // Planning/meeting
    },
    {
      number: '02',
      title: 'Production',
      description: 'Our experienced crew brings your vision to life with professional filming, lighting, and direction. We handle every detail on set to capture compelling footage that tells your story.',
      image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1200&h=800&fit=crop', // Filming
    },
    {
      number: '03',
      title: 'Post-Production',
      description: 'Expert editing, color grading, sound design, and visual effects transform raw footage into a polished final product that engages your audience and drives results.',
      image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1200&h=800&fit=crop', // Editing
    },
  ];

  return (
    <section className={styles.howWeDoItSection}>
      <div className={styles.container}>
        {/* Left Column - Process Steps */}
        <motion.div
          className={styles.leftColumn}
          {...scrollReveal}
        >
          <h2 className={styles.title}>
            From ideation to creation.
          </h2>
          <div className={styles.divider}></div>

          <div className={styles.stepsList}>
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className={`${styles.stepItem} ${activeStep === index ? styles.active : ''}`}
                onClick={() => setActiveStep(index)}
                whileHover={{ x: 8 }}
                transition={{ duration: 0.2 }}
              >
                <div className={styles.stepHeader}>
                  <span className={styles.stepNumber}>{step.number}.</span>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                </div>

                <AnimatePresence>
                  {activeStep === index && (
                    <motion.p
                      className={styles.stepDescription}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                      {step.description}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Column - Image */}
        <motion.div
          className={styles.rightColumn}
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className={styles.imageWrapper}>
            <AnimatePresence mode="wait">
              <motion.img
                key={activeStep}
                src={steps[activeStep].image}
                alt={steps[activeStep].title}
                className={styles.processImage}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              />
            </AnimatePresence>
            {/* Overlay gradient */}
            <div className={styles.imageOverlay}></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
