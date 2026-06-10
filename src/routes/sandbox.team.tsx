import AboutPage from "@/components/pages/about/about-page";

export function meta() {
  return [
    { title: "Sandbox Team - DirectiveFilms" },
    {
      name: "description",
      content: "Sandbox team page for DirectiveFilms.",
    },
  ];
}

export default function SandboxTeam() {
  return <AboutPage />;
}
