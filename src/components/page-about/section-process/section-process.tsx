import { motion } from 'framer-motion';
import SectionEyebrow from '../../SectionEyebrow';
import { scrollReveal, gridStagger } from '@/utils/animations';
import styles from './section-process.module.css';

const processSteps = [
  {
    title: 'Audit',
    description: 'We start by listening. What are you selling? What\'s your site saying? Where do leads go after they show up?',
    image: '/images/pre-production.jpg',
  },
  {
    title: 'Build',
    description: 'We make the things you need. The site, the videos, the CRM setup. One team, not five vendors.',
    image: '/images/production.jpg',
  },
  {
    title: 'Scale',
    description: 'We make sure it keeps working. Your team learns the system. Results get tracked. Things get better over time.',
    image: '/images/post-production.jpg',
  },
];

export default function ProcessSection() {
  return (
    <section className={styles.processSection}>
      <div className={styles.container}>
        <motion.div className={styles.header} {...scrollReveal}>
          <SectionEyebrow label="Our Story" description="How we got here" />
          <h2 className={styles.title}>We built what we <em className={styles.titleAccent}>couldn't find.</em></h2>
          <p className={styles.subtitle}>
            We spent years in sales watching good companies lose deals because their online presence didn't reflect how good they actually were. Agencies would charge a fortune for content that looked great and did nothing. So we built the thing we kept wishing existed. One team that connects your content to how you actually sell.
          </p>
        </motion.div>

        <motion.div
          className={styles.grid}
          variants={gridStagger}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: "-100px" }}
        >
          {processSteps.map((step, index) => (
            <motion.div
              key={step.title}
              className={styles.card}
              variants={scrollReveal}
            >
              <div className={styles.imageWrapper}>
                <img
                  src={step.image}
                  alt={step.title}
                  className={styles.image}
                />
              </div>
              <div className={styles.content}>
                <h3 className={styles.cardTitle}>{step.title}</h3>
                <p className={styles.cardDescription}>{step.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
