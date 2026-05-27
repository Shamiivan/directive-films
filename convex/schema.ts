import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const pageSlug = v.union(
  v.literal("home"),
  v.literal("about"),
  v.literal("services"),
  v.literal("contact"),
  v.literal("careers"),
);

const draftEnvelope = {
  draft: v.any(),
  published: v.any(),
  updatedAt: v.number(),
  updatedBy: v.optional(v.string()),
  publishedAt: v.optional(v.number()),
  publishedBy: v.optional(v.string()),
};

export default defineSchema({
  pages: defineTable({
    slug: pageSlug,
    title: v.string(),
    ...draftEnvelope,
  }).index("by_slug", ["slug"]),

  projects: defineTable({
    slug: v.string(),
    order: v.number(),
    ...draftEnvelope,
  })
    .index("by_slug", ["slug"])
    .index("by_order", ["order"]),

  services: defineTable({
    slug: v.string(),
    order: v.number(),
    ...draftEnvelope,
  })
    .index("by_slug", ["slug"])
    .index("by_order", ["order"]),

  teamMembers: defineTable({
    slug: v.string(),
    order: v.number(),
    ...draftEnvelope,
  })
    .index("by_slug", ["slug"])
    .index("by_order", ["order"]),

  testimonials: defineTable({
    slug: v.string(),
    order: v.number(),
    ...draftEnvelope,
  })
    .index("by_slug", ["slug"])
    .index("by_order", ["order"]),

  companyLogos: defineTable({
    slug: v.string(),
    order: v.number(),
    ...draftEnvelope,
  })
    .index("by_slug", ["slug"])
    .index("by_order", ["order"]),

  openPositions: defineTable({
    slug: v.string(),
    order: v.number(),
    ...draftEnvelope,
  })
    .index("by_slug", ["slug"])
    .index("by_order", ["order"]),

  siteSettings: defineTable({
    key: v.literal("site"),
    ...draftEnvelope,
  }).index("by_key", ["key"]),
});
