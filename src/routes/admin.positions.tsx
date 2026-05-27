import styles from "@/cms/admin.module.css";

export function meta() {
  return [{ title: "Open Positions · Admin · DirectiveFilms" }];
}

export default function AdminPositions() {
  return (
    <div>
      <header className={styles.pageHeader}>
        <div className={styles.pageEyebrow}>Collection</div>
        <h1 className={styles.pageTitle}>Open Positions</h1>
        <p className={styles.pageSubtitle}>Roles you're hiring for, shown on Careers.</p>
      </header>

      <div className={styles.listToolbar}>
        <input className={styles.listSearch} placeholder="Search positions…" />
        <button type="button" className={`${styles.actionBtn} ${styles.primary}`}>+ Open a position</button>
      </div>

      <div className={styles.empty}>
        <div className={styles.emptyTitle}>No open positions</div>
        <div className={styles.emptyText}>Open a position to start collecting applications.</div>
      </div>
    </div>
  );
}
