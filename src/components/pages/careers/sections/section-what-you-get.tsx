import { motion } from 'framer-motion';
import { Calendar, DollarSign, Target, Users } from 'lucide-react';
import { scrollReveal, gridStagger } from '../../../../utils/animations';
import styles from './section-what-you-get.module.css';

export default function WhatYouGetSection() {
  const benefits = [
    {
      icon: Calendar,
      title: 'Learn What Actually Works',
      description: 'Most agencies teach you to film pretty shots. Here you\'ll sit in on client strategy sessions, learn what converts and why, and understand how businesses actually grow.',
    },
    {
      icon: DollarSign,
      title: 'We Move Fast and Pay Well',
      description: 'Profitable company. Competitive pay. Respect for your time. Build great work, earn good money, have a life.',
    },
    {
      icon: Target,
      title: 'Autonomy With Accountability',
      description: 'High performers earn flexibility in how they structure their time. The standards don\'t change, only how you manage yourself does.',
    },
    {
      icon: Users,
      title: 'Work Directly With Leadership',
      description: 'Small team, flat structure. You\'ll work alongside founders and senior creatives, not buried in a department.',
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
