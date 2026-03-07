import NavSection from '../../page-shared/section-nav/section-nav';
import AboutHeroSection from '../../page-about/section-about-hero/section-about-hero';
import TeamSection from '../../page-about/section-team/section-team';
import WhyWeCreateSection from '../../page-about/section-why-we-create/section-why-we-create';
import ProcessSection from '../../page-about/section-process/section-process';
import FooterSection from '../../page-shared/section-footer/section-footer';
import styles from './about-page.module.css';

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <NavSection />
      <AboutHeroSection />
      <TeamSection />
      <WhyWeCreateSection />
      <ProcessSection />
      <FooterSection />
    </div>
  );
}
