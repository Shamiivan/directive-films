import type { Route } from "./+types/home";
import HomePage from "@/components/pages/home/home-page";

export function meta(_args: Route.MetaArgs) {
  return [
    { title: "DirectiveFilms - Driven by Purpose, Defined by Excellence" },
    {
      name: "description",
      content:
        "We connect your content, website, and sales process so they work together. Video production, web dev, CRM, and coaching for B2B teams.",
    },
  ];
}

export default function Home() {
  return <HomePage />;
}
