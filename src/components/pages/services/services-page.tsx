'use client';

import NavSection from '../../page-shared/section-nav/section-nav';
import ServicesHeroSection from '../../page-services/section-services-hero/section-services-hero';
import WorkGallerySection from '../../page-services/section-work-gallery/section-work-gallery';
import ProcessSection from '../../page-services/section-process/section-process';
import GrowthSection from '../../page-services/section-growth/section-growth';
import WhyUsSection from '../../page-services/section-why-us/section-why-us';
import TestimonialsSection from '../../page-services/section-testimonials/section-testimonials';
import CtaSection from '../../page-services/section-cta/section-cta';
import FooterSection from '../../page-shared/section-footer/section-footer';
import styles from './services-page.module.css';

export default function ServicesPage() {
  return (
    <div className={styles.page}>
      <NavSection />
      <ServicesHeroSection />
      <WorkGallerySection />
      <ProcessSection />
      <GrowthSection />
      <WhyUsSection />
      <TestimonialsSection />
      <CtaSection />
      <FooterSection />
    </div>
  );
}
