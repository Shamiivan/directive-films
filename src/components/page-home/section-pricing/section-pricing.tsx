import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MagneticButton from '../../MagneticButton';
import SectionEyebrow from '../../SectionEyebrow';
import { scrollReveal } from '../../../utils/animations';
import { useTilt } from '../../../hooks/useTilt';
import styles from './section-pricing.module.css';

interface OfferType {
  name: string;
  headline: string;
  description: string;
  bestFor: string;
  includes: string[];
  highlight: boolean;
  ctaText: string;
  hoverText: string;
}

function OfferCard({
  offer,
  index,
  isHovered,
  onHoverStart,
  onHoverEnd,
  children,
}: {
  offer: OfferType;
  index: number;
  isHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  children: React.ReactNode;
}) {
  const { style: tiltStyle, onMouseMove, onMouseLeave } = useTilt({ maxRotation: 3 });

  return (
    <motion.div
      className={`${styles.packageCard} ${offer.highlight ? styles.highlighted : ''}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      onMouseMove={onMouseMove}
      onMouseLeave={() => {
        onMouseLeave();
        onHoverEnd();
      }}
      onMouseEnter={onHoverStart}
      style={tiltStyle}
      whileHover={{ scale: 1.02 }}
    >
      {children}
    </motion.div>
  );
}

export default function PricingSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const CheckIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.6668 5L7.50016 14.1667L3.3335 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  const offers: OfferType[] = [
    {
      name: 'Growth',
      headline: 'One problem. Two weeks. Done.',
      description: 'You know what\'s broken — you just need someone to fix it. We take one thing off your plate and deliver it fast.',
      bestFor: 'A single deliverable: a video, a landing page, a CRM setup, or an audit with a clear action plan.',
      includes: [
        'Online presence audit',
        'Prioritized recommendations report',
        'One deliverable of your choice',
        'Implementation guidance',
        '2 rounds of revisions',
        'Delivered in 2 weeks',
      ],
      highlight: false,
      ctaText: 'Get Started',
      hoverText: 'Let\'s Talk →',
    },
    {
      name: 'Scaling',
      headline: 'Ongoing systems that compound.',
      description: 'You want consistent content, a real sales system, and someone who actually owns it month to month. That\'s us.',
      bestFor: 'Businesses ready to build a content engine, optimize their pipeline, and grow without guessing.',
      includes: [
        'Full audit & growth strategy',
        'Monthly content production (3 videos)',
        'CRM & sales system optimization',
        'Website updates & conversion testing',
        'In-house content coaching',
        'Monthly performance reviews',
        'Unlimited revisions',
        'Dedicated growth strategist',
      ],
      highlight: true,
      ctaText: 'Start Scaling',
      hoverText: 'Book Strategy Call →',
    },
    {
      name: 'Enterprise',
      headline: 'Your growth team, on demand.',
      description: 'You need creative, dev, and strategy working together — without hiring six people. We embed with your team and scale with you.',
      bestFor: 'Companies running multi-platform campaigns who need a dedicated team that moves fast.',
      includes: [
        'Everything in Scaling',
        'Dedicated creative & dev team',
        'Multi-platform campaign strategy',
        'Advanced analytics & A/B testing',
        'Quarterly strategy sessions',
        'Custom integrations & workflows',
        'Dedicated account manager',
        'Priority support',
      ],
      highlight: false,
      ctaText: 'Contact Us',
      hoverText: 'Meet the Team →',
    },
  ];

  return (
    <section className={styles.pricingSection}>
      <div className={styles.container}>
        {/* Header */}
        <motion.div className={styles.header} {...scrollReveal}>
          <SectionEyebrow label="Packages" description="" />
          <h2 className={styles.title}>
            Ways to <span className={styles.gold}>work together</span>
          </h2>
          <p className={styles.subtitle}>
            Pick what fits. We'll figure out the rest on a call.
          </p>
        </motion.div>

        {/* Offer Cards */}
        <div className={styles.packagesGrid}>
          {offers.map((offer, index) => (
            <OfferCard
              key={index}
              offer={offer}
              index={index}
              isHovered={hoveredCard === index}
              onHoverStart={() => setHoveredCard(index)}
              onHoverEnd={() => setHoveredCard(null)}
            >

              {offer.highlight && (
                <div className={styles.badge}>
                  <span>Most Popular</span>
                </div>
              )}

              <div className={styles.packageHeader}>
                <h3 className={styles.packageName}>{offer.name}</h3>
                <p className={styles.packageTagline}>{offer.headline}</p>
              </div>

              <div className={styles.offerDescription}>
                <p className={styles.description}>{offer.description}</p>
                <p className={styles.bestFor}><strong>Best for:</strong> {offer.bestFor}</p>
              </div>

              <ul className={styles.featuresList}>
                {offer.includes.map((item, i) => (
                  <li key={i} className={styles.feature}>
                    <span className={styles.checkIcon}>
                      <CheckIcon />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className={styles.ctaWrapper}>
                <MagneticButton
                  className={`${styles.ctaButton} ${offer.highlight ? styles.ctaHighlight : ''}`}
                  href="/contact"
                >
                  <span className={styles.ctaTextWrapper}>
                    <AnimatePresence mode="wait">
                      {hoveredCard === index ? (
                        <motion.span
                          key="hover"
                          initial={{ y: 8, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -8, opacity: 0 }}
                          transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                        >
                          {offer.hoverText}
                        </motion.span>
                      ) : (
                        <motion.span
                          key="default"
                          initial={{ y: 8, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -8, opacity: 0 }}
                          transition={{ duration: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
                        >
                          {offer.ctaText}
                        </motion.span>
                      )}
                    </AnimatePresence>
                    <motion.span
                      className={styles.ctaArrow}
                      initial={false}
                      animate={{
                        x: hoveredCard === index ? 0 : -4,
                        opacity: hoveredCard === index ? 1 : 0,
                      }}
                      transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                      →
                    </motion.span>
                  </span>
                </MagneticButton>
              </div>
            </OfferCard>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div className={styles.bottomCta} {...scrollReveal}>
          <p className={styles.ctaText}>
            Not sure which fits?{' '}
            <a href="/contact" className={styles.ctaLink}>
              Book a free strategy call
            </a>{' '}
            — we'll figure it out together.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
