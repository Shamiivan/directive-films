import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { services } from '../services-data';
import styles from './sticky-service-nav.module.css';

export default function StickyServiceNav() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const sectionIds = services.map((s) => s.id);
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: '-20% 0px -60% 0px' }
    );

    elements.forEach((el) => observer.observe(el));

    // Show/hide based on scroll past service map
    const handleScroll = () => {
      const firstSection = elements[0];
      if (firstSection) {
        const rect = firstSection.getBoundingClientRect();
        setVisible(rect.top < 200);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          className={styles.nav}
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className={styles.inner}>
            {services.map((service) => (
              <button
                key={service.id}
                className={`${styles.link} ${activeId === service.id ? styles.active : ''}`}
                onClick={() => handleClick(service.id)}
              >
                {service.eyebrow}
              </button>
            ))}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
