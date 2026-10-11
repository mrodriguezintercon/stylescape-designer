import { createFileRoute } from "@tanstack/react-router";
import { StandardView } from "@/components/intercore/views";
import { searchValidator } from "@/data/intercore";
export const Route = createFileRoute("/ayuda")({
  validateSearch: searchValidator,
  head: () => ({
    meta: [
      { title: "Centro de ayuda · Intercore | Intercon" },
      { name: "description", content: "Centro de ayuda de tu espacio de trabajo en Intercon." },
      { property: "og:title", content: "Centro de ayuda · Intercore | Intercon" },
      {
        property: "og:description",
        content: "Centro de ayuda de tu espacio de trabajo en Intercon.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <StandardView view="ayuda" />,
});
