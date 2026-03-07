import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { scrollReveal } from '@/utils/animations';
import styles from './section-footer.module.css';

export default function FooterSection() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <motion.div
          className={styles.content}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Main Footer Content */}
          <div className={styles.mainContent}>
            {/* Brand Column */}
            <motion.div className={styles.brandColumn} variants={scrollReveal}>
              <Link to="/" className={styles.footerLogoLink}>
                <img src="/logos/logo_footer.png" alt="DirectiveFilms" className={styles.footerLogo} />
              </Link>
              <p className={styles.brandTagline}>
                Video, Websites, CRMs, and Coaching that work together to grow your business.
              </p>
            </motion.div>

            {/* Links Columns */}
            <motion.div className={styles.linksColumn} variants={scrollReveal}>
              <h4 className={styles.columnTitle}>Services</h4>
              <ul className={styles.linkList}>
                <li><Link to="/services" className={styles.link}>Online Presence Audit</Link></li>
                <li><Link to="/services" className={styles.link}>Content Coaching</Link></li>
                <li><Link to="/services" className={styles.link}>Video Production</Link></li>
                <li><Link to="/services" className={styles.link}>CRM & Sales Systems</Link></li>
                <li><Link to="/services" className={styles.link}>Web Development</Link></li>
              </ul>
            </motion.div>

            <motion.div className={styles.linksColumn} variants={scrollReveal}>
              <h4 className={styles.columnTitle}>Company</h4>
              <ul className={styles.linkList}>
                <li><Link to="/about" className={styles.link}>About Us</Link></li>
                <li><Link to="/careers" className={styles.link}>Careers</Link></li>
                <li><Link to="/contact" className={styles.link}>Contact</Link></li>
              </ul>
            </motion.div>

            <motion.div className={styles.linksColumn} variants={scrollReveal}>
              <h4 className={styles.columnTitle}>Connect</h4>
              <ul className={styles.linkList}>
                <li><a href="#" className={styles.link}>Instagram</a></li>
                <li><a href="#" className={styles.link}>LinkedIn</a></li>
                <li><a href="#" className={styles.link}>YouTube</a></li>
                <li><a href="#" className={styles.link}>Twitter</a></li>
              </ul>
            </motion.div>
          </div>

          {/* Bottom Bar */}
          <motion.div className={styles.bottomBar} variants={scrollReveal}>
            <div className={styles.divider}></div>
            <div className={styles.bottomContent}>
              <p className={styles.copyright}>
                &copy; {currentYear} DirectiveFilms. All rights reserved.
              </p>
              <div className={styles.legalLinks}>
                <a href="#" className={styles.legalLink}>Privacy Policy</a>
                <span className={styles.separator}>&bull;</span>
                <a href="#" className={styles.legalLink}>Terms of Service</a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}
