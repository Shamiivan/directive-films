import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useQuery } from 'convex/react';
import MagneticButton from '../../MagneticButton';
import { fadeInUp, fadeInScale } from '../../../utils/animations';
import VideoStrip from './video-strip';
import { api } from '../../../../convex/_generated/api';
import { isConvexConfigured } from '@/cms/convex';
import { useIsEditing } from '@/cms/EditModeProvider';
import { EditableTranslation, EditableTranslationStatic } from '@/cms/EditableTranslation';
import { STATIC_COMPANY_LOGOS } from '@/cms/staticContent';
import styles from './section-hero.module.css';

type DisplayLogo = {
  src: string;
  alt: string;
};

export default function HeroSection() {
  const heroRef = useRef(null);
  const editMode = useIsEditing();
  const cmsLogos = !isConvexConfigured
    ? null
    : useQuery(editMode ? api.cms.listCompanyLogosDraft : api.cms.listPublishedCompanyLogos, {});

  const logos: DisplayLogo[] = cmsLogos && cmsLogos.length > 0
    ? cmsLogos.map((logo: any) => {
        const content = editMode ? logo.draft : logo.content;
        const image = content?.image ?? {};
        return {
          src: image.url || image.src || "",
          alt: image.alt?.en || content?.name || "Company logo",
        };
      }).filter((logo: { src: string }) => Boolean(logo.src))
    : STATIC_COMPANY_LOGOS.map((logo) => ({ src: logo.src, alt: logo.name }));

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  // Scale down hero content as you scroll
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3, 0.5], [1, 0.8, 0.5]);

  return (
    <section className={styles.hero} ref={heroRef}>
      {/* Hero Content */}
      <motion.div
        className={styles.heroContent}
        style={{
          scale: heroScale,
          opacity: heroOpacity,
        }}
      >
        <EditableTranslationStatic pageSlug="home" namespace="home" path="hero.title">
          {({ value, editMode: fieldEditMode }) =>
            fieldEditMode ? (
              <div style={{ width: "100%" }}>
                <EditableTranslation
                  pageSlug="home"
                  namespace="home"
                  path="hero.title"
                  label="Hero headline"
                  kind="text"
                  as="h1"
                  className={styles.heroTitle}
                />
              </div>
            ) : (
              <h1 className={styles.heroTitle}>
                {value.split('\n').map((line, i) => {
                  const firstChar = line.charAt(0);
                  const rest = line.slice(1);
                  return (
                    <span key={i} style={{ display: 'block', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                      <motion.span
                        initial={{ opacity: 0, y: '100%' }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: i * 0.15 + 0.15 }}
                        style={{ display: 'block' }}
                      >
                        <span className={styles.gold}>{firstChar}</span>{rest}
                      </motion.span>
                    </span>
                  );
                })}
              </h1>
            )
          }
        </EditableTranslationStatic>

        <motion.div variants={fadeInUp}>
          <EditableTranslation
            pageSlug="home"
            namespace="home"
            path="hero.subtitle"
            label="Hero subtitle"
            kind="text"
            as="p"
            className={styles.heroSubtitle}
          />
        </motion.div>

        <motion.div variants={fadeInUp}>
          <MagneticButton href="/services" className={styles.ctaButton}>
            <EditableTranslation
              pageSlug="home"
              namespace="home"
              path="hero.cta"
              label="Hero button"
            />
          </MagneticButton>
        </motion.div>

        {/* Main Video Showcase */}
        <motion.div
          className={styles.videoShowcase}
          variants={fadeInScale}
        >
          {/* Scrolling strip behind the video */}
          <VideoStrip />
          <div className={styles.videoFrame}>
            <motion.div
              className={styles.videoContainer}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
            >
              <video
                autoPlay
                loop
                muted
                playsInline
                className={styles.mainVideo}
              >
                <source src="/videos/showreel.mp4" type="video/mp4" />
              </video>
            </motion.div>
          </div>
        </motion.div>

        {/* Brand Logos */}
        <motion.div variants={fadeInUp}>
          <EditableTranslation
            pageSlug="home"
            namespace="home"
            path="hero.workedWith"
            label="Worked with label"
            as="p"
            className={styles.logoContext}
          />
        </motion.div>
        <motion.div
          className={styles.brandLogos}
          variants={fadeInUp}
        >
          {logos.map((logo: DisplayLogo, i: number) => (
            <motion.div
              key={i}
              className={styles.brandLogo}
              whileHover={{ scale: 1.1, opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <img src={logo.src} alt={logo.alt} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
