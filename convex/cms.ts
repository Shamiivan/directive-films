import { internalMutationGeneric, mutationGeneric, queryGeneric } from "convex/server";
import { v } from "convex/values";

import { PAGE_SLUGS, type PageContent, type PageSlug } from "./cmsModel";
import { STATIC_COMPANY_LOGOS, STATIC_LOCALE_BUNDLES } from "../src/cms/staticContent";

const query = queryGeneric;
const mutation = mutationGeneric;
const internalMutation = internalMutationGeneric;

const pageSlugValidator = v.union(
  v.literal("home"),
  v.literal("about"),
  v.literal("services"),
  v.literal("contact"),
  v.literal("careers"),
);

const localeValidator = v.union(v.literal("en"), v.literal("fr"));

type TableName =
  | "projects"
  | "services"
  | "teamMembers"
  | "testimonials"
  | "companyLogos"
  | "openPositions";

type PageDoc = {
  _id: any;
  slug: PageSlug;
  title: string;
  draft: PageContent;
  published: PageContent;
  updatedAt: number;
  updatedBy?: string;
  publishedAt?: number;
  publishedBy?: string;
};

type RecordDoc<T> = {
  _id: any;
  slug: string;
  order: number;
  draft: T;
  published: T;
  updatedAt: number;
  updatedBy?: string;
  publishedAt?: number;
  publishedBy?: string;
};

function now() {
  return Date.now();
}

function defaultPageContent(): PageContent {
  return { sections: [] };
}

