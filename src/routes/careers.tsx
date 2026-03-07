import type { Route } from "./+types/careers";
import CareersPage from "@/components/pages/careers/careers-page";

export function meta(_args: Route.MetaArgs) {
  return [
    { title: "Careers - DirectiveFilms" },
    {
      name: "description",
      content: "Small team, real clients, real results. Come build things that actually work.",
    },
  ];
}

export default function Careers() {
  return <CareersPage />;
}
