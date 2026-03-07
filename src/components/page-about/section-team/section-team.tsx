import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import SectionEyebrow from '../../SectionEyebrow';
import { scrollReveal, gridStagger } from '@/utils/animations';
import styles from './section-team.module.css';

interface TeamMember {
  name: string;
  role: string;
}

const teamMemberImages = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
];

export default function TeamSection() {
  const { t } = useTranslation('about');
  const localizedMembers = t('team.members', { returnObjects: true }) as TeamMember[];

  const teamMembers = localizedMembers.map((member, i) => ({
    ...member,
    image: teamMemberImages[i] || teamMemberImages[0],
  }));

  return (
    <section className={styles.teamSection}>
      <div className={styles.container}>
        <motion.div className={styles.header} {...scrollReveal}>
          <SectionEyebrow label={t('team.eyebrow')} description={t('team.description')} />
          <h2 className={styles.title}>
            {t('team.title')}{' '}
            <em className={styles.titleAccent}>{t('team.accent')}</em>
          </h2>
          <p className={styles.subtitle}>
            {t('team.subtitle')}
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
