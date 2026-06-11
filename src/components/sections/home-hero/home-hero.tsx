import { motion, useReducedMotion } from "framer-motion";
import CtaButton from "@/components/shared/cta-button/cta-button";
import { easings } from "@/utils/animations";
import styles from "./home-hero.module.css";

export default function HomeHeroSection() {
  const reduce = useReducedMotion();

  // Staggered entrance for the hero content. When the user prefers reduced
  // motion we collapse the offset/blur so everything simply fades in place.
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
        {/* TODO(asset): replace with real client showreel montage (full-bleed
            muted autoplay reel of actual client work). Reusing the existing
            background clip until the real reel is delivered. */}
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="https://c.animaapp.com/mq5pf53jFiTmD6/assets/Screenshot_2025-07-21_at_10.32.15_PM_1-min.jpg"
        >
          <source type="video/mp4" src="https://benjyfilms.b-cdn.net/video website background.mp4" />
        </video>
        <div className={styles.scrim} />
      </div>

      <motion.div
        className={styles.content}
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div className={styles.tags} variants={item}>
          <span>10 years · 430+ businesses · $100M+ generated</span>
        </motion.div>
        <motion.h1 className={styles.title} variants={item}>
          Driven By Purpose.
          <br />
          Defined By Excellence.
        </motion.h1>
        <motion.p className={styles.lede} variants={item}>
          Video, ads, AI and closers — wired into one engine that brings you customers. 430+
          businesses, $100M+ generated, 10 years.
        </motion.p>
        <motion.div className={styles.actions} variants={item}>
          <CtaButton href="/audit">Get your free growth audit</CtaButton>
        </motion.div>
      </motion.div>
    </section>
  );
}
