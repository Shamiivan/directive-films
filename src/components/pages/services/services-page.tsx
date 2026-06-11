import NavSection from '../../page-shared/section-nav/section-nav';
import ServicesHeroSection from '../../page-services/section-services-hero/section-services-hero';
import LogoMarqueeSection from '../../shared/logo-row/logo-row';
import HowItWorksSection from '../../page-services/section-how-it-works/section-how-it-works';
import TestimonialsSection from '../../page-services/section-testimonials/section-testimonials';
import ServicesCta from '../../page-services/section-cta/section-cta';
import FooterSection from '../../page-shared/section-footer/section-footer';
import styles from './services-page.module.css';

export default function ServicesPage() {
  return (
    <div className={styles.page}>
      <NavSection />
      <ServicesHeroSection />
      <LogoMarqueeSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <ServicesCta />
      <FooterSection />
    </div>
  );
}