function defaultPageDraftResource(slug: PageSlug) {
  return {
    sections: [],
    resource: {
      en: STATIC_LOCALE_BUNDLES.en[slug],
      fr: STATIC_LOCALE_BUNDLES.fr[slug],
    },
  };
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function deepMerge<T>(current: T, patch: unknown): T {
  if (patch === undefined) {
    return current;
  }
  if (Array.isArray(patch)) {
    return patch as T;
  }
  if (!isPlainObject(current) || !isPlainObject(patch)) {
    return patch as T;
  }

  const merged: Record<string, unknown> = { ...current };
  for (const [key, value] of Object.entries(patch)) {
    merged[key] = key in merged ? deepMerge(merged[key], value) : value;
  }
  return merged as T;
}

function parsePath(path: string) {
  return path
    .split(".")
    .filter(Boolean)
    .map((segment) => (/^\d+$/.test(segment) ? Number(segment) : segment));
}

function setAtPath(current: unknown, path: string, value: unknown): unknown {
  const segments = parsePath(path);
  if (segments.length === 0) {
    return value;
  }

  const apply = (node: unknown, depth: number): unknown => {
    const segment = segments[depth];
    const isLeaf = depth === segments.length - 1;
    const nextSegment = segments[depth + 1];

    if (typeof segment === "number") {
      const arrayNode = Array.isArray(node) ? [...node] : [];
      arrayNode[segment] = isLeaf
        ? value
        : apply(
            arrayNode[segment] ??
              (typeof nextSegment === "number" ? [] : {}),
            depth + 1,
          );
      return arrayNode;
    }

    const objectNode = isPlainObject(node) ? { ...node } : {};
    objectNode[segment] = isLeaf
      ? value
      : apply(
          objectNode[segment] ??
            (typeof nextSegment === "number" ? [] : {}),
          depth + 1,
        );
    return objectNode;
  };

  return apply(current, 0);
}

async function hydrateStorageUrls(ctx: { storage: { getUrl: (id: any) => Promise<string | null> } }, value: unknown): Promise<unknown> {
  if (Array.isArray(value)) {
    return Promise.all(value.map((item) => hydrateStorageUrls(ctx, item)));
  }
  if (!isPlainObject(value)) {
    return value;
  }

  const hydratedEntries = await Promise.all(
    Object.entries(value).map(async ([key, entryValue]) => [key, await hydrateStorageUrls(ctx, entryValue)] as const),
  );
  const hydrated = Object.fromEntries(hydratedEntries) as Record<string, unknown>;

  if (typeof hydrated.storageId === "string" && hydrated.storageId.length > 0) {
    hydrated.url = await ctx.storage.getUrl(hydrated.storageId);
  }

  return hydrated;
}

function getItemTitle(item: unknown, fallback: string) {
  if (!isPlainObject(item)) return fallback;
  const title = item.title;
  if (isPlainObject(title) && typeof title.en === "string") return title.en;
  const name = item.name;
  if (isPlainObject(name) && typeof name.en === "string") return name.en;
  if (typeof item.name === "string") return item.name;
  return fallback;
}

async function getPageBySlug(ctx: { db: any }, slug: PageSlug): Promise<PageDoc | null> {
  return (await ctx.db.query("pages").withIndex("by_slug", (q: any) => q.eq("slug", slug)).unique()) as PageDoc | null;
}

async function getSingletonSettings(ctx: { db: any }) {
  return await ctx.db.query("siteSettings").withIndex("by_key", (q: any) => q.eq("key", "site")).unique();
}

async function listCollectionDocs<T>(ctx: { db: any }, table: TableName): Promise<RecordDoc<T>[]> {
  return (await ctx.db.query(table).withIndex("by_order").collect()) as RecordDoc<T>[];
}

async function getCollectionDoc<T>(ctx: { db: any }, table: TableName, slug: string): Promise<RecordDoc<T> | null> {
  return (await ctx.db.query(table).withIndex("by_slug", (q: any) => q.eq("slug", slug)).unique()) as RecordDoc<T> | null;
}

async function upsertPageDraft(ctx: { db: any }, slug: PageSlug, patch: unknown, title?: string, updatedBy?: string) {
  const existing = await getPageBySlug(ctx, slug);
  const baseDraft = existing?.draft ?? defaultPageContent();
  const nextDraft = deepMerge(baseDraft, patch);
  const updatedAt = now();

  if (existing) {
    await ctx.db.patch(existing._id, {
      title: title ?? existing.title,
      draft: nextDraft,
      updatedAt,
      updatedBy,
    });
    return existing._id;
  }

  return ctx.db.insert("pages", {
    slug,
    title: title ?? slug,
    draft: nextDraft,
    published: defaultPageContent(),
    updatedAt,
    updatedBy,
  });
}

async function upsertCollectionDraft(
  ctx: { db: any },
  table: TableName,
  args: {
    slug: string;
    draft?: unknown;
    patch?: unknown;
    order?: number;
    updatedBy?: string;
  },
) {
  const existing = await getCollectionDoc(ctx, table, args.slug);
  const baseDraft = existing?.draft ?? {};
  const nextDraft = args.draft ?? deepMerge(baseDraft, args.patch ?? {});
  const updatedAt = now();
  const order = args.order ?? existing?.order ?? updatedAt;

  if (existing) {
    await ctx.db.patch(existing._id, {
      draft: nextDraft,
      order,
      updatedAt,
      updatedBy: args.updatedBy,
    });
    return existing._id;
  }

  return ctx.db.insert(table, {
    slug: args.slug,
    order,
    draft: nextDraft,
    published: nextDraft,
    updatedAt,
    updatedBy: args.updatedBy,
  });
}

async function publishRecord(ctx: { db: any }, table: TableName, slug: string, publishedBy?: string) {
  const existing = await getCollectionDoc(ctx, table, slug);
  if (!existing) {
    throw new Error(`No ${table} record found for slug "${slug}"`);
  }

  await ctx.db.patch(existing._id, {
    published: existing.draft,
    publishedAt: now(),
    publishedBy,
  });
}

async function discardRecordDraft(ctx: { db: any }, table: TableName, slug: string, updatedBy?: string) {
  const existing = await getCollectionDoc(ctx, table, slug);
  if (!existing) {
    throw new Error(`No ${table} record found for slug "${slug}"`);
  }

  await ctx.db.patch(existing._id, {
    draft: existing.published,
    updatedAt: now(),
    updatedBy,
  });
}

function reorderByIds<T extends { slug: string }>(docs: T[], ids: string[]) {
  const bySlug = new Map(docs.map((doc) => [doc.slug, doc]));
  const ordered = ids.map((id) => bySlug.get(id)).filter(Boolean) as T[];
  const missing = docs.filter((doc) => !ids.includes(doc.slug));
  return [...ordered, ...missing];
}

export const bootstrapCms = mutation({
  args: { updatedBy: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const results: string[] = [];

    for (const slug of PAGE_SLUGS) {
      const existing = await getPageBySlug(ctx, slug);
      if (!existing) {
        await ctx.db.insert("pages", {
          slug,
          title: slug,
          draft: defaultPageDraftResource(slug),
          published: defaultPageDraftResource(slug),
          updatedAt: now(),
          updatedBy: args.updatedBy,
        });
        results.push(`created page:${slug}`);
      }
    }

    const settings = await getSingletonSettings(ctx);
    if (!settings) {
      await ctx.db.insert("siteSettings", {
        key: "site",
        draft: {
          brandName: "DirectiveFilms",
          contactEmail: "",
          contactPhone: "",
          address: { en: "", fr: "" },
          socials: {},
        },
        published: {
          brandName: "DirectiveFilms",
          contactEmail: "",
          contactPhone: "",
          address: { en: "", fr: "" },
          socials: {},
        },
        updatedAt: now(),
        updatedBy: args.updatedBy,
      });
      results.push("created siteSettings");
    }

    return results;
  },
});

export const seedCurrentSiteContent = mutation({
  args: { updatedBy: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const results: string[] = [];

    for (const slug of PAGE_SLUGS) {
      const existing = await getPageBySlug(ctx, slug);
      const content = defaultPageDraftResource(slug);

      if (existing) {
        await ctx.db.patch(existing._id, {
          draft: content,
          published: content,
          updatedAt: now(),
          updatedBy: args.updatedBy,
        });
        results.push(`updated page:${slug}`);
      } else {
        await ctx.db.insert("pages", {
          slug,
          title: slug,
          draft: content,
          published: content,
          updatedAt: now(),
          updatedBy: args.updatedBy,
        });
        results.push(`created page:${slug}`);
      }
    }

    const settings = await getSingletonSettings(ctx);
    const siteSettings = {
      brandName: "DirectiveFilms",
      contactEmail: STATIC_LOCALE_BUNDLES.en.contact.hero.info.email.value,
      contactPhone: STATIC_LOCALE_BUNDLES.en.contact.hero.info.phone.value,
      address: {
        en: STATIC_LOCALE_BUNDLES.en.contact.hero.info.location.value,
        fr: STATIC_LOCALE_BUNDLES.fr.contact.hero.info.location.value,
      },
      socials: {},
    };
    if (settings) {
      await ctx.db.patch(settings._id, {
        draft: siteSettings,
        published: siteSettings,
        updatedAt: now(),
        updatedBy: args.updatedBy,
      });
      results.push("updated siteSettings");
    } else {
      await ctx.db.insert("siteSettings", {
        key: "site",
        draft: siteSettings,
        published: siteSettings,
        updatedAt: now(),
        updatedBy: args.updatedBy,
      });
      results.push("created siteSettings");
    }

    for (const [index, logo] of STATIC_COMPANY_LOGOS.entries()) {
      const existing = await getCollectionDoc(ctx, "companyLogos", logo.slug);
      const draft = {
        slug: logo.slug,
        name: logo.name,
        href: "",
        group: "featured",
        isFeatured: true,
        order: index,
        image: {
          storageId: "",
          src: logo.src,
          alt: {
            en: logo.name,
            fr: logo.name,
          },
        },
      };

      if (existing) {
        await ctx.db.patch(existing._id, {
          order: index,
          draft,
          published: draft,
          updatedAt: now(),
          updatedBy: args.updatedBy,
        });
      } else {
        await ctx.db.insert("companyLogos", {
          slug: logo.slug,
          order: index,
          draft,
          published: draft,
          updatedAt: now(),
          updatedBy: args.updatedBy,
        });
      }
    }
    results.push(`seeded companyLogos:${STATIC_COMPANY_LOGOS.length}`);

    return results;
  },
});

export const getPageDraft = query({
  args: { slug: pageSlugValidator },
  handler: async (ctx, args) => {
    const page = await getPageBySlug(ctx, args.slug);
    if (!page) return null;
    return {
      ...page,
      draft: await hydrateStorageUrls(ctx, page.draft),
      published: await hydrateStorageUrls(ctx, page.published),
    };
  },
});

export const listPagesDraft = query({
  args: {},
  handler: async (ctx) => {
    const pages = (await ctx.db.query("pages").collect()) as PageDoc[];
    return pages.sort((a, b) => PAGE_SLUGS.indexOf(a.slug) - PAGE_SLUGS.indexOf(b.slug));
  },
});

export const getPublishedPage = query({
  args: { slug: pageSlugValidator },
  handler: async (ctx, args) => {
    const page = await getPageBySlug(ctx, args.slug);
    if (!page) return null;
    return {
      slug: page.slug,
      title: page.title,
      content: await hydrateStorageUrls(ctx, page.published),
      publishedAt: page.publishedAt ?? null,
    };
  },
});

export const getPageResource = query({
  args: {
    slug: pageSlugValidator,
    locale: localeValidator,
    draft: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const page = await getPageBySlug(ctx, args.slug);
    if (!page) return null;
    const source = args.draft ? page.draft : page.published;
    return source?.resource?.[args.locale] ?? null;
  },
});

export const getLocaleBundles = query({
  args: {
    locale: localeValidator,
    draft: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const pages = (await ctx.db.query("pages").collect()) as PageDoc[];
    const bundles: Record<string, unknown> = {};
    for (const page of pages) {
      const source = args.draft ? page.draft : page.published;
      const resource = source?.resource?.[args.locale];
      if (resource) {
        bundles[page.slug] = resource;
      }
    }
    return bundles;
  },
});

export const updatePageDraft = mutation({
  args: {
    slug: pageSlugValidator,
    patch: v.any(),
    title: v.optional(v.string()),
    updatedBy: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return upsertPageDraft(ctx, args.slug, args.patch, args.title, args.updatedBy);
  },
});

export const replacePageResourceLocale = mutation({
  args: {
    slug: pageSlugValidator,
    locale: localeValidator,
    content: v.any(),
    updatedBy: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const page = await getPageBySlug(ctx, args.slug);
    if (!page) throw new Error(`No page found for slug "${args.slug}"`);

    await ctx.db.patch(page._id, {
      draft: {
        ...page.draft,
        resource: {
          ...(page.draft as any).resource,
          [args.locale]: args.content,
        },
      },
      updatedAt: now(),
      updatedBy: args.updatedBy,
    });
  },
});

export const patchPageResourceField = mutation({
  args: {
    slug: pageSlugValidator,
    locale: localeValidator,
    path: v.string(),
    value: v.any(),
    updatedBy: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const page = await getPageBySlug(ctx, args.slug);
    if (!page) throw new Error(`No page found for slug "${args.slug}"`);

    const currentResource = (page.draft as any)?.resource?.[args.locale] ?? {};
    const nextResource = setAtPath(currentResource, args.path, args.value);

    await ctx.db.patch(page._id, {
      draft: {
        ...page.draft,
        resource: {
          ...(page.draft as any).resource,
          [args.locale]: nextResource,
        },
      },
      updatedAt: now(),
      updatedBy: args.updatedBy,
    });
  },
});

export const reorderPageSections = mutation({
  args: {
    slug: pageSlugValidator,
    sectionIds: v.array(v.string()),
    updatedBy: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const page = await getPageBySlug(ctx, args.slug);
    if (!page) throw new Error(`No page found for slug "${args.slug}"`);

    const sections = Array.isArray(page.draft.sections) ? page.draft.sections : [];
    const byId = new Map(sections.map((section: any) => [section.id, section]));
    const ordered = args.sectionIds.map((id) => byId.get(id)).filter(Boolean);
    const remaining = sections.filter((section: any) => !args.sectionIds.includes(section.id));

    await ctx.db.patch(page._id, {
      draft: { ...page.draft, sections: [...ordered, ...remaining] },
      updatedAt: now(),
      updatedBy: args.updatedBy,
    });
  },
});

export const insertSection = mutation({
  args: {
    slug: pageSlugValidator,
    section: v.any(),
    afterSectionId: v.optional(v.string()),
    updatedBy: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const page = await getPageBySlug(ctx, args.slug);
    if (!page) throw new Error(`No page found for slug "${args.slug}"`);

    const sections = Array.isArray(page.draft.sections) ? [...page.draft.sections] : [];
    if (!args.afterSectionId) {
      sections.push(args.section);
    } else {
      const index = sections.findIndex((section: any) => section.id === args.afterSectionId);
      if (index === -1) {
        sections.push(args.section);
      } else {
        sections.splice(index + 1, 0, args.section);
      }
    }

    await ctx.db.patch(page._id, {
      draft: { ...page.draft, sections },
      updatedAt: now(),
      updatedBy: args.updatedBy,
    });
  },
});

export const removeSection = mutation({
  args: {
    slug: pageSlugValidator,
    sectionId: v.string(),
    updatedBy: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const page = await getPageBySlug(ctx, args.slug);
    if (!page) throw new Error(`No page found for slug "${args.slug}"`);

    const sections = Array.isArray(page.draft.sections)
      ? page.draft.sections.filter((section: any) => section.id !== args.sectionId)
      : [];

    await ctx.db.patch(page._id, {
      draft: { ...page.draft, sections },
      updatedAt: now(),
      updatedBy: args.updatedBy,
    });
  },
});

export const publishPage = mutation({
  args: { slug: pageSlugValidator, publishedBy: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const page = await getPageBySlug(ctx, args.slug);
    if (!page) throw new Error(`No page found for slug "${args.slug}"`);

    await ctx.db.patch(page._id, {
      published: page.draft,
      publishedAt: now(),
      publishedBy: args.publishedBy,
    });
  },
});

export const discardPageDraft = mutation({
  args: { slug: pageSlugValidator, updatedBy: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const page = await getPageBySlug(ctx, args.slug);
    if (!page) throw new Error(`No page found for slug "${args.slug}"`);

    await ctx.db.patch(page._id, {
      draft: page.published,
      updatedAt: now(),
      updatedBy: args.updatedBy,
    });
  },
});

export const listProjectsDraft = query({
  args: {},
  handler: async (ctx) => {
    const docs = await listCollectionDocs(ctx, "projects");
    return Promise.all(
      docs.map(async (doc) => ({
        ...doc,
        draft: await hydrateStorageUrls(ctx, doc.draft),
        published: await hydrateStorageUrls(ctx, doc.published),
      })),
    );
  },
});

export const getProjectDraft = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const doc = await getCollectionDoc(ctx, "projects", args.slug);
    if (!doc) return null;
    return {
      ...doc,
      draft: await hydrateStorageUrls(ctx, doc.draft),
      published: await hydrateStorageUrls(ctx, doc.published),
    };
  },
});

