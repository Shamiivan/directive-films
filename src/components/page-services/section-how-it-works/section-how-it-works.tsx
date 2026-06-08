import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './section-how-it-works.module.css';

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.checkIcon} aria-hidden="true">
      <circle cx="9" cy="9" r="8.5" stroke="#999999" />
      <path d="M5.5 9L7.8 11.5L12.5 6.5" stroke="#999999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type Step = {
  marker: string;
  tag?: string;
  title: string;
  description: string;
  features: string[];
  imageSrc: string;
  imageSide: 'left' | 'right';
};

const steps: Step[] = [
  {
    marker: '1',
    tag: 'Free',
    title: 'Growth Audit',
    description: "Straight talk on what's holding you back — at no charge.",
    features: [
      'We pull apart your funnel',
      'Show where rivals beat you',
      'Ranked, do-this-first plan',
      'Costs you nothing',
    ],
    imageSrc: '/images/svc/svc-audit.jpg',
    imageSide: 'right',
  },
  {
    marker: '2',
    title: 'Offer Validation & Restructure',
    description: 'We make sure the offer sells before we spend a dollar on it.',
    features: [
      'Test it against the market',
      'Reshape pricing & promise',
      "Kill what doesn't land",
      'Lock in what converts',
    ],
    imageSrc: '/images/svc/svc-offer-validation.jpg',
    imageSide: 'left',
  },
  {
    marker: '3',
    title: 'Scripting',
    description: 'Words written to sell, not to sound clever.',
    features: [
      'Hooks that stop the scroll',
      'Built around how you close',
      'For ads and organic alike',
      'You approve before we roll',
    ],
    imageSrc: '/images/svc/svc-scripting.jpg',
    imageSide: 'right',
  },
  {
    marker: '4',
    tag: 'Flagship',
    title: 'Filming & On-Camera Coaching',
    description: 'We shoot it on cinema cameras — and coach you so you actually look good and sound natural on camera.',
    features: [
      'Cinema-camera crews',
      'On-camera coaching for you & your team',
      'On set in days, not months',
      'Confident, natural delivery',
    ],
    imageSrc: '/images/svc/svc-filming.jpg',
    imageSide: 'left',
  },
  {
    marker: '5',
    title: 'Editing',
    description: 'Cut for attention and for the platform it lives on.',
    features: [
      'Ad-ready & short-form cuts',
      'Captions, motion, sound',
      'Multiple variants to test',
      'Fast turnarounds',
    ],
    imageSrc: '/images/svc/svc-editing.jpg',
    imageSide: 'right',
  },
  {
    marker: '6',
    title: 'Ad Campaigns & Organic Content',
    description: 'Paid and organic, pulling in the same direction.',
    features: [
      'Meta & Google, managed daily',
      'Organic content that compounds',
      'Creative tested fast',
      'Reporting in dollars',
    ],
    imageSrc: '/images/svc/svc-ads.jpg',
    imageSide: 'left',
  },
  {
    marker: '7',
    title: 'Posting On All Platforms',
    description: 'We handle the calendar and hit publish everywhere.',
    features: [
      'Instagram, TikTok, YouTube, LinkedIn & more',
      'Consistent posting schedule',
      'Platform-native formatting',
      'Hands off your plate',
    ],
    imageSrc: '/images/svc/svc-posting.jpg',
    imageSide: 'right',
  },
  {
    marker: '8',
    title: 'CRM & Sales Systems',
    description: 'So no lead ever slips through the cracks again.',
    features: [
      'Built around your workflow',
      'Auto follow-ups & reminders',
      'Revenue you can actually see',
      'We train your team to run it',
    ],
    imageSrc: '/images/svc/svc-crm.jpg',
    imageSide: 'left',
  },
  {
    marker: '9',
    tag: 'AI',
    title: 'AI & Automation',
    description: 'The work your team dreads, handled around the clock.',
    features: [
      'Leads answered 24/7',
      'Follow-ups written for you',
      'Pipeline scored automatically',
      'Hours of admin, gone',
    ],
    imageSrc: '/images/svc/svc-ai.jpg',
    imageSide: 'right',
  },
  {
    marker: '10',
    tag: 'Performance-based',
    title: 'Commission Sales Team',
    description: 'Closers who only earn when you do.',
    features: [
      'Trained, vetted, ready',
      'They work your inbound leads',
      'Performance-based — no retainer risk',
      'Wired straight into your CRM',
    ],
    imageSrc: '/images/svc/svc-sales-team.jpg',
    imageSide: 'left',
  },
];

function ProcessStep({ step, index }: { step: Step; index: number }) {
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
          {step.features.map((feature) => (
            <div className={styles.feature} key={feature}>
              <CheckIcon />
              <div>{feature}</div>
            </div>
          ))}
        </div>
        <div className={styles.ctaWrap}>
          <a href="/start-your-project" className={styles.cta}>
            <span>Book a call</span>
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
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>How it works</h2>
        <h3 className={styles.subheading}>
          From the first audit to a closed deal — one team, the whole journey.
        </h3>
        <div className={styles.spacer} />
        <div className={styles.steps}>
          {steps.map((step, index) => (
            <ProcessStep key={step.title} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
