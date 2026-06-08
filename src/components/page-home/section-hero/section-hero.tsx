import { Link } from 'react-router';
import { useLocalePath } from '../../../hooks/useLocalePath';
import styles from './section-hero.module.css';

export default function HeroSection() {
  const l = useLocalePath();

  return (
    <section className={styles.hero}>
      {/* Animated background (stand-in; swap for <video> when showreel is ready) */}
      <div className={styles.herobg}>
        <div className={`${styles.hbLayer} ${styles.hb1}`} />
        <div className={`${styles.hbLayer} ${styles.hb2}`} />
        <div className={styles.hbSweep} />
        <div className={styles.hbBokeh}>
          <span /><span /><span /><span /><span /><span />
        </div>
      </div>
      <div className={styles.heroveil} />
      <div className={styles.grain} />

      <div className={styles.wrap}>
        <div className={styles.heroflex}>
          {/* Left — copy */}
          <div>
            <span className={styles.eyebrow}>10 years · 430+ businesses · $100M+ generated</span>
            <h1 className={styles.heroTitle}>
              Driven By Purpose.<br />
              <span className={styles.exSerif}>Defined</span> By Excellence.
            </h1>
            <p className={styles.lead}>
              Video, ads, AI and closers — wired into one engine that brings you customers.{' '}
              <b className={styles.gold}>430+ businesses, $100M+ generated, 10 years.</b>
            </p>
            <div className={styles.herocta}>
              <Link to={l('/contact')} className={styles.btn}>Book a call →</Link>
              <a className={styles.btnGhost} href="#work">▶&nbsp;&nbsp;Watch the reel</a>
            </div>
          </div>

          {/* Right — stats */}
          <div className={styles.herometa}>
            <div className={styles.statline}>
              <div>
                <div className={styles.statN}><span className={styles.gold}>430+</span></div>
                <div className={styles.statL}>Businesses served</div>
              </div>
              <div>
                <div className={styles.statN}>10<span className={styles.gold}>yrs</span></div>
                <div className={styles.statL}>In the trenches</div>
              </div>
            </div>
            <div className={styles.statlineNoBorder}>
              <div>
                <div className={styles.statN}>$100M<span className={styles.gold}>+</span></div>
                <div className={styles.statL}>Revenue generated for clients</div>
              </div>
              <div>
                <div className={styles.statN}>70</div>
                <div className={styles.statL}>People on the team</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