export const listPublishedProjects = query({
  args: {},
  handler: async (ctx) => {
    const docs = await listCollectionDocs(ctx, "projects");
    return Promise.all(
      docs.map(async (doc) => ({
        slug: doc.slug,
        order: doc.order,
        content: await hydrateStorageUrls(ctx, doc.published),
      })),
    );
  },
});

export const getPublishedProject = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const doc = await getCollectionDoc(ctx, "projects", args.slug);
    if (!doc) return null;
    return {
      slug: doc.slug,
      order: doc.order,
      content: await hydrateStorageUrls(ctx, doc.published),
    };
  },
});

export const createProjectDraft = mutation({
  args: {
    slug: v.string(),
    draft: v.any(),
    order: v.optional(v.number()),
    updatedBy: v.optional(v.string()),
  },
  handler: async (ctx, args) => upsertCollectionDraft(ctx, "projects", args),
});

export const updateProjectDraft = mutation({
  args: {
    slug: v.string(),
    patch: v.any(),
    order: v.optional(v.number()),
    updatedBy: v.optional(v.string()),
  },
  handler: async (ctx, args) => upsertCollectionDraft(ctx, "projects", args),
});

export const reorderProjects = mutation({
  args: { ids: v.array(v.string()) },
  handler: async (ctx, args) => {
    const docs = await listCollectionDocs(ctx, "projects");
    const ordered = reorderByIds(docs, args.ids);
    await Promise.all(ordered.map((doc, index) => ctx.db.patch(doc._id, { order: index })));
  },
});

