import { createFileRoute } from "@tanstack/react-router";
import { StandardView } from "@/components/intercore/views";
export const Route = createFileRoute("/modulos/")({
  head: () => ({
    meta: [
      { title: "Catálogo de módulos · Intercore | Intercon" },
      { name: "description", content: "Herramientas disponibles para tu trabajo en Intercon." },
      { property: "og:title", content: "Catálogo de módulos · Intercore | Intercon" },
      {
        property: "og:description",
        content: "Herramientas disponibles para tu trabajo en Intercon.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <StandardView view="modulos" />,
});
