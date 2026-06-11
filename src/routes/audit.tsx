import type { Route } from "./+types/audit";
import AuditPage from "@/components/pages/audit/audit-page";

export function meta({ params }: Route.MetaArgs) {
  const lang = params.lang || "en";

  const content = {
    en: {
      title: "Free Growth Audit - DirectiveFilms",
      description: "Get a free growth audit. We'll show you where you're losing money and what to fix first - no pitch, no commitment.",
    },
    fr: {
      title: "Audit de croissance gratuit - DirectiveFilms",
      description: "Obtenez un audit de croissance gratuit. Nous vous montrons où vous perdez de l'argent et quoi corriger en premier - sans pitch, sans engagement.",
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

export default function Audit() {
  return <AuditPage />;
}
