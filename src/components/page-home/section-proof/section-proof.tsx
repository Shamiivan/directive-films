import { motion } from 'framer-motion';
import MagneticButton from '../../MagneticButton';
import { scrollReveal, imageZoom } from '../../../utils/animations';
import styles from './section-proof.module.css';

export default function ProofSection() {
  // Portfolio images with descriptive alt text for accessibility
  const portfolioImages = [
    {
      url: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&h=400&fit=crop',
      alt: 'Video production crew filming corporate interview in professional studio',
    },
    {
      url: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&h=400&fit=crop',
      alt: 'Film crew setting up lighting equipment for commercial video shoot',
    },
    {
      url: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&h=400&fit=crop',
      alt: 'Professional photographer with camera on set',
    },
    {
      url: 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=600&h=400&fit=crop',
      alt: 'Professional video camera on dolly track during film production',
    },
    {
      url: 'https://images.unsplash.com/photo-1540655037529-dec987208707?w=600&h=400&fit=crop',
      alt: 'Director reviewing footage on monitor during video shoot',
    },
    {
      url: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&h=400&fit=crop',
      alt: 'Film production behind the scenes with cinema camera',
    },
  ];

  return (
    <section className={styles.proofSection}>
      <div className={styles.container}>
        {/* Title */}
        <motion.h2
          className={styles.title}
          {...scrollReveal}
        >
          50+ projects delivered.<br />
          Here's what growth looks like.
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
                  src={image.url}
                  alt={image.alt}
                  className={styles.gridImage}
                />
                {/* Play overlay for video thumbnails */}
                {index % 2 === 0 && (
                  <div className={styles.playOverlay}>
                    <div className={styles.playButton}>
                      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
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
        </motion.div>
      </div>
    </section>
  );
}
