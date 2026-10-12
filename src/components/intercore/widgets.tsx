import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Star,
  Clock,
  Check,
  Inbox,
  Bell,
  ShieldX,
  LockKeyhole,
  AlertCircle,
  RefreshCw,
  LoaderCircle,
  ChevronDown,
  Plus,
  FileText,
  CalendarDays,
  CheckCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { modules, initialTasks, type TaskStatus } from "@/data/intercore";
import { cn } from "@/lib/utils";
import { moduleIcons, ModuleLink, useWorkspace, type Destination } from "./shell";
import { Link } from "@tanstack/react-router";
export function PageHeading({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="page-heading">
      <div>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
      <div className="heading-actions">{children}</div>
    </div>
  );
}
export function SectionHeading({
  title,
  count,
  to,
  children,
}: {
  title: string;
  count?: number;
  to?: Destination;
  children?: React.ReactNode;
}) {
  const { search } = useWorkspace();
  return (
    <div className="section-heading">
      <h2>
        {title}
        {count !== undefined && <span className="section-count">{count}</span>}
      </h2>
      {to && (
        <Link to={to} search={search} className="text-link">
          Ver todos <ArrowRight size={14} />
        </Link>
      )}
      {children}
    </div>
  );
}
export function ModuleCard({ module: m }: { module: (typeof modules)[number] }) {
  const { favorites, toggleFavorite } = useWorkspace();
  const Icon = moduleIcons[m.icon as keyof typeof moduleIcons];
  return (
    <article className={cn("module-card", !m.available && "module-unavailable")}>
      <div className="module-card-top">
        <span className={cn("module-icon", `tone-${m.tone}`)}>
          <Icon size={23} />
        </span>
        <Button
          variant="ghost"
          size="icon"
          className={cn("favorite-button", favorites.includes(m.id) && "favorited")}
          aria-label={`${favorites.includes(m.id) ? "Quitar de" : "Agregar a"} favoritos: ${m.name}`}
          aria-pressed={favorites.includes(m.id)}
          onClick={() => toggleFavorite(m.id)}
        >
          <Star size={16} fill={favorites.includes(m.id) ? "currentColor" : "none"} />
        </Button>
      </div>
      <h3>{m.name}</h3>
      <p>{m.description}</p>
      <div className="module-card-bottom">
        <span className={cn("availability", !m.available && "coming-soon")}>
          <span className="status-dot" />
          {m.available ? "Disponible" : "Próximamente"}
        </span>
        <Button asChild variant="ghost" size="sm" className="module-access">
          <ModuleLink id={m.id}>
            {m.available ? "Acceder" : "Ver estado"}
            <ArrowUpRight size={16} />
          </ModuleLink>
        </Button>
      </div>
    </article>
  );
}
export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={cn(
        "status-badge",
        status === "Alta"
          ? "badge-danger"
          : status === "Media"
            ? "badge-warning"
            : status === "Completado"
              ? "badge-success"
              : status === "En progreso"
                ? "badge-brand"
                : "badge-neutral",
      )}
    >
      {status === "Alta" && <span className="priority-dot" />}
      {status}
    </span>
  );
}
export function PendingTaskList({ compact = false }: { compact?: boolean }) {
  const { tasks, setStatus, state } = useWorkspace();
  const [filter, setFilter] = useState("Todos");
  const [priority, setPriority] = useState("Todas");
  const [moduleFilter, setModuleFilter] = useState("Todos");
  const list = (state === "no-tasks" ? [] : tasks).filter(
    (t) =>
      (filter === "Todos" || t.status === filter) &&
      (priority === "Todas" || t.priority === priority) &&
      (moduleFilter === "Todos" || t.module === moduleFilter),
  );
  const display = compact ? list.filter((t) => t.status !== "Completado").slice(0, 3) : list;
  return (
    <>
      {!compact && (
        <div className="filter-toolbar">
          <div className="tabs">
            {["Todos", "Pendiente", "En progreso", "Completado"].map((s) => (
              <Button
                variant="ghost"
                key={s}
                onClick={() => setFilter(s)}
                aria-pressed={filter === s}
                className={cn("tab", filter === s && "active")}
              >
                {s}
              </Button>
            ))}
          </div>
          <div className="filters">
            <label>
              <span className="sr-only">Prioridad</span>
              <select
                aria-label="Filtrar por prioridad"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                {["Todas", "Alta", "Media", "Baja"].map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </label>
            <select
              aria-label="Filtrar por módulo"
              value={moduleFilter}
              onChange={(e) => setModuleFilter(e.target.value)}
            >
              {[
                "Todos",
                ...modules.filter((m) => m.available && m.authorized).map((m) => m.name),
              ].map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>
      )}
      {!display.length ? (
        <EmptyState
          title="Todo al día"
          description="No hay pendientes que coincidan con esta vista."
          icon="inbox"
        />
      ) : (
        <div className={cn("task-list", compact && "compact-task-list")}>
          {!compact && (
            <div className="task-table-head">
              <span>PENDIENTE</span>
              <span>PRIORIDAD</span>
              <span>FECHA LÍMITE</span>
              <span>ESTADO</span>
            </div>
          )}
          {display.map((t) => (
            <div className="task-row" key={t.id}>
              <div className="task-main">
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn("task-check", t.status === "Completado" && "completed")}
                  aria-label={`${t.status === "Completado" ? "Reabrir" : "Completar"}: ${t.title}`}
                  onClick={() =>
                    setStatus(t.id, t.status === "Completado" ? "Pendiente" : "Completado")
                  }
                >
                  {t.status === "Completado" ? <Check size={13} /> : <span />}
                </Button>
                <div>
                  <ModuleLink id={t.moduleId} className="task-title">
                    {t.title}
                  </ModuleLink>
                  <div className="task-detail">{compact ? t.module : t.detail}</div>
                </div>
              </div>
              <StatusBadge status={t.priority} />
              <span className={cn("task-due", t.due.startsWith("Hoy") && "due-today")}>
                <Clock size={12} />
                {t.due}
              </span>
              {!compact && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" aria-label={`Estado de ${t.title}`}>
                      <StatusBadge status={t.status} />
                      <ChevronDown size={12} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {(["Pendiente", "En progreso", "Completado"] as TaskStatus[]).map((s) => (
                      <DropdownMenuItem key={s} onClick={() => setStatus(t.id, s)}>
                        {s}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
export function NotificationCenter({ compact = false }: { compact?: boolean }) {
  const { notifications, markRead, state } = useWorkspace();
  const [filter, setFilter] = useState("Todas");
  const list = (state === "no-notifications" ? [] : notifications).filter(
    (n) => filter === "Todas" || (filter === "No leídas" ? !n.read : n.read),
  );
  return (
    <>
      {!compact && (
        <div className="filter-toolbar">
          <div className="tabs">
            {["Todas", "No leídas", "Leídas"].map((s) => (
              <Button
                variant="ghost"
                key={s}
                onClick={() => setFilter(s)}
                className={cn("tab", filter === s && "active")}
                aria-pressed={filter === s}
              >
                {s}
              </Button>
            ))}
          </div>
          <Button variant="ghost" onClick={() => markRead()}>
            <CheckCheck />
            Marcar todas como leídas
          </Button>
        </div>
      )}
      {!list.length ? (
        <EmptyState
          title="Sin notificaciones"
          description="Aquí aparecerán las novedades de tus módulos."
          icon="bell"
        />
      ) : (
        <div className={cn("notifications-list", compact && "compact-notifications")}>
          {(compact ? list.slice(0, 2) : list).map((n) => (
            <article key={n.id} className={cn("notification-row", !n.read && "unread")}>
              <div className="notification-symbol">
                <Bell size={17} />
              </div>
              <div className="notification-body">
                <div className="notification-title">
                  <h3>{n.title}</h3>
                  {!n.read && <span className="unread-dot" />}
                </div>
                {!compact && <p>{n.body}</p>}
                <div className="notification-meta">
                  <span>{n.module}</span>
                  <span>·</span>
                  <span>{n.time}</span>
                  {!compact && <StatusBadge status={n.type} />}
                </div>
                {!compact && (
                  <ModuleLink id={n.moduleId} className="text-link">
                    Ver en módulo <ArrowUpRight size={13} />
                  </ModuleLink>
                )}
              </div>
              {!n.read && !compact && (
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label={`Marcar como leída: ${n.title}`}
                  onClick={() => markRead(n.id)}
                >
                  <Check />
                </Button>
              )}
            </article>
          ))}
        </div>
      )}
    </>
  );
}
export function EmptyState({
  title,
  description,
  icon = "inbox",
  action,
}: {
  title: string;
  description: string;
  icon?: "inbox" | "bell" | "lock" | "error";
  action?: React.ReactNode;
}) {
  const Icon =
    icon === "bell" ? Bell : icon === "lock" ? LockKeyhole : icon === "error" ? AlertCircle : Inbox;
  return (
    <div className="empty-state">
      <span className="empty-state-icon">
        <Icon size={30} />
      </span>
      <h2>{title}</h2>
      <p>{description}</p>
      {action}
    </div>
  );
}
export function StateGate({ children }: { children: React.ReactNode }) {
  const { state, setState } = useWorkspace();
  if (state === "loading")
    return (
      <div className="loading-state" role="status">
        <LoaderCircle />
        <span>Cargando tu espacio de trabajo…</span>
        <div className="skeleton-grid">
          {[1, 2, 3].map((n) => (
            <div className="skeleton-block" key={n} />
          ))}
        </div>
        <Button variant="outline" onClick={() => setState("normal")}>
          Terminar carga simulada
        </Button>
      </div>
    );
  const states: Record<string, { title: string; description: string; icon: "lock" | "error" }> = {
    error: {
      title: "No pudimos cargar la información",
      description: "Ocurrió un problema al consultar tu espacio de trabajo. Intenta nuevamente.",
      icon: "error",
    },
    expired: {
      title: "Tu sesión ha expirado",
      description: "Vuelve a entrar para continuar con tu trabajo.",
      icon: "lock",
    },
    unauthorized: {
      title: "No tienes acceso a esta área",
      description: "Comunícate con tu administrador si necesitas acceso a este módulo.",
      icon: "lock",
    },
    disabled: {
      title: "Este módulo no está disponible",
      description: "Estamos preparando esta área. Tus otros módulos siguen disponibles.",
      icon: "error",
    },
  };
  const s = states[state];
  if (s)
    return (
      <EmptyState
        {...s}
        action={
          <Button onClick={() => setState("normal")}>
            <RefreshCw />
            {state === "expired"
              ? "Volver a entrar"
              : state === "error"
                ? "Reintentar"
                : "Volver a mi espacio"}
          </Button>
        }
      />
    );
  return <>{children}</>;
}
export function QuickActions() {
  const { state } = useWorkspace();
  if (state === "no-modules") return null;
  return (
    <div className="quick-actions">
      <Button asChild>
        <ModuleLink id="cotizador" section="nueva">
          <Plus />
          Nueva cotización
        </ModuleLink>
      </Button>
      <Button variant="outline" asChild>
        <ModuleLink id="cotizador" section="cotizaciones">
          <FileText />
          Mis cotizaciones
        </ModuleLink>
      </Button>
      <Button variant="outline" asChild>
        <ModuleLink id="recursos-humanos">
          <CalendarDays />
          Crear solicitud
        </ModuleLink>
      </Button>
    </div>
  );
}
export function RecentActivity() {
  return (
    <div className="activity-list">
      {[
        {
          initials: "AM",
          name: "Ana Martínez",
          action: "te asignó una cotización",
          module: "Cotizador Light",
          time: "Hace 15 min",
          tone: "brand",
        },
        {
          initials: "JL",
          name: "Jorge López",
          action: "agregó nuevas evidencias",
          module: "Auditoría",
          time: "Hace 42 min",
          tone: "violet",
        },
        {
          initials: "Tú",
          name: "Tú",
          action: "actualizaste un modelo de precios",
          module: "Price Model",
          time: "Hace 1 h",
          tone: "teal",
        },
      ].map((a) => (
        <div className="activity-row" key={a.initials}>
          <div className={cn("activity-avatar", `tone-${a.tone}`)}>{a.initials}</div>
          <div>
            <p>
              <strong>{a.name}</strong> {a.action}
            </p>
            <span>
              {a.module} <span>·</span> {a.time}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
