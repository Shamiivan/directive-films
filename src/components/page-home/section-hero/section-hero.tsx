import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SplitType from 'split-type';
import MagneticButton from '../../MagneticButton';
import { fadeInUp, fadeInScale } from '../../../utils/animations';
import VideoStrip from './video-strip';
import styles from './section-hero.module.css';

export default function HeroSection() {
  const heroRef = useRef(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  // Scale down hero content as you scroll
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3, 0.5], [1, 0.8, 0.5]);

  // Text splitting for hero title - LINE BY LINE reveal
  useEffect(() => {
    if (!titleRef.current) return;

    const timer = setTimeout(() => {
      const split = new SplitType(titleRef.current!, {
        types: 'lines',
        tagName: 'span',
      });

      const lines = split.lines;
      if (lines) {
        lines.forEach((line, i) => {
          line.style.overflow = 'hidden';
          line.style.display = 'block';

          const inner = document.createElement('span');
          inner.style.display = 'block';
          inner.style.opacity = '0';
          inner.style.transform = 'translateY(100%)';
          inner.style.transition = `all 0.8s cubic-bezier(0.25, 0.1, 0.25, 1) ${i * 0.15}s`;
          inner.innerHTML = line.innerHTML;
          line.innerHTML = '';
          line.appendChild(inner);

          setTimeout(() => {
            inner.style.opacity = '1';
            inner.style.transform = 'translateY(0)';
          }, 100);
        });
      }
    }, 150);

    return () => {
      clearTimeout(timer);
    };
  }, []);

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

        <h1
          ref={titleRef}
          className={styles.heroTitle}
        >
          <span className={styles.gold}>D</span>riven By Purpose
          <br />
          <span className={styles.gold}>D</span>efined By Excellence
        </h1>

        <motion.p
          className={styles.heroSubtitle}
          variants={fadeInUp}
        >
          We connect your videos, website, and sales process so they actually work together.
        </motion.p>

        <motion.div variants={fadeInUp}>
          <MagneticButton href="/services" className={styles.ctaButton}>
            See how it works
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
          We've worked with teams at
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
