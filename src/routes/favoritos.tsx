import { createFileRoute } from "@tanstack/react-router";
import { StandardView } from "@/components/intercore/views";
import { searchValidator } from "@/data/intercore";
export const Route = createFileRoute("/favoritos")({
  validateSearch: searchValidator,
  head: () => ({
    meta: [
      { title: "Mis favoritos · Intercore | Intercon" },
      { name: "description", content: "Mis favoritos de tu espacio de trabajo en Intercon." },
      { property: "og:title", content: "Mis favoritos · Intercore | Intercon" },
      {
        property: "og:description",
        content: "Mis favoritos de tu espacio de trabajo en Intercon.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <StandardView view="favoritos" />,
});
