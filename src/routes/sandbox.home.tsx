import type { Route } from "./+types/sandbox.home";
import SandboxHomePage from "@/components/pages/sandbox/home/sandbox-home-page";

export function meta(_args: Route.MetaArgs) {
  return [
    { title: "Sandbox Home - DirectiveFilms" },
    {
      name: "description",
      content: "Sandbox port of the Benjy home structure inside DirectiveFilms.",
    },
  ];
}

export default function SandboxHome() {
  return <SandboxHomePage />;
}
