import { Link } from 'react-router';
import { useLocalePath } from '../../../hooks/useLocalePath';
import styles from './section-footer.module.css';

export default function FooterSection() {
  const l = useLocalePath();
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.wrap}>
        <div className={styles.fgrid}>
          {/* Brand */}
          <div>
            <Link to={l('/')} className={styles.brand}>
              <img src="/logos/logo-icon.svg" alt="DirectiveFilms" className={styles.logoIcon} />
              <span>DirectiveFilms</span>
            </Link>
            <p className={styles.tagline}>
              Ten years, 430+ businesses, $100M+ generated. Video, AI, websites, CRMs and a commission sales team — working together to grow what you've built.
            </p>
            <div className={styles.loc}>
              Montreal · Toronto · Vancouver · Miami · New York · London
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className={styles.colTitle}>Services</h4>
            <Link to={l('/services')} className={styles.colLink}>Growth Audit</Link>
            <Link to={l('/services')} className={styles.colLink}>Offer & Strategy</Link>
            <Link to={l('/services')} className={styles.colLink}>Film · Coach · Edit</Link>
            <Link to={l('/services')} className={styles.colLink}>Ads & Organic</Link>
            <Link to={l('/services')} className={styles.colLink}>CRM & AI</Link>
            <Link to={l('/services')} className={styles.colLink}>Sales Team</Link>
          </div>

          {/* Company */}
          <div>
            <h4 className={styles.colTitle}>Company</h4>
            <Link to={l('/about')} className={styles.colLink}>Meet the Team</Link>
            <Link to={l('/careers')} className={styles.colLink}>Careers</Link>
            <Link to={l('/contact')} className={styles.colLink}>Contact</Link>
          </div>

          {/* Connect */}
          <div>
            <h4 className={styles.colTitle}>Connect</h4>
            <a href="#" className={styles.colLink}>Instagram</a>
            <a href="#" className={styles.colLink}>LinkedIn</a>
            <a href="#" className={styles.colLink}>YouTube</a>
            <a href="#" className={styles.colLink}>TikTok</a>
          </div>
        </div>

        <div className={styles.fbar}>
          <span>© {year} DirectiveFilms. All rights reserved.</span>
          <div className={styles.legal}>
            <a href="#">Privacy Policy</a>
            <span>·</span>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
