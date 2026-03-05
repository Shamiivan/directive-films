import type { Route } from "./+types/design-system";
import DesignSystemPage from "@/components/pages/design-system/design-system-page";

export function meta(_args: Route.MetaArgs) {
  return [
    { title: "Design System - DirectiveFilms" },
    {
      name: "description",
      content: "DirectiveFilms design tokens and component showcase",
    },
  ];
}

export default function DesignSystem() {
  return <DesignSystemPage />;
}
