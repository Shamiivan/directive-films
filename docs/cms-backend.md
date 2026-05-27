# CMS Backend

This repo now includes a Convex-backed CMS backend scaffold under [convex/](/home/shami/workspaces/directive-films/convex).

## Structure

- [convex/schema.ts](/home/shami/workspaces/directive-films/convex/schema.ts): Convex tables and indexes
- [convex/cmsModel.ts](/home/shami/workspaces/directive-films/convex/cmsModel.ts): shared TypeScript content model
- [convex/cms.ts](/home/shami/workspaces/directive-films/convex/cms.ts): CMS queries and mutations
- [convex/files.ts](/home/shami/workspaces/directive-films/convex/files.ts): upload URL and storage helpers

## Content Model

The backend follows the agreed CMS contract:

- `pages -> sections -> blocks`
- first-class collections for:
  - `projects`
  - `services`
  - `teamMembers`
  - `testimonials`
  - `companyLogos`
  - `openPositions`
  - `siteSettings`
- draft and published content stored side-by-side on every editable record

Runtime schema validation is intentionally loose for the nested content payloads:
- top-level table shape is enforced
- nested `draft` / `published` content is stored as `v.any()`

The strict content contract lives in [convex/cmsModel.ts](/home/shami/workspaces/directive-films/convex/cmsModel.ts) and in the external design doc [cms-schema.md](</home/shami/Documents/coaching_vault/Working/w_2026_5_26/cms-schema.md>).

## Main Functions

Pages:
- `bootstrapCms`
- `seedCurrentSiteContent`
- `getPageDraft`
- `listPagesDraft`
- `getPublishedPage`
- `getPageResource`
- `getLocaleBundles`
- `updatePageDraft`
- `replacePageResourceLocale`
- `reorderPageSections`
- `insertSection`
- `removeSection`
- `publishPage`
- `discardPageDraft`

Projects:
- `listProjectsDraft`
- `getProjectDraft`
- `listPublishedProjects`
- `getPublishedProject`
- `createProjectDraft`
- `updateProjectDraft`
- `reorderProjects`
- `publishProject`
- `discardProjectDraft`

Other collections follow the same pattern:
- `services`
- `teamMembers`
- `testimonials`
- `companyLogos`
- `openPositions`

Site settings:
- `getSiteSettingsDraft`
- `getPublishedSiteSettings`
- `updateSiteSettingsDraft`
- `publishSiteSettings`
- `discardSiteSettingsDraft`

File storage:
- `generateUploadUrl`
- `getFileUrl`
- `getFileMetadata`
- `deleteFile`

Agent/CLI helpers:
- `listCliTargets`
- `getPageOutline`
- `createPageSection`
- `replacePageSections`
- `setSectionLabel`
- `appendBlockToSection`
- `replaceSectionBlocks`
- `rebuildHomePageDraft`
- `setHeadingBlockText`
- `setParagraphBlockText`
- `setButtonBlock`
- `setImageBlock`
- `setCollectionSectionItems`
- `updateProjectBasics`
- `updateServiceBasics`
- `updateTeamMemberBasics`
- `updateCompanyLogoBasics`
- `updateSiteSettingsContact`

## Expected Frontend Flow

Admin editor:
1. Call `bootstrapCms` once in development or setup.
2. Load draft records through `getPageDraft` / collection draft queries.
3. Keep local dirty state in the frontend.
4. Save by calling `update...Draft`.
5. Publish by calling `publish...`.

Public site:
1. Query only published page and collection functions.
2. Render `published` content only.

Current integration path:
1. `seedCurrentSiteContent` seeds Convex from the current live frontend content.
2. `getLocaleBundles` exposes DB-backed locale bundles in the same shape as the existing page JSON files.
3. `src/cms/useCmsLocaleBundles.ts` merges those bundles into i18next at runtime.
4. The public site continues using existing `t(...)` calls, but the values come from Convex when configured.
5. `/admin/pages/:slug` edits the same DB-backed locale bundle the public page consumes.

## CLI / Agent Flow

The generic `update...Draft({ patch })` mutations are still available, but agents should prefer the narrower helpers in [convex/cliHelpers.ts](/home/shami/workspaces/directive-films/convex/cliHelpers.ts).

Use them like this:

1. Call `listCliTargets` to discover available pages and collection slugs.
2. Call `getPageOutline({ slug })` to inspect current section and block IDs.
3. Use specific mutations for changes:
   - `createPageSection`
   - `replacePageSections`
   - `appendBlockToSection`
   - `replaceSectionBlocks`
   - `rebuildHomePageDraft`
   - `setHeadingBlockText`
   - `setParagraphBlockText`
   - `setButtonBlock`
   - `setImageBlock`
   - `setCollectionSectionItems`
   - `updateProjectBasics`
   - `updateServiceBasics`
   - `updateTeamMemberBasics`
   - `updateSiteSettingsContact`
4. Call the existing publish mutations when the draft is ready.

These helpers are intentionally narrow so an agent can update content safely without constructing large nested patch objects by hand.

For full homepage reconstruction, prefer:

1. `getPageOutline({ slug: "home" })` if the agent wants to preserve or inspect existing IDs.
2. `rebuildHomePageDraft({ sections })` if the agent wants to replace the entire homepage draft in one pass.
3. `replaceSectionBlocks({ slug: "home", sectionId, blocks })` if the agent wants to rewrite one section without touching the others.

## Auth

This scaffold does not enforce editor auth yet.

That was left out intentionally because the repo currently has no Convex auth setup and you asked for backend plumbing first.

Before exposing the editor publicly, add:
- editor authentication
- admin/editor authorization
- mutation access control
