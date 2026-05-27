import styles from "@/cms/admin.module.css";

export function meta() {
  return [{ title: "Services · Admin · DirectiveFilms" }];
}

export default function AdminServices() {
  return (
    <div>
      <header className={styles.pageHeader}>
        <div className={styles.pageEyebrow}>Collection</div>
        <h1 className={styles.pageTitle}>Services</h1>
        <p className={styles.pageSubtitle}>What you sell. Reusable across pages.</p>
      </header>

      <div className={styles.listToolbar}>
        <input className={styles.listSearch} placeholder="Search services…" />
        <button type="button" className={`${styles.actionBtn} ${styles.primary}`}>+ New service</button>
      </div>

      <div className={styles.empty}>
        <div className={styles.emptyTitle}>No services yet</div>
        <div className={styles.emptyText}>
          Audit, Coach, Create, Optimize, Build — add each as its own service so you can reuse them across the site.
        </div>
      </div>
    </div>
  );
}
