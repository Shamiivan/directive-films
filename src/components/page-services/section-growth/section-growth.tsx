import { useState } from 'react';
import { motion } from 'framer-motion';
import { Video, Target, Users, TrendingUp, Lightbulb } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { EditableTranslation } from '@/cms/EditableTranslation';
import { CardEditPanel } from '@/cms/CardEditPanel';
import { PanelTextField, PanelTextareaField } from '@/cms/PanelField';
import { useIsEditing } from '@/cms/EditModeProvider';
import cardStyles from '@/cms/CardEditPanel.module.css';
import { scrollReveal, gridStagger } from '../../../utils/animations';
import styles from './section-growth.module.css';

interface GrowthService {
  title: string;
  description: string;
}

const iconComponents = [Video, Target, Users, TrendingUp, Lightbulb];

export default function GrowthSection() {
  const { t } = useTranslation('services');
  const editMode = useIsEditing();
  const services = t('growth.services', { returnObjects: true }) as GrowthService[];
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const currentService = editingIndex !== null ? services[editingIndex] : null;
  const pathPrefix = editingIndex !== null ? `growth.services.${editingIndex}` : '';

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Header */}
        <motion.div className={styles.header} {...scrollReveal}>
          <EditableTranslation
            pageSlug="services"
            namespace="services"
            path="growth.title"
            label="Growth title"
            as="h2"
            className={styles.title}
          />
          <EditableTranslation
            pageSlug="services"
            namespace="services"
            path="growth.subtitle"
            label="Growth subtitle"
            kind="text"
            as="p"
            className={styles.subtitle}
          />
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className={styles.servicesGrid}
          variants={gridStagger}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: '-50px' }}
        >
          {services.map((service, index) => {
            const IconComponent = iconComponents[index] || iconComponents[0];
            const cardContent = (
              <>
                <div className={styles.icon}>
                  <IconComponent size={48} strokeWidth={1.5} />
                </div>
                <h3 className={styles.serviceTitle}>{service.title}</h3>
                <p className={styles.serviceDescription}>{service.description}</p>
                <span className={styles.learnMore}>{t('growth.learnMore')}</span>
              </>
            );

            if (!editMode) {
              return (
                <motion.div
                  key={index}
                  className={styles.serviceCard}
                  variants={scrollReveal}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  {cardContent}
                </motion.div>
              );
            }

            return (
              <motion.button
                key={index}
                type="button"
                onClick={() => setEditingIndex(index)}
                className={`${styles.serviceCard} ${cardStyles.cardHoverable}`}
                data-edit-label="Edit service"
                variants={scrollReveal}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
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
        open={editingIndex !== null}
        onClose={() => setEditingIndex(null)}
        eyebrow="Service"
        title={currentService?.title || 'Service'}
      >
        {editingIndex !== null && (
          <>
            <PanelTextField
              pageSlug="services"
              namespace="services"
              path={`${pathPrefix}.title`}
              label="Title"
            />
            <PanelTextareaField
              pageSlug="services"
              namespace="services"
              path={`${pathPrefix}.description`}
              label="Description"
            />
          </>
        )}
      </CardEditPanel>
    </section>
  );
}
