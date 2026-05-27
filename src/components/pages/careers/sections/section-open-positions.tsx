import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { scrollReveal } from '../../../../utils/animations';
import { EditableTranslation } from '@/cms/EditableTranslation';
import styles from './section-open-positions.module.css';

interface PositionData {
  id: string;
  title: string;
  type: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
}

export default function OpenPositionsSection() {
  const { t } = useTranslation('careers');
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const positions = t('positions.list', { returnObjects: true }) as PositionData[];

  const togglePosition = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const scrollToForm = () => {
    const formSection = document.querySelector('form');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section className={styles.openPositionsSection}>
      <div className={styles.container}>
        {/* Header */}
        <motion.div className={styles.header} {...scrollReveal}>
          <EditableTranslation pageSlug="careers" namespace="careers" path="positions.title" label="Positions title" as="h2" className={styles.title} />
        </motion.div>

        {/* Positions Accordion */}
        <motion.div
          className={styles.positionsList}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: "-50px" }}
        >
          {positions.map((position, index) => (
            <motion.div
              key={position.id ?? index}
              className={styles.positionItem}
              variants={scrollReveal}
            >
              <button
                className={styles.positionHeader}
                onClick={() => togglePosition(index)}
                aria-expanded={expandedIndex === index}
              >
                <span className={styles.positionTitle}>
                  <EditableTranslation
                    pageSlug="careers"
                    namespace="careers"
                    path={`positions.list.${index}.title`}
                    label={`Position ${index + 1} title`}
                  />
                </span>
                <motion.div
                  className={styles.toggleIcon}
                  animate={{ rotate: expandedIndex === index ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Plus size={20} strokeWidth={2} />
                </motion.div>
              </button>

              <AnimatePresence>
                {expandedIndex === index && (
                  <motion.div
                    className={styles.positionContent}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <div className={styles.contentInner}>
                      <div className={styles.positionMeta}>
                        <span className={styles.positionType}>
                          <EditableTranslation
                            pageSlug="careers"
                            namespace="careers"
                            path={`positions.list.${index}.type`}
                            label={`Position ${index + 1} type`}
                          />
                        </span>
                      </div>

                      <EditableTranslation
                        pageSlug="careers"
                        namespace="careers"
                        path={`positions.list.${index}.description`}
                        label={`Position ${index + 1} description`}
                        kind="text"
                        as="p"
                        className={styles.positionDescription}
                      />

                      <div className={styles.positionDetails}>
                        <div className={styles.detailSection}>
                          <EditableTranslation
                            pageSlug="careers"
                            namespace="careers"
                            path="positions.sections.responsibilities"
                            label="Responsibilities heading"
                            as="h4"
                            className={styles.detailTitle}
                          />
                          <ul className={styles.detailList}>
                            {position.responsibilities.map((_, i) => (
                              <li key={i}>
                                <EditableTranslation
                                  pageSlug="careers"
                                  namespace="careers"
                                  path={`positions.list.${index}.responsibilities.${i}`}
                                  label={`Position ${index + 1} responsibility ${i + 1}`}
                                  kind="text"
                                />
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className={styles.detailSection}>
                          <EditableTranslation
                            pageSlug="careers"
                            namespace="careers"
                            path="positions.sections.requirements"
                            label="Requirements heading"
                            as="h4"
                            className={styles.detailTitle}
                          />
                          <ul className={styles.detailList}>
                            {position.requirements.map((_, i) => (
                              <li key={i}>
                                <EditableTranslation
                                  pageSlug="careers"
                                  namespace="careers"
                                  path={`positions.list.${index}.requirements.${i}`}
                                  label={`Position ${index + 1} requirement ${i + 1}`}
                                  kind="text"
                                />
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <motion.button
                        className={styles.applyButton}
                        onClick={scrollToForm}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                      >
                        <EditableTranslation
                          pageSlug="careers"
                          namespace="careers"
                          path="positions.apply"
                          label="Apply button"
                        />
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
