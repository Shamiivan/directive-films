import { Link } from 'react-router';
import { useLocalePath } from '../../../hooks/useLocalePath';
import styles from './section-cta.module.css';

export default function CtaSection() {
  const l = useLocalePath();

  return (
    <section className={styles.bigcta} id="work">
      <div className={styles.wrap}>
        <h2 className={styles.heading}>
          Curious what we'd<br />fix <span className={styles.serifIt}>first?</span>
        </h2>
        <p className={styles.lead}>
          The first call is free and straight-talking. If we're not the right fit, we'll say so — and tell you who is.
        </p>
        <div className={styles.ctarow}>
          <Link to={l('/contact')} className={styles.btn}>Book a call</Link>
          <Link to={l('/services')} className={styles.btnGhost}>See what we do</Link>
        </div>
      </div>
    </section>
  );
}
