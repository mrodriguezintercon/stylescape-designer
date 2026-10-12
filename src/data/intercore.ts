export type VisualStyle = "corporate" | "command" | "portal";
export const styles = [
  { id: "corporate", name: "Corporate Workspace" },
  { id: "command", name: "Command Center" },
  { id: "portal", name: "Modular Portal" },
] as const;
export function prototypeVisible(isDevelopment: boolean): boolean {
  return isDevelopment;
}
export function parseStyle(value: unknown, isDevelopment = import.meta.env.DEV): VisualStyle {
  if (!isDevelopment) return "corporate";
  return value === "command" || value === "portal" ? value : "corporate";
}
export const modules = [
  {
    id: "cotizador",
    name: "Cotizador Light",
    description: "Crea, gestiona y da seguimiento a tus cotizaciones de forma ágil.",
    icon: "calculator",
    tone: "brand",
    available: true,
    authorized: true,
    tag: "Comercial",
  },
  {
    id: "administracion",
    name: "Administración",
    description: "Gestiona recursos, documentos y procesos administrativos.",
    icon: "building",
    tone: "teal",
    available: true,
    authorized: true,
    tag: "Operaciones",
  },
  {
    id: "auditoria",
    name: "Auditoría",
    description: "Consulta revisiones, evidencias y el cumplimiento de procesos.",
    icon: "shield",
    tone: "violet",
    available: true,
    authorized: true,
    tag: "Control interno",
  },
  {
    id: "price-model",
    name: "Price Model",
    description: "Analiza estructuras de costos y modelos de precios.",
    icon: "chart",
    tone: "amber",
    available: true,
    authorized: true,
    tag: "Estrategia",
  },
  {
    id: "recursos-humanos",
    name: "Recursos humanos",
    description: "Tu equipo, solicitudes y procesos de talento en un solo lugar.",
    icon: "users",
    tone: "rose",
    available: true,
    authorized: true,
    tag: "Personas",
  },
  {
    id: "proyectos",
    name: "Gestión de proyectos",
    description: "Una nueva forma de planear y colaborar con tu equipo.",
    icon: "layers",
    tone: "neutral",
    available: false,
    authorized: true,
    tag: "Próximamente",
  },
  {
    id: "finanzas",
    name: "Finanzas privadas",
    description: "Control financiero reservado.",
    icon: "building",
    tone: "teal",
    available: true,
    authorized: false,
    tag: "Restringido",
  },
];
export function authorizedModules(list = modules) {
  return list.filter((m) => m.authorized);
}
export function canAccessModule(id: string) {
  const m = modules.find((m) => m.id === id);
  return Boolean(m?.authorized && m.available);
}
export type TaskStatus = "Pendiente" | "En progreso" | "Completado";
export const initialTasks = [
  {
    id: 1,
    title: "Revisar cotización para Grupo Altea",
    detail: "COT-2026-0148 · Requiere tu aprobación",
    module: "Cotizador Light",
    moduleId: "cotizador",
    priority: "Alta",
    due: "Hoy, 14:00",
    status: "Pendiente" as TaskStatus,
  },
  {
    id: 2,
    title: "Completar evidencias de auditoría",
    detail: "Auditoría interna · Octubre 2026",
    module: "Auditoría",
    moduleId: "auditoria",
    priority: "Alta",
    due: "Hoy, 18:00",
    status: "En progreso" as TaskStatus,
  },
  {
    id: 3,
    title: "Validar actualización de precios",
    detail: "Modelo de precios · Región centro",
    module: "Price Model",
    moduleId: "price-model",
    priority: "Media",
    due: "Mañana",
    status: "Pendiente" as TaskStatus,
  },
  {
    id: 4,
    title: "Aprobar solicitud de vacaciones",
    detail: "Mariana López · 3 días solicitados",
    module: "Recursos humanos",
    moduleId: "recursos-humanos",
    priority: "Media",
    due: "13 oct",
    status: "Pendiente" as TaskStatus,
  },
  {
    id: 5,
    title: "Actualizar expediente de proveedor",
    detail: "Servicios Integrales del Norte",
    module: "Administración",
    moduleId: "administracion",
    priority: "Baja",
    due: "14 oct",
    status: "Pendiente" as TaskStatus,
  },
  {
    id: 6,
    title: "Enviar cotización a Corporativo Delta",
    detail: "COT-2026-0132 · Enviada al cliente",
    module: "Cotizador Light",
    moduleId: "cotizador",
    priority: "Baja",
    due: "10 oct",
    status: "Completado" as TaskStatus,
  },
];
export const initialNotifications = [
  {
    id: 1,
    title: "Tienes una cotización por aprobar",
    body: "Ana Martínez te asignó la cotización COT-2026-0148 de Grupo Altea.",
    module: "Cotizador Light",
    moduleId: "cotizador",
    time: "Hace 15 min",
    type: "Solicitud",
    read: false,
  },
  {
    id: 2,
    title: "Nueva evidencia disponible",
    body: "El equipo de Control Interno agregó 3 documentos a la auditoría de octubre.",
    module: "Auditoría",
    moduleId: "auditoria",
    time: "Hace 42 min",
    type: "Actualización",
    read: false,
  },
  {
    id: 3,
    title: "Actualización del modelo de precios",
    body: "La versión 2.4 está lista para tu revisión.",
    module: "Price Model",
    moduleId: "price-model",
    time: "Hace 1 h",
    type: "Aviso",
    read: false,
  },
  {
    id: 4,
    title: "Tu solicitud fue aprobada",
    body: "La solicitud de equipo de trabajo fue aprobada por Administración.",
    module: "Administración",
    moduleId: "administracion",
    time: "Ayer",
    type: "Confirmación",
    read: true,
  },
];
export const stateOptions = [
  { id: "normal", name: "Vista normal" },
  { id: "loading", name: "Cargando" },
  { id: "no-modules", name: "Sin módulos autorizados" },
  { id: "no-tasks", name: "Sin pendientes" },
  { id: "no-notifications", name: "Sin notificaciones" },
  { id: "error", name: "Error de carga" },
  { id: "expired", name: "Sesión expirada" },
  { id: "unauthorized", name: "Acceso no autorizado" },
  { id: "disabled", name: "Módulo deshabilitado" },
];
export const searchValidator = (search: Record<string, unknown>) => ({
  style: parseStyle(search["style"]),
  state:
    typeof search["state"] === "string" && stateOptions.some((s) => s.id === search["state"])
      ? search["state"]
      : "normal",
});

export const initialQuotes = [
  { id: "COT-2026-0148", client: "Grupo Altea", total: 128450, status: "Por aprobar" },
  { id: "COT-2026-0142", client: "Corporativo Delta", total: 86700, status: "Enviada" },
  { id: "COT-2026-0139", client: "Servicios del Norte", total: 45200, status: "Borrador" },
];