export const publishProject = mutation({
  args: { slug: v.string(), publishedBy: v.optional(v.string()) },
  handler: async (ctx, args) => publishRecord(ctx, "projects", args.slug, args.publishedBy),
});

export const discardProjectDraft = mutation({
  args: { slug: v.string(), updatedBy: v.optional(v.string()) },
  handler: async (ctx, args) => discardRecordDraft(ctx, "projects", args.slug, args.updatedBy),
});

function defineCollectionQueries(table: TableName) {
  return {
    listDraft: query({
      args: {},
      handler: async (ctx) => {
        const docs = await listCollectionDocs(ctx, table);
        return Promise.all(
          docs.map(async (doc) => ({
            ...doc,
            draft: await hydrateStorageUrls(ctx, doc.draft),
            published: await hydrateStorageUrls(ctx, doc.published),
          })),
        );
      },
    }),
    listPublished: query({
      args: {},
      handler: async (ctx) => {
        const docs = await listCollectionDocs(ctx, table);
        return Promise.all(
          docs.map(async (doc) => ({
            slug: doc.slug,
            order: doc.order,
            content: await hydrateStorageUrls(ctx, doc.published),
          })),
        );
      },
    }),
    getDraft: query({
      args: { slug: v.string() },
      handler: async (ctx, args) => {
        const doc = await getCollectionDoc(ctx, table, args.slug);
        if (!doc) return null;
        return {
          ...doc,
          draft: await hydrateStorageUrls(ctx, doc.draft),
          published: await hydrateStorageUrls(ctx, doc.published),
        };
      },
    }),
    createDraft: mutation({
      args: {
        slug: v.string(),
        draft: v.any(),
        order: v.optional(v.number()),
        updatedBy: v.optional(v.string()),
      },
      handler: async (ctx, args) => upsertCollectionDraft(ctx, table, args),
    }),
    updateDraft: mutation({
      args: {
        slug: v.string(),
        patch: v.any(),
        order: v.optional(v.number()),
        updatedBy: v.optional(v.string()),
      },
      handler: async (ctx, args) => upsertCollectionDraft(ctx, table, args),
    }),
    publish: mutation({
      args: { slug: v.string(), publishedBy: v.optional(v.string()) },
      handler: async (ctx, args) => publishRecord(ctx, table, args.slug, args.publishedBy),
    }),
    discardDraft: mutation({
      args: { slug: v.string(), updatedBy: v.optional(v.string()) },
      handler: async (ctx, args) => discardRecordDraft(ctx, table, args.slug, args.updatedBy),
    }),
  };
}

