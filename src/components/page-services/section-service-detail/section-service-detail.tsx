import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import MagneticButton from '@/components/MagneticButton';
import { scrollReveal } from '@/utils/animations';
import type { ServiceData } from '../services-data';
import styles from './section-service-detail.module.css';

interface Props {
  service: ServiceData;
  index: number;
}

export default function ServiceDetailSection({ service, index }: Props) {
  const gallerySectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: gallerySectionRef,
    offset: ['start end', 'end start'],
  });
  const galleryX = useTransform(scrollYProgress, [0, 1], ['5%', '-20%']);

  const sectionNumber = String(index + 1).padStart(2, '0');
  const isEven = index % 2 === 0;

  return (
    <section
      id={service.id}
      className={`${styles.section} ${isEven ? styles.sectionAlt : ''}`}
    >
      {/* Gold divider at top */}
      <div className={styles.divider}>
        <span className={styles.dividerLine} />
        <span className={styles.dividerNumber}>{sectionNumber}</span>
        <span className={styles.dividerLine} />
      </div>

      <div className={styles.container}>
        {/* Header — asymmetric with large number */}
        <div className={styles.header}>
          <motion.div
            className={styles.headerNumber}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {sectionNumber}
          </motion.div>
          <motion.div
            className={styles.headerContent}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <span className={styles.eyebrow}>{service.eyebrow}</span>
            <h2 className={styles.title}>
              {service.title}{' '}
              <em className={styles.titleItalic}>{service.titleHighlight}</em>
            </h2>
            <p className={styles.subtitle}>{service.subtitle}</p>
          </motion.div>
        </div>

        {/* Problem / Solution — asymmetric split */}
        <div className={styles.problemSolution}>
          <motion.div
            className={styles.problemBlock}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
          >
            <span className={styles.blockLabel}>The Challenge</span>
            <h3 className={styles.blockTitle}>{service.problemTitle}</h3>
            <p className={styles.blockText}>{service.problemText}</p>
          </motion.div>
          <motion.div
            className={styles.solutionBlock}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <span className={styles.blockLabelGold}>The Solution</span>
            <h3 className={styles.blockTitle}>{service.solutionTitle}</h3>
            <p className={styles.blockText}>{service.solutionText}</p>
          </motion.div>
        </div>

        {/* Process — horizontal timeline */}
        <div className={styles.processSection}>
          <div className={styles.processLine} />
          <div className={styles.processSteps}>
            {service.process.map((step, i) => (
              <motion.div
                key={i}
                className={styles.processStep}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
              >
                <div className={styles.processDot}>
                  <span className={styles.processDotInner} />
                </div>
                <span className={styles.processNum}>{step.number}</span>
                <h4 className={styles.processTitle}>{step.title}</h4>
                <p className={styles.processDesc}>{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Proof stats — editorial large numbers */}
        <div className={styles.proofRow}>
          {service.proofItems.map((item, i) => (
            <motion.div
              key={i}
              className={styles.proofItem}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
            >
              <div className={styles.proofStat}>{item.stat}</div>
              <div className={styles.proofLabel}>{item.statLabel}</div>
              <div className={styles.proofDivider} />
              <h4 className={styles.proofTitle}>{item.title}</h4>
              <p className={styles.proofDesc}>{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mini Gallery — filmstrip style */}
      {service.gallery.length > 0 && (
        <div className={styles.galleryWrapper} ref={gallerySectionRef}>
          <div className={styles.filmStripTop} />
          <div className={styles.scrollContainer}>
            <motion.div className={styles.gallery} style={{ x: galleryX }}>
              {service.gallery.map((item, i) => (
                <motion.div
                  key={i}
                  className={styles.galleryCard}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <div className={styles.galleryImageWrap}>
                    <img
                      src={item.image}
                      alt={item.title}
                      className={styles.galleryImage}
                      loading="lazy"
                    />
                    <div className={styles.galleryMeta}>
                      <span
                        className={styles.galleryCategory}
                        style={{ color: item.color }}
                      >
                        {item.category}
                      </span>
                      <span className={styles.galleryTitle}>{item.title}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
          <div className={styles.filmStripBottom} />
        </div>
      )}

      {/* Section CTA */}
      <div className={styles.container}>
        <motion.div className={styles.sectionCta} {...scrollReveal}>
          <MagneticButton href="/contact" className={styles.ctaButton}>
            {service.ctaLabel}
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
