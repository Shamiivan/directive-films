import { motion } from 'framer-motion';
import { Search, Lightbulb, Video, TrendingUp } from 'lucide-react';
import MagneticButton from '../../MagneticButton';
import { scrollReveal, gridStagger } from '../../../utils/animations';
import styles from './section-process.module.css';

export default function ProcessSection() {
  const iconComponents = [
    Search,      // Discovery
    Lightbulb,   // Strategy
    Video,       // Production
    TrendingUp,  // Optimization
  ];

  const steps = [
    {
      title: 'Discovery',
      description: 'We learn your business, your audience, and what makes you different. No templates — just a plan built for your specific situation.',
    },
    {
      title: 'Strategy',
      description: 'Every video gets mapped to a stage in your sales process. It has a purpose, a place in your funnel, and a number to hit.',
    },
    {
      title: 'Production',
      description: 'Professional crew, cinema-grade gear, and attention to every detail. We handle the set — you focus on being yourself on camera.',
    },
    {
      title: 'Optimization',
      description: 'After launch, we track performance and iterate. Better thumbnails, tighter hooks, stronger CTAs. Small improvements that compound.',
    },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Header */}
        <motion.div className={styles.header} {...scrollReveal}>
          <h2 className={styles.title}>How Every Project Works</h2>
          <p className={styles.subtitle}>
            Four steps. No surprises. You know what's happening at every stage.
          </p>
        </motion.div>

        {/* Process Grid */}
        <motion.div
          className={styles.processGrid}
          variants={gridStagger}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: "-50px" }}
        >
          {steps.map((step, index) => {
            const IconComponent = iconComponents[index];
            return (
              <motion.div
                key={index}
                className={styles.processCard}
                variants={scrollReveal}
                whileHover={{
                  scale: 1.02,
                }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <div className={styles.icon}>
                  <IconComponent size={48} strokeWidth={1.5} />
                </div>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.description}>{step.description}</p>
                <span className={styles.learnMore}>Learn More →</span>
              </motion.div>
            );
          })}

          {/* CTA Card */}
          <motion.div
            className={styles.ctaCard}
            variants={scrollReveal}
            whileHover={{
              scale: 1.02,
            }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <p className={styles.ctaText}>
              Ready to <span className={styles.transform}>start</span>?
              <br />
              Let's talk about your project.
            </p>
            <MagneticButton className={styles.ctaButton}>
              Schedule a Call
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
