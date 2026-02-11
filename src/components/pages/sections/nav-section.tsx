'use client';

import { motion } from 'framer-motion';
import AnimatedNav from '../../AnimatedNav';
import styles from './nav-section.module.css';

export default function NavSection() {
  return (
    <AnimatedNav className={styles.nav}>
      <motion.div
        className={styles.logo}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        <div className={styles.logoIcon}></div>
        <span>DirectiveFilms</span>
      </motion.div>
      <ul className={styles.navList}>
        <li>
          <motion.a
            href="#growth"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            GROWTH
          </motion.a>
        </li>
        <li>
          <motion.a
            href="#about"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            ABOUT US
          </motion.a>
        </li>
        <li>
          <motion.a
            href="#case-studies"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            CASE STUDIES
          </motion.a>
        </li>
        <li>
          <motion.a
            href="#careers"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            CAREERS
          </motion.a>
        </li>
      </ul>
      <motion.button
        className={styles.navBtn}
        whileHover={{ scale: 1.05, backgroundColor: '#fff', color: '#000' }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
      >
        Get Started
      </motion.button>
    </AnimatedNav>
  );
}
