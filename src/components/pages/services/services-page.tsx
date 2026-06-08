import NavSection from '../../page-shared/section-nav/section-nav';
import ServicesHeroSection from '../../page-services/section-services-hero/section-services-hero';
import SectionServices from '../../page-services/section-services/section-services';
import ServicesCta from '../../page-services/section-cta/section-cta';
import FooterSection from '../../page-shared/section-footer/section-footer';
import styles from './services-page.module.css';

export default function ServicesPage() {
  return (
    <div className={styles.page}>
      <NavSection />
      <ServicesHeroSection />
      <SectionServices />
      <ServicesCta />
      <FooterSection />
    </div>
  );
}
