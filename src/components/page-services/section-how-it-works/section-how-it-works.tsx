import { useEffect, useRef, useState, type RefObject } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import CtaButton from '@/components/shared/cta-button/cta-button';
import SectionHeader from '@/components/shared/section-header/section-header';
import {
  staggerListContainer,
  staggerListItem,
  useParallax,
} from '../../../utils/animations';
import styles from './section-how-it-works.module.css';

function CheckIcon() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={styles.checkIcon}
      aria-hidden="true"
    >
      <circle cx="13" cy="13" r="13" fill="currentColor" fillOpacity="0.12" />
      <path
        d="M8 13.2L11.4 16.6L18 9.6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type StepCopy = {
  tag?: string;
  title: string;
  description: string;
  features?: string[];
};

type Step = StepCopy & {
  marker: string;
  imageSrc: string;
  imageSide: 'left' | 'right';
};

// TODO(asset): real client stills for each service — current /images/svc/*.jpg
// look like stock/AI placeholders. Swap each imageSrc below for a real still
// (dashboards, results, team on set) once provided. References kept as-is for now.
const stepMeta = [
  { marker: '1', imageSrc: '/images/svc/svc-audit.jpg', imageSide: 'right' as const },
  { marker: '2', imageSrc: '/images/svc/svc-offer-validation.jpg', imageSide: 'left' as const },
  { marker: '3', imageSrc: '/images/svc/svc-scripting.jpg', imageSide: 'right' as const },
  { marker: '4', imageSrc: '/images/svc/svc-filming.jpg', imageSide: 'left' as const },
  { marker: '5', imageSrc: '/images/svc/svc-editing.jpg', imageSide: 'right' as const },
  { marker: '6', imageSrc: '/images/svc/svc-ads.jpg', imageSide: 'left' as const },
  { marker: '7', imageSrc: '/images/svc/svc-posting.jpg', imageSide: 'right' as const },
  { marker: '8', imageSrc: '/images/svc/svc-crm.jpg', imageSide: 'left' as const },
  { marker: '9', imageSrc: '/images/svc/svc-ai.jpg', imageSide: 'right' as const },
  { marker: '10', imageSrc: '/images/svc/svc-sales-team.jpg', imageSide: 'left' as const },
];

// Card scaling only runs on desktop (where cards are sticky/stacked) and when
// the user hasn't asked for reduced motion. Below 768px cards are a plain list.
function useStackScaleEnabled() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const motionOk = window.matchMedia('(min-width: 768px)');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setEnabled(motionOk.matches && !reduced.matches);
    update();
    motionOk.addEventListener('change', update);
    reduced.addEventListener('change', update);
    return () => {
      motionOk.removeEventListener('change', update);
      reduced.removeEventListener('change', update);
    };
  }, []);

  return enabled;
}

function ProcessRow({ step, cta }: { step: Step; cta: string }) {
  const { ref, y } = useParallax(40);

  // Benjy-style growth: each card rises from 0.85 to full size as its top
  // travels from the bottom of the viewport up into the active sticky zone,
  // then freezes at scale(1) once pinned. transform-origin: top anchors the
  // growth to the sticky top so the card never jumps.
  const rowRef = useRef<HTMLDivElement>(null);
  const scaleEnabled = useStackScaleEnabled();
  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ['start end', 'start 25%'],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);

  const rowClassName = [
    styles.row,
    step.imageSide === 'left' ? styles.imageLeft : styles.imageRight,
  ].join(' ');

  const webpSrcSet = `${step.imageSrc.replace('.jpg', '-720.webp')} 720w, ${step.imageSrc.replace('.jpg', '-1100.webp')} 1100w`;

  return (
    <motion.div
      ref={rowRef}
      className={rowClassName}
      style={scaleEnabled ? { scale } : undefined}
    >
      <div className={styles.content}>
        <div className={styles.stepNumber}>{step.marker.padStart(2, '0')}</div>
        {step.tag ? <span className={styles.tag}>{step.tag}</span> : null}
        <h3 className={styles.cardTitle}>{step.title}</h3>
        <p className={styles.cardDesc}>{step.description}</p>
        <motion.ul
          className={styles.featureList}
          variants={staggerListContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={staggerListContainer.viewport}
        >
          {(step.features ?? []).map((feature) => (
            <motion.li className={styles.feature} key={feature} variants={staggerListItem}>
              <CheckIcon />
              <span>{feature}</span>
            </motion.li>
          ))}
        </motion.ul>
        <div className={styles.ctaWrap}>
          <CtaButton to="/audit" variant="dark">{cta}</CtaButton>
        </div>
      </div>

      <div className={styles.imageWrap}>
        <motion.div
          ref={ref as RefObject<HTMLDivElement>}
          className={styles.imageDrift}
          style={{ y }}
        >
          <picture>
            <source
              type="image/webp"
              srcSet={webpSrcSet}
              sizes="(max-width: 767px) 100vw, 50vw"
            />
            <img
              src={step.imageSrc}
              alt=""
              className={styles.image}
              loading="lazy"
              decoding="async"
              sizes="(max-width: 767px) 100vw, 50vw"
            />
          </picture>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function HowItWorksSection() {
  const { t } = useTranslation('services');
  const rawStepCopy = t('howItWorks.steps', { returnObjects: true });
  const stepCopy = Array.isArray(rawStepCopy) ? (rawStepCopy as StepCopy[]) : [];
  const steps = stepMeta
    .map((meta, index) => ({ ...meta, ...stepCopy[index] }))
    .filter((step): step is Step => Boolean(step.title && step.description));

  return (
    <section className={styles.section}>
      <div className={styles.intro}>
        <SectionHeader
          tone="light"
          align="center"
          eyebrow={t('howItWorks.eyebrow')}
          title={t('howItWorks.heading')}
          intro={t('howItWorks.subheading')}
        />
      </div>
      <div className={styles.steps}>
        {steps.map((step) => (
          <ProcessRow key={step.title} step={step} cta={t('howItWorks.cta')} />
        ))}
      </div>
    </section>
  );
}
