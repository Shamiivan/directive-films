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
        poster="/images/cta-broll-pexels-poster.jpg"
      >
        <source type="video/mp4" src="/videos/cta-broll-pexels.mp4" />
      </video>
      <div className={styles.inner}>
        <h2 className={styles.title}>
          Grow your <em>business revenue</em> now
        </h2>
        <CtaButton to="/audit">Get your free growth audit</CtaButton>
      </div>
    </section>
  );
}
