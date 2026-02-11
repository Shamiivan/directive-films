'use client';

import NavSection from '../../../components/page-shared/section-nav/section-nav';
import FooterSection from '../../../components/page-shared/section-footer/section-footer';
import CareersHeroSection from './sections/section-careers-hero';
import WhatYouGetSection from './sections/section-what-you-get';
import OpenPositionsSection from './sections/section-open-positions';
import styles from './careers-page.module.css';

export default function CareersPage() {
  return (
    <div className={styles.page}>
      <NavSection />
      <CareersHeroSection />
      <WhatYouGetSection />
      <OpenPositionsSection />
      <FooterSection />
    </div>
  );
}
