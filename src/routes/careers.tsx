import type { Route } from "./+types/careers";
import CareersPage from "@/components/pages/careers/careers-page";

export function meta({ params }: Route.MetaArgs) {
  const lang = params.lang || "en";

  const content = {
    en: {
      title: "Careers - DirectiveFilms",
      description: "Small team, real clients, real results. Come build things that actually work.",
    },
    fr: {
      title: "Carrières - DirectiveFilms",
      description: "Petite équipe, vrais clients, vrais résultats. Venez construire des choses qui fonctionnent vraiment.",
    }
  };

  const selected = content[lang as keyof typeof content] || content.en;

  return [
    { title: selected.title },
    {
      name: "description",
      content: selected.description,
    },
  ];
}

export default function Careers() {
  return <CareersPage />;
}
