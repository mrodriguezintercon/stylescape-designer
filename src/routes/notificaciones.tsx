import { createFileRoute } from "@tanstack/react-router";
import { StandardView } from "@/components/intercore/views";
import { searchValidator } from "@/data/intercore";
export const Route = createFileRoute("/notificaciones")({
  validateSearch: searchValidator,
  head: () => ({
    meta: [
      { title: "Notificaciones · Intercore | Intercon" },
      { name: "description", content: "Notificaciones de tu espacio de trabajo en Intercon." },
      { property: "og:title", content: "Notificaciones · Intercore | Intercon" },
      {
        property: "og:description",
        content: "Notificaciones de tu espacio de trabajo en Intercon.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <StandardView view="notificaciones" />,
});
