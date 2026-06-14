import { useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import SectionEyebrow from '../../SectionEyebrow';
import { scrollReveal } from '@/utils/animations';
import styles from './section-how-we-do-it.module.css';

interface Step {
  title: string;
  description: string;
}

// Behind-the-scenes process imagery, swapped as the active step changes.
// NOTE: Unsplash placeholders — swap for real DirectiveFilms stills before ship.
const stepImages = [
  'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&h=800&fit=crop',
  'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1200&h=800&fit=crop',
  'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1200&h=800&fit=crop',
];

// Scroll-pinned "Our Story" process: the section sticks while you scroll, the
// active step advances, and the right-hand image cross-fades to match. Reads the
// About "process" copy (eyebrow, title + gold accent, subtitle, Audit/Build/Scale).
export default function HowWeDoItSection() {
  const [activeStep, setActiveStep] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation('about');
  const localizedSteps = t('process.steps', { returnObjects: true }) as Step[];

  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    offset: ['start start', 'end end'],
  });

  const rawStep = useTransform(scrollYProgress, [0, 0.33, 0.66], [0, 1, 2]);
  useMotionValueEvent(rawStep, 'change', (latest) => {
    setActiveStep(Math.round(latest));
  });

  const steps = localizedSteps.map((step, i) => ({
    ...step,
    number: String(i + 1).padStart(2, '0'),
    image: stepImages[i] || stepImages[0],
  }));

  return (
    <div ref={scrollContainerRef} className={styles.scrollContainer}>
      <section className={styles.stickyContent}>
        <div className={styles.container}>
          {/* Left Column - Process Steps */}
          <motion.div className={styles.leftColumn} {...scrollReveal}>
            <SectionEyebrow label={t('process.eyebrow')} description="" />
            <h2 className={styles.title}>
              {t('process.title')}{' '}
              <span className={styles.highlight}>{t('process.accent')}</span>
            </h2>
            <p className={styles.subtitle}>{t('process.subtitle')}</p>
            <div className={styles.divider} />

            <div className={styles.stepsList}>
              {steps.map((step, index) => (
                <motion.div
                  key={step.title}
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

            {/* Progress bar tracks scroll through the pinned section */}
            <motion.div className={styles.progressBar} style={{ scaleX: scrollYProgress }} />
          </motion.div>

          {/* Right Column - Image */}
          <motion.div
            className={styles.rightColumn}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className={styles.imageWrapper}>
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeStep}
                  src={steps[activeStep]?.image}
                  alt={steps[activeStep]?.title}
                  className={styles.processImage}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                />
              </AnimatePresence>
              <div className={styles.imageOverlay} />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
