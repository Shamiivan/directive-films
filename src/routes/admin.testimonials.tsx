import styles from "@/cms/admin.module.css";

export function meta() {
  return [{ title: "Testimonials · Admin · DirectiveFilms" }];
}

export default function AdminTestimonials() {
  return (
    <div>
      <header className={styles.pageHeader}>
        <div className={styles.pageEyebrow}>Collection</div>
        <h1 className={styles.pageTitle}>Testimonials</h1>
        <p className={styles.pageSubtitle}>Social proof, in your clients' words.</p>
      </header>

      <div className={styles.listToolbar}>
        <input className={styles.listSearch} placeholder="Search testimonials…" />
        <button type="button" className={`${styles.actionBtn} ${styles.primary}`}>+ New testimonial</button>
      </div>

      <div className={styles.empty}>
        <div className={styles.emptyTitle}>No testimonials yet</div>
        <div className={styles.emptyText}>Add quotes from happy clients. Each can be reused on Home, About, and Services.</div>
      </div>
    </div>
  );
}
