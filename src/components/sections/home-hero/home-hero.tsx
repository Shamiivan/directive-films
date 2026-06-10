import CtaButton from "@/components/shared/cta-button/cta-button";
import styles from "./home-hero.module.css";

export default function HomeHeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.media}>
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="https://c.animaapp.com/mq5pf53jFiTmD6/assets/Screenshot_2025-07-21_at_10.32.15_PM_1-min.jpg"
        >
          <source type="video/mp4" src="https://benjyfilms.b-cdn.net/video website background.mp4" />
        </video>
      </div>
      <div className={styles.panel}>
        <div className={styles.tags}>
          <span>10 years · 430+ businesses · $100M+ generated</span>
        </div>
        <h1 className={styles.title}>
          Driven By Purpose.
          <br />
          Defined By Excellence.
        </h1>
        <p className={styles.lede}>
          Video, ads, AI and closers — wired into one engine that brings you customers. 430+
          businesses, $100M+ generated, 10 years.
        </p>
        <CtaButton href="#contact">Book a call</CtaButton>
      </div>
    </section>
  );
}
