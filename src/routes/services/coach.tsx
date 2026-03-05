import type { Route } from "./+types/coach";
import CoachPage from "@/components/pages/services/coach/coach-page";

export function meta(_args: Route.MetaArgs) {
  return [
    { title: "Content Coaching - DirectiveFilms" },
    {
      name: "description",
      content:
        "Build your in-house content engine. We set up your studio, train your team, and give you the frameworks to create professional video content consistently.",
    },
  ];
}

export default function Coach() {
  return <CoachPage />;
}
