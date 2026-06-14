import NavSection from '../../page-shared/section-nav/section-nav';
import AboutHeroSection from '../../page-about/section-about-hero/section-about-hero';
import HowWeDoItSection from '../../page-about/section-how-we-do-it/section-how-we-do-it';
import TeamSections from '../../sections/team-sections/team-sections';
import SelectedWorkSection from '../../page-about/section-selected-work/section-selected-work';
import WhyWeCreateSection from '../../page-about/section-why-we-create/section-why-we-create';
import FooterSection from '../../page-shared/section-footer/section-footer';
import styles from './about-page.module.css';

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <NavSection />
      <AboutHeroSection />
      <TeamSections showHeader={false} />
      <HowWeDoItSection />
      <SelectedWorkSection />
      <WhyWeCreateSection />
      <FooterSection />
    </div>
  );
}
