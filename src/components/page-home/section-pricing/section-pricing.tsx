import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import MagneticButton from '../../MagneticButton';
import SectionEyebrow from '../../SectionEyebrow';
import { scrollReveal } from '../../../utils/animations';
import { useTilt } from '../../../hooks/useTilt';
import { useLocalePath } from '../../../hooks/useLocalePath';
import styles from './section-pricing.module.css';

interface OfferType {
  name: string;
  headline: string;
  description: string;
  bestFor: string;
  includes: string[];
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
  highlight
}: {
  offer: OfferType;
  index: number;
  isHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  children: React.ReactNode;
  highlight: boolean;
}) {
  const { style: tiltStyle, onMouseMove, onMouseLeave } = useTilt({ maxRotation: 3 });

  return (
    <motion.div
      className={`${styles.packageCard} ${highlight ? styles.highlighted : ''}`}
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
  const { t } = useTranslation('home');
  const l = useLocalePath();

  const CheckIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.6668 5L7.50016 14.1667L3.3335 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  const offers = t('pricing.offers', { returnObjects: true }) as OfferType[];

  // Highlight Growth (index 1)
  const isHighlighted = (index: number) => index === 1;

  return (
    <section className={styles.pricingSection}>
      <div className={styles.container}>
        {/* Header */}
        <motion.div className={styles.header} {...scrollReveal}>
          <SectionEyebrow label={t('pricing.eyebrow')} description="" />
          <h2 className={styles.title}>
            {t('pricing.title').split('work together').map((part, i, arr) => (
              <span key={i}>
                {part}
                {i < arr.length - 1 && <span className={styles.gold}>work together</span>}
              </span>
            ))}
          </h2>
          <p className={styles.subtitle}>
            {t('pricing.subtitle')}
          </p>
        </motion.div>

        {/* Offer Cards */}
        <div className={styles.packagesGrid}>
          {offers.map((offer, index) => {
            const highlight = isHighlighted(index);
            return (
              <OfferCard
                key={index}
                offer={offer}
                index={index}
                isHovered={hoveredCard === index}
                onHoverStart={() => setHoveredCard(index)}
                onHoverEnd={() => setHoveredCard(null)}
                highlight={highlight}
              >

                {highlight && (
                  <div className={styles.badge}>
                    <span>{t('pricing.popular')}</span>
                  </div>
                )}

                <div className={styles.packageHeader}>
                  <h3 className={styles.packageName}>{offer.name}</h3>
                  <p className={styles.packageTagline}>{offer.headline}</p>
                </div>

                <div className={styles.offerDescription}>
                  <p className={styles.description}>{offer.description}</p>
                  <p className={styles.bestFor}><strong>{t('pricing.bestFor')}</strong> {offer.bestFor}</p>
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
                    className={`${styles.ctaButton} ${highlight ? styles.ctaHighlight : ''}`}
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
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div className={styles.bottomCta} {...scrollReveal}>
          <p className={styles.ctaText}>
            {t('pricing.notSure')}{' '}
            <Link to={l("/contact")} className={styles.ctaLink}>
              {t('pricing.talk')}
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
