import type { Route } from "./+types/services";
import ServicesPage from "@/components/pages/services/services-page";

export function meta(_args: Route.MetaArgs) {
  return [
    { title: "Services - DirectiveFilms" },
    {
      name: "description",
      content:
        "Video production, marketing strategy, and creative services by DirectiveFilms",
    },
  ];
}

export default function Services() {
  return <ServicesPage />;
}
