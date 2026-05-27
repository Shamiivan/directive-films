import { useCallback, useState, type ReactNode } from "react";
import { useMutation } from "convex/react";
import { useTranslation } from "react-i18next";

import { api } from "../../convex/_generated/api";
import { isConvexConfigured } from "./convex";
import { EditableText } from "./EditableText";
import { useIsEditing, useLocale } from "./EditModeProvider";
import type { PageSlug } from "./types";

type EditableTranslationProps = {
  pageSlug: PageSlug;
  namespace: string;
  path: string;
  label: string;
  kind?: "string" | "text";
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div" | "label";
  className?: string;
  placeholder?: string;
};

type UseEditableTranslationFieldArgs = {
  pageSlug: PageSlug;
  namespace: string;
  path: string;
};

export function useEditableTranslationField({
  pageSlug,
  namespace,
  path,
}: UseEditableTranslationFieldArgs) {
  const { t } = useTranslation(namespace);
  const locale = useLocale();
  const editMode = useIsEditing();
  const [pending, setPending] = useState(false);

  const value = t(path, { defaultValue: "" }) as string;

  if (!isConvexConfigured) {
    return {
      value,
      onCommit: async () => {},
      pending: false,
      editMode,
    };
  }

  const patchField = useMutation(api.cms.patchPageResourceField);

  const onCommit = useCallback(
    async (next: string) => {
      if (!editMode || !isConvexConfigured || next === value) return;
      setPending(true);
      try {
        await patchField({
          slug: pageSlug,
          locale,
          path,
          value: next,
        });
      } finally {
        setPending(false);
      }
    },
    [editMode, locale, pageSlug, patchField, path, value],
  );

  return {
    value,
    onCommit,
    pending,
    editMode,
  };
}

export function EditableTranslation({
  pageSlug,
  namespace,
  path,
  label,
  kind = "string",
  as = "span",
  className,
  placeholder,
}: EditableTranslationProps) {
  const field = useEditableTranslationField({ pageSlug, namespace, path });

  return (
    <EditableText
      as={as}
      kind={kind}
      label={label}
      className={className}
      placeholder={placeholder}
      pending={field.pending}
      value={field.value}
      onCommit={field.onCommit}
    />
  );
}

export function EditableTranslationStatic({
  pageSlug,
  namespace,
  path,
  children,
}: UseEditableTranslationFieldArgs & { children: (field: ReturnType<typeof useEditableTranslationField>) => ReactNode }) {
  const field = useEditableTranslationField({ pageSlug, namespace, path });
  return <>{children(field)}</>;
}
