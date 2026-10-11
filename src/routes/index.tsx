import { createFileRoute } from "@tanstack/react-router";
import { HomeView } from "@/components/intercore/views";
import { searchValidator } from "@/data/intercore";
export const Route = createFileRoute("/")({
  validateSearch: searchValidator,
  head: () => ({
    meta: [
      { title: "Inicio · Intercore | Intercon" },
      {
        name: "description",
        content: "Tu espacio de trabajo: pendientes, módulos y actividad de Intercon.",
      },
      { property: "og:title", content: "Inicio · Intercore | Intercon" },
      {
        property: "og:description",
        content: "Tu espacio de trabajo: pendientes, módulos y actividad de Intercon.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomeView,
});
