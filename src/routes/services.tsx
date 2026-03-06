import type { Route } from "./+types/services";
import ServicesPage from "@/components/pages/services/services-page";

export function meta(_args: Route.MetaArgs) {
  return [
    { title: "Services - DirectiveFilms" },
    {
      name: "description",
      content:
        "Five specialized services — audit, coaching, video production, web development, and CRM systems — connected into one growth system that drives revenue.",
    },
  ];
}

export default function Services() {
  return <ServicesPage />;
}
