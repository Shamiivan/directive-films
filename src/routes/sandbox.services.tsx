import ServicesPage from "@/components/pages/services/services-page";

export function meta() {
  return [
    { title: "Sandbox Services - DirectiveFilms" },
    {
      name: "description",
      content: "Sandbox services page for DirectiveFilms.",
    },
  ];
}

export default function SandboxServices() {
  return <ServicesPage />;
}
