import { useRef, useState, useSyncExternalStore } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import SectionEyebrow from '../../SectionEyebrow';
import { scrollReveal } from '../../../utils/animations';
import styles from './section-how-we-do-it.module.css';

interface Step {
  number: string;
  title: string;
  description: string;
}

const stepImages = [
  'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&h=800&fit=crop',
  'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1200&h=800&fit=crop',
  'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1200&h=800&fit=crop',
];

// SSR-safe mobile detection using useSyncExternalStore
const mobileQuery = '(max-width: 768px)';

function subscribeToMedia(callback: () => void) {
  const mql = window.matchMedia(mobileQuery);
  mql.addEventListener('change', callback);
  return () => mql.removeEventListener('change', callback);
}

function getIsMobile() {
  return window.matchMedia(mobileQuery).matches;
}

function getServerSnapshot() {
  return false;
}

function useIsMobile() {
  return useSyncExternalStore(subscribeToMedia, getIsMobile, getServerSnapshot);
}

function useSteps() {
  const { t } = useTranslation('home');
  const localizedSteps = t('process.steps', { returnObjects: true }) as Step[];
  return {
    t,
    steps: localizedSteps.map((step, i) => ({
      ...step,
      image: stepImages[i] || stepImages[0],
    })),
  };
}

function TitleWithHighlight({ title }: { title: string }) {
  const highlightWords = ['complicated.', 'compliqué.'];
  for (const word of highlightWords) {
    if (title.includes(word)) {
      const parts = title.split(word);
      return (
        <>
          {parts.map((part, i, arr) => (
            <span key={i}>
              {part}
              {i < arr.length - 1 && <span className={styles.highlight}>{word}</span>}
            </span>
          ))}
        </>
      );
    }
  }
  return <>{title}</>;
}

// --- Desktop: scroll-driven sticky layout ---
function HowWeDoItDesktop() {
  const [activeStep, setActiveStep] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { t, steps } = useSteps();

  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    offset: ['start start', 'end end'],
  });

  const rawStep = useTransform(scrollYProgress, [0, 0.33, 0.66], [0, 1, 2]);

  useMotionValueEvent(rawStep, 'change', (latest) => {
    setActiveStep(Math.round(latest));
  });

  return (
    <div ref={scrollContainerRef} className={styles.scrollContainer}>
      <section className={styles.stickyContent}>
        <div className={styles.container}>
          <motion.div className={styles.leftColumn} {...scrollReveal}>
            <SectionEyebrow label={t('process.eyebrow')} description="" />
            <h2 className={styles.title}>
              <TitleWithHighlight title={t('process.title')} />
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

            <motion.div
              className={styles.progressBar}
              style={{ scaleX: scrollYProgress }}
            />
          </motion.div>

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
                  src={steps[activeStep]?.image}
                  alt={steps[activeStep]?.title}
                  className={styles.processImage}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                />
              </AnimatePresence>
              <div className={styles.imageOverlay}></div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

// --- Mobile: simple stacked cards ---
function HowWeDoItMobile() {
  const { t, steps } = useSteps();

  return (
    <section className={styles.mobileSection}>
      <div className={styles.mobileHeader}>
        <SectionEyebrow label={t('process.eyebrow')} description="" />
        <h2 className={styles.title}>
          <TitleWithHighlight title={t('process.title')} />
        </h2>
      </div>

      <div className={styles.mobileCards}>
        {steps.map((step, index) => (
          <motion.div
            key={index}
            className={styles.mobileCard}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <div className={styles.mobileCardImage}>
              <img
                src={step.image}
                alt={step.title}
                loading="lazy"
              />
              <div className={styles.imageOverlay}></div>
            </div>
            <div className={styles.mobileCardBody}>
              <span className={styles.stepNumber}>{step.number}.</span>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.mobileCardDescription}>{step.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// --- Parent: switches between mobile and desktop ---
export default function HowWeDoItSection() {
  const isMobile = useIsMobile();
  return isMobile ? <HowWeDoItMobile /> : <HowWeDoItDesktop />;
}
