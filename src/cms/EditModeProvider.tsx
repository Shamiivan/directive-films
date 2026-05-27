import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import { ConvexProvider } from "convex/react";

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

const LS_LOCALE_KEY = "cms.locale";
const LS_THEME_KEY = "cms.theme";

function readStoredLocale(): Locale {
  if (typeof window === "undefined") return "en";
  const stored = window.localStorage.getItem(LS_LOCALE_KEY);
  return stored === "fr" ? "fr" : "en";
}

function readStoredTheme(): Theme {
  if (typeof window === "undefined") return "light";
  const stored = window.localStorage.getItem(LS_THEME_KEY);
  return stored === "dark" ? "dark" : "light";
}

function InnerProvider({ children }: { children: React.ReactNode }) {
  const [searchParams] = useSearchParams();
  const editMode = searchParams.get("edit") === "1";

  const [locale, setLocaleState] = useState<Locale>(readStoredLocale);
  const [theme, setThemeState] = useState<Theme>(readStoredTheme);

  // Mirror theme onto <html data-theme> so CSS modules can scope dark surfaces.
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  // Mirror editMode for selector-based styling (hover affordances, etc.).
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.dataset.cmsEdit = editMode ? "on" : "off";
  }, [editMode]);

  const setLocale = (next: Locale) => {
    setLocaleState(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(LS_LOCALE_KEY, next);
    }
  };

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
  if (convexClient) {
    return (
      <ConvexProvider client={convexClient}>
        <InnerProvider>{children}</InnerProvider>
      </ConvexProvider>
    );
  }
  return <InnerProvider>{children}</InnerProvider>;
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
