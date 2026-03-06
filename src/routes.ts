import { type RouteConfig, route } from "@react-router/dev/routes";

export default [
  route("/", "routes/home.tsx"),
  route("/about", "routes/about.tsx"),
  route("/careers", "routes/careers.tsx"),
  route("/contact", "routes/contact.tsx"),
  route("/design-system", "routes/design-system.tsx"),
  route("/services", "routes/services.tsx"),
] satisfies RouteConfig;
