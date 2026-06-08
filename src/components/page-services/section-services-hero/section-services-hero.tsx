import styles from './section-services-hero.module.css';

export default function ServicesHeroSection() {
  return (
    <section className={styles.banner}>
      <div className={styles.wrap}>
        <span className={styles.eyebrow}>Services</span>
        <h1 className={styles.heading}>
          Everything that turns<br />
          attention into <span className={styles.serifIt}>revenue.</span>
        </h1>
        <p className={styles.lead}>
          One team, the whole journey — from the first audit to the closed deal. Take a single piece, or hand us the entire machine.
        </p>
      </div>
    </section>
  );
}
