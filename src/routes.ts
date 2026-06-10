import { type RouteConfig, route, index } from "@react-router/dev/routes";

export default [
  index("routes/root-redirect.tsx"),
  route("/:lang", "routes/locale-layout.tsx", [
    index("routes/home.tsx"),
    route("about", "routes/about.tsx"),
    route("careers", "routes/careers.tsx"),
    route("contact", "routes/contact.tsx"),
    route("services", "routes/services.tsx"),
    route("privacy", "routes/privacy.tsx"),
  ]),
  route("/admin/login", "routes/admin.login.tsx"),
  route("/admin", "routes/admin.tsx", [
    index("routes/admin.dashboard.tsx"),
    route("pages", "routes/admin.pages.tsx"),
    route("pages/:slug", "routes/admin.pages.$slug.tsx"),
    route("projects", "routes/admin.projects.tsx"),
    route("services", "routes/admin.services.tsx"),
    route("team", "routes/admin.team.tsx"),
    route("testimonials", "routes/admin.testimonials.tsx"),
    route("positions", "routes/admin.positions.tsx"),
    route("settings", "routes/admin.settings.tsx"),
    route("media", "routes/admin.media.tsx"),
  ]),
  route("/design-system", "routes/design-system.tsx"),
  route("/sandbox/home", "routes/sandbox.home.tsx"),
  route("/sandbox/services", "routes/sandbox.services.tsx"),
  route("/sandbox/team", "routes/sandbox.team.tsx"),
  route("/sandbox/careers", "routes/sandbox.careers.tsx"),
  route("/sandbox/contact", "routes/sandbox.contact.tsx"),
] satisfies RouteConfig;
