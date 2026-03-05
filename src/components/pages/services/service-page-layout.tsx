import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { scrollReveal, gridStagger } from '@/utils/animations';
import MagneticButton from '@/components/MagneticButton';
import NavSection from '@/components/page-shared/section-nav/section-nav';
import FooterSection from '@/components/page-shared/section-footer/section-footer';
import styles from './service-page-layout.module.css';

interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

interface GalleryItem {
  title: string;
  category: string;
  image: string;
  color: string;
}

interface ProofItem {
  icon: string;
  title: string;
  stat: string;
  statLabel: string;
  description: string;
}

interface ServicePageProps {
  eyebrow: string;
  title: string;
  titleHighlight: string;
  heroImage?: string;
  subtitle: string;
  ctaLabel: string;
  problemTitle: string;
  problemText: string;
  solutionTitle: string;
  solutionText: string;
  process: ProcessStep[];
  proofTitle?: string;
  proofTitleHighlight?: string;
  proofSubtitle?: string;
  proofItems?: ProofItem[];
  gallery?: GalleryItem[];
}

export default function ServicePageLayout({
  eyebrow,
  title,
  titleHighlight,
  heroImage,
  subtitle,
  ctaLabel,
  problemTitle,
  problemText,
  solutionTitle,
  solutionText,
  process,
  proofTitle,
  proofTitleHighlight,
  proofSubtitle,
  proofItems,
  gallery,
}: ServicePageProps) {
  const sectionRef = useRef(null);
  const gallerySectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: gallerySectionRef,
    offset: ["start end", "end start"]
  });

  const galleryX = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);

  return (
    <div className={styles.page}>
      <NavSection />

      {/* Hero — matching About Us hero */}
      <section
        className={styles.heroSection}
        style={heroImage ? { backgroundImage: `url('${heroImage}')` } : undefined}
      >
        <div className={styles.overlay} />
        <div className={styles.heroContainer}>
          <motion.div
            className={styles.heroContent}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h1 className={styles.heroEyebrow}>{eyebrow}</h1>
            <h2 className={styles.heroTitle}>
              {title} <span className={styles.heroHighlight}>{titleHighlight}</span>
            </h2>
            <p className={styles.heroDescription}>{subtitle}</p>
            <motion.div
              className={styles.ctaWrapper}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <MagneticButton href="/contact" className={styles.heroCtaButton}>
                {ctaLabel}
              </MagneticButton>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Work Gallery — horizontal scroll with parallax */}
      {gallery && gallery.length > 0 && (
        <section className={styles.gallerySection} ref={gallerySectionRef}>
          <div className={styles.galleryContainer}>
            <motion.div className={styles.galleryHeader} {...scrollReveal}>
              <h2 className={styles.sectionTitle}>Our Work</h2>
              <p className={styles.sectionSubtitle}>
                High-impact creative that drives measurable business results
              </p>
            </motion.div>

            <div className={styles.scrollContainer}>
              <motion.div className={styles.gallery} style={{ x: galleryX }}>
                {gallery.map((item, index) => (
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
                      <div className={styles.imageOverlay}>
                        <span className={styles.imageCategory} style={{ color: item.color }}>
                          {item.category}
                        </span>
                        <h3 className={styles.imageTitle}>{item.title}</h3>
                        <button className={styles.viewButton}>View Project →</button>
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
      )}

      {/* Problem & Solution — split layout with sticky left */}
      <section className={styles.section} ref={sectionRef}>
        <div className={styles.container}>
          <div className={styles.splitLayout}>
            <div className={styles.leftSticky}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span className={styles.badge}>The Challenge</span>
                <h2 className={styles.sectionTitle}>{problemTitle}</h2>
                <p className={styles.sectionSubtitle}>{problemText}</p>
              </motion.div>
            </div>
            <div className={styles.rightContent}>
              <motion.div
                className={styles.solutionCard}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
                whileHover={{
                  scale: 1.02,
                  borderColor: '#3b82f6',
                  boxShadow: '0 0 30px rgba(59, 130, 246, 0.4)',
                }}
              >
                <span className={styles.cardLabel}>The Solution</span>
                <h3 className={styles.cardTitle}>{solutionTitle}</h3>
                <p className={styles.cardDescription}>{solutionText}</p>
                <div className={styles.arrow}>
                  <ArrowRight size={24} strokeWidth={2} color="#666" />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Process — grid cards with icons, arrows, and white CTA card */}
      <section className={`${styles.section} ${styles.sectionDark}`}>
        <div className={styles.container}>
          <motion.div className={styles.header} {...scrollReveal}>
            <h2 className={styles.sectionTitle}>Our Process</h2>
            <p className={styles.sectionSubtitle}>
              A proven approach from discovery to results
            </p>
          </motion.div>

          <motion.div
            className={styles.processGrid}
            variants={gridStagger}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-50px" }}
          >
            {process.map((step, index) => (
              <motion.div
                key={index}
                className={styles.processCard}
                variants={scrollReveal}
                whileHover={{
                  scale: 1.02,
                  borderColor: '#3b82f6',
                  boxShadow: '0 0 30px rgba(59, 130, 246, 0.4)',
                }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <span className={styles.processNumber}>{step.number}</span>
                <h3 className={styles.processStepTitle}>{step.title}</h3>
                <p className={styles.processDescription}>{step.description}</p>
                <div className={styles.arrow}>
                  <ArrowRight size={24} strokeWidth={2} color="#666" />
                </div>
              </motion.div>
            ))}

            {/* White CTA card */}
            <motion.div
              className={styles.ctaCard}
              variants={scrollReveal}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <p className={styles.ctaCardText}>
                Ready to <span className={styles.ctaCardHighlight}>get started</span>?
              </p>
              <MagneticButton href="/contact" className={styles.ctaButton}>
                {ctaLabel}
              </MagneticButton>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* What You Get — split layout with sticky left, scrolling items right */}
      {proofTitle && proofItems && (
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.splitLayout}>
              {/* Left sticky */}
              <div className={styles.leftSticky}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <span className={styles.badge}>What You Get</span>
                  <h2 className={styles.sectionTitle}>
                    {proofTitle}{' '}
                    {proofTitleHighlight && (
                      <span className={styles.italic}>{proofTitleHighlight}</span>
                    )}
                  </h2>
                  {proofSubtitle && (
                    <p className={styles.sectionSubtitle}>{proofSubtitle}</p>
                  )}
                  <div className={styles.ctaWrapper} style={{ marginTop: '2.5rem' }}>
                    <MagneticButton href="/contact" className={styles.heroCtaButton}>
                      {ctaLabel}
                    </MagneticButton>
                  </div>
                </motion.div>
              </div>

              {/* Right scrolling items */}
              <div className={styles.proofScrolling}>
                {proofItems.map((item, i) => (
                  <motion.div
                    key={i}
                    className={styles.proofReasonItem}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <div className={styles.proofReasonIcon}>
                      <span dangerouslySetInnerHTML={{ __html: item.icon }} />
                    </div>
                    <h3 className={styles.proofReasonTitle}>{item.title}</h3>
                    <div className={styles.proofStatBox}>
                      <div className={styles.proofStatValue}>{item.stat}</div>
                      <div className={styles.proofStatLabel}>{item.statLabel}</div>
                    </div>
                    <p className={styles.proofReasonDesc}>{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA — gradient bg with gold glow */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaSectionGlow} />
        <div className={styles.container}>
          <motion.div className={styles.ctaSectionContent} {...scrollReveal}>
            <h2 className={styles.ctaSectionTitle}>
              Ready to Drive <span className={styles.ctaSectionHighlight}>Real Growth</span>?
            </h2>
            <p className={styles.ctaSectionSubtitle}>
              Book a free strategy call and let's figure out exactly what your business needs.
            </p>
            <MagneticButton href="/contact" className={styles.ctaButton}>
              {ctaLabel}
            </MagneticButton>
          </motion.div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}
