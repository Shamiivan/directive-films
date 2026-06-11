import NavSection from '../../../components/page-shared/section-nav/section-nav';
import FooterSection from '../../../components/page-shared/section-footer/section-footer';
import AuditHeroSection from './sections/section-audit-hero';
import styles from './audit-page.module.css';

export default function AuditPage() {
  return (
    <div className={styles.page}>
      <NavSection />
      <AuditHeroSection />
      <FooterSection />
    </div>
  );
}
