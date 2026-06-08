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

const steps = [
  {
    stepNumber: '1',
    title: 'Offer validation',
    description: 'Before investing in creative production and advertising, we make sure your offer will resonate with your target market.',
    features: [
      'Value proposition assessment',
      'Pricing strategy',
      'Competitive positioning and messaging to drive conversions',
    ],
    imageSrc: 'https://c.animaapp.com/mq5orz0l4TJdHl/assets/6877b8fa0337379217b541fd_8818f8_622cfe3b2caa4ed09f559c3a0d942c42~mv2-min.jpg',
    imageSizes: '(max-width: 767px) 100vw, (max-width: 991px) 728px, 800px',
    imageSide: 'right',
  },
  {
    stepNumber: '2',
    title: 'Shooting & editing',
    description: 'Our production team captures high-quality video content designed specifically for performance marketing.',
    features: [
      'Between 10-20 capsules per shooting day',
      'Shot-for-shot planning for conversions',
      'Conversion-driven editing to capture attention and drive sales',
    ],
    imageSrc: 'https://c.animaapp.com/mq5orz0l4TJdHl/assets/68680d2a2efe8066bd03f461_A04I5535-2_(1).jpg',
    imageSizes: '(max-width: 767px) 100vw, (max-width: 991px) 727.984375px, 940px',
    imageSide: 'left',
  },
  {
    stepNumber: '3',
    title: 'Paid ads',
    description: 'We design, launch, and optimize Meta ad campaigns engineered for performance. Our team continuously tests variations, audience segments, and bidding strategies to lower your cost per acquisition while scaling reach.',
    features: [
      'Optimized for qualified leads & cost per lead',
      'A/B testing with video content',
    ],
    imageSrc: 'https://c.animaapp.com/mq5orz0l4TJdHl/assets/690b9026719776aa3034aea1_Mask_group_(4)-min.jpg',
    imageSizes: '(max-width: 767px) 100vw, (max-width: 991px) 728px, 940px',
    imageSide: 'right',
  },
  {
    stepNumber: '4',
    title: 'CRM automation',
    description: 'We implement and configure a comprehensive CRM system tailored to your business workflows.',
    features: [
      'Lead tracking and pipeline management',
      'Automated follow-up sequences',
      'Email campaigns',
    ],
    imageSrc: 'https://c.animaapp.com/mq5orz0l4TJdHl/assets/6903a9b63a33ff8b1e07deaf_Group_44.jpg',
    imageSizes: '(max-width: 767px) 100vw, (max-width: 991px) 727.984375px, 939.984375px',
    imageSide: 'left',
  },
  {
    stepNumber: '5',
    title: 'Sales team',
    description: "Our sales team qualifies prospects to ensure they're the right fit and close deals on your behalf.",
    features: [
      'Time-sensitive closing of hot leads coming from paid ads campaigns',
      'Dedicated sales team working on your behalf',
      'Quebec-based sales team, available 7/7 days',
    ],
    imageSrc: 'https://c.animaapp.com/mq5orz0l4TJdHl/assets/69111f670dc7f93e801612ce_A7401981-min.jpg',
    imageSizes: '(max-width: 767px) 100vw, (max-width: 991px) 727.984375px, 939.984375px',
    imageSide: 'right',
  },
];

type Step = typeof steps[number];

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
        <div className={styles.stepNumber}>{step.stepNumber}</div>
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
        <img src={step.imageSrc} sizes={step.imageSizes} alt="" className={styles.image} />
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
          From storytelling to automation to sales execution, the helps brands scale faster and smarter.
        </h3>
        <div className={styles.spacer} />
        <div className={styles.steps}>
          {steps.map((step, index) => (
            <ProcessStep key={step.stepNumber} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
