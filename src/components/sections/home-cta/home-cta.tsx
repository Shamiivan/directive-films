import CtaButton from "@/components/shared/cta-button/cta-button";
import styles from "./home-cta.module.css";

export default function HomeCtaSection({ id = "contact" }: { id?: string } = {}) {
  return (
    <section className={styles.cta} id={id}>
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="https://c.animaapp.com/mq5pf53jFiTmD6/assets/Screenshot_2025-07-21_at_10.40.10_PM_1-min.jpg"
      >
        <source type="video/mp4" src="https://benjyfilms.b-cdn.net/wingsuit - end 30.mp4" />
      </video>
      <div className={styles.inner}>
        <h2 className={styles.title}>
          Grow your <em>business revenue</em> now
        </h2>
        <CtaButton href="/audit">Get your free growth audit</CtaButton>
      </div>
    </section>
  );
}
