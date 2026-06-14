import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { EditableTranslation } from '@/cms/EditableTranslation';
import { CardEditPanel } from '@/cms/CardEditPanel';
import { PanelImageField, PanelTextField } from '@/cms/PanelField';
import { useIsEditing } from '@/cms/EditModeProvider';
import cardStyles from '@/cms/CardEditPanel.module.css';
import { scrollReveal } from '../../../utils/animations';
import styles from './section-work-gallery.module.css';

interface WorkItem {
  title: string;
  category: string;
  image: string;
}

export default function WorkGallerySection() {
  const sectionRef = useRef(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation('services');
  const editMode = useIsEditing();
  const workItems = t('workGallery.items', { returnObjects: true }) as WorkItem[];
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);

  const currentItem = editingIndex !== null ? workItems[editingIndex] : null;
  const pathPrefix = editingIndex !== null ? `workGallery.items.${editingIndex}` : '';

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.container}>
        <motion.div className={styles.header} {...scrollReveal}>
          <EditableTranslation
            pageSlug="services"
            namespace="services"
            path="workGallery.title"
            label="Gallery title"
            as="h2"
            className={styles.title}
          />
          <EditableTranslation
            pageSlug="services"
            namespace="services"
            path="workGallery.subtitle"
            label="Gallery subtitle"
            kind="text"
            as="p"
            className={styles.subtitle}
          />
        </motion.div>

        <div className={styles.scrollContainer}>
          <motion.div ref={containerRef} className={styles.gallery} style={{ x }}>
            {workItems.map((item, index) => {
              const cardInner = (
                <div className={styles.imageContainer}>
                  <motion.img
                    src={item.image}
                    alt={item.title}
                    className={styles.image}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className={styles.overlay}>
                    <motion.div
                      className={styles.overlayContent}
                      initial={{ opacity: 0, y: 20 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className={styles.category}>
                        {item.category}
                      </span>
                      <h3 className={styles.workTitle}>{item.title}</h3>
                      <span className={styles.viewButton}>{t('workGallery.viewProject')}</span>
                    </motion.div>
                  </div>
                </div>
              );

              if (!editMode) {
                return (
                  <motion.div
                    key={index}
                    className={styles.workCard}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{
                      y: -10,
                      scale: 1.02,
                      boxShadow: 'var(--shadow-gold-lg)',
                    }}
                  >
                    {cardInner}
                  </motion.div>
                );
              }

              return (
                <motion.button
                  key={index}
                  type="button"
                  onClick={() => setEditingIndex(index)}
                  className={`${styles.workCard} ${cardStyles.cardHoverable}`}
                  data-edit-label="Edit work"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  style={{
                    background: 'transparent',
                    border: 0,
                    padding: 0,
                    textAlign: 'left',
                    font: 'inherit',
                    color: 'inherit',
                    cursor: 'pointer',
                  }}
                >
                  {cardInner}
                </motion.button>
              );
            })}
          </motion.div>
        </div>

        <motion.div className={styles.scrollHint} {...scrollReveal}>
          <EditableTranslation
            pageSlug="services"
            namespace="services"
            path="workGallery.scrollHint"
            label="Scroll hint"
            as="span"
          />
        </motion.div>
      </div>

      <CardEditPanel
        open={editingIndex !== null}
        onClose={() => setEditingIndex(null)}
        eyebrow="Work"
        title={currentItem?.title || 'Work'}
      >
        {editingIndex !== null && (
          <>
            <PanelImageField
              pageSlug="services"
              namespace="services"
              path={`${pathPrefix}.image`}
              label="Cover image"
            />
            <PanelTextField
              pageSlug="services"
              namespace="services"
              path={`${pathPrefix}.title`}
              label="Title"
            />
            <PanelTextField
              pageSlug="services"
              namespace="services"
              path={`${pathPrefix}.category`}
              label="Category"
            />
          </>
        )}
      </CardEditPanel>
    </section>
  );
}
