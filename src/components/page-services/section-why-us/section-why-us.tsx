import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Heart, BarChart3, Rocket, ArrowRight } from 'lucide-react';
import MagneticButton from '../../MagneticButton';
import { scrollReveal } from '../../../utils/animations';
import styles from './section-why-us.module.css';

export default function WhyUsSection() {
  const sectionRef = useRef(null);
  const leftContentRef = useRef(null);

  const reasons = [
    {
      icon: Rocket,
      title: 'Speed to Market',
      description: 'Two-week average turnaround. You get to market fast without cutting corners.',
      stat: '2 weeks',
      label: 'avg turnaround',
      delay: 0
    },
    {
      icon: Heart,
      title: 'Partnership Mentality',
      description: 'We don\'t deliver and disappear. 98% of our clients stay because we\'re invested in what happens after the video ships.',
      stat: '98%',
      label: 'retention rate',
      delay: 0.2
    },
    {
      icon: BarChart3,
      title: 'Proven Track Record',
      description: '500+ projects across 12 industries. Our clients have generated over $50M in revenue from the systems we built.',
      stat: '$50M+',
      label: 'generated',
      delay: 0.4
    },
  ];

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.container}>
        {/* Split Layout */}
        <div className={styles.splitLayout}>
          {/* Left Sticky Content */}
          <div className={styles.leftSticky} ref={leftContentRef}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className={styles.badge}>Why Choose Us</span>
              <h2 className={styles.title}>
                Why Companies Keep <span className={styles.gold}>Coming Back</span>
              </h2>
              <p className={styles.subtitle}>
                Fast turnarounds. Long-term partnerships. Numbers that prove it.
              </p>
              <div className={styles.ctaWrapper}>
                <MagneticButton className={styles.ctaButton}>
                  Schedule a Call
                </MagneticButton>
              </div>
            </motion.div>
          </div>

          {/* Right Scrolling Content */}
          <div className={styles.rightScrolling}>
            {reasons.map((reason, index) => {
              const IconComponent = reason.icon;
              return (
                <motion.div
                  key={index}
                  className={styles.reasonItem}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: reason.delay }}
                >
                  <div className={styles.icon}>
                    <IconComponent size={48} strokeWidth={1.5} />
                  </div>
                  <h3 className={styles.reasonTitle}>{reason.title}</h3>
                  <div className={styles.statBox}>
                    <div className={styles.statValue}>
                      {reason.stat}
                    </div>
                    <div className={styles.statLabel}>{reason.label}</div>
                  </div>
                  <p className={styles.reasonDescription}>{reason.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
