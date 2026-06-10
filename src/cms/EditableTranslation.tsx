import { createElement, type ReactNode } from "react";
import { useTranslation } from "react-i18next";

import { fieldIdForTranslation, useCmsPublishedValue } from "./AvantechCms";
import { useIsEditing } from "./EditModeProvider";
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
  namespace,
  path,
}: UseEditableTranslationFieldArgs) {
  const { t } = useTranslation(namespace);
  const editMode = useIsEditing();
  const fieldId = fieldIdForTranslation(namespace, path);
  const publishedValue = useCmsPublishedValue(fieldId);
  const sourceValue = t(path, { defaultValue: "" }) as string;
  const value = !editMode && publishedValue !== undefined ? publishedValue : sourceValue;

  return {
    editMode,
    fieldId,
    onCommit: async () => {},
    pending: false,
    sourceValue,
    value,
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

  return createElement(
    as,
    {
      className,
      "data-cms-field": field.fieldId,
      "data-cms-type": kind === "text" ? "paragraph" : undefined,
      title: placeholder,
    },
    field.value || placeholder || label,
  );
}

export function EditableTranslationStatic({
  pageSlug,
  namespace,
  path,
  children,
}: UseEditableTranslationFieldArgs & {
  children: (field: ReturnType<typeof useEditableTranslationField>) => ReactNode;
}) {
  const field = useEditableTranslationField({ pageSlug, namespace, path });
  return <>{children(field)}</>;
}
