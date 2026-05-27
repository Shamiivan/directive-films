import styles from "@/cms/admin.module.css";

export function meta() {
  return [{ title: "Team · Admin · DirectiveFilms" }];
}

export default function AdminTeam() {
  return (
    <div>
      <header className={styles.pageHeader}>
        <div className={styles.pageEyebrow}>Collection</div>
        <h1 className={styles.pageTitle}>Team</h1>
        <p className={styles.pageSubtitle}>The people behind the work.</p>
      </header>

      <div className={styles.listToolbar}>
        <input className={styles.listSearch} placeholder="Search team…" />
        <button type="button" className={`${styles.actionBtn} ${styles.primary}`}>+ Add member</button>
      </div>

      <div className={styles.empty}>
        <div className={styles.emptyTitle}>No team members yet</div>
        <div className={styles.emptyText}>Add the people who make this studio what it is.</div>
      </div>
    </div>
  );
}
