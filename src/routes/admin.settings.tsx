import styles from "@/cms/admin.module.css";

export function meta() {
  return [{ title: "Site Settings · Admin · DirectiveFilms" }];
}

export default function AdminSettings() {
  return (
    <div>
      <header className={styles.pageHeader}>
        <div className={styles.pageEyebrow}>System</div>
        <h1 className={styles.pageTitle}>Site Settings</h1>
        <p className={styles.pageSubtitle}>Global values used across every page.</p>
      </header>

      <div className={styles.empty}>
        <div className={styles.emptyTitle}>Settings form coming next</div>
        <div className={styles.emptyText}>
          Brand name, contact email, phone, bilingual address, social links — all in one place.
        </div>
      </div>
    </div>
  );
}
