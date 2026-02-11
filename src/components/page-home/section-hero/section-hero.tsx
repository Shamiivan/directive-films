'use client';

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

  // Advanced scroll tracking with transforms (MAP function technique)
  const photoReelY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const photoReelOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 0.3, 0]);

  // Scale down hero content as you scroll
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3, 0.5], [1, 0.8, 0.5]);

  // Text splitting for hero title
  useEffect(() => {
    if (!titleRef.current) return;

    const split = new SplitType(titleRef.current, {
      types: 'lines,words',
      tagName: 'span',
    });

    // Animate words
    const words = split.words;
    if (words) {
      words.forEach((word, i) => {
        word.style.display = 'inline-block';
        word.style.opacity = '0';
        word.style.transform = 'translateY(20px)';
        word.style.transition = `all 0.6s cubic-bezier(0.25, 0.1, 0.25, 1) ${i * 0.05}s`;

        setTimeout(() => {
          word.style.opacity = '1';
          word.style.transform = 'translateY(0)';
        }, 100);
      });
    }

    return () => {
      split.revert();
    };
  }, []);

  // Main video URL - single video playing in the center
  const mainVideoUrl = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

  // Background scrolling photos - portfolio/work samples
  const backgroundPhotos = [
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop', // Office
    'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=300&fit=crop', // Team meeting
    'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop', // People working
    'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=300&fit=crop', // Product shot
    'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=300&fit=crop', // Laptop work
    'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop', // Collaboration
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop', // Tech work
    'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=300&fit=crop', // Design work
  ];

  return (
    <section className={styles.hero} ref={heroRef}>
      {/* Background Photo Reel - Scrolling band of images */}
      <motion.div
        className={styles.photoReel}
        style={{
          y: photoReelY,
          opacity: photoReelOpacity,
        }}
      >
        <div className={styles.reelTrack}>
          {/* Duplicate photos for seamless loop */}
          {[...backgroundPhotos, ...backgroundPhotos].map((photo, index) => (
            <motion.div
              key={index}
              className={styles.reelItem}
              whileHover={{ scale: 1.05, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={photo}
                alt={`Portfolio ${index + 1}`}
                className={styles.reelPhoto}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

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
          <span className={styles.gold}>D</span>riven by <span className={styles.gold}>Purpose</span><br />
          <span className={styles.gold}>D</span>efine by <span className={styles.gold}>Excellence</span>
        </h1>

        <motion.p
          className={styles.heroSubtitle}
          variants={fadeInUp}
        >
          If your goal is to generate leads we have the perspective, passion, and<br />
          talent to make it happen.
        </motion.p>

        <motion.div variants={fadeInUp}>
          <MagneticButton href="/contact" className={styles.ctaButton}>
            Get a Growth Plan
          </MagneticButton>
        </motion.div>

        {/* Main Video Showcase with Frame */}
        <motion.div
          className={styles.videoShowcase}
          variants={fadeInScale}
        >
          <div className={styles.videoFrame}>
            {/* Main video */}
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
