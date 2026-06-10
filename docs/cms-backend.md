# CMS Backend

The in-repo Convex CMS backend has been removed.

Directive Films now uses Avantech CMS as the external authoring system. The
public site keeps ownership of routes, layout, links, section behavior, and field
declarations. Avantech CMS owns editable published values.

Runtime integration lives in:

- [CMS_AUTHORING_FOR_LLMS.md](/home/shami/workspaces/directive-films/CMS_AUTHORING_FOR_LLMS.md)
- [src/cms/AvantechCms.tsx](/home/shami/workspaces/directive-films/src/cms/AvantechCms.tsx)
- [public/bridge.js](/home/shami/workspaces/directive-films/public/bridge.js)

Required website environment:

```env
VITE_CONVEX_URL=<avantech-cms-convex-url>
VITE_CMS_PROJECT_SLUG=directive-films
```

Do not add local CMS schema, generated Convex API imports, or `/admin` editor
routes back to this repo. Project registration belongs in Avantech CMS
`/admin/projects`.
