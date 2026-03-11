import type { Route } from "./+types/privacy";
import PrivacyPolicyPage from "@/components/pages/privacy/privacy-page";

export function meta({ params }: Route.MetaArgs) {
  const lang = params.lang || "en";

  const content = {
    en: {
      title: "Privacy Policy - DirectiveFilms",
      description: "Learn how DirectiveFilms collects, uses, and protects your personal information.",
    },
    fr: {
      title: "Politique de confidentialité - DirectiveFilms",
      description: "Découvrez comment DirectiveFilms collecte, utilise et protège vos informations personnelles.",
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

export default function Privacy() {
  return <PrivacyPolicyPage />;
}
