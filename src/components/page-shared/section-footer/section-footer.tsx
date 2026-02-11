'use client';

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
              <h3 className={styles.brandName}>DirectiveFilms</h3>
              <p className={styles.brandTagline}>
                Creating compelling video content that drives results for businesses.
              </p>
            </motion.div>

            {/* Links Columns */}
            <motion.div className={styles.linksColumn} variants={scrollReveal}>
              <h4 className={styles.columnTitle}>Services</h4>
              <ul className={styles.linkList}>
                <li><a href="#" className={styles.link}>Brand Videos</a></li>
                <li><a href="#" className={styles.link}>Product Videos</a></li>
                <li><a href="#" className={styles.link}>Social Media Content</a></li>
                <li><a href="#" className={styles.link}>Corporate Videos</a></li>
              </ul>
            </motion.div>

            <motion.div className={styles.linksColumn} variants={scrollReveal}>
              <h4 className={styles.columnTitle}>Company</h4>
              <ul className={styles.linkList}>
                <li><a href="#" className={styles.link}>About Us</a></li>
                <li><a href="#" className={styles.link}>Our Work</a></li>
                <li><a href="#" className={styles.link}>Process</a></li>
                <li><a href="#" className={styles.link}>Contact</a></li>
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
                © {currentYear} DirectiveFilms. All rights reserved.
              </p>
              <div className={styles.legalLinks}>
                <a href="#" className={styles.legalLink}>Privacy Policy</a>
                <span className={styles.separator}>•</span>
                <a href="#" className={styles.legalLink}>Terms of Service</a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}
