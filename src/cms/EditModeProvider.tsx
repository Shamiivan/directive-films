import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router";
import { ConvexProvider } from "convex/react";

import {
  AvantechCmsRuntime,
  normalizeLanguage,
  pageSlugFromPathname,
} from "./AvantechCms";
import { convexClient } from "./convex";
import type { Locale, Theme } from "./types";

type EditModeContextValue = {
  editMode: boolean;
  locale: Locale;
  theme: Theme;
  setLocale: (locale: Locale) => void;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const EditModeContext = createContext<EditModeContextValue | null>(null);

const LS_THEME_KEY = "cms.theme";

function readStoredTheme(): Theme {
  if (typeof window === "undefined") return "light";
  const stored = window.localStorage.getItem(LS_THEME_KEY);
  return stored === "dark" ? "dark" : "light";
}

function languageFromLocation(pathname: string, search: string): Locale {
  const params = new URLSearchParams(search);
  return params.get("cmsLanguage")
    ? normalizeLanguage(params.get("cmsLanguage"))
    : normalizeLanguage(pathname.split("/").filter(Boolean)[0]);
}

function InnerProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const editMode = searchParams.get("edit") === "1";

  const [locale, setLocaleState] = useState<Locale>(() =>
    languageFromLocation(location.pathname, location.search),
  );
  const [theme, setThemeState] = useState<Theme>(readStoredTheme);

  useEffect(() => {
    setLocaleState(languageFromLocation(location.pathname, location.search));
  }, [location.pathname, location.search]);

  useEffect(() => {
    const onCmsLanguageChanged = (event: Event) => {
      const nextLanguage = (event as CustomEvent<{ language?: string }>).detail?.language;
      setLocaleState(normalizeLanguage(nextLanguage));
    };

    window.addEventListener("cms:language-changed", onCmsLanguageChanged);
    return () => window.removeEventListener("cms:language-changed", onCmsLanguageChanged);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.dataset.cmsEdit = editMode ? "on" : "off";
  }, [editMode]);

  const setLocale = (next: Locale) => setLocaleState(next);

  const setTheme = (next: Theme) => {
    setThemeState(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(LS_THEME_KEY, next);
    }
  };

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  const value = useMemo<EditModeContextValue>(
    () => ({ editMode, locale, theme, setLocale, setTheme, toggleTheme }),
    [editMode, locale, theme],
  );

  return <EditModeContext.Provider value={value}>{children}</EditModeContext.Provider>;
}

export function EditModeProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const language = languageFromLocation(location.pathname, location.search);
  const pageSlug = pageSlugFromPathname(location.pathname);

  const content = <InnerProvider>{children}</InnerProvider>;

  if (!convexClient) return content;

  return (
    <ConvexProvider client={convexClient}>
      <AvantechCmsRuntime language={language} pageSlug={pageSlug}>
        {content}
      </AvantechCmsRuntime>
    </ConvexProvider>
  );
}

export function useEditMode(): EditModeContextValue {
  const ctx = useContext(EditModeContext);
  if (!ctx) {
    throw new Error("useEditMode must be used within EditModeProvider");
  }
  return ctx;
}

export const useLocale = (): Locale => useEditMode().locale;
export const useTheme = (): Theme => useEditMode().theme;
export const useIsEditing = (): boolean => useEditMode().editMode;
