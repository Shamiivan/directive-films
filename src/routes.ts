import { type RouteConfig, route } from "@react-router/dev/routes";

export default [
  route("/", "routes/home.tsx"),
  route("/about", "routes/about.tsx"),
  route("/careers", "routes/careers.tsx"),
  route("/contact", "routes/contact.tsx"),
  route("/design-system", "routes/design-system.tsx"),
  route("/services/diagnose", "routes/services/diagnose.tsx"),
  route("/services/coach", "routes/services/coach.tsx"),
  route("/services/create", "routes/services/create.tsx"),
  route("/services/optimize", "routes/services/optimize.tsx"),
  route("/services/build", "routes/services/build.tsx"),
] satisfies RouteConfig;
