'use client';

import NavSection from '../../../components/page-shared/section-nav/section-nav';
import FooterSection from '../../../components/page-shared/section-footer/section-footer';
import ContactHeroSection from './sections/section-contact-hero';
import styles from './contact-page.module.css';

export default function ContactPage() {
  return (
    <div className={styles.page}>
      <NavSection />
      <ContactHeroSection />
      <FooterSection />
    </div>
  );
}
