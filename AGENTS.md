When converting this or another public website for Avantech CMS editing, read
`CMS_AUTHORING_FOR_LLMS.md` first. The website owns routes, layout, links, and
behavior; Avantech CMS owns only editable published values.

This repo does not own the CMS Convex backend. Keep `convex` as a public-site
client dependency for Avantech CMS reads, but do not add local CMS schemas,
generated CMS API imports, or `/admin` editor routes here.
