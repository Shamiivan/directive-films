export const PAGE_SLUGS = ["home", "about", "services", "contact", "careers"] as const;

export type PageSlug = (typeof PAGE_SLUGS)[number];

export type LocalizedString = {
  en: string;
  fr: string;
};

export type LocalizedText = {
  en: string;
  fr: string;
};

export type ImageRef = {
  storageId: string;
  alt: LocalizedString;
  url?: string | null;
};

export type HeadingBlock = {
  id: string;
  type: "heading";
  level: 1 | 2 | 3;
  text: LocalizedString;
};

export type ParagraphBlock = {
  id: string;
  type: "paragraph";
  body: LocalizedText;
};

export type ImageBlock = {
  id: string;
  type: "image";
  image: ImageRef;
  caption?: LocalizedText;
};

export type QuoteBlock = {
  id: string;
  type: "quote";
  text: LocalizedText;
  attribution?: LocalizedString;
};

export type ButtonBlock = {
  id: string;
  type: "button";
  label: LocalizedString;
  href: string;
};

export type CardGridBlock = {
  id: string;
  type: "cardGrid";
  cards: {
    id: string;
    title: LocalizedString;
    description: LocalizedText;
    image?: ImageRef;
    href?: string;
  }[];
};

export type EmbedCollectionBlock = {
  id: string;
  type: "embedCollection";
  collection: "projects" | "services" | "teamMembers" | "testimonials" | "companyLogos";
  mode: "manual" | "featured" | "all";
  itemIds?: string[];
};

export type Block =
  | HeadingBlock
  | ParagraphBlock
  | ImageBlock
  | QuoteBlock
  | ButtonBlock
  | CardGridBlock
  | EmbedCollectionBlock;

export type BaseSection = {
  id: string;
  type: string;
  label?: string;
  enabled: boolean;
};

export type HeroSection = BaseSection & {
  type: "hero";
  blocks: Block[];
};

export type ContentSection = BaseSection & {
  type: "content";
  blocks: Block[];
};

export type CollectionSection = BaseSection & {
  type: "collection";
  source: "projects" | "services" | "teamMembers" | "testimonials" | "companyLogos" | "openPositions";
  mode: "manual" | "featured" | "all";
  itemIds?: string[];
  blocks?: Block[];
};

export type CtaSection = BaseSection & {
  type: "cta";
  blocks: Block[];
};

export type Section =
  | HeroSection
  | ContentSection
  | CollectionSection
  | CtaSection;

export type PageContent = {
  sections: Section[];
  resource?: {
    en?: Record<string, unknown>;
    fr?: Record<string, unknown>;
  };
};

export type ProjectContent = {
  slug: string;
  title: LocalizedString;
  category: LocalizedString;
  year: string;
  client: LocalizedString;
  story: LocalizedText;
  tags: string[];
  coverImage?: ImageRef;
  galleryImages: ImageRef[];
  isFeatured: boolean;
};

export type ServiceContent = {
  slug: string;
  name: LocalizedString;
  summary: LocalizedText;
  body: LocalizedText;
  image?: ImageRef;
  ctaLabel?: LocalizedString;
  ctaHref?: string;
  isFeatured: boolean;
};

export type TeamMemberContent = {
  slug: string;
  name: string;
  role: LocalizedString;
  bio: LocalizedText;
  headshot?: ImageRef;
  order: number;
};

export type TestimonialContent = {
  slug: string;
  quote: LocalizedText;
  name: string;
  role?: LocalizedString;
  company?: LocalizedString;
  isFeatured: boolean;
  order: number;
};

export type OpenPositionContent = {
  slug: string;
  title: LocalizedString;
  location: LocalizedString;
  employmentType: LocalizedString;
  summary: LocalizedText;
  responsibilities: LocalizedText[];
  requirements: LocalizedText[];
  isOpen: boolean;
  order: number;
};

export type CompanyLogoContent = {
  slug: string;
  name: string;
  image?: ImageRef;
  href?: string;
  group?: "featured" | "clients" | "partners";
  isFeatured: boolean;
  order: number;
};

export type SiteSettingsContent = {
  brandName: string;
  contactEmail: string;
  contactPhone: string;
  address: LocalizedText;
  socials: {
    instagram?: string;
    linkedin?: string;
    youtube?: string;
    vimeo?: string;
  };
};

export type DraftPublished<T> = {
  draft: T;
  published: T;
  updatedAt: number;
  updatedBy?: string;
  publishedAt?: number;
  publishedBy?: string;
};
