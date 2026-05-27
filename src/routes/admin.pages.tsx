import { Link } from "react-router";
import { useQuery } from "convex/react";

import { api } from "../../convex/_generated/api";
import { isConvexConfigured } from "@/cms/convex";
import styles from "@/cms/admin.module.css";

export function meta() {
  return [{ title: "Pages · Admin · DirectiveFilms" }];
}

const STATUS_COPY = {
  live: { className: "live", label: "Live" },
  draft: { className: "draft", label: "Has draft" },
  neverPublished: { className: "neverPublished", label: "Never published" },
} as const;

export default function AdminPages() {
  const pages = useQuery(isConvexConfigured ? api.cms.listPagesDraft : (null as any), isConvexConfigured ? {} : "skip");
  const pageCards = pages ?? [];

  return (
    <div>
      <header className={styles.pageHeader}>
        <div className={styles.pageEyebrow}>Content</div>
        <h1 className={styles.pageTitle}>Pages</h1>
        <p className={styles.pageSubtitle}>The five pages that make up your site.</p>
      </header>

      <div className={styles.cardGrid}>
        {pageCards.map((page: any) => {
          const hasDraft = JSON.stringify(page.draft) !== JSON.stringify(page.published);
          const status = STATUS_COPY[hasDraft ? "draft" : "live"];
          const description = page.draft?.resource?.en?.hero?.subtitle
            ?? page.draft?.resource?.en?.hero?.description
            ?? "Page content in Convex";
          return (
            <Link key={page.slug} to={`/admin/pages/${page.slug}`} className={styles.itemCard}>
              <div className={styles.itemThumb} />
              <div className={styles.itemBody}>
                <div className={styles.itemTitle}>{page.title}</div>
                <div className={styles.itemSub}>/{page.slug}</div>
                <div className={styles.emptyText} style={{ marginTop: 8 }}>{description}</div>
                <div style={{ marginTop: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span className={`${styles.statusBadge} ${styles[status.className]}`}>{status.label}</span>
                  <span className={styles.activityTime}>{new Date(page.updatedAt).toLocaleDateString()}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
