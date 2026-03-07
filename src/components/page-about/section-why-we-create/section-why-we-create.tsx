import { motion } from 'framer-motion';
import SectionEyebrow from '../../SectionEyebrow';
import { scrollReveal, gridStagger } from '@/utils/animations';
import styles from './section-why-we-create.module.css';

const features = [
  {
    icon: '01',
    title: 'Revenue is the metric.',
    description: 'If it doesn\'t help you close deals, we don\'t do it.',
  },
  {
    icon: '02',
    title: 'Audit before you build.',
    description: 'We don\'t start building until we understand what\'s actually going on.',
  },
  {
    icon: '03',
    title: 'Systems beat one-offs.',
    description: 'A single video or landing page won\'t fix everything. We connect the pieces so they work together.',
  },
  {
    icon: '04',
    title: 'Your team should get better, not more dependent.',
    description: 'We set your team up to keep going without us.',
  },
];

export default function WhyWeCreateSection() {
  return (
    <section className={styles.whyWeCreateSection}>
      <div className={styles.container}>
        <motion.div className={styles.header} {...scrollReveal}>
          <SectionEyebrow label="What Drives Us" description="Principles, not platitudes" />
          <h2 className={styles.title}>Principles, not <em className={styles.titleAccent}>platitudes.</em></h2>
        </motion.div>

        <motion.div
          className={styles.featuresGrid}
          variants={gridStagger}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.icon}
              className={styles.featureCard}
              variants={scrollReveal}
            >
              <div className={styles.icon}>{feature.icon}</div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>


      </div>
    </section>
  );
}
