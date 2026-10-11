import { createFileRoute } from "@tanstack/react-router";
import { ModuleView } from "@/components/intercore/views";
export const Route = createFileRoute("/modulos/$module/")({
  head: ({ params }) => ({
    meta: [
      { title: params.module + " · Inicio del módulo | Intercore" },
      { name: "description", content: "Inicio y actividad de tu módulo en Intercore." },
      { property: "og:title", content: params.module + " · Inicio del módulo | Intercore" },
      { property: "og:description", content: "Inicio y actividad de tu módulo en Intercore." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});
function Page() {
  const { module } = Route.useParams();
  return <ModuleView id={module} />;
}
