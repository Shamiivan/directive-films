import { useCallback, useEffect, useRef, useState } from "react";

import { useIsEditing } from "./EditModeProvider";
import styles from "./InlineToolbar.module.css";

type ActiveState = {
  bold: boolean;
  italic: boolean;
  underline: boolean;
  link: boolean;
};

const INITIAL_ACTIVE: ActiveState = {
  bold: false,
  italic: false,
  underline: false,
  link: false,
};

function selectionIsInsideEditable(): boolean {
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0 || sel.isCollapsed) return false;
  const anchor = sel.anchorNode;
  if (!anchor) return false;
  const el = anchor.nodeType === Node.ELEMENT_NODE ? (anchor as Element) : anchor.parentElement;
  return Boolean(el?.closest('[contenteditable="true"]'));
}

export function InlineToolbar() {
  const editMode = useIsEditing();
  const toolbarRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);
  const [state, setState] = useState<ActiveState>(INITIAL_ACTIVE);

  const update = useCallback(() => {
    if (!editMode) {
      setActive(false);
      return;
    }
    if (!selectionIsInsideEditable()) {
      setActive(false);
      return;
    }
    const sel = window.getSelection()!;
    const range = sel.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    if (rect.width === 0 && rect.height === 0) {
      setActive(false);
      return;
    }

    const toolbarEl = toolbarRef.current;
    const toolbarW = toolbarEl?.offsetWidth ?? 280;
    const toolbarH = toolbarEl?.offsetHeight ?? 38;

    const top = window.scrollY + rect.top - toolbarH - 8;
    let left = window.scrollX + rect.left + rect.width / 2 - toolbarW / 2;
    left = Math.max(8, Math.min(window.innerWidth - toolbarW - 8, left));

    setPos({ top, left });
    setActive(true);
    setState({
      bold: document.queryCommandState("bold"),
      italic: document.queryCommandState("italic"),
      underline: document.queryCommandState("underline"),
      link: document.queryCommandState("createLink"),
    });
  }, [editMode]);

  useEffect(() => {
    if (!editMode) {
      setActive(false);
      return;
    }
    const handler = () => update();
    document.addEventListener("selectionchange", handler);
    window.addEventListener("scroll", handler, true);
    window.addEventListener("resize", handler);
    return () => {
      document.removeEventListener("selectionchange", handler);
      window.removeEventListener("scroll", handler, true);
      window.removeEventListener("resize", handler);
    };
  }, [editMode, update]);

  const exec = useCallback(
    (cmd: string, value?: string) => {
      document.execCommand(cmd, false, value);
      update();
    },
    [update],
  );

  const onLink = useCallback(() => {
    const url = window.prompt("Link URL");
    if (!url) return;
    exec("createLink", url);
  }, [exec]);

  if (!editMode) return null;

  return (
    <div
      ref={toolbarRef}
      className={styles.toolbar}
      data-active={active ? "true" : "false"}
      role="toolbar"
      aria-label="Text formatting"
      style={pos ? { top: pos.top, left: pos.left } : undefined}
      onMouseDown={(e) => e.preventDefault()}
    >
      <button
        type="button"
        className={styles.btn}
        data-active={state.bold ? "true" : "false"}
        title="Bold (⌘B)"
        onClick={() => exec("bold")}
      >
        <span className={styles.bold}>B</span>
      </button>
      <button
        type="button"
        className={styles.btn}
        data-active={state.italic ? "true" : "false"}
        title="Italic (⌘I)"
        onClick={() => exec("italic")}
      >
        <span className={styles.italic}>I</span>
      </button>
      <button
        type="button"
        className={styles.btn}
        data-active={state.underline ? "true" : "false"}
        title="Underline (⌘U)"
        onClick={() => exec("underline")}
      >
        <span className={styles.underline}>U</span>
      </button>
      <div className={styles.divider} aria-hidden="true" />
      <button
        type="button"
        className={styles.btn}
        title="Link (⌘K)"
        onClick={onLink}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
      </button>
    </div>
  );
}
