import { motion } from 'framer-motion';
import SectionEyebrow from '../../SectionEyebrow';
import { scrollReveal, gridStagger } from '@/utils/animations';
import styles from './section-process.module.css';

const processSteps = [
  {
    title: 'Audit',
    description: 'We dig into your sales ecosystem — website, CRM, content, pipeline. Find the gaps. Map the opportunities.',
    image: '/images/pre-production.jpg',
  },
  {
    title: 'Build',
    description: 'Web, CRM, coaching, content, strategy — one connected system. Not five separate invoices.',
    image: '/images/production.jpg',
  },
  {
    title: 'Scale',
    description: 'Systems that compound. Your team gets sharper, your pipeline gets fuller, and growth accelerates.',
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
            Agencies sell disconnected projects. We built one system that turns your content into revenue.
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
