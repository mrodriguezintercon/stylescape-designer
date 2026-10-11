import { createFileRoute, Outlet } from "@tanstack/react-router";
import { StandardView } from "@/components/intercore/views";
import { searchValidator } from "@/data/intercore";
export const Route = createFileRoute("/modulos")({
  validateSearch: searchValidator,
  head: () => ({
    meta: [
      { title: "Módulos · Intercore | Intercon" },
      { name: "description", content: "Módulos de tu espacio de trabajo en Intercon." },
      { property: "og:title", content: "Módulos · Intercore | Intercon" },
      { property: "og:description", content: "Módulos de tu espacio de trabajo en Intercon." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <Outlet />,
});
