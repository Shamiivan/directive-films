import styles from './section-about-hero.module.css';

export default function AboutHeroSection() {
  return (
    <section className={styles.banner}>
      <div className={styles.wrap}>
        <span className={styles.eyebrow}>Meet the team</span>
        <h1 className={styles.heading}>
          The people behind<br />
          the <span className={styles.serifIt}>results.</span>
        </h1>
        <p className={styles.lead}>
          Seventy of us — shooters, editors, marketers, engineers and closers — who've spent a decade getting good at one thing: growing your business.
        </p>
      </div>
    </section>
  );
}
