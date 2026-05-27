import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import SectionEyebrow from '../../SectionEyebrow';
import { EditableTranslation } from '@/cms/EditableTranslation';
import { CardEditPanel } from '@/cms/CardEditPanel';
import { PanelImageField, PanelTextField } from '@/cms/PanelField';
import { useIsEditing } from '@/cms/EditModeProvider';
import cardStyles from '@/cms/CardEditPanel.module.css';
import { scrollReveal, gridStagger } from '@/utils/animations';
import styles from './section-team.module.css';

interface TeamMember {
  name: string;
  role: string;
  image?: string;
}

const fallbackImages = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
];

export default function TeamSection() {
  const { t } = useTranslation('about');
  const editMode = useIsEditing();
  const localizedMembers = t('team.members', { returnObjects: true }) as TeamMember[];
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const teamMembers = localizedMembers.map((member, i) => ({
    ...member,
    image: member.image || fallbackImages[i] || fallbackImages[0],
  }));

  const editing = editingIndex !== null ? teamMembers[editingIndex] : null;

  return (
    <section className={styles.teamSection}>
      <div className={styles.container}>
        <motion.div className={styles.header} {...scrollReveal}>
          <SectionEyebrow
            label={
              <EditableTranslation pageSlug="about" namespace="about" path="team.eyebrow" label="Team eyebrow" />
            }
            description={
              <EditableTranslation pageSlug="about" namespace="about" path="team.description" label="Team description" />
            }
          />
          <h2 className={styles.title}>
            <EditableTranslation pageSlug="about" namespace="about" path="team.title" label="Team title" />
            {' '}
            <em className={styles.titleAccent}>
              <EditableTranslation pageSlug="about" namespace="about" path="team.accent" label="Team accent" />
            </em>
          </h2>
          <EditableTranslation pageSlug="about" namespace="about" path="team.subtitle" label="Team subtitle" kind="text" as="p" className={styles.subtitle} />
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
          {teamMembers.map((member, i) => {
            const cardContent = (
              <>
                <div className={styles.imageWrapper}>
                  <img src={member.image} alt={member.name} className={styles.headshot} />
                </div>
                <h3 className={styles.memberName}>{member.name}</h3>
                <p className={styles.memberRole}>{member.role}</p>
              </>
            );

            if (!editMode) {
              return (
                <motion.div key={i} className={styles.card} variants={scrollReveal}>
                  {cardContent}
                </motion.div>
              );
            }

            return (
              <motion.button
                key={i}
                type="button"
                onClick={() => setEditingIndex(i)}
                className={`${styles.card} ${cardStyles.cardHoverable}`}
                data-edit-label="Edit member"
                variants={scrollReveal}
                style={{ background: 'transparent', border: 0, padding: 0, textAlign: 'left', font: 'inherit', color: 'inherit', cursor: 'pointer', width: '100%' }}
              >
                {cardContent}
              </motion.button>
            );
          })}
        </motion.div>
      </div>

      <CardEditPanel
        open={editing !== null}
        onClose={() => setEditingIndex(null)}
        eyebrow="Team member"
        title={editing?.name || 'Member'}
      >
        {editingIndex !== null && (
          <>
            <PanelImageField
              pageSlug="about"
              namespace="about"
              path={`team.members.${editingIndex}.image`}
              label="Headshot"
            />
            <PanelTextField
              pageSlug="about"
              namespace="about"
              path={`team.members.${editingIndex}.name`}
              label="Name"
            />
            <PanelTextField
              pageSlug="about"
              namespace="about"
              path={`team.members.${editingIndex}.role`}
              label="Role"
            />
          </>
        )}
      </CardEditPanel>
    </section>
  );
}
