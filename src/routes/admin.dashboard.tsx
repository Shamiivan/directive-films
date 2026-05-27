import styles from "@/cms/admin.module.css";

export function meta() {
  return [{ title: "Dashboard · Admin · DirectiveFilms" }];
}

export default function AdminDashboard() {
  return (
    <div>
      <header className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Hello</h1>
      </header>
    </div>
  );
}
