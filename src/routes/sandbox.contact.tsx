import ContactPage from "@/components/pages/contact/contact-page";

export function meta() {
  return [
    { title: "Sandbox Contact - DirectiveFilms" },
    {
      name: "description",
      content: "Sandbox contact page for DirectiveFilms.",
    },
  ];
}

export default function SandboxContact() {
  return <ContactPage />;
}
