import { useMemo } from "react";
import { useLocation } from "react-router";
import { useMutation, useQuery } from "convex/react";

import { api } from "../../convex/_generated/api";
import { useEditMode } from "./EditModeProvider";
import { isConvexConfigured } from "./convex";
import { pageSlugFromPathname } from "./pageRoute";
import styles from "./chrome.module.css";

type Props = {
  changeCount?: number;
  onPublish?: () => void;
  onDiscard?: () => void;
  status?: string;
};

export function EditorBar({
  changeCount = 0,
  onPublish,
  onDiscard,
  status = "Editing",
}: Props) {
  const { editMode, locale, setLocale } = useEditMode();

  if (!editMode) return null;

  if (!isConvexConfigured) {
    return (
      <EditorBarView
        locale={locale}
        setLocale={setLocale}
        changeCount={changeCount}
        onPublish={onPublish}
        onDiscard={onDiscard}
        status={status}
      />
    );
  }

  return (
    <ConnectedEditorBar
      locale={locale}
      setLocale={setLocale}
      changeCount={changeCount}
      onPublish={onPublish}
      onDiscard={onDiscard}
      status={status}
    />
  );
}

function ConnectedEditorBar({
  locale,
  setLocale,
  changeCount = 0,
  onPublish,
  onDiscard,
  status,
}: {
  locale: "en" | "fr";
  setLocale: (locale: "en" | "fr") => void;
} & Required<Pick<Props, "status">> &
  Omit<Props, "status">) {
  const location = useLocation();
  const pageSlug = useMemo(() => pageSlugFromPathname(location.pathname), [location.pathname]);
  if (!pageSlug) {
    return (
      <EditorBarView
        locale={locale}
        setLocale={setLocale}
        changeCount={changeCount}
        onPublish={onPublish}
        onDiscard={onDiscard}
        status={status}
      />
    );
  }

  const page = useQuery(api.cms.getPageDraft, { slug: pageSlug });
  const publishPage = useMutation(api.cms.publishPage);
  const discardPageDraft = useMutation(api.cms.discardPageDraft);

  const computedChangeCount =
    page && JSON.stringify(page.draft) !== JSON.stringify(page.published) ? 1 : 0;
  const totalChangeCount = changeCount || computedChangeCount;
  const hasChanges = totalChangeCount > 0;
  const effectivePublish = onPublish ?? (() => publishPage({ slug: pageSlug }));
  const effectiveDiscard =
    onDiscard ??
    (async () => {
      await discardPageDraft({ slug: pageSlug });
      if (typeof window !== "undefined") window.location.reload();
    });

  return (
    <EditorBarView
      locale={locale}
      setLocale={setLocale}
      changeCount={totalChangeCount}
      onPublish={effectivePublish}
      onDiscard={effectiveDiscard}
      status={status}
      hasChanges={hasChanges}
    />
  );
}

function EditorBarView({
  locale,
  setLocale,
  changeCount,
  onPublish,
  onDiscard,
  status,
  hasChanges,
}: {
  locale: "en" | "fr";
  setLocale: (locale: "en" | "fr") => void;
  changeCount: number;
  onPublish?: () => void;
  onDiscard?: () => void;
  status: string;
  hasChanges?: boolean;
}) {
  const dirty = hasChanges ?? changeCount > 0;

  return (
    <div
      className={`${styles.pill} ${styles.editorBar} ${styles.enter}`}
      role="toolbar"
      aria-label="Editor actions"
    >
      <div
        className={styles.localeGroup}
        role="radiogroup"
        aria-label="Active locale"
      >
        <button
          type="button"
          role="radio"
          aria-checked={locale === "en"}
          className={`${styles.localeBtn} ${locale === "en" ? styles.active : ""}`}
          onClick={() => setLocale("en")}
        >
          EN
        </button>
        <button
          type="button"
          role="radio"
          aria-checked={locale === "fr"}
          className={`${styles.localeBtn} ${locale === "fr" ? styles.active : ""}`}
          onClick={() => setLocale("fr")}
        >
          FR
        </button>
      </div>

      <div className={styles.divider} aria-hidden="true" />

      <button
        type="button"
        className={styles.btn}
        onClick={onDiscard}
        disabled={!onDiscard || !dirty}
      >
        Discard
      </button>
      <button
        type="button"
        className={`${styles.btn} ${styles.primary}`}
        onClick={onPublish}
        disabled={!onPublish}
        aria-label={dirty ? `Publish ${changeCount} change${changeCount === 1 ? "" : "s"}` : "Publish"}
      >
        {dirty && <span className={styles.badge}>{changeCount}</span>}
        Publish
      </button>
    </div>
  );
}
