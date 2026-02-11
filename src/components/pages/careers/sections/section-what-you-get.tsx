'use client';

import { motion } from 'framer-motion';
import { Calendar, DollarSign, Target, Users } from 'lucide-react';
import { scrollReveal, gridStagger } from '../../../../utils/animations';
import styles from './section-what-you-get.module.css';

export default function WhatYouGetSection() {
  const benefits = [
    {
      icon: Calendar,
      title: 'Clear Path Forward',
      description: 'Most agencies teach you how to film pretty shots. We teach you how to make money. You\'ll sit in on client strategy sessions, learn what converts and why, understand how businesses actually grow.',
    },
    {
      icon: DollarSign,
      title: 'We Move Fast and Pay Well',
      description: 'We are profitable, we pay competitively, and we respect your time. Build great work, make good money, have a life.',
    },
    {
      icon: Target,
      title: 'Autonomy With Accountability',
      description: 'High performers earn flexibility in how they structure their time. Standards don\'t change only how you manage yourself does.',
    },
    {
      icon: Users,
      title: 'Direct Exposure to Leadership',
      description: 'We\'ve united creative strategy and production under one roof, ensuring your videos align perfectly with your goals and vision.',
    },
  ];

  return (
    <section className={styles.whatYouGetSection}>
      <div className={styles.container}>
        {/* Header */}
        <motion.div className={styles.header} {...scrollReveal}>
          <h2 className={styles.title}>What You'll Get</h2>
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
            const IconComponent = benefit.icon;
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
