import styles from './section-careers-hero.module.css';

export default function CareersHeroSection() {
  return (
    <section className={styles.banner}>
      <div className={styles.wrap}>
        <span className={styles.eyebrow}>Careers</span>
        <h1 className={styles.heading}>
          Get paid for<br />
          what you <span className={styles.serifIt}>close.</span>
        </h1>
        <p className={styles.lead}>
          We're hiring closers, creators and engineers. Sales gets base <em>or</em> commission — whichever pays you more. You never lose on a slow month, and you're never capped on a great one.
        </p>
        <div className={styles.ctarow}>
          <a href="#apply" className={styles.btn}>Apply now →</a>
        </div>
      </div>
    </section>
  );
}
