import { useRef, useState, useSyncExternalStore } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import SectionEyebrow from '../../SectionEyebrow';
import { EditableTranslation, EditableTranslationStatic } from '@/cms/EditableTranslation';
import { useIsEditing } from '@/cms/EditModeProvider';
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

// --- Desktop: sticky layout with click-to-toggle steps ---
function HowWeDoItDesktop() {
  const editMode = useIsEditing();
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { steps } = useSteps();

  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    offset: ['start start', 'end end'],
  });

  const toggle = (index: number) =>
    setActiveStep((current) => (current === index ? null : index));

  return (
    <div ref={scrollContainerRef} className={styles.scrollContainer}>
      <section className={styles.stickyContent}>
        <div className={styles.container}>
          <motion.div className={styles.leftColumn} {...scrollReveal}>
            <SectionEyebrow
              label={
                <EditableTranslation
                  pageSlug="home"
                  namespace="home"
                  path="process.eyebrow"
                  label="Process eyebrow"
                />
              }
              description=""
            />
            <EditableTranslationStatic pageSlug="home" namespace="home" path="process.title">
              {({ value, editMode }) =>
                editMode ? (
                  <EditableTranslation
                    pageSlug="home"
                    namespace="home"
                    path="process.title"
                    label="Process title"
                    kind="text"
                    as="h2"
                    className={styles.title}
                  />
                ) : (
                  <h2 className={styles.title}>
                    <TitleWithHighlight title={value} />
                  </h2>
                )
              }
            </EditableTranslationStatic>
            <div className={styles.divider}></div>

            <div className={styles.stepsList}>
              {steps.map((_, index) => {
                const expanded = editMode || activeStep === index;
                return (
                <motion.div
                  key={index}
                  className={`${styles.stepItem} ${expanded ? styles.active : ''}`}
                  onClick={editMode ? undefined : () => toggle(index)}
                  whileHover={editMode ? undefined : { x: 8 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className={styles.stepHeader}>
                    <span className={styles.stepNumber}>
                      <EditableTranslation
                        pageSlug="home"
                        namespace="home"
                        path={`process.steps.${index}.number`}
                        label={`Step ${index + 1} number`}
                      />.
                    </span>
                    <EditableTranslation
                      pageSlug="home"
                      namespace="home"
                      path={`process.steps.${index}.title`}
                      label={`Step ${index + 1} title`}
                      as="h3"
                      className={styles.stepTitle}
                    />
                  </div>

                  <AnimatePresence>
                    {expanded && (
                      <motion.p
                        className={styles.stepDescription}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                      >
                        <EditableTranslation
                          pageSlug="home"
                          namespace="home"
                          path={`process.steps.${index}.description`}
                          label={`Step ${index + 1} description`}
                          kind="text"
                        />
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>
                );
              })}
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
                  key={activeStep ?? 'none'}
                  src={steps[activeStep ?? 0]?.image}
                  alt={steps[activeStep ?? 0]?.title}
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
  const editMode = useIsEditing();
  const { steps } = useSteps();
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const toggle = (index: number) =>
    setActiveStep((current) => (current === index ? null : index));

  return (
    <section className={styles.mobileSection}>
      <div className={styles.mobileHeader}>
        <SectionEyebrow
          label={
            <EditableTranslation
              pageSlug="home"
              namespace="home"
              path="process.eyebrow"
              label="Process eyebrow"
            />
          }
          description=""
        />
        <EditableTranslationStatic pageSlug="home" namespace="home" path="process.title">
          {({ value, editMode }) =>
            editMode ? (
              <EditableTranslation
                pageSlug="home"
                namespace="home"
                path="process.title"
                label="Process title"
                kind="text"
                as="h2"
                className={styles.title}
              />
            ) : (
              <h2 className={styles.title}>
                <TitleWithHighlight title={value} />
              </h2>
            )
          }
        </EditableTranslationStatic>
      </div>

      <div className={styles.mobileCards}>
        {steps.map((step, index) => {
          const isOpen = editMode || activeStep === index;
          return (
            <motion.div
              key={index}
              className={`${styles.mobileCard} ${isOpen ? styles.active : ''}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              onClick={editMode ? undefined : () => toggle(index)}
              role={editMode ? undefined : "button"}
              aria-expanded={editMode ? undefined : isOpen}
            >
              {isOpen && (
                <div className={styles.mobileCardImage}>
                  <img src={step.image} alt={step.title} loading="lazy" />
                  <div className={styles.imageOverlay}></div>
                </div>
              )}
              <div className={styles.mobileCardBody}>
                <span className={styles.stepNumber}>
                  <EditableTranslation
                    pageSlug="home"
                    namespace="home"
                    path={`process.steps.${index}.number`}
                    label={`Step ${index + 1} number`}
                  />.
                </span>
                <EditableTranslation
                  pageSlug="home"
                  namespace="home"
                  path={`process.steps.${index}.title`}
                  label={`Step ${index + 1} title`}
                  as="h3"
                  className={styles.stepTitle}
                />
                <AnimatePresence>
                  {isOpen && (
                    <motion.p
                      className={styles.mobileCardDescription}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                      <EditableTranslation
                        pageSlug="home"
                        namespace="home"
                        path={`process.steps.${index}.description`}
                        label={`Step ${index + 1} description`}
                        kind="text"
                      />
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

// --- Parent: switches between mobile and desktop ---
export default function HowWeDoItSection() {
  const isMobile = useIsMobile();
  return isMobile ? <HowWeDoItMobile /> : <HowWeDoItDesktop />;
}