const serviceFns = defineCollectionQueries("services");
export const listServicesDraft = serviceFns.listDraft;
export const listPublishedServices = serviceFns.listPublished;
export const getServiceDraft = serviceFns.getDraft;
export const createServiceDraft = serviceFns.createDraft;
export const updateServiceDraft = serviceFns.updateDraft;
export const publishService = serviceFns.publish;
export const discardServiceDraft = serviceFns.discardDraft;

const teamFns = defineCollectionQueries("teamMembers");
export const listTeamMembersDraft = teamFns.listDraft;
export const listPublishedTeamMembers = teamFns.listPublished;
export const getTeamMemberDraft = teamFns.getDraft;
export const createTeamMemberDraft = teamFns.createDraft;
export const updateTeamMemberDraft = teamFns.updateDraft;
export const publishTeamMember = teamFns.publish;
export const discardTeamMemberDraft = teamFns.discardDraft;

const testimonialFns = defineCollectionQueries("testimonials");
export const listTestimonialsDraft = testimonialFns.listDraft;
export const listPublishedTestimonials = testimonialFns.listPublished;
export const getTestimonialDraft = testimonialFns.getDraft;
export const createTestimonialDraft = testimonialFns.createDraft;
export const updateTestimonialDraft = testimonialFns.updateDraft;
export const publishTestimonial = testimonialFns.publish;
export const discardTestimonialDraft = testimonialFns.discardDraft;

