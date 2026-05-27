import { useParams } from "react-router";
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
    <div className={styles.editorFullscreen}>
      <iframe
        title={`${title} preview`}
        src={previewPath}
        className={styles.editorIframe}
      />
    </div>
  );
}
