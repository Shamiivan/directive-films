"use client";

import { useTina } from "tinacms/dist/react";
import { PageQuery } from "../../../tina/__generated__/types";
import NavSection from './sections/nav-section';
import HeroSection from './sections/hero-section';
import ResultsSection from './sections/results-section';
import OfferSection from './sections/offer-section';
import { colors } from '../../tokens';
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
    </div>
  );
}
