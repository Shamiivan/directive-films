import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import CtaButton from "@/components/shared/cta-button/cta-button";
import { easings } from "@/utils/animations";
import styles from "./media-hero.module.css";

// TODO(asset): replace with the real client showreel montage.
const DEFAULT_POSTER =
  "https://c.animaapp.com/mq5pf53jFiTmD6/assets/Screenshot_2025-07-21_at_10.32.15_PM_1-min.jpg";
const DEFAULT_VIDEO = "https://benjyfilms.b-cdn.net/video website background.mp4";

type MediaHeroProps = {
  eyebrow?: ReactNode;
  title: ReactNode;
  lede: ReactNode;
  ctaHref: string;
  ctaLabel: string;
  poster?: string;
  videoSrc?: string;
};

/**
 * Shared full-bleed showreel hero. Used by the home and services pages so both
 * landing heroes have identical design; only the copy/CTA differ.
 */
export default function MediaHero({
  eyebrow,
  title,
  lede,
  ctaHref,
  ctaLabel,
  poster = DEFAULT_POSTER,
  videoSrc = DEFAULT_VIDEO,
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
        <video autoPlay muted loop playsInline poster={poster}>
          <source type="video/mp4" src={videoSrc} />
        </video>
        <div className={styles.scrim} />
      </div>

      <motion.div
        className={styles.content}
        variants={container}
        initial="hidden"
        animate="show"
      >
        {eyebrow ? (
          <motion.div className={styles.tags} variants={item}>
            <span>{eyebrow}</span>
          </motion.div>
        ) : null}
        <motion.h1 className={styles.title} variants={item}>
          {title}
        </motion.h1>
        <motion.p className={styles.lede} variants={item}>
          {lede}
        </motion.p>
        <motion.div className={styles.actions} variants={item}>
          <CtaButton href={ctaHref}>{ctaLabel}</CtaButton>
        </motion.div>
      </motion.div>
    </section>
  );
}
