import { createFileRoute, Outlet } from "@tanstack/react-router";
import { modules } from "@/data/intercore";
export const Route = createFileRoute("/modulos/$module")({
  head: ({ params }) => {
    const title = (modules.find((m) => m.id === params.module)?.name ?? "Módulo") + " · Intercore";
    return {
      meta: [
        { title },
        { name: "description", content: "Espacio de trabajo del módulo de Intercon." },
        { property: "og:title", content: title },
        { property: "og:description", content: "Espacio de trabajo del módulo de Intercon." },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: () => <Outlet />,
});
