import styles from './section-how-we-do-it.module.css';

export default function HowWeDoItSection() {
  return (
    <section className={styles.section}>
      <div className={styles.wrap}>
        <span className={styles.eyebrow}>How it works</span>
        <h2 className={styles.heading}>Three steps. No jargon.</h2>

        <div className={styles.steps}>
          <div className={styles.step}>
            <div className={styles.num}>01</div>
            <h3>We find the leak</h3>
            <p>We go through your content, funnel and sales process and show you exactly where you're losing money. No fluff, no 40-slide deck.</p>
          </div>
          <div className={styles.step}>
            <div className={styles.num}>02</div>
            <h3>We plug it</h3>
            <p>Video, website, CRM, AI and ads — built and wired together so each one feeds the next instead of sitting in its own silo.</p>
          </div>
          <div className={styles.step}>
            <div className={styles.num}>03</div>
            <h3>You watch it pay off</h3>
            <p>Dashboards that show pipeline and revenue, not likes. And a sales team that turns the leads into signed deals.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
