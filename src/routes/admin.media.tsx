import styles from "@/cms/admin.module.css";

export function meta() {
  return [{ title: "Media · Admin · DirectiveFilms" }];
}

export default function AdminMedia() {
  return (
    <div>
      <header className={styles.pageHeader}>
        <div className={styles.pageEyebrow}>System</div>
        <h1 className={styles.pageTitle}>Media</h1>
        <p className={styles.pageSubtitle}>Every image used anywhere on the site.</p>
      </header>

      <div className={styles.listToolbar}>
        <input className={styles.listSearch} placeholder="Search media…" />
        <button type="button" className={`${styles.actionBtn} ${styles.primary}`}>↑ Upload</button>
      </div>

      <div className={styles.empty}>
        <div className={styles.emptyTitle}>No media yet</div>
        <div className={styles.emptyText}>
          Upload images to use as project covers, team headshots, page imagery. Drag-drop, batch upload, alt text on every file.
        </div>
      </div>
    </div>
  );
}
