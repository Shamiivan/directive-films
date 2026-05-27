import { mutationGeneric, queryGeneric } from "convex/server";
import { v } from "convex/values";

import type { PageSlug } from "./cmsModel";

const query = queryGeneric;
const mutation = mutationGeneric;

const pageSlugValidator = v.union(
  v.literal("home"),
  v.literal("about"),
  v.literal("services"),
  v.literal("contact"),
  v.literal("careers"),
);

const localeValidator = v.union(v.literal("en"), v.literal("fr"));

type LocalizedString = { en: string; fr: string };
type LocalizedText = { en: string; fr: string };
type PageDoc = {
  _id: any;
  slug: PageSlug;
  title: string;
  draft: {
    sections?: any[];
  };
  published: {
    sections?: any[];
  };
};
type RecordDoc = {
  _id: any;
  slug: string;
  order?: number;
  draft: Record<string, any>;
  published: Record<string, any>;
};

type CollectionTable =
  | "projects"
  | "services"
  | "teamMembers"
  | "testimonials"
  | "companyLogos"
  | "openPositions";

function now() {
  return Date.now();
}

function makeId(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

function emptyLocalizedString(value = ""): LocalizedString {
  return { en: value, fr: value };
}

function emptyLocalizedText(value = ""): LocalizedText {
  return { en: value, fr: value };
}

async function getPageBySlug(ctx: { db: any }, slug: PageSlug): Promise<PageDoc | null> {
  return await ctx.db.query("pages").withIndex("by_slug", (q: any) => q.eq("slug", slug)).unique();
}

async function getCollectionDoc(ctx: { db: any }, table: CollectionTable, slug: string): Promise<RecordDoc | null> {
  return await ctx.db.query(table).withIndex("by_slug", (q: any) => q.eq("slug", slug)).unique();
}

async function getSiteSettings(ctx: { db: any }) {
  return await ctx.db.query("siteSettings").withIndex("by_key", (q: any) => q.eq("key", "site")).unique();
}

function getSections(page: PageDoc) {
  return Array.isArray(page.draft.sections) ? [...page.draft.sections] : [];
}

function findSectionIndex(sections: any[], sectionId: string) {
  return sections.findIndex((section) => section.id === sectionId);
}

function findBlockIndex(blocks: any[], blockId: string) {
  return blocks.findIndex((block) => block.id === blockId);
}

function getSectionOrThrow(sections: any[], sectionId: string) {
  const index = findSectionIndex(sections, sectionId);
  if (index === -1) {
    throw new Error(`No section found for id "${sectionId}"`);
  }
  return { section: sections[index], index };
}

function getBlocks(section: any) {
  return Array.isArray(section.blocks) ? [...section.blocks] : [];
}

function replaceSection(sections: any[], sectionIndex: number, nextSection: any) {
  const nextSections = [...sections];
  nextSections[sectionIndex] = nextSection;
  return nextSections;
}

function defaultSection(sectionType: "hero" | "content" | "collection" | "cta", label?: string) {
  if (sectionType === "collection") {
    return {
      id: makeId("section"),
      type: "collection",
      label: label ?? "Collection",
      enabled: true,
      source: "projects",
      mode: "manual",
      itemIds: [],
      blocks: [],
    };
  }

  return {
    id: makeId("section"),
    type: sectionType,
    label: label ?? sectionType,
    enabled: true,
    blocks: [],
  };
}

function defaultBlock(
  blockType: "heading" | "paragraph" | "button" | "quote" | "image",
  args?: {
    text?: string;
    href?: string;
    storageId?: string;
  },
) {
  switch (blockType) {
    case "heading":
      return {
        id: makeId("block"),
        type: "heading",
        level: 2,
        text: emptyLocalizedString(args?.text ?? "New heading"),
      };
    case "paragraph":
      return {
        id: makeId("block"),
        type: "paragraph",
        body: emptyLocalizedText(args?.text ?? "New paragraph"),
      };
    case "button":
      return {
        id: makeId("block"),
        type: "button",
        label: emptyLocalizedString(args?.text ?? "Learn more"),
        href: args?.href ?? "/contact",
      };
    case "quote":
      return {
        id: makeId("block"),
        type: "quote",
        text: emptyLocalizedText(args?.text ?? "New quote"),
        attribution: emptyLocalizedString(""),
      };
    case "image":
      return {
        id: makeId("block"),
        type: "image",
        image: {
          storageId: args?.storageId ?? "",
          alt: emptyLocalizedString(""),
        },
        caption: emptyLocalizedText(""),
      };
  }
}

export const listCliTargets = query({
  args: {},
  handler: async (ctx) => {
    const [pages, projects, services, teamMembers, testimonials, companyLogos, openPositions] = await Promise.all([
      ctx.db.query("pages").collect(),
      ctx.db.query("projects").collect(),
      ctx.db.query("services").collect(),
      ctx.db.query("teamMembers").collect(),
      ctx.db.query("testimonials").collect(),
      ctx.db.query("companyLogos").collect(),
      ctx.db.query("openPositions").collect(),
    ]);

    return {
      pages: pages.map((page: any) => ({
        slug: page.slug,
        title: page.title,
        sectionCount: Array.isArray(page.draft.sections) ? page.draft.sections.length : 0,
      })),
      collections: {
        projects: projects.map((item: any) => ({ slug: item.slug })),
        services: services.map((item: any) => ({ slug: item.slug })),
        teamMembers: teamMembers.map((item: any) => ({ slug: item.slug })),
        testimonials: testimonials.map((item: any) => ({ slug: item.slug })),
        companyLogos: companyLogos.map((item: any) => ({ slug: item.slug })),
        openPositions: openPositions.map((item: any) => ({ slug: item.slug })),
      },
    };
  },
});

export const getPageOutline = query({
  args: { slug: pageSlugValidator },
  handler: async (ctx, args) => {
    const page = await getPageBySlug(ctx, args.slug);
    if (!page) return null;

    return {
      slug: page.slug,
      title: page.title,
      sections: getSections(page).map((section) => ({
        id: section.id,
        type: section.type,
        label: section.label ?? null,
        enabled: section.enabled !== false,
        blockCount: Array.isArray(section.blocks) ? section.blocks.length : 0,
        blocks: Array.isArray(section.blocks)
          ? section.blocks.map((block: any) => ({
              id: block.id,
              type: block.type,
            }))
          : [],
      })),
    };
  },
});

export const createPageSection = mutation({
  args: {
    slug: pageSlugValidator,
    sectionType: v.union(v.literal("hero"), v.literal("content"), v.literal("collection"), v.literal("cta")),
    label: v.optional(v.string()),
    afterSectionId: v.optional(v.string()),
    updatedBy: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const page = await getPageBySlug(ctx, args.slug);
    if (!page) throw new Error(`No page found for slug "${args.slug}"`);

    const sections = getSections(page);
    const section = defaultSection(args.sectionType, args.label);

    if (!args.afterSectionId) {
      sections.push(section);
    } else {
      const index = findSectionIndex(sections, args.afterSectionId);
      if (index === -1) {
        sections.push(section);
      } else {
        sections.splice(index + 1, 0, section);
      }
    }

    await ctx.db.patch(page._id, {
      draft: { ...page.draft, sections },
      updatedAt: now(),
      updatedBy: args.updatedBy,
    });

    return { sectionId: section.id };
  },
});

export const replacePageSections = mutation({
  args: {
    slug: pageSlugValidator,
    sections: v.array(v.any()),
    updatedBy: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const page = await getPageBySlug(ctx, args.slug);
    if (!page) throw new Error(`No page found for slug "${args.slug}"`);

    await ctx.db.patch(page._id, {
      draft: {
        ...page.draft,
        sections: args.sections,
      },
      updatedAt: now(),
      updatedBy: args.updatedBy,
    });
  },
});

export const setSectionLabel = mutation({
  args: {
    slug: pageSlugValidator,
    sectionId: v.string(),
    label: v.string(),
    updatedBy: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const page = await getPageBySlug(ctx, args.slug);
    if (!page) throw new Error(`No page found for slug "${args.slug}"`);

    const sections = getSections(page);
    const { section, index } = getSectionOrThrow(sections, args.sectionId);
    const nextSections = replaceSection(sections, index, { ...section, label: args.label });

    await ctx.db.patch(page._id, {
      draft: { ...page.draft, sections: nextSections },
      updatedAt: now(),
      updatedBy: args.updatedBy,
    });
  },
});

export const appendBlockToSection = mutation({
  args: {
    slug: pageSlugValidator,
    sectionId: v.string(),
    blockType: v.union(v.literal("heading"), v.literal("paragraph"), v.literal("button"), v.literal("quote"), v.literal("image")),
    text: v.optional(v.string()),
    href: v.optional(v.string()),
    storageId: v.optional(v.string()),
    afterBlockId: v.optional(v.string()),
    updatedBy: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const page = await getPageBySlug(ctx, args.slug);
    if (!page) throw new Error(`No page found for slug "${args.slug}"`);

    const sections = getSections(page);
    const { section, index } = getSectionOrThrow(sections, args.sectionId);
    const blocks = getBlocks(section);
    const block = defaultBlock(args.blockType, {
      text: args.text,
      href: args.href,
      storageId: args.storageId,
    });

    if (!args.afterBlockId) {
      blocks.push(block);
    } else {
      const blockIndex = findBlockIndex(blocks, args.afterBlockId);
      if (blockIndex === -1) {
        blocks.push(block);
      } else {
        blocks.splice(blockIndex + 1, 0, block);
      }
    }

    const nextSection = { ...section, blocks };
    const nextSections = replaceSection(sections, index, nextSection);

    await ctx.db.patch(page._id, {
      draft: { ...page.draft, sections: nextSections },
      updatedAt: now(),
      updatedBy: args.updatedBy,
    });

    return { blockId: block.id };
  },
});

export const replaceSectionBlocks = mutation({
  args: {
    slug: pageSlugValidator,
    sectionId: v.string(),
    blocks: v.array(v.any()),
    updatedBy: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const page = await getPageBySlug(ctx, args.slug);
    if (!page) throw new Error(`No page found for slug "${args.slug}"`);

    const sections = getSections(page);
    const { section, index } = getSectionOrThrow(sections, args.sectionId);
    const nextSections = replaceSection(sections, index, {
      ...section,
      blocks: args.blocks,
    });

    await ctx.db.patch(page._id, {
      draft: { ...page.draft, sections: nextSections },
      updatedAt: now(),
      updatedBy: args.updatedBy,
    });
  },
});

export const rebuildHomePageDraft = mutation({
  args: {
    sections: v.array(v.any()),
    title: v.optional(v.string()),
    updatedBy: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const page = await getPageBySlug(ctx, "home");
    if (!page) throw new Error('No page found for slug "home"');

    await ctx.db.patch(page._id, {
      title: args.title ?? page.title,
      draft: {
        ...page.draft,
        sections: args.sections,
      },
      updatedAt: now(),
      updatedBy: args.updatedBy,
    });

    return {
      slug: "home",
      sectionCount: args.sections.length,
    };
  },
});

export const setHeadingBlockText = mutation({
  args: {
    slug: pageSlugValidator,
    sectionId: v.string(),
    blockId: v.string(),
    locale: localeValidator,
    text: v.string(),
    level: v.optional(v.union(v.literal(1), v.literal(2), v.literal(3))),
    updatedBy: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const page = await getPageBySlug(ctx, args.slug);
    if (!page) throw new Error(`No page found for slug "${args.slug}"`);

    const sections = getSections(page);
    const { section, index } = getSectionOrThrow(sections, args.sectionId);
    const blocks = getBlocks(section);
    const blockIndex = findBlockIndex(blocks, args.blockId);
    if (blockIndex === -1) throw new Error(`No block found for id "${args.blockId}"`);

    const block = blocks[blockIndex];
    if (block.type !== "heading") {
      throw new Error(`Block "${args.blockId}" is not a heading block`);
    }

    blocks[blockIndex] = {
      ...block,
      level: args.level ?? block.level,
      text: {
        ...block.text,
        [args.locale]: args.text,
      },
    };

    const nextSections = replaceSection(sections, index, { ...section, blocks });
    await ctx.db.patch(page._id, {
      draft: { ...page.draft, sections: nextSections },
      updatedAt: now(),
      updatedBy: args.updatedBy,
    });
  },
});

export const setParagraphBlockText = mutation({
  args: {
    slug: pageSlugValidator,
    sectionId: v.string(),
    blockId: v.string(),
    locale: localeValidator,
    text: v.string(),
    updatedBy: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const page = await getPageBySlug(ctx, args.slug);
    if (!page) throw new Error(`No page found for slug "${args.slug}"`);

    const sections = getSections(page);
    const { section, index } = getSectionOrThrow(sections, args.sectionId);
    const blocks = getBlocks(section);
    const blockIndex = findBlockIndex(blocks, args.blockId);
    if (blockIndex === -1) throw new Error(`No block found for id "${args.blockId}"`);

    const block = blocks[blockIndex];
    if (block.type !== "paragraph") {
      throw new Error(`Block "${args.blockId}" is not a paragraph block`);
    }

    blocks[blockIndex] = {
      ...block,
      body: {
        ...block.body,
        [args.locale]: args.text,
      },
    };

    const nextSections = replaceSection(sections, index, { ...section, blocks });
    await ctx.db.patch(page._id, {
      draft: { ...page.draft, sections: nextSections },
      updatedAt: now(),
      updatedBy: args.updatedBy,
    });
  },
});

export const setButtonBlock = mutation({
  args: {
    slug: pageSlugValidator,
    sectionId: v.string(),
    blockId: v.string(),
    locale: localeValidator,
    label: v.optional(v.string()),
    href: v.optional(v.string()),
    updatedBy: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const page = await getPageBySlug(ctx, args.slug);
    if (!page) throw new Error(`No page found for slug "${args.slug}"`);

    const sections = getSections(page);
    const { section, index } = getSectionOrThrow(sections, args.sectionId);
    const blocks = getBlocks(section);
    const blockIndex = findBlockIndex(blocks, args.blockId);
    if (blockIndex === -1) throw new Error(`No block found for id "${args.blockId}"`);

    const block = blocks[blockIndex];
    if (block.type !== "button") {
      throw new Error(`Block "${args.blockId}" is not a button block`);
    }

    blocks[blockIndex] = {
      ...block,
      label: args.label
        ? {
            ...block.label,
            [args.locale]: args.label,
          }
        : block.label,
      href: args.href ?? block.href,
    };

    const nextSections = replaceSection(sections, index, { ...section, blocks });
    await ctx.db.patch(page._id, {
      draft: { ...page.draft, sections: nextSections },
      updatedAt: now(),
      updatedBy: args.updatedBy,
    });
  },
});

export const setImageBlock = mutation({
  args: {
    slug: pageSlugValidator,
    sectionId: v.string(),
    blockId: v.string(),
    storageId: v.optional(v.string()),
    altEn: v.optional(v.string()),
    altFr: v.optional(v.string()),
    captionEn: v.optional(v.string()),
    captionFr: v.optional(v.string()),
    updatedBy: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const page = await getPageBySlug(ctx, args.slug);
    if (!page) throw new Error(`No page found for slug "${args.slug}"`);

    const sections = getSections(page);
    const { section, index } = getSectionOrThrow(sections, args.sectionId);
    const blocks = getBlocks(section);
    const blockIndex = findBlockIndex(blocks, args.blockId);
    if (blockIndex === -1) throw new Error(`No block found for id "${args.blockId}"`);

    const block = blocks[blockIndex];
    if (block.type !== "image") {
      throw new Error(`Block "${args.blockId}" is not an image block`);
    }

    blocks[blockIndex] = {
      ...block,
      image: {
        ...block.image,
        storageId: args.storageId ?? block.image.storageId,
        alt: {
          en: args.altEn ?? block.image.alt.en,
          fr: args.altFr ?? block.image.alt.fr,
        },
      },
      caption: {
        en: args.captionEn ?? block.caption?.en ?? "",
        fr: args.captionFr ?? block.caption?.fr ?? "",
      },
    };

    const nextSections = replaceSection(sections, index, { ...section, blocks });
    await ctx.db.patch(page._id, {
      draft: { ...page.draft, sections: nextSections },
      updatedAt: now(),
      updatedBy: args.updatedBy,
    });
  },
});

export const setCollectionSectionItems = mutation({
  args: {
    slug: pageSlugValidator,
    sectionId: v.string(),
    source: v.optional(v.union(v.literal("projects"), v.literal("services"), v.literal("teamMembers"), v.literal("testimonials"), v.literal("companyLogos"), v.literal("openPositions"))),
    mode: v.optional(v.union(v.literal("manual"), v.literal("featured"), v.literal("all"))),
    itemIds: v.array(v.string()),
    updatedBy: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const page = await getPageBySlug(ctx, args.slug);
    if (!page) throw new Error(`No page found for slug "${args.slug}"`);

    const sections = getSections(page);
    const { section, index } = getSectionOrThrow(sections, args.sectionId);
    if (section.type !== "collection") {
      throw new Error(`Section "${args.sectionId}" is not a collection section`);
    }

    const nextSections = replaceSection(sections, index, {
      ...section,
      source: args.source ?? section.source,
      mode: args.mode ?? section.mode,
      itemIds: args.itemIds,
    });

    await ctx.db.patch(page._id, {
      draft: { ...page.draft, sections: nextSections },
      updatedAt: now(),
      updatedBy: args.updatedBy,
    });
  },
});

export const updateProjectBasics = mutation({
  args: {
    slug: v.string(),
    titleEn: v.optional(v.string()),
    titleFr: v.optional(v.string()),
    categoryEn: v.optional(v.string()),
    categoryFr: v.optional(v.string()),
    clientEn: v.optional(v.string()),
    clientFr: v.optional(v.string()),
    year: v.optional(v.string()),
    storyEn: v.optional(v.string()),
    storyFr: v.optional(v.string()),
    isFeatured: v.optional(v.boolean()),
    updatedBy: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const record = await getCollectionDoc(ctx, "projects", args.slug);
    if (!record) throw new Error(`No project found for slug "${args.slug}"`);

    const draft = record.draft ?? {};
    await ctx.db.patch(record._id, {
      draft: {
        ...draft,
        slug: draft.slug ?? args.slug,
        title: {
          en: args.titleEn ?? draft.title?.en ?? "",
          fr: args.titleFr ?? draft.title?.fr ?? "",
        },
        category: {
          en: args.categoryEn ?? draft.category?.en ?? "",
          fr: args.categoryFr ?? draft.category?.fr ?? "",
        },
        client: {
          en: args.clientEn ?? draft.client?.en ?? "",
          fr: args.clientFr ?? draft.client?.fr ?? "",
        },
        year: args.year ?? draft.year ?? "",
        story: {
          en: args.storyEn ?? draft.story?.en ?? "",
          fr: args.storyFr ?? draft.story?.fr ?? "",
        },
        isFeatured: args.isFeatured ?? draft.isFeatured ?? false,
      },
      updatedAt: now(),
      updatedBy: args.updatedBy,
    });
  },
});

export const updateServiceBasics = mutation({
  args: {
    slug: v.string(),
    nameEn: v.optional(v.string()),
    nameFr: v.optional(v.string()),
    summaryEn: v.optional(v.string()),
    summaryFr: v.optional(v.string()),
    bodyEn: v.optional(v.string()),
    bodyFr: v.optional(v.string()),
    ctaLabelEn: v.optional(v.string()),
    ctaLabelFr: v.optional(v.string()),
    ctaHref: v.optional(v.string()),
    isFeatured: v.optional(v.boolean()),
    updatedBy: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const record = await getCollectionDoc(ctx, "services", args.slug);
    if (!record) throw new Error(`No service found for slug "${args.slug}"`);

    const draft = record.draft ?? {};
    await ctx.db.patch(record._id, {
      draft: {
        ...draft,
        slug: draft.slug ?? args.slug,
        name: {
          en: args.nameEn ?? draft.name?.en ?? "",
          fr: args.nameFr ?? draft.name?.fr ?? "",
        },
        summary: {
          en: args.summaryEn ?? draft.summary?.en ?? "",
          fr: args.summaryFr ?? draft.summary?.fr ?? "",
        },
        body: {
          en: args.bodyEn ?? draft.body?.en ?? "",
          fr: args.bodyFr ?? draft.body?.fr ?? "",
        },
        ctaLabel: {
          en: args.ctaLabelEn ?? draft.ctaLabel?.en ?? "",
          fr: args.ctaLabelFr ?? draft.ctaLabel?.fr ?? "",
        },
        ctaHref: args.ctaHref ?? draft.ctaHref ?? "",
        isFeatured: args.isFeatured ?? draft.isFeatured ?? false,
      },
      updatedAt: now(),
      updatedBy: args.updatedBy,
    });
  },
});

export const updateTeamMemberBasics = mutation({
  args: {
    slug: v.string(),
    name: v.optional(v.string()),
    roleEn: v.optional(v.string()),
    roleFr: v.optional(v.string()),
    bioEn: v.optional(v.string()),
    bioFr: v.optional(v.string()),
    order: v.optional(v.number()),
    updatedBy: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const record = await getCollectionDoc(ctx, "teamMembers", args.slug);
    if (!record) throw new Error(`No team member found for slug "${args.slug}"`);

    const draft = record.draft ?? {};
    await ctx.db.patch(record._id, {
      order: args.order ?? record.order,
      draft: {
        ...draft,
        slug: draft.slug ?? args.slug,
        name: args.name ?? draft.name ?? "",
        role: {
          en: args.roleEn ?? draft.role?.en ?? "",
          fr: args.roleFr ?? draft.role?.fr ?? "",
        },
        bio: {
          en: args.bioEn ?? draft.bio?.en ?? "",
          fr: args.bioFr ?? draft.bio?.fr ?? "",
        },
        order: args.order ?? draft.order ?? record.order,
      },
      updatedAt: now(),
      updatedBy: args.updatedBy,
    });
  },
});

export const updateCompanyLogoBasics = mutation({
  args: {
    slug: v.string(),
    name: v.optional(v.string()),
    href: v.optional(v.string()),
    group: v.optional(v.union(v.literal("featured"), v.literal("clients"), v.literal("partners"))),
    isFeatured: v.optional(v.boolean()),
    order: v.optional(v.number()),
    imageStorageId: v.optional(v.string()),
    altEn: v.optional(v.string()),
    altFr: v.optional(v.string()),
    updatedBy: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const record = await getCollectionDoc(ctx, "companyLogos", args.slug);
    if (!record) throw new Error(`No company logo found for slug "${args.slug}"`);

    const draft = record.draft ?? {};
    await ctx.db.patch(record._id, {
      order: args.order ?? record.order,
      draft: {
        ...draft,
        slug: draft.slug ?? args.slug,
        name: args.name ?? draft.name ?? "",
        href: args.href ?? draft.href ?? "",
        group: args.group ?? draft.group ?? "featured",
        isFeatured: args.isFeatured ?? draft.isFeatured ?? true,
        order: args.order ?? draft.order ?? record.order ?? 0,
        image: {
          storageId: args.imageStorageId ?? draft.image?.storageId ?? "",
          alt: {
            en: args.altEn ?? draft.image?.alt?.en ?? "",
            fr: args.altFr ?? draft.image?.alt?.fr ?? "",
          },
        },
      },
      updatedAt: now(),
      updatedBy: args.updatedBy,
    });
  },
});

export const updateSiteSettingsContact = mutation({
  args: {
    brandName: v.optional(v.string()),
    contactEmail: v.optional(v.string()),
    contactPhone: v.optional(v.string()),
    addressEn: v.optional(v.string()),
    addressFr: v.optional(v.string()),
    instagram: v.optional(v.string()),
    linkedin: v.optional(v.string()),
    youtube: v.optional(v.string()),
    vimeo: v.optional(v.string()),
    updatedBy: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const settings = await getSiteSettings(ctx);
    if (!settings) {
      throw new Error("No site settings document found. Run bootstrapCms first.");
    }

    const draft = settings.draft ?? {};
    await ctx.db.patch(settings._id, {
      draft: {
        ...draft,
        brandName: args.brandName ?? draft.brandName ?? "DirectiveFilms",
        contactEmail: args.contactEmail ?? draft.contactEmail ?? "",
        contactPhone: args.contactPhone ?? draft.contactPhone ?? "",
        address: {
          en: args.addressEn ?? draft.address?.en ?? "",
          fr: args.addressFr ?? draft.address?.fr ?? "",
        },
        socials: {
          instagram: args.instagram ?? draft.socials?.instagram ?? "",
          linkedin: args.linkedin ?? draft.socials?.linkedin ?? "",
          youtube: args.youtube ?? draft.socials?.youtube ?? "",
          vimeo: args.vimeo ?? draft.socials?.vimeo ?? "",
        },
      },
      updatedAt: now(),
      updatedBy: args.updatedBy,
    });
  },
});
