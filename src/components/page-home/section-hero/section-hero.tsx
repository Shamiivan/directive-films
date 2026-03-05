import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SplitType from 'split-type';
import MagneticButton from '../../MagneticButton';
import { fadeInUp, fadeInScale } from '../../../utils/animations';
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
      {/* Ambient background blobs for depth */}
      <div className={styles.ambientBg}>
        <div className={styles.blob1} />
        <div className={styles.blob2} />
      </div>

      {/* Hero Content */}
      <motion.div
        className={styles.heroContent}
        style={{
          scale: heroScale,
          opacity: heroOpacity,
        }}
      >
        <motion.span
          className={styles.eyebrow}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Video · Web · CRM · Coaching · Strategy
        </motion.span>

        <h1
          ref={titleRef}
          className={styles.heroTitle}
        >
          We Make You<br />
          <span className={styles.gold}>Impossible to Ignore</span>
        </h1>

        <motion.p
          className={styles.heroSubtitle}
          variants={fadeInUp}
        >
          We make your videos, build your site, set up your CRM, and train your team — so people find you, trust you, and buy from you.
        </motion.p>

        <motion.div variants={fadeInUp}>
          <MagneticButton href="/contact" className={styles.ctaButton}>
            Book a Strategy Call
          </MagneticButton>
        </motion.div>

        {/* Main Video Showcase */}
        <motion.div
          className={styles.videoShowcase}
          variants={fadeInScale}
        >
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
        <motion.div
          className={styles.brandLogos}
          variants={fadeInUp}
        >
          {[...Array(7)].map((_, i) => (
            <motion.div
              key={i}
              className={styles.brandLogo}
              whileHover={{ scale: 1.1, opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <img src="/logos/corona.svg" alt="Corona" />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
