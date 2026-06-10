import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useLocalePath } from '../../../hooks/useLocalePath';
import { useIsEditing } from '@/cms/EditModeProvider';
import LanguageSwitcher from '../../LanguageSwitcher/LanguageSwitcher';
import AnimatedNav from '../../AnimatedNav';
import styles from './section-nav.module.css';

const MotionLink = motion.create(Link);

// Magnetic Nav Link Component
function MagneticNavLink({ to, children }: { to: string; children: React.ReactNode }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.3);
    y.set((e.clientY - centerY) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <MotionLink
      ref={ref}
      to={to}
      data-sticky-cursor
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: xSpring, y: ySpring }}
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </MotionLink>
  );
}

export default function NavSection() {
  const editMode = useIsEditing();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const l = useLocalePath();
  const location = useLocation();
  const { t } = useTranslation();
  const isSandbox = location.pathname.startsWith('/sandbox');
  const navLinks = {
    home: isSandbox ? '/sandbox/home' : l('/'),
    services: isSandbox ? '/sandbox/services' : l('/services'),
    team: isSandbox ? '/sandbox/team' : l('/about'),
    careers: isSandbox ? '/sandbox/careers' : l('/careers'),
    contact: isSandbox ? '/sandbox/contact' : l('/contact'),
  };

  if (editMode) return null;

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (mobileMenuOpen) setMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [mobileMenuOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [mobileMenuOpen]);

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <AnimatedNav className={styles.nav}>
        <div className={styles.wrap}>
        <MotionLink
          to={navLinks.home}
          className={styles.logo}
          data-sticky-cursor
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.2 }}
        >
          <img src="/logos/logo-icon.svg" alt="DirectiveFilms" className={styles.logoIcon} />
          <span>DirectiveFilms</span>
        </MotionLink>

        {/* Desktop Navigation - With Magnetic Effect */}
        <ul className={styles.navList}>
          <li>
            <MagneticNavLink to={navLinks.home}>{t('nav.home')}</MagneticNavLink>
          </li>
          <li>
            <MagneticNavLink to={navLinks.services}>{t('nav.services')}</MagneticNavLink>
          </li>
          <li>
            <MagneticNavLink to={navLinks.team}>{isSandbox ? 'Team' : t('nav.about')}</MagneticNavLink>
          </li>
          <li>
            <MagneticNavLink to={navLinks.careers}>{t('nav.careers')}</MagneticNavLink>
          </li>
          {!isSandbox && (
            <li className={styles.langSwitcherDesktop}>
              <LanguageSwitcher />
            </li>
          )}
        </ul>

        <MotionLink
          to={navLinks.contact}
          className={styles.navBtn}
          data-sticky-cursor
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          {t('nav.contact')}
        </MotionLink>

        {/* Hamburger Menu Button */}
        <button
          className={styles.hamburger}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
          aria-expanded={mobileMenuOpen}
        >
          <motion.span className={mobileMenuOpen ? styles.hamburgerOpen : ''} />
          <motion.span className={mobileMenuOpen ? styles.hamburgerOpen : ''} />
          <motion.span className={mobileMenuOpen ? styles.hamburgerOpen : ''} />
        </button>
        </div>
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
                    <Link to={navLinks.home} onClick={handleLinkClick}>
                      {t('nav.home')}
                    </Link>
                  </li>
                  <li>
                    <Link to={navLinks.services} onClick={handleLinkClick}>
                      {t('nav.services')}
                    </Link>
                  </li>
                  <li>
                    <Link to={navLinks.team} onClick={handleLinkClick}>
                      {isSandbox ? 'Team' : t('nav.about')}
                    </Link>
                  </li>
                  <li>
                    <Link to={navLinks.careers} onClick={handleLinkClick}>
                      {t('nav.careers')}
                    </Link>
                  </li>
                  {!isSandbox && (
                    <li className={styles.mobileLangSwitcher}>
                      <LanguageSwitcher />
                    </li>
                  )}
                  <li className={styles.mobileContactItem}>
                    <Link to={navLinks.contact} onClick={handleLinkClick} className={styles.mobileContactBtn}>
                      {t('nav.contact')}
                    </Link>
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
