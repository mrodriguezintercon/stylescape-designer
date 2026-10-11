import { createFileRoute } from "@tanstack/react-router";
import { StandardView } from "@/components/intercore/views";
import { searchValidator } from "@/data/intercore";
export const Route = createFileRoute("/preferencias")({
  validateSearch: searchValidator,
  head: () => ({
    meta: [
      { title: "Preferencias · Intercore | Intercon" },
      { name: "description", content: "Preferencias de tu espacio de trabajo en Intercon." },
      { property: "og:title", content: "Preferencias · Intercore | Intercon" },
      { property: "og:description", content: "Preferencias de tu espacio de trabajo en Intercon." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <StandardView view="preferencias" />,
});