const companyLogoFns = defineCollectionQueries("companyLogos");
export const listCompanyLogosDraft = companyLogoFns.listDraft;
export const listPublishedCompanyLogos = companyLogoFns.listPublished;
export const getCompanyLogoDraft = companyLogoFns.getDraft;
export const createCompanyLogoDraft = companyLogoFns.createDraft;
export const updateCompanyLogoDraft = companyLogoFns.updateDraft;
export const publishCompanyLogo = companyLogoFns.publish;
export const discardCompanyLogoDraft = companyLogoFns.discardDraft;

const openPositionFns = defineCollectionQueries("openPositions");
export const listOpenPositionsDraft = openPositionFns.listDraft;
export const listPublishedOpenPositions = openPositionFns.listPublished;
export const getOpenPositionDraft = openPositionFns.getDraft;
export const createOpenPositionDraft = openPositionFns.createDraft;
export const updateOpenPositionDraft = openPositionFns.updateDraft;
export const publishOpenPosition = openPositionFns.publish;
export const discardOpenPositionDraft = openPositionFns.discardDraft;

export const reorderServices = mutation({
  args: { ids: v.array(v.string()) },
  handler: async (ctx, args) => {
    const docs = await listCollectionDocs(ctx, "services");
    const ordered = reorderByIds(docs, args.ids);
    await Promise.all(ordered.map((doc, index) => ctx.db.patch(doc._id, { order: index })));
  },
});

