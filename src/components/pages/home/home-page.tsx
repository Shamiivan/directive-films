"use client";

import NavSection from '../../page-shared/section-nav/section-nav';
import HeroSection from '../../page-home/section-hero/section-hero';
import ResultsSection from '../../page-home/section-results/section-results';
import OfferSection from '../../page-home/section-offer/section-offer';
import ProofSection from '../../page-home/section-proof/section-proof';
import HowWeDoItSection from '../../page-home/section-how-we-do-it/section-how-we-do-it';
import PricingSection from '../../page-home/section-pricing/section-pricing';
import DividerSection from '../../page-home/section-divider/section-divider';
import FaqSection from '../../page-home/section-faq/section-faq';
import CtaSection from '../../page-home/section-cta/section-cta';
import FooterSection from '../../page-shared/section-footer/section-footer';
import styles from './home-page.module.css';

export default function HomePage() {
  return (
    <div className={styles.page}>
      <NavSection />
      <HeroSection />
      <ResultsSection />
      <OfferSection />
      <ProofSection />
      <HowWeDoItSection />
      <PricingSection />
      <DividerSection />
      <FaqSection />
      <CtaSection />
      <FooterSection />
    </div>
  );
}
