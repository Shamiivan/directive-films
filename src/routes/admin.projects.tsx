import styles from "@/cms/admin.module.css";

export function meta() {
  return [{ title: "Projects · Admin · DirectiveFilms" }];
}

export default function AdminProjects() {
  return (
    <div>
      <header className={styles.pageHeader}>
        <div className={styles.pageEyebrow}>Collection</div>
        <h1 className={styles.pageTitle}>Projects</h1>
        <p className={styles.pageSubtitle}>The work you want the world to see.</p>
      </header>

      <div className={styles.listToolbar}>
        <input className={styles.listSearch} placeholder="Search projects…" />
        <button type="button" className={`${styles.actionBtn} ${styles.primary}`}>+ New project</button>
      </div>

      <div className={styles.empty}>
        <div className={styles.emptyTitle}>No projects yet</div>
        <div className={styles.emptyText}>
          Add your first project to showcase your work. Bilingual fields, cover and gallery images, story, tags.
        </div>
        <button type="button" className={`${styles.actionBtn} ${styles.primary}`}>+ Add a project</button>
      </div>
    </div>
  );
}
