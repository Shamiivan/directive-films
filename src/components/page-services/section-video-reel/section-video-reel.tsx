import styles from './section-video-reel.module.css';

export default function VideoReelSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <img
          src="/images/website_landing_bg.jpg"
          alt=""
          className={styles.bg}
        />
        <div className={styles.overlay}>
          <p className={styles.stat}>$50M+</p>
          <h2 className={styles.headline}>
            Generated for our clients through the systems we built.
          </h2>
        </div>
      </div>
    </section>
  );
}
