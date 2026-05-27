import { createElement, useCallback, useEffect, useRef, useState, type ElementType, type KeyboardEvent, type FocusEvent } from "react";

import { useEditMode } from "./EditModeProvider";
import styles from "./EditableText.module.css";

type EditableTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div" | "label";

type Props = {
  /** Current committed value (from draft doc). */
  value: string;
  /** Called when the user commits a change (blur, Enter for single-line, etc.). */
  onCommit: (next: string) => void;
  /** Uppercase label shown above on hover (e.g. "Headline", "Subhead"). */
  label: string;
  /** Single-line ("string") or multi-line ("text"). Controls Enter behavior. */
  kind?: "string" | "text";
  /** Element tag to render. Defaults to span. */
  as?: EditableTag;
  className?: string;
  /** Shown when value is empty (and not editing). */
  placeholder?: string;
  /** Renders the red "Needs translation" tag on hover. */
  needsTranslation?: boolean;
  /** Renders the pending pulse while a mutation is in flight. */
  pending?: boolean;
};

export function EditableText({
  value,
  onCommit,
  label,
  kind = "string",
  as = "span",
  className,
  placeholder,
  needsTranslation,
  pending,
}: Props) {
  const { editMode } = useEditMode();
  const ref = useRef<HTMLElement | null>(null);
  const [editing, setEditing] = useState(false);
  const originalRef = useRef(value);

  // When the external value changes (e.g. another client edits, or revert), sync DOM if not editing.
  useEffect(() => {
    if (editing) return;
    if (ref.current && ref.current.textContent !== value) {
      ref.current.textContent = value;
    }
  }, [value, editing]);

  const commit = useCallback(() => {
    const next = ref.current?.textContent ?? "";
    if (next !== originalRef.current) {
      onCommit(next);
    }
  }, [onCommit]);

  const cancel = useCallback(() => {
    if (ref.current) {
      ref.current.textContent = originalRef.current;
    }
  }, []);

  const handleClick = useCallback(() => {
    if (!editMode || editing) return;
    originalRef.current = value;
    setEditing(true);
    requestAnimationFrame(() => {
      const el = ref.current;
      if (!el) return;
      el.focus();
      const range = document.createRange();
      range.selectNodeContents(el);
      range.collapse(false);
      const sel = window.getSelection();
      sel?.removeAllRanges();
      sel?.addRange(range);
    });
  }, [editMode, editing, value]);

  const handleBlur = useCallback(
    (_e: FocusEvent<HTMLElement>) => {
      if (!editing) return;
      setEditing(false);
      commit();
    },
    [editing, commit],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLElement>) => {
      if (e.key === "Escape") {
        e.preventDefault();
        cancel();
        setEditing(false);
        ref.current?.blur();
        return;
      }
      if (e.key === "Enter" && kind === "string" && !e.shiftKey) {
        e.preventDefault();
        ref.current?.blur();
      }
    },
    [cancel, kind],
  );

  // Public render: just text in the given tag, no chrome at all.
  if (!editMode) {
    const hasValue = value.length > 0;
    return createElement(
      as as ElementType,
      { className },
      hasValue ? value : <span className={styles.placeholder}>{placeholder ?? ""}</span>,
    );
  }

  // Edit-mode render: same tag, hover affordance + click-to-edit.
  const classes = [
    className,
    styles.editable,
    editing && styles.active,
    pending && styles.pending,
  ]
    .filter(Boolean)
    .join(" ");

  return createElement(
    as as ElementType,
    {
      ref,
      className: classes,
      "data-label": label,
      "data-needs-translation": needsTranslation ? "true" : undefined,
      contentEditable: editing,
      suppressContentEditableWarning: true,
      onClick: handleClick,
      onBlur: handleBlur,
      onKeyDown: handleKeyDown,
    },
    value.length > 0 ? value : placeholder ?? "",
  );
}
