import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MagneticButton from '../../MagneticButton';
import { scrollReveal } from '../../../utils/animations';
import { useTilt } from '../../../hooks/useTilt';
import styles from './section-pricing.module.css';

interface PkgType {
  name: string;
  tagline: string;
  price: string;
  period: string;
  features: string[];
  highlight: boolean;
  ctaText: string;
  hoverText: string;
}

function PricingCard({
  pkg,
  index,
  isHovered,
  onHoverStart,
  onHoverEnd,
  children,
}: {
  pkg: PkgType;
  index: number;
  isHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  children: React.ReactNode;
}) {
  const { style: tiltStyle, onMouseMove, onMouseLeave } = useTilt({ maxRotation: 3 });

  return (
    <motion.div
      className={`${styles.packageCard} ${pkg.highlight ? styles.highlighted : ''}`}
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
      <path d="M16.6668 5L7.50016 14.1667L3.3335 10" stroke="#FDB714" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  const packages = [
    {
      name: 'Sprint',
      tagline: 'One problem. Two weeks. Done.',
      price: '$2,500',
      period: 'one-time',
      features: [
        'Online presence audit',
        'Prioritized recommendations report',
        'One deliverable (video, landing page, or CRM setup)',
        'Implementation guidance',
        '2 rounds of revisions',
        'Delivered in 2 weeks',
      ],
      highlight: false,
      ctaText: 'Get Started',
      hoverText: 'Start in 2 Weeks',
    },
    {
      name: 'Growth Partner',
      tagline: 'Ongoing systems that compound',
      price: '$7,500',
      period: '/month',
      features: [
        'Full audit & growth strategy',
        'Content production (3 videos/month)',
        'CRM & sales system optimization',
        'Website updates & conversion testing',
        'In-house content coaching sessions',
        'Monthly performance reviews',
        'Unlimited revisions',
        'Priority support & rush delivery',
        'Dedicated growth strategist',
      ],
      highlight: true,
      ctaText: 'Get Started',
      hoverText: 'Book Strategy Call',
    },
    {
      name: 'Enterprise',
      tagline: 'Your growth team, on demand',
      price: 'Custom',
      period: 'pricing',
      features: [
        'Everything in Growth Partner',
        'Dedicated creative & dev team',
        'Multi-platform campaign strategy',
        'Advanced analytics & A/B testing',
        'Quarterly strategy sessions',
        'Custom integrations & workflows',
        'Dedicated account manager',
        'Priority 24/7 support',
        'Scales as you grow',
      ],
      highlight: false,
      ctaText: 'Contact Sales',
      hoverText: 'Talk to Our Team',
    },
  ];

  return (
    <section className={styles.pricingSection}>
      <div className={styles.container}>
        {/* Header */}
        <motion.div className={styles.header} {...scrollReveal}>
          <h2 className={styles.title}>
            Pick your <span className={styles.gold}>level</span>
          </h2>
          <p className={styles.subtitle}>
            Pick where you are. We'll figure out the rest together.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className={styles.packagesGrid}>
          {packages.map((pkg, index) => (
            <PricingCard
              key={index}
              pkg={pkg}
              index={index}
              isHovered={hoveredCard === index}
              onHoverStart={() => setHoveredCard(index)}
              onHoverEnd={() => setHoveredCard(null)}
            >

              {pkg.highlight && (
                <div className={styles.badge}>
                  <span>Most Popular</span>
                </div>
              )}

              <div className={styles.packageHeader}>
                <h3 className={styles.packageName}>{pkg.name}</h3>
                <p className={styles.packageTagline}>{pkg.tagline}</p>
              </div>

              <div className={styles.pricing}>
                <span className={styles.price}>{pkg.price}</span>
                <span className={styles.period}>{pkg.period}</span>
              </div>

              <ul className={styles.featuresList}>
                {pkg.features.map((feature, i) => (
                  <li key={i} className={styles.feature}>
                    <span className={styles.checkIcon}>
                      <CheckIcon />
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className={styles.ctaWrapper}>
                <MagneticButton
                  className={`${styles.ctaButton} ${pkg.highlight ? styles.ctaHighlight : ''}`}
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
                          {pkg.hoverText}
                        </motion.span>
                      ) : (
                        <motion.span
                          key="default"
                          initial={{ y: 8, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -8, opacity: 0 }}
                          transition={{ duration: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
                        >
                          {pkg.ctaText}
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
            </PricingCard>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div className={styles.bottomCta} {...scrollReveal}>
          <p className={styles.ctaText}>
            Not sure where to start?{' '}
            <a href="/contact" className={styles.ctaLink}>
              Book a free strategy call
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
