'use client';

import { motion } from 'framer-motion';
import MagneticButton from '../../MagneticButton';
import { scrollReveal, imageZoom } from '../../../utils/animations';
import styles from './section-proof.module.css';

export default function ProofSection() {
  // Sample images - replace with actual portfolio images
  const portfolioImages = [
    'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&h=400&fit=crop', // Video production
    'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&h=400&fit=crop', // Film crew
    'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&h=400&fit=crop', // Video editing
    'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=600&h=400&fit=crop', // Behind scenes
    'https://images.unsplash.com/photo-1524522173746-f628baad3644?w=600&h=400&fit=crop', // Production
    'https://images.unsplash.com/photo-1579548122080-c35fd6820ecb?w=600&h=400&fit=crop', // Creative work
  ];

  return (
    <section className={styles.proofSection}>
      <div className={styles.container}>
        {/* Title */}
        <motion.h2
          className={styles.title}
          {...scrollReveal}
        >
          High-impact creative, with a<br />
          proven video production process.
        </motion.h2>

        {/* Image Grid/Mosaic */}
        <motion.div
          className={styles.imageGrid}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: "-50px" }}
        >
          {portfolioImages.map((image, index) => (
            <motion.div
              key={index}
              className={`${styles.gridItem} ${styles[`item${index + 1}`]}`}
              variants={scrollReveal}
              whileHover={{
                scale: 1.05,
                zIndex: 10,
              }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className={styles.imageWrapper}>
                <img
                  src={image}
                  alt={`Portfolio ${index + 1}`}
                  className={styles.gridImage}
                />
                {/* Play overlay for video thumbnails */}
                {index % 2 === 0 && (
                  <div className={styles.playOverlay}>
                    <div className={styles.playButton}>
                      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                        <circle cx="20" cy="20" r="20" fill="rgba(253, 183, 20, 0.9)" />
                        <path d="M16 12L28 20L16 28V12Z" fill="#000" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          className={styles.ctaContainer}
          {...scrollReveal}
        >
          <MagneticButton className={styles.ctaButton}>
            See our Work
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
