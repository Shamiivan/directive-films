import styles from './section-video-reel.module.css';

export default function VideoReelSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <video
          className={styles.video}
          src="/showcase_reel.mp4"
          autoPlay
          muted
          loop
          playsInline
        />

      </div>
    </section>
  );
}
