import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import SectionEyebrow from '../../SectionEyebrow';
import CtaButton from '../../shared/cta-button/cta-button';
import { EditableTranslation } from '@/cms/EditableTranslation';
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
}

function OfferCard({
  index,
  children,
  highlight
}: {
  index: number;
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
      onMouseLeave={onMouseLeave}
      style={tiltStyle}
      whileHover={{ scale: 1.02 }}
    >
      {children}
    </motion.div>
  );
}

export default function PricingSection() {
  const { t } = useTranslation('services');
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
          <SectionEyebrow
            label={
              <EditableTranslation pageSlug="services" namespace="services" path="pricing.eyebrow" label="Pricing eyebrow" />
            }
            description=""
          />
          <h2 className={styles.title}>
            {t('pricing.title').split('work together').map((part, i, arr) => (
              <span key={i}>
                {part}
                {i < arr.length - 1 && <span className={styles.gold}>work together</span>}
              </span>
            ))}
          </h2>
          <EditableTranslation
            pageSlug="services"
            namespace="services"
            path="pricing.subtitle"
            label="Pricing subtitle"
            kind="text"
            as="p"
            className={styles.subtitle}
          />
        </motion.div>

        {/* Offer Cards */}
        <div className={styles.packagesGrid}>
          {offers.map((offer, index) => {
            const highlight = isHighlighted(index);
            return (
              <OfferCard
                key={index}
                index={index}
                highlight={highlight}
              >

                {highlight && (
                  <div className={styles.badge}>
                    <EditableTranslation
                      pageSlug="services"
                      namespace="services"
                      path="pricing.popular"
                      label="Pricing popular badge"
                    />
                  </div>
                )}

                <div className={styles.packageHeader}>
                  <h3 className={styles.packageName}>{offer.name}</h3>
                  <p className={styles.packageTagline}>{offer.headline}</p>
                </div>

                <div className={styles.offerDescription}>
                  <p className={styles.description}>{offer.description}</p>
                  <p className={styles.bestFor}>
                    <strong>
                      <EditableTranslation
                        pageSlug="services"
                        namespace="services"
                        path="pricing.bestFor"
                        label="Pricing best-for label"
                      />
                    </strong>{' '}
                    {offer.bestFor}
                  </p>
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
                  <CtaButton to="/contact" variant={highlight ? "gold" : "outline"} fullWidth arrow={false}>
                    {offer.ctaText}
                  </CtaButton>
                </div>
              </OfferCard>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div className={styles.bottomCta} {...scrollReveal}>
          <p className={styles.ctaText}>
            <EditableTranslation
              pageSlug="services"
              namespace="services"
              path="pricing.notSure"
              label="Pricing not-sure prompt"
              kind="text"
            />{' '}
            <Link to={l("/contact")} className={styles.ctaLink}>
              <EditableTranslation
                pageSlug="services"
                namespace="services"
                path="pricing.talk"
                label="Pricing talk link"
              />
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
