import type { Route } from "./+types/optimize";
import OptimizePage from "@/components/pages/services/optimize/optimize-page";

export function meta(_args: Route.MetaArgs) {
  return [
    { title: "CRM & Sales Systems - DirectiveFilms" },
    {
      name: "description",
      content:
        "Turn your pipeline into a machine. CRM setup, sales sequences, and automation that converts leads into revenue.",
    },
  ];
}

export default function Optimize() {
  return <OptimizePage />;
}
