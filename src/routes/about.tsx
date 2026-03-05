import type { Route } from "./+types/about";
import AboutPage from "@/components/pages/about/about-page";

export function meta(_args: Route.MetaArgs) {
  return [
    { title: "About - DirectiveFilms" },
    {
      name: "description",
      content: "Learn about DirectiveFilms and our mission",
    },
  ];
}

export default function About() {
  return <AboutPage />;
}
