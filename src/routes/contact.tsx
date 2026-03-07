import type { Route } from "./+types/contact";
import ContactPage from "@/components/pages/contact/contact-page";

export function meta(_args: Route.MetaArgs) {
  return [
    { title: "Contact - DirectiveFilms" },
    {
      name: "description",
      content: "Tell us what you're working on. We'll get back within 24 hours with honest thoughts on how we might help.",
    },
  ];
}

export default function Contact() {
  return <ContactPage />;
}
