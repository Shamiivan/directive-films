import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import MagneticButton from '../../MagneticButton';
import { fadeInUp, fadeInScale } from '../../../utils/animations';
import VideoStrip from './video-strip';
import styles from './section-hero.module.css';

export default function HeroSection() {
  const { t } = useTranslation('home');
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  // Scale down hero content as you scroll
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3, 0.5], [1, 0.8, 0.5]);

  return (
    <section className={styles.hero} ref={heroRef}>
      {/* Hero Content */}
      <motion.div
        className={styles.heroContent}
        style={{
          scale: heroScale,
          opacity: heroOpacity,
        }}
      >

        <h1 className={styles.heroTitle}>
          {t('hero.title').split('\n').map((line, i) => {
            const firstChar = line.charAt(0);
            const rest = line.slice(1);
            return (
              <span key={i} style={{ display: 'block', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                <motion.span
                  initial={{ opacity: 0, y: '100%' }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: i * 0.15 + 0.15 }}
                  style={{ display: 'block' }}
                >
                  <span className={styles.gold}>{firstChar}</span>{rest}
                </motion.span>
              </span>
            );
          })}
        </h1>

        <motion.p
          className={styles.heroSubtitle}
          variants={fadeInUp}
        >
          {t('hero.subtitle')}
        </motion.p>

        <motion.div variants={fadeInUp}>
          <MagneticButton href="/services" className={styles.ctaButton}>
            {t('hero.cta')}
          </MagneticButton>
        </motion.div>

        {/* Main Video Showcase */}
        <motion.div
          className={styles.videoShowcase}
          variants={fadeInScale}
        >
          {/* Scrolling strip behind the video */}
          <VideoStrip />
          <div className={styles.videoFrame}>
            <motion.div
              className={styles.videoContainer}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
            >
              <video
                autoPlay
                loop
                muted
                playsInline
                className={styles.mainVideo}
              >
                <source src="/videos/showreel.mp4" type="video/mp4" />
              </video>
            </motion.div>
          </div>
        </motion.div>

        {/* Brand Logos */}
        <motion.p className={styles.logoContext} variants={fadeInUp}>
          {t('hero.workedWith')}
        </motion.p>
        <motion.div
          className={styles.brandLogos}
          variants={fadeInUp}
        >
          {[
            { src: '/logos/momentum.svg', alt: 'Momentum' },
            { src: '/logos/amazon.svg', alt: 'Amazon' },
            { src: '/logos/rogers.svg', alt: 'Rogers' },
            { src: '/logos/shopify.svg', alt: 'Shopify' },
            { src: '/logos/telus.svg', alt: 'Telus' },
            { src: '/logos/altitude.png', alt: 'Altitude' },
          ].map((logo, i) => (
            <motion.div
              key={i}
              className={styles.brandLogo}
              whileHover={{ scale: 1.1, opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <img src={logo.src} alt={logo.alt} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
