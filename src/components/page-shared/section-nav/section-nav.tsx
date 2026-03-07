import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Static colors — nav stays dark throughout
  const logoColor = '#ffffff';
  const hamburgerBg = '#ffffff';

  // Show nav after scrolling past hero area on mobile
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
        <MotionLink
          to="/"
          className={styles.logo}
          data-sticky-cursor
          style={{ color: logoColor }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <img src="/logos/logo-icon.svg" alt="DirectiveFilms" className={styles.logoIcon} />
          <span>DirectiveFilms</span>
        </MotionLink>

        {/* Desktop Navigation - With Magnetic Effect */}
        <ul className={styles.navList}>
          <li>
            <MagneticNavLink to="/">HOME</MagneticNavLink>
          </li>
          <li>
            <MagneticNavLink to="/services">SERVICES</MagneticNavLink>
          </li>
          <li>
            <MagneticNavLink to="/about">ABOUT US</MagneticNavLink>
          </li>
          <li>
            <MagneticNavLink to="/careers">CAREERS</MagneticNavLink>
          </li>
        </ul>

        <MotionLink
          to="/contact"
          className={styles.navBtn}
          data-sticky-cursor
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          Contact Us
        </MotionLink>

        {/* Hamburger Menu Button */}
        <button
          className={styles.hamburger}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
          aria-expanded={mobileMenuOpen}
        >
          <motion.span className={mobileMenuOpen ? styles.hamburgerOpen : ''} style={{ background: hamburgerBg }} />
          <motion.span className={mobileMenuOpen ? styles.hamburgerOpen : ''} style={{ background: hamburgerBg }} />
          <motion.span className={mobileMenuOpen ? styles.hamburgerOpen : ''} style={{ background: hamburgerBg }} />
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
                    <Link to="/" onClick={handleLinkClick}>
                      HOME
                    </Link>
                  </li>
                  <li>
                    <Link to="/services" onClick={handleLinkClick}>
                      SERVICES
                    </Link>
                  </li>
                  <li>
                    <Link to="/about" onClick={handleLinkClick}>
                      ABOUT US
                    </Link>
                  </li>
                  <li>
                    <Link to="/careers" onClick={handleLinkClick}>
                      CAREERS
                    </Link>
                  </li>
                  <li className={styles.mobileContactItem}>
                    <Link to="/contact" onClick={handleLinkClick} className={styles.mobileContactBtn}>
                      Contact Us
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
