import styles from "./coming-soon-page.module.css";

export default function ComingSoonPage() {
  return (
    <main className={styles.root}>
      <div className={styles.inner}>
        <img
          src="/logos/logo-icon.svg"
          alt="DirectiveFilms"
          className={styles.logo}
        />

        <div className={styles.label}>Coming Soon</div>

        <h1 className={styles.heading}>
          Stories that <em>move</em> people.
        </h1>

        <p className={styles.sub}>
          We're putting the finishing touches on something great.
          <br />
          In the meantime, reach us at{" "}
          <a href="mailto:hello@directivefilms.com" className={styles.email}>
            hello@directivefilms.com
          </a>
        </p>
      </div>

      <div className={styles.grain} aria-hidden />
    </main>
  );
}
