export const PAGE_SLUGS = ["home", "about", "services", "contact", "careers", "privacy"] as const;

export type PageSlug = (typeof PAGE_SLUGS)[number];
export type Locale = "en" | "fr";
export type Theme = "light" | "dark";