export const reorderTeamMembers = mutation({
  args: { ids: v.array(v.string()) },
  handler: async (ctx, args) => {
    const docs = await listCollectionDocs(ctx, "teamMembers");
    const ordered = reorderByIds(docs, args.ids);
    await Promise.all(ordered.map((doc, index) => ctx.db.patch(doc._id, { order: index })));
  },
});

export const reorderTestimonials = mutation({
  args: { ids: v.array(v.string()) },
  handler: async (ctx, args) => {
    const docs = await listCollectionDocs(ctx, "testimonials");
    const ordered = reorderByIds(docs, args.ids);
    await Promise.all(ordered.map((doc, index) => ctx.db.patch(doc._id, { order: index })));
  },
});

export const reorderCompanyLogos = mutation({
  args: { ids: v.array(v.string()) },
  handler: async (ctx, args) => {
    const docs = await listCollectionDocs(ctx, "companyLogos");
    const ordered = reorderByIds(docs, args.ids);
    await Promise.all(ordered.map((doc, index) => ctx.db.patch(doc._id, { order: index })));
  },
});

export const reorderOpenPositions = mutation({
  args: { ids: v.array(v.string()) },
  handler: async (ctx, args) => {
    const docs = await listCollectionDocs(ctx, "openPositions");
    const ordered = reorderByIds(docs, args.ids);
    await Promise.all(ordered.map((doc, index) => ctx.db.patch(doc._id, { order: index })));
  },
});

export const getSiteSettingsDraft = query({
  args: {},
  handler: async (ctx) => {
    const settings = await getSingletonSettings(ctx);
    if (!settings) return null;
    return {
      ...settings,
      draft: await hydrateStorageUrls(ctx, settings.draft),
      published: await hydrateStorageUrls(ctx, settings.published),
    };
  },
});

export const getPublishedSiteSettings = query({
  args: {},
  handler: async (ctx) => {
    const settings = await getSingletonSettings(ctx);
    if (!settings) return null;
    return hydrateStorageUrls(ctx, settings.published);
  },
});

export const updateSiteSettingsDraft = mutation({
  args: {
    patch: v.any(),
    updatedBy: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const settings = await getSingletonSettings(ctx);
    const updatedAt = now();

    if (!settings) {
      return ctx.db.insert("siteSettings", {
        key: "site",
        draft: args.patch,
        published: args.patch,
        updatedAt,
        updatedBy: args.updatedBy,
      });
    }

    await ctx.db.patch(settings._id, {
      draft: deepMerge(settings.draft, args.patch),
      updatedAt,
      updatedBy: args.updatedBy,
    });

    return settings._id;
  },
});

export const publishSiteSettings = mutation({
  args: { publishedBy: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const settings = await getSingletonSettings(ctx);
    if (!settings) throw new Error("No site settings document found");

    await ctx.db.patch(settings._id, {
      published: settings.draft,
      publishedAt: now(),
      publishedBy: args.publishedBy,
    });
  },
});

export const discardSiteSettingsDraft = mutation({
  args: { updatedBy: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const settings = await getSingletonSettings(ctx);
    if (!settings) throw new Error("No site settings document found");

    await ctx.db.patch(settings._id, {
      draft: settings.published,
      updatedAt: now(),
      updatedBy: args.updatedBy,
    });
  },
});

// Internal helper for future actions or seed scripts.
export const upsertPageDraftInternal = internalMutation({
  args: {
    slug: pageSlugValidator,
    patch: v.any(),
    title: v.optional(v.string()),
    updatedBy: v.optional(v.string()),
  },
  handler: async (ctx, args) => upsertPageDraft(ctx, args.slug, args.patch, args.title, args.updatedBy),
});
