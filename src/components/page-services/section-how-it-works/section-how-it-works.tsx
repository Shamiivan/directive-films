import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useLocalePath } from '../../../hooks/useLocalePath';
import styles from './section-how-it-works.module.css';

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.checkIcon} aria-hidden="true">
      <circle cx="9" cy="9" r="8.5" stroke="#999999" />
      <path d="M5.5 9L7.8 11.5L12.5 6.5" stroke="#999999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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

function ProcessStep({ step, index, cta }: { step: Step; index: number; cta: string }) {
  const l = useLocalePath();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start 0.35'],
  });

  const rawScaleX = useTransform(scrollYProgress, [0, 1], [0.84, 1]);
  const scaleX = index === 0 ? 1 : rawScaleX;

  const cardClassName = [
    styles.card,
    step.imageSide === 'left' ? styles.imageLeft : styles.imageRight,
  ].join(' ');

  return (
    <motion.div ref={ref} className={cardClassName} style={{ scaleX, zIndex: index + 1 }}>
      <div className={styles.content}>
        <div className={styles.stepNumber}>{step.marker}</div>
        {step.tag ? <span className={styles.tag}>{step.tag}</span> : null}
        <h4 className={styles.cardTitle}>{step.title}</h4>
        <p className={styles.cardDesc}>{step.description}</p>
        <div className={styles.featureList}>
          {(step.features ?? []).map((feature) => (
            <div className={styles.feature} key={feature}>
              <CheckIcon />
              <div>{feature}</div>
            </div>
          ))}
        </div>
        <div className={styles.ctaWrap}>
          <a href={l('/contact')} className={styles.cta}>
            <span>{cta}</span>
          </a>
        </div>
      </div>
      <div className={styles.imageWrap}>
        <picture>
          <source
            type="image/webp"
            srcSet={`${step.imageSrc.replace('.jpg', '-720.webp')} 720w, ${step.imageSrc.replace('.jpg', '-1100.webp')} 1100w`}
            sizes="(max-width: 767px) calc(100vw - 40px), 700px"
          />
          <img
            src={step.imageSrc}
            alt=""
            className={styles.image}
            loading="lazy"
            decoding="async"
            sizes="(max-width: 767px) calc(100vw - 40px), 700px"
          />
        </picture>
      </div>
    </motion.div>
  );
}

export default function HowItWorksSection() {
  const { t } = useTranslation('services');
  const rawStepCopy = t('howItWorks.steps', { returnObjects: true });
  const stepCopy = Array.isArray(rawStepCopy) ? rawStepCopy as StepCopy[] : [];
  const steps = stepMeta
    .map((meta, index) => ({ ...meta, ...stepCopy[index] }))
    .filter((step): step is Step => Boolean(step.title && step.description));

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>{t('howItWorks.heading')}</h2>
        <h3 className={styles.subheading}>{t('howItWorks.subheading')}</h3>
        <div className={styles.spacer} />
        <div className={styles.steps}>
          {steps.map((step, index) => (
            <ProcessStep key={step.title} step={step} index={index} cta={t('howItWorks.cta')} />
          ))}
        </div>
      </div>
    </section>
  );
}
