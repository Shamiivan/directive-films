import NavSection from '../../page-shared/section-nav/section-nav';
import ServicesHeroSection from '../../page-services/section-services-hero/section-services-hero';
import SectionProblem from '../../page-services/section-problem/section-problem';
import SectionMethod from '../../page-services/section-method/section-method';
import SectionServices from '../../page-services/section-services/section-services';
import SectionProof from '../../page-services/section-proof/section-proof';
import FaqSection from '../../page-services/section-faq/section-faq';
import CtaSection from '../../page-services/section-cta/section-cta';
import FooterSection from '../../page-shared/section-footer/section-footer';
import styles from './services-page.module.css';

export default function ServicesPage() {
  return (
    <div className={styles.page}>
      <NavSection />
      <ServicesHeroSection />
      <SectionProblem />
      <SectionMethod />
      <SectionServices />
      <SectionProof />
      <FaqSection />
      <CtaSection />
      <FooterSection />
    </div>
  );
}
