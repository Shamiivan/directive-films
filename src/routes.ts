import { type RouteConfig, route, index } from "@react-router/dev/routes";

export default [
  index("routes/root-redirect.tsx"),
  route("/:lang", "routes/locale-layout.tsx", [
    index("routes/home.tsx"),
    route("about", "routes/about.tsx"),
    route("careers", "routes/careers.tsx"),
    route("contact", "routes/contact.tsx"),
    route("services", "routes/services.tsx"),
  ]),
  route("/design-system", "routes/design-system.tsx"),
] satisfies RouteConfig;
