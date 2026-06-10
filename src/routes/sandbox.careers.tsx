import CareersPage from "@/components/pages/careers/careers-page";

export function meta() {
  return [
    { title: "Sandbox Careers - DirectiveFilms" },
    {
      name: "description",
      content: "Sandbox careers page for DirectiveFilms.",
    },
  ];
}

export default function SandboxCareers() {
  return <CareersPage />;
}
