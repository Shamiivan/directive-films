import { motion } from 'framer-motion';
import SectionEyebrow from '../../SectionEyebrow';
import { scrollReveal, gridStagger } from '@/utils/animations';
import styles from './section-team.module.css';

// TODO: Replace with real team members and headshots
const teamMembers = [
  {
    name: 'Founder',
    role: 'Strategy & Sales',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
  },
  {
    name: 'Web & CRM Lead',
    role: 'Development & Systems',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face',
  },
  {
    name: 'Creative Director',
    role: 'Video & Content',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
  },
  {
    name: 'Coach',
    role: 'Content & Training',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
  },
];

export default function TeamSection() {
  return (
    <section className={styles.teamSection}>
      <div className={styles.container}>
        <motion.div className={styles.header} {...scrollReveal}>
          <SectionEyebrow label="The Team" description="Who we are" />
          <h2 className={styles.title}>
            The people behind the <em className={styles.titleAccent}>system.</em>
          </h2>
          <p className={styles.subtitle}>
            A small team that builds, shoots, codes, and coaches. We've all sold something before. That's why this works.
          </p>
        </motion.div>

        <motion.div className={styles.groupPhoto} {...scrollReveal}>
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=500&fit=crop"
            alt="The team at work"
            className={styles.groupImage}
          />
        </motion.div>

        <motion.div
          className={styles.grid}
          variants={gridStagger}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: '-100px' }}
        >
          {teamMembers.map((member) => (
            <motion.div
              key={member.name}
              className={styles.card}
              variants={scrollReveal}
            >
              <div className={styles.imageWrapper}>
                <img
                  src={member.image}
                  alt={member.name}
                  className={styles.headshot}
                />
              </div>
              <h3 className={styles.memberName}>{member.name}</h3>
              <p className={styles.memberRole}>{member.role}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
