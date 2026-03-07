import { motion } from 'framer-motion';
import { Calendar, DollarSign, Target, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { scrollReveal, gridStagger } from '../../../../utils/animations';
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
          <h2 className={styles.title}>{t('benefits.title')}</h2>
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
                key={index}
                className={styles.benefitCard}
                variants={scrollReveal}
              >
                <div className={styles.iconWrapper}>
                  <IconComponent size={32} strokeWidth={1.5} />
                </div>
                <h3 className={styles.benefitTitle}>{benefit.title}</h3>
                <p className={styles.benefitDescription}>{benefit.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
