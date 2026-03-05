import type { Route } from "./+types/create";
import CreatePage from "@/components/pages/services/create/create-page";

export function meta(_args: Route.MetaArgs) {
  return [
    { title: "Video Production - DirectiveFilms" },
    {
      name: "description",
      content:
        "Cinematic video production built around your sales process. Strategic scripting, professional production, and content that converts.",
    },
  ];
}

export default function Create() {
  return <CreatePage />;
}
