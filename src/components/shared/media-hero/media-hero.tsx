import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import CtaButton from "@/components/shared/cta-button/cta-button";
import { easings } from "@/utils/animations";
import styles from "./media-hero.module.css";

const DEFAULT_POSTER =
  "/images/website_landing_bg.jpg";
const DEFAULT_VIDEO = "/showcase_reel-hero-1080.mp4";
const DEFAULT_MOBILE_VIDEO = "/showcase_reel-hero-720.mp4";

type MediaHeroProps = {
  eyebrow?: ReactNode;
  title: ReactNode;
  lede: ReactNode;
  ctaHref: string;
  ctaLabel: string;
  poster?: string;
  videoSrc?: string;
  mobileVideoSrc?: string;
};

/**
 * Shared full-bleed showreel hero. Used by the home and services pages so both
 * landing heroes have identical design; only the copy/CTA differ.
 */
export default function MediaHero({
  title,
  lede,
  ctaHref,
  ctaLabel,
  poster = DEFAULT_POSTER,
  videoSrc = DEFAULT_VIDEO,
  mobileVideoSrc = DEFAULT_MOBILE_VIDEO,
}: MediaHeroProps) {
  const reduce = useReducedMotion();

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduce ? 0 : 0.12,
        delayChildren: reduce ? 0 : 0.15,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: reduce ? 0 : 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: easings.premium as never },
    },
  };

  return (
    <section className={styles.hero}>
      <div className={styles.media} aria-hidden="true">
        {reduce ? (
          <img src={poster} alt="" />
        ) : (
          <video autoPlay muted loop playsInline preload="metadata" poster={poster}>
            <source
              media="(max-width: 767px)"
              type="video/mp4"
              src={mobileVideoSrc}
            />
            <source type="video/mp4" src={videoSrc} />
          </video>
        )}
        <div className={styles.scrim} />
      </div>

      <motion.div
        className={styles.content}
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.h1 className={styles.title} variants={item}>
          {title}
        </motion.h1>
        <motion.p className={styles.lede} variants={item}>
          {lede}
        </motion.p>
        <motion.div className={styles.actions} variants={item}>
          <CtaButton to={ctaHref}>{ctaLabel}</CtaButton>
        </motion.div>
      </motion.div>
    </section>
  );
}
