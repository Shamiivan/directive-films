import type { RefObject } from 'react';
import { motion } from 'framer-motion';
import { gridStagger, useParallax } from '@/utils/animations';
import styles from './section-culture-band.module.css';

// Reuse existing real production stills as the culture band until proper
// workplace photography exists.
// TODO(asset): real culture photo (team on set / in the studio)
// TODO(asset): real culture photo (office / strategy session)
// TODO(asset): real culture photo (editor at their workstation)
const photos = [
  {
    src: '/images/production.jpg',
    alt: 'The team on set during a client production shoot',
    caption: 'On set, every week',
    span: 'wide' as const,
  },
  {
    src: '/images/pre-production.jpg',
    alt: 'Planning a shoot during pre-production',
    caption: 'Planning the work',
    span: 'tall' as const,
  },
  {
    src: '/images/video-editing-workspace.jpg',
    alt: 'An editor working at their video editing workstation',
    caption: 'Where the cuts happen',
    span: 'tall' as const,
  },
];

const figureItem = {
  initial: { opacity: 0, y: 40, scale: 0.97 },
  whileInView: { opacity: 1, y: 0, scale: 1 },
  transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as any },
};

function CulturePhoto({ photo }: { photo: (typeof photos)[number] }) {
  // Parallax ref + reveal live on SEPARATE elements: the figure reveals via
  // the stagger variant, the inner frame div carries the parallax scroll ref.
  // Keeping them apart avoids the clip-mask-stuck-closed bug.
  const { ref, y } = useParallax(36);

  return (
    <motion.figure
      className={[styles.figure, styles[photo.span]].join(' ')}
      variants={figureItem}
    >
      <div className={styles.frame} ref={ref as RefObject<HTMLDivElement>}>
        <motion.img
          src={photo.src}
          alt={photo.alt}
          loading="lazy"
          className={styles.img}
          style={{ y }}
        />
      </div>
      <figcaption className={styles.caption}>{photo.caption}</figcaption>
    </motion.figure>
  );
}

export default function CultureBandSection() {
  return (
    <section className={styles.section}>
      <div className={styles.wrap}>
        <div className={styles.head}>
          <span className={styles.eyebrow}>Inside the room</span>
          <h2 className={styles.title}>
            You'll see how the work actually gets made.
          </h2>
        </div>
        <motion.div
          className={styles.grid}
          variants={gridStagger}
          initial="initial"
          whileInView="whileInView"
          viewport={gridStagger.viewport}
        >
          {photos.map((photo) => (
            <CulturePhoto key={photo.src} photo={photo} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
