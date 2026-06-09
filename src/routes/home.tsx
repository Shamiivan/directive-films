import type { Route } from "./+types/home";
import ComingSoonPage from "@/components/pages/coming-soon/coming-soon-page";

export function meta({ params }: Route.MetaArgs) {
  const lang = params.lang || "en";

  const translations = {
    en: {
      title: "DirectiveFilms - Coming Soon",
      description: "DirectiveFilms is putting the finishing touches on something great.",
    },
    fr: {
      title: "DirectiveFilms - Bientôt disponible",
      description: "DirectiveFilms met la touche finale à quelque chose de grand.",
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
  return <ComingSoonPage />;
}
