import type { Route } from "./+types/home";
import HomePage from "@/components/pages/home/home-page";

export function meta({ params }: Route.MetaArgs) {
  const lang = params.lang || "en";

  const translations = {
    en: {
      title: "DirectiveFilms - Performance video ads for ambitious brands",
      description: "DirectiveFilms produces cinematic direct-response video ads designed to turn attention into revenue.",
    },
    fr: {
      title: "DirectiveFilms - Publicites video performantes pour marques ambitieuses",
      description: "DirectiveFilms produit des publicites video cinematographiques concues pour transformer l'attention en revenus.",
    }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  return [
    { title: t.title },
    {
      name: "description",
      content: t.description,
    },
  ];
}

export default function Home() {
  return <HomePage />;
}
