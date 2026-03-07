import type { Route } from "./+types/services";
import ServicesPage from "@/components/pages/services/services-page";

export function meta({ params }: Route.MetaArgs) {
  const lang = params.lang || "en";

  const content = {
    en: {
      title: "Services - DirectiveFilms",
      description: "Five specialized services: audit, coaching, video production, web development, and CRM systems. Connected into one growth system that drives revenue.",
    },
    fr: {
      title: "Services - DirectiveFilms",
      description: "Cinq services spécialisés : audit, coaching, production vidéo, développement web et systèmes CRM. Connectés en un seul système de croissance qui génère des revenus.",
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

export default function Services() {
  return <ServicesPage />;
}
