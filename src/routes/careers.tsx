import type { Route } from "./+types/careers";
import CareersPage from "@/components/pages/careers/careers-page";

export function meta(_args: Route.MetaArgs) {
  return [
    { title: "Careers - DirectiveFilms" },
    {
      name: "description",
      content: "Join the DirectiveFilms team - explore career opportunities",
    },
  ];
}

export default function Careers() {
  return <CareersPage />;
}
