import { motion } from 'framer-motion';
import { Calendar, DollarSign, Target, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { scrollReveal, gridStagger } from '../../../../utils/animations';
import { EditableTranslation } from '@/cms/EditableTranslation';
import styles from './section-what-you-get.module.css';

interface BenefitData {
  id: string;
  title: string;
  description: string;
}

const benefitIcons: Record<string, any> = {
  learn: Calendar,
  fast: DollarSign,
  autonomy: Target,
  leadership: Users,
};

export default function WhatYouGetSection() {
  const { t } = useTranslation('careers');
  const benefits = t('benefits.items', { returnObjects: true }) as BenefitData[];

  return (
    <section className={styles.whatYouGetSection}>
      <div className={styles.container}>
        {/* Header */}
        <motion.div className={styles.header} {...scrollReveal}>
          <EditableTranslation pageSlug="careers" namespace="careers" path="benefits.title" label="Benefits title" as="h2" className={styles.title} />
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          className={styles.benefitsGrid}
          variants={gridStagger}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: "-50px" }}
        >
          {benefits.map((benefit, index) => {
            const IconComponent = benefitIcons[benefit.id] || Calendar;
            return (
              <motion.div
                key={benefit.id ?? index}
                className={styles.benefitCard}
                variants={scrollReveal}
              >
                <div className={styles.iconWrapper}>
                  <IconComponent size={32} strokeWidth={1.5} />
                </div>
                <EditableTranslation
                  pageSlug="careers"
                  namespace="careers"
                  path={`benefits.items.${index}.title`}
                  label={`Benefit ${index + 1} title`}
                  as="h3"
                  className={styles.benefitTitle}
                />
                <EditableTranslation
                  pageSlug="careers"
                  namespace="careers"
                  path={`benefits.items.${index}.description`}
                  label={`Benefit ${index + 1} description`}
                  kind="text"
                  as="p"
                  className={styles.benefitDescription}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
