import type { Route } from "./+types/home";
import HomePage from "@/components/pages/home/home-page";

export function meta({ params }: Route.MetaArgs) {
  const lang = params.lang || "en";

  const translations = {
    en: {
      title: "DirectiveFilms - Driven by Purpose, Defined by Excellence",
      description: "We connect your content, website, and sales process so they work together. Video production, web dev, CRM, and coaching for B2B teams.",
    },
    fr: {
      title: "DirectiveFilms - Motivés par la mission, définis par l'excellence",
      description: "Nous connectons votre contenu, votre site web et votre processus de vente pour qu'ils travaillent ensemble. Production vidéo, développement web, CRM et coaching pour les équipes B2B.",
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
