import type { Route } from "./+types/sandbox.home";
import { Navigate } from "react-router";

export function meta(_args: Route.MetaArgs) {
  return [
    { title: "DirectiveFilms - Home" },
    {
      name: "description",
      content: "DirectiveFilms home now lives on the production route.",
    },
  ];
}

export default function SandboxHome() {
  return <Navigate to="/en" replace />;
}
