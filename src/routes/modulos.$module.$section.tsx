import { createFileRoute } from "@tanstack/react-router";
import { ModuleView } from "@/components/intercore/views";
export const Route = createFileRoute("/modulos/$module/$section")({
  head: ({ params }) => ({
    meta: [
      { title: params.section + " · Cotizador Light | Intercore" },
      { name: "description", content: "Gestiona cotizaciones y preferencias en Intercore." },
      { property: "og:title", content: params.section + " · Cotizador Light | Intercore" },
      { property: "og:description", content: "Gestiona cotizaciones y preferencias en Intercore." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});
function Page() {
  const { module, section } = Route.useParams();
  return <ModuleView id={module} section={section} />;
}
