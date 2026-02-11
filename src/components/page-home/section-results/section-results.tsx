'use client';

import { motion } from 'framer-motion';
import MagneticButton from '../../MagneticButton';
import AnimatedCounter from '../../AnimatedCounter';
import { scrollReveal, gridStagger, imageZoom } from '../../../utils/animations';
import styles from './section-results.module.css';

export default function ResultsSection() {
  const VideoIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 10L19.5528 7.72361C20.2177 7.39116 21 7.87465 21 8.61803V15.382C21 16.1253 20.2177 16.6088 19.5528 16.2764L15 14M5 18H13C14.1046 18 15 17.1046 15 16V8C15 6.89543 14.1046 6 13 6H5C3.89543 6 3 6.89543 3 8V16C3 17.1046 3.89543 18 5 18Z" stroke="#FDB714" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const ChartIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 19V12M15 19V5M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z" stroke="#FDB714" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const StarIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.0489 3.92705C11.3483 3.00574 12.6517 3.00574 12.9511 3.92705L14.9187 9.98847C15.0526 10.3803 15.4215 10.6472 15.8335 10.6516L22.2188 10.7084C23.1878 10.7193 23.5832 11.9587 22.8119 12.5434L17.6344 16.4406C17.3017 16.6899 17.1623 17.1144 17.287 17.5091L19.1301 23.6137C19.4109 24.5419 18.354 25.3071 17.5702 24.7348L12.2929 20.9597C11.9618 20.7221 11.5382 20.7221 11.2071 20.9597L5.92977 24.7348C5.14596 25.3071 4.08913 24.5419 4.36991 23.6137L6.21301 17.5091C6.33771 17.1144 6.19826 16.6899 5.86558 16.4406L0.688062 12.5434C-0.0831653 11.9587 0.312228 10.7193 1.28116 10.7084L7.6665 10.6516C8.07854 10.6472 8.44736 10.3803 8.58133 9.98847L10.5489 3.92705Z" fill="#FDB714"/>
    </svg>
  );

  const ClipboardIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5M12 12H15M12 16H15M9 12H9.01M9 16H9.01" stroke="#FDB714" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const services = [
    {
      icon: <VideoIcon />,
      title: 'Video Sales System',
      description: 'Complete video marketing system with videos, objection-handling library, sequences, links, email campaigns, strategic positioning. Packaged as a system, not individual deliverables.',
    },
    {
      icon: <ChartIcon />,
      title: 'Performance Video Campaigns',
      description: 'Hyper-focused campaigns designed to maximize target. Includes creative, media buying consultation, and domain setup. Voting directly to desired growth.',
    },
    {
      icon: <StarIcon />,
      title: 'Sales Team Video Enablement',
      description: 'Talk-through video messaging to outreach follow-ups, preparation. Includes templates, scripts, and coaching. Monthly workshops + content library.',
    },
    {
      icon: <ClipboardIcon />,
      title: 'Industry-Specific Playbooks',
      description: 'Playbook with strategies for your industry. Provides professional services, e-commerce with proven campaigns/frameworks. Faster deployments, faster results.',
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
          Videos that generate measurable<br />
          <span className={styles.gold}>Results</span>
        </motion.h2>

        {/* Stats Bar with Animated Counters */}
        <motion.div
          className={styles.statsBar}
          variants={gridStagger}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div className={styles.statItem} variants={scrollReveal}>
            <div className={styles.statNumber}>
              <AnimatedCounter value={500} suffix="+" />
            </div>
            <div className={styles.statLabel}>Videos Produced</div>
          </motion.div>
          <motion.div className={styles.statItem} variants={scrollReveal}>
            <div className={styles.statNumber}>
              <AnimatedCounter value={98} suffix="%" />
            </div>
            <div className={styles.statLabel}>Client Satisfaction</div>
          </motion.div>
          <motion.div className={styles.statItem} variants={scrollReveal}>
            <div className={styles.statNumber}>
              <AnimatedCounter value={250} suffix="+" />
            </div>
            <div className={styles.statLabel}>Happy Clients</div>
          </motion.div>
          <motion.div className={styles.statItem} variants={scrollReveal}>
            <div className={styles.statNumber}>
              <AnimatedCounter value={3} suffix="M+" />
            </div>
            <div className={styles.statLabel}>Leads Generated</div>
          </motion.div>
        </motion.div>

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

        {/* Service Cards */}
        <motion.div
          className={styles.servicesGrid}
          variants={gridStagger}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: "-50px" }}
        >
          {services.map((service, index) => (
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
                {service.icon}
              </motion.div>
              <h3 className={styles.serviceTitle}>{service.title}</h3>
              <p className={styles.serviceDescription}>{service.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          className={styles.ctaContainer}
          {...scrollReveal}
        >
          <MagneticButton href="/contact" className={styles.ctaButton}>
            See our Work
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
