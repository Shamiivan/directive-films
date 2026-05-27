import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import SectionEyebrow from '../../SectionEyebrow';
import { EditableTranslation } from '@/cms/EditableTranslation';
import { CardEditPanel } from '@/cms/CardEditPanel';
import { PanelTextField, PanelTextareaField } from '@/cms/PanelField';
import { useIsEditing } from '@/cms/EditModeProvider';
import cardStyles from '@/cms/CardEditPanel.module.css';
import { scrollReveal, gridStagger } from '@/utils/animations';
import styles from './section-why-we-create.module.css';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

export default function WhyWeCreateSection() {
  const { t } = useTranslation('about');
  const editMode = useIsEditing();
  const features = t('why.features', { returnObjects: true }) as Feature[];
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const editing = editingIndex !== null ? features[editingIndex] : null;

  return (
    <section className={styles.whyWeCreateSection}>
      <div className={styles.container}>
        <motion.div className={styles.header} {...scrollReveal}>
          <SectionEyebrow
            label={
              <EditableTranslation pageSlug="about" namespace="about" path="why.eyebrow" label="Why eyebrow" />
            }
            description={
              <EditableTranslation pageSlug="about" namespace="about" path="why.description" label="Why description" />
            }
          />
          <h2 className={styles.title}>
            <EditableTranslation pageSlug="about" namespace="about" path="why.title" label="Why title" />
            {' '}
            <em className={styles.titleAccent}>
              <EditableTranslation pageSlug="about" namespace="about" path="why.accent" label="Why accent" />
            </em>
          </h2>
        </motion.div>

        <motion.div
          className={styles.featuresGrid}
          variants={gridStagger}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => {
            const cardContent = (
              <>
                <div className={styles.icon}>{feature.icon}</div>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>{feature.description}</p>
              </>
            );

            if (!editMode) {
              return (
                <motion.div key={index} className={styles.featureCard} variants={scrollReveal}>
                  {cardContent}
                </motion.div>
              );
            }

            return (
              <motion.button
                key={index}
                type="button"
                onClick={() => setEditingIndex(index)}
                className={`${styles.featureCard} ${cardStyles.cardHoverable}`}
                data-edit-label="Edit feature"
                variants={scrollReveal}
                style={{
                  background: 'transparent',
                  border: 0,
                  padding: 0,
                  textAlign: 'left',
                  font: 'inherit',
                  color: 'inherit',
                  cursor: 'pointer',
                  width: '100%',
                }}
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
        eyebrow="Feature"
        title={editing?.title || 'Feature'}
      >
        {editingIndex !== null && (
          <>
            <PanelTextField
              pageSlug="about"
              namespace="about"
              path={`why.features.${editingIndex}.icon`}
              label="Icon (emoji)"
            />
            <PanelTextField
              pageSlug="about"
              namespace="about"
              path={`why.features.${editingIndex}.title`}
              label="Title"
            />
            <PanelTextareaField
              pageSlug="about"
              namespace="about"
              path={`why.features.${editingIndex}.description`}
              label="Description"
            />
          </>
        )}
      </CardEditPanel>
    </section>
  );
}
