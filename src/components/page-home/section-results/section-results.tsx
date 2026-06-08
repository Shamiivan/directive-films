import styles from './section-results.module.css';

export default function ResultsSection() {
  return (
    <section className={styles.results}>
      <div className={styles.wrap}>
        <div className={styles.sectionH}>
          <span className={styles.eyebrow}>The numbers</span>
          <h2 className={styles.heading}>
            We don't get paid for footage.<br />
            We get paid for <span className={styles.serifIt}>results.</span>
          </h2>
          <p className={styles.lead}>
            Pretty videos are easy. Ten years in, what we're actually measured on is the money
            that lands in your account — so that's what we build for.
          </p>
        </div>

        <div className={styles.metrics}>
          <div className={styles.metric}>
            <div className={styles.big}><span className={styles.gold}>430+</span></div>
            <div className={styles.cap}>Businesses served</div>
            <div className={styles.sub}>B2B and B2C, every industry</div>
          </div>
          <div className={styles.metric}>
            <div className={styles.big}>$100M+</div>
            <div className={styles.cap}>Revenue generated for clients</div>
            <div className={styles.sub}>Tracked, not guessed</div>
          </div>
          <div className={styles.metric}>
            <div className={styles.big}>10 <span className={styles.gold}>yrs</span></div>
            <div className={styles.cap}>Doing only this</div>
            <div className={styles.sub}>A decade, compounded</div>
          </div>
          <div className={styles.metric}>
            <div className={styles.big}>4.2×</div>
            <div className={styles.cap}>Average return on ad spend</div>
            <div className={styles.sub}>Across active campaigns</div>
          </div>
        </div>
      </div>
    </section>
  );
}
