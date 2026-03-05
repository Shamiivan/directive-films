import type { Route } from "./+types/home";
import HomePage from "@/components/pages/home/home-page";

export function meta(_args: Route.MetaArgs) {
  return [
    { title: "DirectiveFilms - Driven by Purpose, Defined by Excellence" },
    {
      name: "description",
      content:
        "Award-winning video production and marketing that generates measurable results",
    },
  ];
}

export default function Home() {
  return <HomePage />;
}
