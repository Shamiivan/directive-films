import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { scrollReveal } from '../../../utils/animations';
import styles from './section-how-we-do-it.module.css';

export default function HowWeDoItSection() {
  const [activeStep, setActiveStep] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    offset: ['start start', 'end end'],
  });

  const rawStep = useTransform(scrollYProgress, [0, 0.33, 0.66], [0, 1, 2]);

  useMotionValueEvent(rawStep, 'change', (latest) => {
    const rounded = Math.round(latest);
    setActiveStep(rounded);
  });

  const steps = [
    {
      number: '01',
      title: 'Audit & Strategy',
      description: 'We look at your website, CRM, content, and sales process. We figure out what\'s working, what\'s not, and what to focus on first.',
      image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&h=800&fit=crop',
    },
    {
      number: '02',
      title: 'Build & Create',
      description: 'We build what you need — the website, the videos, the CRM, the content setup. Whatever the audit says will make the biggest difference.',
      image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1200&h=800&fit=crop',
    },
    {
      number: '03',
      title: 'Optimize & Scale',
      description: 'We track leads generated, deals closed, and pipeline velocity. Then we iterate — tighter sequences, stronger content, better conversion. Growth compounds when every piece improves together.',
      image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1200&h=800&fit=crop',
    },
  ];

  return (
    <div ref={scrollContainerRef} className={styles.scrollContainer}>
      <section className={styles.stickyContent}>
        <div className={styles.container}>
          {/* Left Column - Process Steps */}
          <motion.div
            className={styles.leftColumn}
            {...scrollReveal}
          >
            <h2 className={styles.title}>
              From audit to growth.
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

            {/* Progress bar */}
            <motion.div
              className={styles.progressBar}
              style={{ scaleX: scrollYProgress }}
            />
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
    </div>
  );
}
