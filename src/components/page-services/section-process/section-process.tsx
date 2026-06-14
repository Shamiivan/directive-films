import { motion } from 'framer-motion';
import { Search, Lightbulb, Video, TrendingUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import CtaButton from '@/components/shared/cta-button/cta-button';
import { EditableTranslation } from '@/cms/EditableTranslation';
import { scrollReveal, gridStagger } from '../../../utils/animations';
import styles from './section-process.module.css';

interface ProcessStep {
  title: string;
  description: string;
}

const iconComponents = [Search, Lightbulb, Video, TrendingUp];

export default function ProcessSection() {
  const { t } = useTranslation('services');
  const steps = t('processSection.steps', { returnObjects: true }) as ProcessStep[];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Header */}
        <motion.div className={styles.header} {...scrollReveal}>
          <EditableTranslation
            pageSlug="services"
            namespace="services"
            path="processSection.title"
            label="Process title"
            as="h2"
            className={styles.title}
          />
          <EditableTranslation
            pageSlug="services"
            namespace="services"
            path="processSection.subtitle"
            label="Process subtitle"
            kind="text"
            as="p"
            className={styles.subtitle}
          />
        </motion.div>

        {/* Process Grid */}
        <motion.div
          className={styles.processGrid}
          variants={gridStagger}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: '-50px' }}
        >
          {steps.map((_step, index) => {
            const IconComponent = iconComponents[index] || iconComponents[0];
            return (
              <motion.div
                key={index}
                className={styles.processCard}
                variants={scrollReveal}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <div className={styles.icon}>
                  <IconComponent size={48} strokeWidth={1.5} />
                </div>
                <EditableTranslation
                  pageSlug="services"
                  namespace="services"
                  path={`processSection.steps.${index}.title`}
                  label={`Step ${index + 1} title`}
                  as="h3"
                  className={styles.stepTitle}
                />
                <EditableTranslation
                  pageSlug="services"
                  namespace="services"
                  path={`processSection.steps.${index}.description`}
                  label={`Step ${index + 1} description`}
                  kind="text"
                  as="p"
                  className={styles.description}
                />
                <span className={styles.learnMore}>{t('processSection.learnMore')}</span>
              </motion.div>
            );
          })}

          {/* CTA Card */}
          <motion.div
            className={styles.ctaCard}
            variants={scrollReveal}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <p className={styles.ctaText}>
              <EditableTranslation
                pageSlug="services"
                namespace="services"
                path="processSection.ctaLead"
                label="CTA lead"
              />{' '}
              <span className={styles.transform}>
                <EditableTranslation
                  pageSlug="services"
                  namespace="services"
                  path="processSection.ctaHighlight"
                  label="CTA highlight"
                />
              </span>
              <EditableTranslation
                pageSlug="services"
                namespace="services"
                path="processSection.ctaTrail"
                label="CTA trail"
              />
              <br />
              <EditableTranslation
                pageSlug="services"
                namespace="services"
                path="processSection.ctaSubtitle"
                label="CTA subtitle"
              />
            </p>
            <CtaButton to="/audit">
              <EditableTranslation
                pageSlug="services"
                namespace="services"
                path="processSection.ctaButton"
                label="CTA button"
              />
            </CtaButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
