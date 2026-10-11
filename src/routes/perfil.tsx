import { createFileRoute } from "@tanstack/react-router";
import { StandardView } from "@/components/intercore/views";
import { searchValidator } from "@/data/intercore";
export const Route = createFileRoute("/perfil")({
  validateSearch: searchValidator,
  head: () => ({
    meta: [
      { title: "Mi perfil · Intercore | Intercon" },
      { name: "description", content: "Mi perfil de tu espacio de trabajo en Intercon." },
      { property: "og:title", content: "Mi perfil · Intercore | Intercon" },
      { property: "og:description", content: "Mi perfil de tu espacio de trabajo en Intercon." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <StandardView view="perfil" />,
});
