import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { scrollReveal } from '../../../../utils/animations';
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
          <h2 className={styles.title}>{t('positions.title')}</h2>
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
              key={index}
              className={styles.positionItem}
              variants={scrollReveal}
            >
              <button
                className={styles.positionHeader}
                onClick={() => togglePosition(index)}
                aria-expanded={expandedIndex === index}
              >
                <span className={styles.positionTitle}>{position.title}</span>
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
                        <span className={styles.positionType}>{position.type}</span>
                      </div>

                      <p className={styles.positionDescription}>{position.description}</p>

                      <div className={styles.positionDetails}>
                        <div className={styles.detailSection}>
                          <h4 className={styles.detailTitle}>{t('positions.sections.responsibilities')}</h4>
                          <ul className={styles.detailList}>
                            {position.responsibilities.map((item, i) => (
                              <li key={i}>{item}</li>
                            ))}
                          </ul>
                        </div>

                        <div className={styles.detailSection}>
                          <h4 className={styles.detailTitle}>{t('positions.sections.requirements')}</h4>
                          <ul className={styles.detailList}>
                            {position.requirements.map((item, i) => (
                              <li key={i}>{item}</li>
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
                        {t('positions.apply')}
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
