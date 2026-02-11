'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { scrollReveal } from '../../../utils/animations';
import styles from './section-work-gallery.module.css';

export default function WorkGallerySection() {
  const sectionRef = useRef(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);

  const workItems = [
    {
      title: 'Tech Startup Launch',
      category: 'Brand Story',
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop',
      color: '#3b82f6'
    },
    {
      title: 'E-commerce Growth',
      category: 'Product Showcase',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
      color: '#8b5cf6'
    },
    {
      title: 'Healthcare Innovation',
      category: 'Explainer Video',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop',
      color: '#10b981'
    },
    {
      title: 'Financial Services',
      category: 'Client Testimonial',
      image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&h=600&fit=crop',
      color: '#f59e0b'
    },
    {
      title: 'Real Estate Agency',
      category: 'Property Tours',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop',
      color: '#ef4444'
    },
    {
      title: 'SaaS Platform',
      category: 'Demo Video',
      image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=600&fit=crop',
      color: '#06b6d4'
    },
    {
      title: 'Manufacturing',
      category: 'Process Video',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&h=600&fit=crop',
      color: '#8b5cf6'
    },
    {
      title: 'Restaurant Chain',
      category: 'Commercial',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop',
      color: '#f59e0b'
    },
  ];

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.container}>
        <motion.div className={styles.header} {...scrollReveal}>
          <h2 className={styles.title}>Our Work</h2>
          <p className={styles.subtitle}>
            High-impact creative that drives measurable business results
          </p>
        </motion.div>

        <div className={styles.scrollContainer}>
          <motion.div
            ref={containerRef}
            className={styles.gallery}
            style={{ x }}
          >
            {workItems.map((item, index) => (
              <motion.div
                key={index}
                className={styles.workCard}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                  boxShadow: `0 20px 60px ${item.color}40`
                }}
              >
                <div className={styles.imageContainer}>
                  <motion.img
                    src={item.image}
                    alt={item.title}
                    className={styles.image}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className={styles.overlay}>
                    <motion.div
                      className={styles.overlayContent}
                      initial={{ opacity: 0, y: 20 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className={styles.category} style={{ color: item.color }}>
                        {item.category}
                      </span>
                      <h3 className={styles.workTitle}>{item.title}</h3>
                      <button className={styles.viewButton}>View Project →</button>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div className={styles.scrollHint} {...scrollReveal}>
          <span>Scroll to explore →</span>
        </motion.div>
      </div>
    </section>
  );
}
