import type { Route } from "./+types/about";
import AboutPage from "@/components/pages/about/about-page";

export function meta(_args: Route.MetaArgs) {
  return [
    { title: "About - DirectiveFilms" },
    {
      name: "description",
      content: "We came from sales, not marketing school. We built one system that connects your content to how you actually sell.",
    },
  ];
}

export default function About() {
  return <AboutPage />;
}
