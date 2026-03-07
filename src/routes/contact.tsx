import type { Route } from "./+types/contact";
import ContactPage from "@/components/pages/contact/contact-page";

export function meta({ params }: Route.MetaArgs) {
  const lang = params.lang || "en";

  const content = {
    en: {
      title: "Contact - DirectiveFilms",
      description: "Tell us what you're working on. We'll get back within 24 hours with honest thoughts on how we might help.",
    },
    fr: {
      title: "Contact - DirectiveFilms",
      description: "Dites-nous sur quoi vous travaillez. Nous vous répondrons dans les 24 heures avec des réflexions honnêtes sur la façon dont nous pourrions vous aider.",
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

export default function Contact() {
  return <ContactPage />;
}
