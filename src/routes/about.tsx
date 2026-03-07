import type { Route } from "./+types/about";
import AboutPage from "@/components/pages/about/about-page";

export function meta({ params }: Route.MetaArgs) {
  const lang = params.lang || "en";

  const content = {
    en: {
      title: "About - DirectiveFilms",
      description: "We came from sales, not marketing school. We built one system that connects your content to how you actually sell.",
    },
    fr: {
      title: "À propos - DirectiveFilms",
      description: "Nous venons de la vente, pas d'une école de marketing. Nous avons construit un système unique qui connecte votre contenu à votre façon de vendre.",
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

export default function About() {
  return <AboutPage />;
}
