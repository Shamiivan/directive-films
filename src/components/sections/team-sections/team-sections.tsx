import type { RefObject } from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '@/components/shared/section-header/section-header';
import { useParallax } from '@/utils/animations';
import Reveal from '@/components/shared/reveal/reveal';
import styles from './team-sections.module.css';

type Leader = {
  name: string;
  role: string;
  focus: string;
  image: string;
  imageSide: 'left' | 'right';
};

// ASSET DEP: both portraits need a proper, consistently-shot studio photo.
// TODO(asset): /team/ceo.jpg is a low-res 640x640 square crop — replace with a
// proper studio portrait at portrait aspect ratio.
// TODO(asset): /team/coo.jpeg is the off-brand webcam headshot — replace with a
// studio portrait matching Damon's so the two leaders read as a consistent set.
const leaders: Leader[] = [
  {
    name: 'Damon',
    role: 'CEO / Founder',
    focus: 'Damon brings direct experience selling and building sales systems in live environments. He has scaled teams, created operating structure, and led performance-focused execution across French-speaking markets.',
    image: '/team/ceo.jpg',
    imageSide: 'left',
  },
  {
    name: 'Elizabeth',
    role: 'COO',
    focus: 'Operations, delivery rhythm, and production excellence.',
    image: '/team/coo.jpeg',
    imageSide: 'right',
  },
];

function LeaderRow({ leader, index }: { leader: Leader; index: number }) {
  // Parallax target lives on the image wrap; the portrait stays visible and just
  // drifts. (whileInView + useScroll on the same element conflict, which left the
  // clip-mask reveal stuck closed — so we keep the image shown and drift only.)
  const { ref, y } = useParallax(56);

  const rowClassName = [
    styles.row,
    leader.imageSide === 'left' ? styles.imageLeft : styles.imageRight,
  ].join(' ');

  return (
    <div className={rowClassName}>
      <Reveal className={styles.content} y={28}>
        <span className={styles.index}>{String(index + 1).padStart(2, '0')}</span>
        <p className={styles.role}>{leader.role}</p>
        <h3 className={styles.name}>{leader.name}</h3>
        <p className={styles.focus}>{leader.focus}</p>
      </Reveal>

      <div ref={ref as RefObject<HTMLDivElement>} className={styles.imageWrap}>
        <motion.div className={styles.imageDrift} style={{ y }}>
          <img
            src={leader.image}
            alt={`${leader.name}, ${leader.role}`}
            className={styles.image}
            loading="lazy"
            decoding="async"
          />
        </motion.div>
      </div>
    </div>
  );
}

export default function TeamSections() {
  return (
    <section className={styles.section} id="team">
      <div className={styles.intro}>
        <SectionHeader
          eyebrow="Leadership"
          title="The people behind the results"
          intro="Two operators leading the strategy, production, and systems that move each project from idea to measurable growth."
          tone="dark"
        />
      </div>

      <div className={styles.rows}>
        {leaders.map((leader, index) => (
          <LeaderRow key={leader.name} leader={leader} index={index} />
        ))}
      </div>
    </section>
  );
}
