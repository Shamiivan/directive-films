import { Link } from 'react-router';
import { useLocalePath } from '../../../hooks/useLocalePath';
import styles from './section-cta.module.css';

export default function ServicesCta() {
  const l = useLocalePath();

  return (
    <section className={styles.bigcta}>
      <div className={styles.wrap}>
        <h2 className={styles.heading}>Don't know where to start?</h2>
        <p className={styles.lead}>
          Tell us the goal. After 430+ businesses, we can usually spot the fastest path to revenue on the first call.
        </p>
        <div className={styles.ctarow}>
          <Link to={l('/contact')} className={styles.btn}>Let's talk</Link>
        </div>
      </div>
    </section>
  );
}
