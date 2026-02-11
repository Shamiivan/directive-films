'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedNav from '../../AnimatedNav';
import styles from './section-nav.module.css';

export default function NavSection() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [mobileMenuOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <AnimatedNav className={styles.nav}>
        <motion.a
          href="/"
          className={styles.logo}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <img src="/logos/logo-icon.svg" alt="DirectiveFilms" className={styles.logoIcon} />
          <span>DirectiveFilms</span>
        </motion.a>

        {/* Desktop Navigation */}
        <ul className={styles.navList}>
          <li>
            <motion.a
              href="/"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              HOME
            </motion.a>
          </li>
          <li>
            <motion.a
              href="/services"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              SERVICES
            </motion.a>
          </li>
          <li>
            <motion.a
              href="/about"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              ABOUT US
            </motion.a>
          </li>
          <li>
            <motion.a
              href="/careers"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              CAREERS
            </motion.a>
          </li>
        </ul>

        <motion.a
          href="/contact"
          className={styles.navBtn}
          whileHover={{ scale: 1.05, backgroundColor: '#fff', color: '#000' }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          Contact Us
        </motion.a>

        {/* Hamburger Menu Button */}
        <button
          className={styles.hamburger}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
          aria-expanded={mobileMenuOpen}
        >
          <span className={mobileMenuOpen ? styles.hamburgerOpen : ''}></span>
          <span className={mobileMenuOpen ? styles.hamburgerOpen : ''}></span>
          <span className={mobileMenuOpen ? styles.hamburgerOpen : ''}></span>
        </button>
      </AnimatedNav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className={styles.mobileBackdrop}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Mobile Menu */}
            <motion.div
              className={styles.mobileMenu}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <button
                className={styles.closeButton}
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close mobile menu"
              >
                <span>&times;</span>
              </button>

              <nav className={styles.mobileNav}>
                <ul className={styles.mobileNavList}>
                  <li>
                    <a href="/" onClick={handleLinkClick}>
                      HOME
                    </a>
                  </li>
                  <li>
                    <a href="/services" onClick={handleLinkClick}>
                      SERVICES
                    </a>
                  </li>
                  <li>
                    <a href="/about" onClick={handleLinkClick}>
                      ABOUT US
                    </a>
                  </li>
                  <li>
                    <a href="/careers" onClick={handleLinkClick}>
                      CAREERS
                    </a>
                  </li>
                  <li className={styles.mobileContactItem}>
                    <a href="/contact" onClick={handleLinkClick} className={styles.mobileContactBtn}>
                      Contact Us
                    </a>
                  </li>
                </ul>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
