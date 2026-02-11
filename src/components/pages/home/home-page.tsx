"use client";

import { useTina } from "tinacms/dist/react";
import { PageQuery } from "../../../tina/__generated__/types";
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
import { colors } from '../../../tokens';
import styles from './home-page.module.css';

interface HomePageProps {
  query: string;
  variables: {
    relativePath: string;
  };
  data: PageQuery;
}

export default function HomePage(props: HomePageProps) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

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
