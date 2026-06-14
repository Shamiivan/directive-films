import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, BarChart3, Rocket } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import CtaButton from '@/components/shared/cta-button/cta-button';
import { EditableTranslation } from '@/cms/EditableTranslation';
import { CardEditPanel } from '@/cms/CardEditPanel';
import { PanelTextField, PanelTextareaField } from '@/cms/PanelField';
import { useIsEditing } from '@/cms/EditModeProvider';
import cardStyles from '@/cms/CardEditPanel.module.css';
import styles from './section-why-us.module.css';

interface WhyUsReason {
  title: string;
  description: string;
  stat: string;
  label: string;
}

const reasonIcons = [Rocket, Heart, BarChart3];

export default function WhyUsSection() {
  const sectionRef = useRef(null);
  const leftContentRef = useRef(null);
  const { t } = useTranslation('services');
  const editMode = useIsEditing();
  const reasons = t('whyUs.reasons', { returnObjects: true }) as WhyUsReason[];
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const currentReason = editingIndex !== null ? reasons[editingIndex] : null;
  const pathPrefix = editingIndex !== null ? `whyUs.reasons.${editingIndex}` : '';

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.container}>
        {/* Split Layout */}
        <div className={styles.splitLayout}>
          {/* Left Sticky Content */}
          <div className={styles.leftSticky} ref={leftContentRef}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <EditableTranslation
                pageSlug="services"
                namespace="services"
                path="whyUs.badge"
                label="Why-us badge"
                as="span"
                className={styles.badge}
              />
              <h2 className={styles.title}>
                <EditableTranslation
                  pageSlug="services"
                  namespace="services"
                  path="whyUs.title"
                  label="Why-us title"
                />{' '}
                <span className={styles.gold}>
                  <EditableTranslation
                    pageSlug="services"
                    namespace="services"
                    path="whyUs.titleAccent"
                    label="Why-us title accent"
                  />
                </span>
              </h2>
              <EditableTranslation
                pageSlug="services"
                namespace="services"
                path="whyUs.subtitle"
                label="Why-us subtitle"
                kind="text"
                as="p"
                className={styles.subtitle}
              />
              <div className={styles.ctaWrapper}>
                <CtaButton to="/audit">
                  <EditableTranslation
                    pageSlug="services"
                    namespace="services"
                    path="whyUs.cta"
                    label="Why-us CTA"
                  />
                </CtaButton>
              </div>
            </motion.div>
          </div>

          {/* Right Scrolling Content */}
          <div className={styles.rightScrolling}>
            {reasons.map((reason, index) => {
              const IconComponent = reasonIcons[index] || reasonIcons[0];
              const cardContent = (
                <>
                  <div className={styles.icon}>
                    <IconComponent size={48} strokeWidth={1.5} />
                  </div>
                  <h3 className={styles.reasonTitle}>{reason.title}</h3>
                  <div className={styles.statBox}>
                    <div className={styles.statValue}>{reason.stat}</div>
                    <div className={styles.statLabel}>{reason.label}</div>
                  </div>
                  <p className={styles.reasonDescription}>{reason.description}</p>
                </>
              );

              if (!editMode) {
                return (
                  <motion.div
                    key={index}
                    className={styles.reasonItem}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
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
                  className={`${styles.reasonItem} ${cardStyles.cardHoverable}`}
                  data-edit-label="Edit reason"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
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
          </div>
        </div>
      </div>

      <CardEditPanel
        open={editingIndex !== null}
        onClose={() => setEditingIndex(null)}
        eyebrow="Reason"
        title={currentReason?.title || 'Reason'}
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
            <PanelTextField
              pageSlug="services"
              namespace="services"
              path={`${pathPrefix}.stat`}
              label="Stat"
            />
            <PanelTextField
              pageSlug="services"
              namespace="services"
              path={`${pathPrefix}.label`}
              label="Stat label"
            />
          </>
        )}
      </CardEditPanel>
    </section>
  );
}
