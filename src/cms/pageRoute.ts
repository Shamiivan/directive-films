import type { PageSlug } from "./types";

const PAGE_SLUG_SET = new Set<PageSlug>([
  "home",
  "about",
  "services",
  "contact",
  "careers",
]);

export function publicPathForPageSlug(slug: PageSlug) {
  return slug === "home" ? "/en" : `/en/${slug}`;
}

export function pageSlugFromPathname(pathname: string): PageSlug | null {
  const parts = pathname.split("/").filter(Boolean);

  if (parts[0] === "admin" && parts[1] === "pages" && parts[2] && PAGE_SLUG_SET.has(parts[2] as PageSlug)) {
    return parts[2] as PageSlug;
  }

  const pagePart = parts[1];
  if (parts.length === 1 && (parts[0] === "en" || parts[0] === "fr")) {
    return "home";
  }
  if ((parts[0] === "en" || parts[0] === "fr") && pagePart && PAGE_SLUG_SET.has(pagePart as PageSlug)) {
    return pagePart as PageSlug;
  }

  return null;
}
