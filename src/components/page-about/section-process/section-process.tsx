import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import SectionEyebrow from '../../SectionEyebrow';
import { EditableTranslation } from '@/cms/EditableTranslation';
import { CardEditPanel } from '@/cms/CardEditPanel';
import { PanelImageField, PanelTextField, PanelTextareaField } from '@/cms/PanelField';
import { useIsEditing } from '@/cms/EditModeProvider';
import cardStyles from '@/cms/CardEditPanel.module.css';
import { scrollReveal, gridStagger } from '@/utils/animations';
import styles from './section-process.module.css';

interface ProcessStep {
  title: string;
  description: string;
  image?: string;
}

const fallbackImages = [
  '/images/pre-production.jpg',
  '/images/production.jpg',
  '/images/post-production.jpg',
];

export default function ProcessSection() {
  const { t } = useTranslation('about');
  const editMode = useIsEditing();
  const localizedSteps = t('process.steps', { returnObjects: true }) as ProcessStep[];
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const processSteps = localizedSteps.map((step, i) => ({
    ...step,
    image: step.image || fallbackImages[i] || fallbackImages[0],
  }));

  const editing = editingIndex !== null ? processSteps[editingIndex] : null;

  return (
    <section className={styles.processSection}>
      <div className={styles.container}>
        <motion.div className={styles.header} {...scrollReveal}>
          <SectionEyebrow
            label={
              <EditableTranslation pageSlug="about" namespace="about" path="process.eyebrow" label="Process eyebrow" />
            }
            description={
              <EditableTranslation pageSlug="about" namespace="about" path="process.description" label="Process description" />
            }
          />
          <h2 className={styles.title}>
            <EditableTranslation pageSlug="about" namespace="about" path="process.title" label="Process title" />
            {' '}
            <em className={styles.titleAccent}>
              <EditableTranslation pageSlug="about" namespace="about" path="process.accent" label="Process accent" />
            </em>
          </h2>
          <EditableTranslation pageSlug="about" namespace="about" path="process.subtitle" label="Process subtitle" kind="text" as="p" className={styles.subtitle} />
        </motion.div>

        <motion.div
          className={styles.grid}
          variants={gridStagger}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: "-100px" }}
        >
          {processSteps.map((step, index) => {
            const cardContent = (
              <>
                <div className={styles.imageWrapper}>
                  <img src={step.image} alt={step.title} className={styles.image} />
                </div>
                <div className={styles.content}>
                  <h3 className={styles.cardTitle}>{step.title}</h3>
                  <p className={styles.cardDescription}>{step.description}</p>
                </div>
              </>
            );

            if (!editMode) {
              return (
                <motion.div key={index} className={styles.card} variants={scrollReveal}>
                  {cardContent}
                </motion.div>
              );
            }

            return (
              <motion.button
                key={index}
                type="button"
                onClick={() => setEditingIndex(index)}
                className={`${styles.card} ${cardStyles.cardHoverable}`}
                data-edit-label="Edit step"
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
        eyebrow="Process step"
        title={editing?.title || 'Step'}
      >
        {editingIndex !== null && (
          <>
            <PanelImageField
              pageSlug="about"
              namespace="about"
              path={`process.steps.${editingIndex}.image`}
              label="Cover image"
            />
            <PanelTextField
              pageSlug="about"
              namespace="about"
              path={`process.steps.${editingIndex}.title`}
              label="Title"
            />
            <PanelTextareaField
              pageSlug="about"
              namespace="about"
              path={`process.steps.${editingIndex}.description`}
              label="Description"
            />
          </>
        )}
      </CardEditPanel>
    </section>
  );
}
