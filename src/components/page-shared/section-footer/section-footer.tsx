import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { scrollReveal } from '@/utils/animations';
import { useLocalePath } from '../../../hooks/useLocalePath';
import styles from './section-footer.module.css';

export default function FooterSection() {
  const currentYear = new Date().getFullYear();
  const l = useLocalePath();
  const { t } = useTranslation();

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
              <Link to={l("/")} className={styles.footerLogoLink}>
                <img src="/logos/logo_footer.png" alt="DirectiveFilms" className={styles.footerLogo} />
              </Link>
              <p className={styles.brandTagline}>
                {t('footer.tagline')}
              </p>
            </motion.div>

            {/* Links Columns */}
            <motion.div className={styles.linksColumn} variants={scrollReveal}>
              <h4 className={styles.columnTitle}>{t('footer.services')}</h4>
              <ul className={styles.linkList}>
                <li><Link to={l("/services#audit")} className={styles.link}>Online Presence Audit</Link></li>
                <li><Link to={l("/services#coaching")} className={styles.link}>Content Coaching</Link></li>
                <li><Link to={l("/services#video")} className={styles.link}>Video Production</Link></li>
                <li><Link to={l("/services#crm")} className={styles.link}>CRM & Sales Systems</Link></li>
                <li><Link to={l("/services#web")} className={styles.link}>Web Development</Link></li>
              </ul>
            </motion.div>

            {/* Links Columns */}
            <motion.div className={styles.linksColumn} variants={scrollReveal}>
              <h4 className={styles.columnTitle}>{t('footer.company')}</h4>
              <ul className={styles.linkList}>
                <li><Link to={l("/about")} className={styles.link}>{t('nav.about')}</Link></li>
                <li><Link to={l("/careers")} className={styles.link}>{t('nav.careers')}</Link></li>
                <li><Link to={l("/contact")} className={styles.link}>{t('nav.contact')}</Link></li>
              </ul>
            </motion.div>

            {/* Links Columns */}
            <motion.div className={styles.linksColumn} variants={scrollReveal}>
              <h4 className={styles.columnTitle}>{t('footer.connect')}</h4>
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
                &copy; {currentYear} DirectiveFilms. {t('footer.rights')}
              </p>
              <div className={styles.legalLinks}>
                <a href="#" className={styles.legalLink}>{t('footer.privacy')}</a>
                <span className={styles.separator}>&bull;</span>
                <a href="#" className={styles.legalLink}>{t('footer.terms')}</a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}
