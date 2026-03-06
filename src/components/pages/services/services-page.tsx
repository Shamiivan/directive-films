import NavSection from '../../page-shared/section-nav/section-nav';
import ServicesHeroSection from '../../page-services/section-services-hero/section-services-hero';
import ServiceMapSection from '../../page-services/section-service-map/section-service-map';
import StickyServiceNav from '../../page-services/sticky-service-nav/sticky-service-nav';
import ServiceDetailSection from '../../page-services/section-service-detail/section-service-detail';
import TestimonialsSection from '../../page-services/section-testimonials/section-testimonials';
import WhyUsSection from '../../page-services/section-why-us/section-why-us';
import FaqSection from '../../page-services/section-faq/section-faq';
import CtaSection from '../../page-services/section-cta/section-cta';
import FooterSection from '../../page-shared/section-footer/section-footer';
import { services } from '../../page-services/services-data';
import styles from './services-page.module.css';

export default function ServicesPage() {
  return (
    <div className={styles.page}>
      <NavSection />
      <StickyServiceNav />
      <ServicesHeroSection />
      <ServiceMapSection />
      {services.map((service, index) => (
        <ServiceDetailSection key={service.id} service={service} index={index} />
      ))}
      <TestimonialsSection />
      <WhyUsSection />
      <FaqSection />
      <CtaSection />
      <FooterSection />
    </div>
  );
}
