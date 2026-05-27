import { useCallback, useRef, useState, type ChangeEvent } from "react";
import { useMutation } from "convex/react";

import { api } from "../../convex/_generated/api";
import { convexClient, isConvexConfigured } from "./convex";
import { useEditableTranslationField } from "./EditableTranslation";
import type { PageSlug } from "./types";
import styles from "./PanelField.module.css";

type CommonProps = {
  pageSlug: PageSlug;
  namespace: string;
  path: string;
  label: string;
};

export function PanelTextField({ pageSlug, namespace, path, label }: CommonProps) {
  const field = useEditableTranslationField({ pageSlug, namespace, path });
  const [draft, setDraft] = useState<string | null>(null);

  const current = draft ?? field.value;

  return (
    <label className={styles.field}>
      <span className={styles.label}>{label}</span>
      <input
        type="text"
        className={styles.input}
        value={current}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={() => {
          if (draft !== null && draft !== field.value) {
            field.onCommit(draft);
          }
          setDraft(null);
        }}
      />
    </label>
  );
}

export function PanelTextareaField({ pageSlug, namespace, path, label }: CommonProps) {
  const field = useEditableTranslationField({ pageSlug, namespace, path });
  const [draft, setDraft] = useState<string | null>(null);

  const current = draft ?? field.value;

  return (
    <label className={styles.field}>
      <span className={styles.label}>{label}</span>
      <textarea
        className={styles.textarea}
        value={current}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={() => {
          if (draft !== null && draft !== field.value) {
            field.onCommit(draft);
          }
          setDraft(null);
        }}
      />
    </label>
  );
}

export function PanelImageField({ pageSlug, namespace, path, label }: CommonProps) {
  const field = useEditableTranslationField({ pageSlug, namespace, path });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const generateUploadUrl = isConvexConfigured ? useMutation(api.files.generateUploadUrl) : null;

  const onPick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const onChange = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      setError(null);

      if (!generateUploadUrl || !convexClient) {
        setError("Convex not configured");
        return;
      }

      setUploading(true);
      try {
        const uploadUrl = await generateUploadUrl({});
        const resp = await fetch(uploadUrl, {
          method: "POST",
          headers: { "Content-Type": file.type },
          body: file,
        });
        if (!resp.ok) throw new Error(`Upload failed: ${resp.status}`);
        const { storageId } = (await resp.json()) as { storageId: string };
        const url = await convexClient.query(api.files.getFileUrl, { storageId: storageId as any });
        if (!url) throw new Error("Could not resolve upload URL");
        await field.onCommit(url);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setUploading(false);
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    },
    [field, generateUploadUrl],
  );

  const hasImage = Boolean(field.value && field.value.length > 0);

  return (
    <div className={styles.field}>
      <span className={styles.label}>{label}</span>
      <button
        type="button"
        className={styles.imageButton}
        onClick={onPick}
        aria-label={hasImage ? `Replace ${label.toLowerCase()}` : `Add ${label.toLowerCase()}`}
        disabled={uploading}
      >
        {hasImage ? (
          <img src={field.value} alt="" className={styles.imagePreview} />
        ) : (
          <span className={styles.imagePlaceholder}>
            {uploading ? "Uploading…" : "Click to replace"}
          </span>
        )}
        {hasImage && (
          <span className={styles.imageOverlay}>
            {uploading ? "Uploading…" : "Click to replace"}
          </span>
        )}
      </button>
      {error && <span className={styles.error}>{error}</span>}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={onChange}
        style={{ display: "none" }}
      />
    </div>
  );
}
