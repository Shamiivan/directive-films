import { useEffect, type ReactNode } from "react";

import styles from "./CardEditPanel.module.css";

type Props = {
  open: boolean;
  onClose: () => void;
  eyebrow: string;
  title: string;
  children: ReactNode;
};

export function CardEditPanel({ open, onClose, eyebrow, title, children }: Props) {
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  return (
    <>
      <div
        className={styles.overlay}
        data-open={open ? "true" : "false"}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className={styles.panel}
        data-open={open ? "true" : "false"}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <header className={styles.header}>
          <div>
            <div className={styles.eyebrow}>{eyebrow}</div>
            <div className={styles.title}>{title}</div>
          </div>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close panel"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </header>
        <div className={styles.fields}>{children}</div>
      </aside>
    </>
  );
}
