import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import AnimatedNav from '../../AnimatedNav';
import styles from './section-nav.module.css';

const serviceLinks = [
  { href: '/services/diagnose', label: 'Diagnose', desc: 'Online Presence Audit' },
  { href: '/services/coach', label: 'Coach', desc: 'Film & Content Setup' },
  { href: '/services/create', label: 'Create', desc: 'Video Production' },
  { href: '/services/optimize', label: 'Optimize', desc: 'CRM & Sales' },
  { href: '/services/build', label: 'Build', desc: 'Web Development' },
];

// Magnetic Nav Link Component
function MagneticNavLink({ href, children }: { href: string; children: React.ReactNode }) {
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
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: xSpring, y: ySpring }}
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.a>
  );
}

export default function NavSection() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout>>();

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (mobileMenuOpen) setMobileMenuOpen(false);
        if (servicesOpen) setServicesOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [mobileMenuOpen, servicesOpen]);

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
    setMobileServicesOpen(false);
  };

  const handleDropdownEnter = () => {
    clearTimeout(dropdownTimeout.current);
    setServicesOpen(true);
  };

  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => setServicesOpen(false), 150);
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

        {/* Desktop Navigation - With Magnetic Effect */}
        <ul className={styles.navList}>
          <li>
            <MagneticNavLink href="/">HOME</MagneticNavLink>
          </li>
          <li
            ref={dropdownRef}
            className={styles.dropdownWrapper}
            onMouseEnter={handleDropdownEnter}
            onMouseLeave={handleDropdownLeave}
          >
            <button className={styles.dropdownTrigger}>
              SERVICES
              <svg className={`${styles.chevron} ${servicesOpen ? styles.chevronOpen : ''}`} width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  className={styles.dropdown}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  {serviceLinks.map((link) => (
                    <a key={link.href} href={link.href} className={styles.dropdownItem}>
                      <span className={styles.dropdownLabel}>{link.label}</span>
                      <span className={styles.dropdownDesc}>{link.desc}</span>
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </li>
          <li>
            <MagneticNavLink href="/about">ABOUT US</MagneticNavLink>
          </li>
          <li>
            <MagneticNavLink href="/careers">CAREERS</MagneticNavLink>
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
                    <button
                      className={styles.mobileServicesToggle}
                      onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                    >
                      <span>SERVICES</span>
                      <svg className={`${styles.chevron} ${mobileServicesOpen ? styles.chevronOpen : ''}`} width="16" height="16" viewBox="0 0 12 12" fill="none">
                        <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    <AnimatePresence>
                      {mobileServicesOpen && (
                        <motion.ul
                          className={styles.mobileSubMenu}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                        >
                          {serviceLinks.map((link) => (
                            <li key={link.href}>
                              <a href={link.href} onClick={handleLinkClick}>
                                <span className={styles.mobileSubLabel}>{link.label}</span>
                                <span className={styles.mobileSubDesc}>{link.desc}</span>
                              </a>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
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
