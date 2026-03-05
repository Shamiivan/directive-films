import type { Route } from "./+types/contact";
import ContactPage from "@/components/pages/contact/contact-page";

export function meta(_args: Route.MetaArgs) {
  return [
    { title: "Contact - DirectiveFilms" },
    {
      name: "description",
      content: "Get in touch with DirectiveFilms for your next project",
    },
  ];
}

export default function Contact() {
  return <ContactPage />;
}
