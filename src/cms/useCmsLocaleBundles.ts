import { useEffect } from "react";
import { useQuery } from "convex/react";
import { useTranslation } from "react-i18next";

import { api } from "../../convex/_generated/api";
import { isConvexConfigured } from "./convex";
import { useIsEditing } from "./EditModeProvider";
import type { Locale } from "./types";

export function useCmsLocaleBundles(locale: Locale) {
  const draft = useIsEditing();
  const { i18n } = useTranslation();
  if (!isConvexConfigured) {
    return null;
  }
  const bundles = useQuery(
    api.cms.getLocaleBundles,
    { locale, draft },
  );

  useEffect(() => {
    if (!bundles) return;
    for (const [namespace, resource] of Object.entries(bundles)) {
      i18n.addResourceBundle(locale, namespace, resource, true, true);
    }
  }, [bundles, i18n, locale]);

  return bundles;
}
