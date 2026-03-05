import type { Route } from "./+types/build";
import BuildPage from "@/components/pages/services/build/build-page";

export function meta(_args: Route.MetaArgs) {
  return [
    { title: "Web Development - DirectiveFilms" },
    {
      name: "description",
      content:
        "Your 24/7 salesperson. Fast, conversion-focused websites that work while you sleep.",
    },
  ];
}

export default function Build() {
  return <BuildPage />;
}
