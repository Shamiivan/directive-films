import { motion } from 'framer-motion';
import SectionEyebrow from '../../SectionEyebrow';
import MagneticButton from '../../MagneticButton';
import { scrollReveal, gridStagger } from '@/utils/animations';
import styles from './section-why-we-create.module.css';

const features = [
  {
    icon: '01',
    title: 'Revenue is the metric.',
    description: 'Work that doesn\'t convert is expensive decoration. We measure everything by what it puts in your pipeline.',
  },
  {
    icon: '02',
    title: 'Audit before you build.',
    description: 'We don\'t prescribe before we understand. Every engagement starts with an audit of your sales ecosystem.',
  },
  {
    icon: '03',
    title: 'Systems beat one-offs.',
    description: 'A redesigned homepage won\'t fix a broken funnel. We build systems that compound.',
  },
  {
    icon: '04',
    title: 'Your team gets better.',
    description: 'We don\'t create dependency. We set your team up to create, publish, and optimize without us.',
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

        <motion.div className={styles.imageWrapper} {...scrollReveal}>
          <img
            src="/images/video-editing-workspace.jpg"
            alt="Professional video editing workspace"
            className={styles.heroImage}
          />
        </motion.div>

        <motion.div className={styles.cta} {...scrollReveal}>
          <p className={styles.ctaText}>
            You're leaving money on the table. 30-minute call. We audit your setup and show you where the gaps are.
          </p>
          <MagneticButton href="/contact" className={styles.ctaButton}>
            Get Your Free Audit
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
