import type { Route } from "./+types/diagnose";
import DiagnosePage from "@/components/pages/services/diagnose/diagnose-page";

export function meta(_args: Route.MetaArgs) {
  return [
    { title: "Online Presence Audit - DirectiveFilms" },
    {
      name: "description",
      content:
        "See what's really happening with your online presence. We audit your messaging, brand positioning, and digital footprint to find what's costing you opportunities.",
    },
  ];
}

export default function Diagnose() {
  return <DiagnosePage />;
}
