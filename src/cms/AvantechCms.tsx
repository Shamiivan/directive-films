import { createContext, useContext, useEffect, useMemo, type ReactNode } from "react";
import { useQuery } from "convex/react";

import type { Locale, PageSlug } from "./types";

type CmsPageDefinition = {
  slug: PageSlug;
  title: string;
  path: string;
};

type CmsContentContextValue = {
  fields: Record<string, string> | undefined;
  isLoaded: boolean;
  language: Locale;
  pageSlug: PageSlug;
  projectSlug: string;
};

const PAGES_REGISTRY = "__AVANTECH_CMS_PAGES__";

export const CMS_PROJECT_SLUG =
  (import.meta.env.VITE_CMS_PROJECT_SLUG as string | undefined) ?? "directive-films";

export const CMS_PAGES: CmsPageDefinition[] = [
  { slug: "home", title: "Home", path: "/en" },
  { slug: "about", title: "About", path: "/en/about" },
  { slug: "services", title: "Services", path: "/en/services" },
  { slug: "careers", title: "Careers", path: "/en/careers" },
  { slug: "contact", title: "Contact", path: "/en/contact" },
  { slug: "privacy", title: "Privacy", path: "/en/privacy" },
];

const CmsContentContext = createContext<CmsContentContextValue | null>(null);

export function normalizeLanguage(value: string | null | undefined): Locale {
  return value?.slice(0, 2) === "fr" ? "fr" : "en";
}

export function pageSlugFromPathname(pathname: string): PageSlug {
  const parts = pathname.split("/").filter(Boolean);
  const maybePage = parts[0] === "en" || parts[0] === "fr" ? parts[1] : parts[0];
  const page = CMS_PAGES.find((item) => item.slug === maybePage);
  return page?.slug ?? "home";
}

export function fieldIdForTranslation(namespace: string, path: string) {
  return `${namespace}.${path}`;
}

function useEditBridge() {
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (new URLSearchParams(window.location.search).get("edit") !== "1") return;
    if (document.querySelector('script[data-cms-bridge="true"]')) return;

    const script = document.createElement("script");
    script.src = "/bridge.js";
    script.dataset.cmsBridge = "true";
    document.body.append(script);
  }, []);
}

function CmsPagesProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const registryWindow = window as unknown as Record<string, unknown>;
    registryWindow[PAGES_REGISTRY] = CMS_PAGES;
    window.dispatchEvent(new CustomEvent("cms:pages-changed", { detail: CMS_PAGES }));

    return () => {
      if (registryWindow[PAGES_REGISTRY] === CMS_PAGES) {
        delete registryWindow[PAGES_REGISTRY];
      }
    };
  }, []);

  return <>{children}</>;
}

function CmsContentProvider({
  children,
  language,
  pageSlug,
}: {
  children: ReactNode;
  language: Locale;
  pageSlug: PageSlug;
}) {
  const fields = useQuery("cms:getPublishedContent" as never, {
    projectSlug: CMS_PROJECT_SLUG,
    pageSlug,
    language,
  } as never) as Record<string, string> | undefined;

  const value = useMemo<CmsContentContextValue>(
    () => ({
      fields,
      isLoaded: fields !== undefined,
      language,
      pageSlug,
      projectSlug: CMS_PROJECT_SLUG,
    }),
    [fields, language, pageSlug],
  );

  return <CmsContentContext.Provider value={value}>{children}</CmsContentContext.Provider>;
}

export function AvantechCmsRuntime({
  children,
  language,
  pageSlug,
}: {
  children: ReactNode;
  language: Locale;
  pageSlug: PageSlug;
}) {
  useEditBridge();

  return (
    <CmsPagesProvider>
      <CmsContentProvider language={language} pageSlug={pageSlug}>
        {children}
      </CmsContentProvider>
    </CmsPagesProvider>
  );
}

export function useCmsContent() {
  return useContext(CmsContentContext);
}

export function useCmsPublishedValue(fieldId: string) {
  const cms = useCmsContent();
  return cms?.fields?.[fieldId];
}
