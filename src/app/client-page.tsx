"use client";

import { useTina, tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { PageQuery } from "../../tina/__generated__/types";
import styles from "./page.module.css";

interface ClientPageProps {
  query: string;
  variables: {
    relativePath: string;
  };
  data: PageQuery;
}

export default function ClientPage(props: ClientPageProps) {
  // useTina hook enables real-time editing
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {/* tinaField adds visual editing indicators */}
        <h1 data-tina-field={tinaField(data.page, "title")}>
          {data.page.title}
        </h1>
        <div className={styles.content} data-tina-field={tinaField(data.page, "body")}>
          <TinaMarkdown content={data.page.body} />
        </div>
        <p className={styles.adminLink}>
          ✏️ <a href="/admin">Edit this page in Tina CMS</a>
        </p>
      </main>
    </div>
  );
}
