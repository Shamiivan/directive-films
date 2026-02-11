'use client';

import { motion } from 'framer-motion';
import MagneticButton from '../../MagneticButton';
import { scrollReveal, gridStagger } from '../../../utils/animations';
import styles from './offer-section.module.css';

export default function OfferSection() {
  const CheckIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.6668 5L7.50016 14.1667L3.3335 10" stroke="#FDB714" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const packages = [
    {
      name: 'Starter',
      tagline: 'Perfect for testing the waters',
      price: '$2,500',
      period: 'one-time',
      features: [
        '1 professional video (up to 60s)',
        'Script development & storyboarding',
        'Professional voiceover',
        'Stock footage & music',
        'Basic color grading',
        '2 rounds of revisions',
        'Delivery in 2 weeks',
      ],
      highlight: false,
    },
    {
      name: 'Growth',
      tagline: 'Drive consistent leads',
      price: '$7,500',
      period: '/month',
      features: [
        '3 professional videos per month',
        'Advanced script & creative strategy',
        'Professional on-location filming',
        'Custom graphics & animations',
        'Advanced color grading & VFX',
        'Unlimited revisions',
        'Priority support & rush delivery',
        'Monthly performance analytics',
        'Video SEO optimization',
      ],
      highlight: true,
    },
    {
      name: 'Enterprise',
      tagline: 'Scale your video marketing',
      price: 'Custom',
      period: 'pricing',
      features: [
        'Unlimited video production',
        'Dedicated creative team',
        'Full-service production crew',
        'Multi-platform campaign strategy',
        'A/B testing & optimization',
        'Quarterly strategy sessions',
        'White-glove account management',
        'Custom integrations & workflows',
        'Priority 24/7 support',
      ],
      highlight: false,
    },
  ];

  return (
    <section className={styles.offerSection}>
      <div className={styles.container}>
        {/* Header */}
        <motion.div className={styles.header} {...scrollReveal}>
          <h2 className={styles.title}>
            Transform Your Business with{' '}
            <span className={styles.gold}>Video That Converts</span>
          </h2>
          <p className={styles.subtitle}>
            Choose the package that fits your growth goals. All packages include our proven
            framework for generating qualified leads through strategic video content.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          className={styles.packagesGrid}
          variants={gridStagger}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: "-50px" }}
        >
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              className={`${styles.packageCard} ${pkg.highlight ? styles.highlighted : ''}`}
              variants={scrollReveal}
              whileHover={{
                scale: 1.03,
                y: -8,
              }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
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
                >
                  {pkg.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
                </MagneticButton>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div className={styles.bottomCta} {...scrollReveal}>
          <p className={styles.ctaText}>
            Not sure which package is right for you?{' '}
            <a href="#contact" className={styles.ctaLink}>
              Schedule a free consultation
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
