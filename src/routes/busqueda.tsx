import { createFileRoute } from "@tanstack/react-router";
import { StandardView } from "@/components/intercore/views";
import { searchValidator } from "@/data/intercore";
export const Route = createFileRoute("/busqueda")({
  validateSearch: searchValidator,
  head: () => ({
    meta: [
      { title: "Búsqueda global · Intercore | Intercon" },
      { name: "description", content: "Búsqueda global de tu espacio de trabajo en Intercon." },
      { property: "og:title", content: "Búsqueda global · Intercore | Intercon" },
      {
        property: "og:description",
        content: "Búsqueda global de tu espacio de trabajo en Intercon.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <StandardView view="busqueda" />,
});
