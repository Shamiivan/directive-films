import { Link, useParams } from "react-router";
import { publicPathForPageSlug } from "@/cms/pageRoute";
import type { PageSlug } from "@/cms/types";
import styles from "@/cms/admin.module.css";

export function meta() {
  return [{ title: "Edit page · Admin · DirectiveFilms" }];
}

export default function AdminPageEditor() {
  const { slug } = useParams();
  const pageSlug = (slug ?? "home") as PageSlug;
  const title = (slug ?? "home").charAt(0).toUpperCase() + (slug ?? "home").slice(1);
  const previewPath = `${publicPathForPageSlug(pageSlug)}?edit=1`;

  return (
    <div>
      <header className={styles.pageHeader}>
        <div className={styles.pageEyebrow}>
          <Link to="/admin/pages" style={{ color: "inherit" }}>← All pages</Link>
        </div>
        <h1 className={styles.pageTitle}>{title}</h1>
        <p className={styles.pageSubtitle}>
          Edit the real page inside the live preview. Changes write to the same Convex-backed content the public site renders.
        </p>
      </header>

      <div className={styles.previewNote}>
        The preview is the actual page route in edit mode. Use the floating locale toggle and publish bar inside the canvas.
      </div>

      <div className={styles.previewFrame}>
        <iframe
          title={`${title} preview`}
          src={previewPath}
          className={styles.previewIframe}
        />
      </div>

      <div className={styles.actionRow} style={{ marginTop: 20 }}>
        <Link to={previewPath} className={`${styles.actionBtn} ${styles.primary}`} target="_blank" rel="noreferrer">
          Open standalone preview
        </Link>
        <Link to={publicPathForPageSlug(pageSlug)} className={styles.actionBtn} target="_blank" rel="noreferrer">
          Open published page
        </Link>
      </div>
    </div>
  );
}
