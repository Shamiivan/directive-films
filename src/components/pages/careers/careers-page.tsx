import NavSection from '../../../components/page-shared/section-nav/section-nav';
import FooterSection from '../../../components/page-shared/section-footer/section-footer';
import ScrollOver from '@/components/shared/scroll-over/scroll-over';
import CareersHeroSection from './sections/section-careers-hero';
import CultureBandSection from './sections/section-culture-band';
import WhatYouGetSection from './sections/section-what-you-get';
import OpenPositionsSection from './sections/section-open-positions';
import styles from './careers-page.module.css';

export default function CareersPage() {
  return (
    <div className={styles.page}>
      <NavSection />
      <CareersHeroSection />
      {/* Key dark -> light handoff: dark culture "show" band slides under the
          light comp-model "tell" section. */}
      <ScrollOver
        under={<CultureBandSection />}
        over={<WhatYouGetSection />}
      />
      <OpenPositionsSection />
      <FooterSection />
    </div>
  );
}
