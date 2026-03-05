import { motion } from 'framer-motion';
import MagneticButton from '../../MagneticButton';
import { scrollReveal, gridStagger, imageZoom } from '../../../utils/animations';
import styles from './section-results.module.css';

export default function ResultsSection() {
  const SearchIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="11" cy="11" r="8" stroke="#FDB714" strokeWidth="2"/>
      <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="#FDB714" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );

  const VideoIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 10L19.5528 7.72361C20.2177 7.39116 21 7.87465 21 8.61803V15.382C21 16.1253 20.2177 16.6088 19.5528 16.2764L15 14M5 18H13C14.1046 18 15 17.1046 15 16V8C15 6.89543 14.1046 6 13 6H5C3.89543 6 3 6.89543 3 8V16C3 17.1046 3.89543 18 5 18Z" stroke="#FDB714" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const ChartIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="18" y1="20" x2="18" y2="10" stroke="#FDB714" strokeWidth="2" strokeLinecap="round"/>
      <line x1="12" y1="20" x2="12" y2="4" stroke="#FDB714" strokeWidth="2" strokeLinecap="round"/>
      <line x1="6" y1="20" x2="6" y2="14" stroke="#FDB714" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );

  const steps = [
    {
      icon: <SearchIcon />,
      title: 'Diagnose',
      description: 'We audit your online presence, messaging, and competitive landscape. You get a clear report with what\'s working, what\'s not, and what to fix first.',
      link: '/services/diagnose',
    },
    {
      icon: <VideoIcon />,
      title: 'Create & Build',
      description: 'We produce video content mapped to your sales process and build websites that convert. Every asset earns its place in your pipeline.',
      link: '/services/create',
    },
    {
      icon: <ChartIcon />,
      title: 'Optimize',
      description: 'We set up your CRM, automate follow-ups, and build dashboards so you can see what\'s working. Systems that sell while you sleep.',
      link: '/services/optimize',
    },
  ];

  return (
    <section className={styles.resultsSection}>
      <div className={styles.container}>
        {/* Title */}
        <motion.h2
          className={styles.title}
          {...scrollReveal}
        >
          How We Get You<br />
          <span className={styles.gold}>There</span>
        </motion.h2>

        {/* Hero Image/Video */}
        <motion.div
          className={styles.heroMedia}
          {...imageZoom}
        >
          <motion.img
            src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1200&h=600&fit=crop"
            alt="Film production crew"
            className={styles.heroImage}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          />
        </motion.div>

        {/* 3-Step Cards */}
        <motion.div
          className={styles.servicesGrid}
          variants={gridStagger}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: "-50px" }}
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className={styles.serviceCard}
              variants={scrollReveal}
              whileHover={{
                scale: 1.05,
                y: -8,
                boxShadow: "0 12px 32px rgba(253, 183, 20, 0.2)"
              }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <motion.div
                className={styles.iconBox}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                {step.icon}
              </motion.div>
              <h3 className={styles.serviceTitle}>{step.title}</h3>
              <p className={styles.serviceDescription}>{step.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          className={styles.ctaContainer}
          {...scrollReveal}
        >
          <MagneticButton href="/services" className={styles.ctaButton}>
            See Our Services
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
