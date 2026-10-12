import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Plus,
  CheckSquare,
  Bell,
  Layers,
  Clock,
  Star,
  ChevronDown,
  Search,
  ShieldCheck,
  FileText,
  Settings,
  Mail,
  Building2,
  UserRound,
  LogOut,
  HelpCircle,
  CalendarDays,
  CheckCircle2,
  Command,
  TriangleAlert,
  SlidersHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { authorizedModules, modules, canAccessModule, styles } from "@/data/intercore";
import { cn } from "@/lib/utils";
import { useWorkspace, ModuleLink, moduleIcons } from "./shell";
import {
  PageHeading,
  SectionHeading,
  ModuleCard,
  PendingTaskList,
  NotificationCenter,
  StateGate,
  EmptyState,
  QuickActions,
  RecentActivity,
  StatusBadge,
} from "./widgets";
export function HomeView() {
  return (
    <StateGate>
      <CorporateHome />
    </StateGate>
  );
}
function Greeting() {
  return (
    <PageHeading
      title="Buen día, Alejandro"
      description="Intercore · Intercon México"
    >
      <span className="date-label">
        <CalendarDays size={15} />
        Domingo, 11 de octubre de 2026
      </span>
    </PageHeading>
  );
}
function Metrics() {
  const { tasks, notifications, state, search } = useWorkspace();
  const pending = state === "no-tasks" ? 0 : tasks.filter((t) => t.status !== "Completado").length;
  return (
    <div className="metrics-grid">
      {[
        {
          title: "Pendientes por atender",
          value: String(pending).padStart(2, "0"),
          sub: pending ? "2 requieren tu atención hoy" : "Todo al día",
          icon: CheckSquare,
          tone: "amber",
          to: "/pendientes" as const,
        },
        {
          title: "Notificaciones nuevas",
          value: String(
            state === "no-notifications" ? 0 : notifications.filter((n) => !n.read).length,
          ).padStart(2, "0"),
          sub: "Mantente al tanto de tu trabajo",
          icon: Bell,
          tone: "brand",
          to: "/notificaciones" as const,
        },
        {
          title: "Módulos disponibles",
          value: state === "no-modules" ? "00" : "05",
          sub: "Herramientas para tu día a día",
          icon: Layers,
          tone: "teal",
          to: "/modulos" as const,
        },
      ].map((m) => (
        <Link key={m.title} to={m.to} search={search} className="metric-item">
          <div className="metric-top">
            <span>{m.title}</span>
            <m.icon className={cn("metric-icon", `text-tone-${m.tone}`)} size={18} />
          </div>
          <strong>
            {m.value}
            <ArrowUpRight size={17} />
          </strong>
          <small className={m.tone === "amber" && pending ? "text-warning" : ""}>
            {m.tone === "amber" && pending ? <span className="priority-dot" /> : null}
            {m.sub}
          </small>
        </Link>
      ))}
    </div>
  );
}

function CorporateHome() {
  const { tasks, state } = useWorkspace();
  const pendingCount = state === "no-tasks" ? 0 : tasks.filter((t) => t.status !== "Completado").length;
  return (
    <>
      <Greeting />
      <section className="section-block workspace-actions">
        <SectionHeading title="Acciones rápidas" />
        <QuickActions />
      </section>
      <div className="home-columns">
        <section className="priority-section">
          <SectionHeading
            title="Tus pendientes prioritarios"
            count={pendingCount}
            to="/pendientes"
          />
          <PendingTaskList compact />
        </section>
        <section className="favorites-section">
          <SectionHeading title="Tus favoritos" to="/favoritos" />
          <FavoriteLinks />
        </section>
      </div>
      <section className="section-block">
        <SectionHeading title="Módulos autorizados" to="/modulos" />
        <ModuleGrid />
      </section>
      <div className="home-columns bottom-columns">
        <section>
          <SectionHeading title="Actividad reciente" />
          <RecentActivity />
        </section>
        <section>
          <SectionHeading title="Notificaciones" to="/notificaciones" />
          <NotificationCenter compact />
        </section>
      </div>
    </>
  );
}
function FavoriteLinks() {
  const { favorites, state, search } = useWorkspace();
  const list =
    state === "no-modules" ? [] : authorizedModules().filter((m) => favorites.includes(m.id));
  return list.length ? (
    <div className="favorite-links">
      {list.map((m) => {
        const Icon = moduleIcons[m.icon as keyof typeof moduleIcons];
        return (
          <ModuleLink id={m.id} key={m.id} className="favorite-link">
            <span className={cn("module-icon", `tone-${m.tone}`)}>
              <Icon size={20} />
            </span>
            <div>
              <strong>{m.name}</strong>
              <small>{m.tag}</small>
            </div>
            <ArrowUpRight size={16} />
          </ModuleLink>
        );
      })}
      <Link to="/modulos" search={search} className="add-favorite">
        <Plus size={15} />
        Agregar un favorito
      </Link>
    </div>
  ) : (
    <EmptyState
      title="Tu próximo acceso directo"
      description="Agrega módulos a favoritos para encontrarlos aquí."
    />
  );
}
function CommandHome() {
  const { tasks, search } = useWorkspace();
  return (
    <>
      <PageHeading
        eyebrow="CENTRO DE OPERACIONES"
        title="Tu día, bajo control."
        description="Alejandro, esto es lo que requiere tu atención."
      >
        <span className="live-label">
          <span className="status-dot" />
          Operación activa
        </span>
        <Button asChild>
          <ModuleLink id="cotizador" section="nueva">
            <Plus />
            Nueva cotización
          </ModuleLink>
        </Button>
      </PageHeading>
      <CommandSearch />
      <Metrics />
      <div className="command-layout">
        <section>
          <div className="command-priority-heading">
            <span>
              <TriangleAlert size={17} />
              ATENCIÓN PRIORITARIA
            </span>
            <span>11 OCT 2026</span>
          </div>
          <SectionHeading
            title="Cola de pendientes"
            count={tasks.filter((t) => t.due.startsWith("Hoy") && t.status !== "Completado").length}
            to="/pendientes"
          />
          <PendingTaskList />
          <section className="command-activity">
            <SectionHeading title="Flujo de actividad" />
            <RecentActivity />
          </section>
        </section>
        <aside className="command-rail">
          <SectionHeading title="Acciones" />
          <QuickActions />
          <div className="section-block">
            <SectionHeading title="Alertas y novedades" to="/notificaciones" />
            <NotificationCenter compact />
          </div>
          <div className="section-block">
            <SectionHeading title="Accesos frecuentes" />
            <FavoriteLinks />
          </div>
        </aside>
      </div>
      <section className="section-block">
        <SectionHeading title="Herramientas de operación" to="/modulos" />
        <ModuleGrid limit={3} />
      </section>
    </>
  );
}
function CommandSearch() {
  const { query, setQuery, search } = useWorkspace();
  return (
    <form
      className="command-search"
      action="/busqueda"
      onSubmit={(e) => {
        e.preventDefault();
        document.getElementById("command-search-go")?.click();
      }}
    >
      <Search size={22} />
      <input
        aria-label="Buscar operaciones"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="¿Qué necesitas encontrar? Cotizaciones, módulos, pendientes…"
      />
      <Button asChild variant="ghost">
        <Link id="command-search-go" to="/busqueda" search={search}>
          Buscar <ArrowRight />
        </Link>
      </Button>
    </form>
  );
}
function PortalHome() {
  const { search } = useWorkspace();
  return (
    <>
      <div className="portal-welcome">
        <div>
          <span className="eyebrow">BIENVENIDO A INTERCORE</span>
          <h1>Tu trabajo. Un mundo de posibilidades.</h1>
          <p>Hola, Alejandro. Encuentra el espacio para tu siguiente gran idea.</p>
        </div>
        <span className="portal-date">
          DOMINGO
          <br />
          <strong>11</strong> OCTUBRE
        </span>
      </div>
      <section className="portal-favorites">
        <SectionHeading title="Continúa donde te quedaste" to="/favoritos" />
        <FavoriteLinks />
      </section>
      <div className="portal-catalog-heading">
        <div>
          <span className="eyebrow">EXPLORA TU ESPACIO DE TRABAJO</span>
          <h2>Un módulo para cada necesidad.</h2>
        </div>
        <Button variant="outline" asChild>
          <Link to="/modulos" search={search}>
            <Layers />
            Todos los módulos
          </Link>
        </Button>
      </div>
      <ModuleGrid />
      <div className="home-columns bottom-columns">
        <section>
          <SectionHeading title="Lo que sigue" to="/pendientes" />
          <PendingTaskList compact />
        </section>
        <section>
          <SectionHeading title="En tu radar" to="/notificaciones" />
          <NotificationCenter compact />
        </section>
      </div>
      <section className="section-block">
        <SectionHeading title="Actividad reciente" />
        <RecentActivity />
      </section>
    </>
  );
}
export function ModuleGrid({
  limit,
  favoritesOnly = false,
}: {
  limit?: number;
  favoritesOnly?: boolean;
}) {
  const { state, favorites } = useWorkspace();
  const list = (state === "no-modules" ? [] : authorizedModules()).filter(
    (m) => !favoritesOnly || favorites.includes(m.id),
  );
  return list.length ? (
    <div className="module-grid">
      {(limit ? list.slice(0, limit) : list).map((m) => (
        <ModuleCard key={m.id} module={m} />
      ))}
    </div>
  ) : (
    <EmptyState
      title={favoritesOnly ? "Aún no tienes favoritos" : "Sin módulos autorizados"}
      description={
        favoritesOnly
          ? "Selecciona la estrella de un módulo para agregarlo a tus favoritos."
          : "Tu administrador puede asignarte acceso a las herramientas de Intercore."
      }
      icon="lock"
    />
  );
}
export function StandardView({ view }: { view: string }) {
  const { search, tasks, notifications, style, setStyle, signOut, query, setQuery } =
    useWorkspace();
  const [help, setHelp] = useState<string | null>(null);
  if (view === "perfil" || view === "preferencias")
    return (
      <StateGate>
        <PageHeading
          title={view === "perfil" ? "Mi perfil" : "Preferencias"}
          description="Tu información y tu espacio de trabajo."
        />
        <div className="profile-layout">
          <div className="profile-summary">
            <div className="profile-avatar">AR</div>
            <h2>Alejandro Ramírez</h2>
            <p>Coordinador comercial</p>
            <span className="status-badge badge-success">Cuenta activa</span>
          </div>
          <div className="profile-detail">
            <SectionHeading title="Información de la cuenta" />
            <dl>
              {[
                { label: "Nombre completo", value: "Alejandro Ramírez", icon: UserRound },
                { label: "Correo electrónico", value: "alejandro.ramirez@intercon.mx", icon: Mail },
                { label: "Área", value: "Comercial · Intercon México", icon: Building2 },
                { label: "Rol", value: "Coordinador comercial", icon: ShieldCheck },
              ].map((d) => (
                <div key={d.label}>
                  <dt>
                    <d.icon size={17} />
                    {d.label}
                  </dt>
                  <dd>{d.value}</dd>
                </div>
              ))}
            </dl>
            <div className="profile-preferences">
              <SectionHeading title="Preferencias" />
              {import.meta.env.DEV && <div className="preference-options">
                {styles.map((s) => (
                  <Button
                    key={s.id}
                    variant={style === s.id ? "default" : "outline"}
                    aria-pressed={style === s.id}
                    onClick={() => setStyle(s.id)}
                  >
                    {s.name}
                  </Button>
                ))}
              </div>}
              <p className="text-muted-foreground text-sm mt-3">
                Español (México) · Zona horaria: Ciudad de México
              </p>
            </div>
            <Button variant="outline" className="logout-button" onClick={signOut}>
              <LogOut />
              Cerrar sesión
            </Button>
          </div>
        </div>
      </StateGate>
    );
  if (view === "ayuda")
    return (
      <StateGate>
        <PageHeading
          title="Centro de ayuda"
          description="Encuentra respuestas y sigue avanzando."
        />
        <div className="help-sections">
          {[
            {
              q: "¿Cómo accedo a un módulo?",
              a: "Los módulos disponibles dependen de tu rol. Selecciona Acceder desde el catálogo o elige un módulo en la navegación.",
            },
            {
              q: "¿Cómo gestiono mis pendientes?",
              a: "En Mis pendientes puedes filtrar por prioridad, módulo y estado. Marca una tarea como completada o actualiza su estado.",
            },
            {
              q: "¿Quién administra mis permisos?",
              a: "El administrador de tu área gestiona tus accesos. Si un módulo no aparece en tu catálogo, solicita una revisión de permisos.",
            },
            {
              q: "¿Dónde encuentro mis cotizaciones?",
              a: "Abre Cotizador Light y selecciona Mis cotizaciones. Los documentos sin enviar aparecen en Borradores.",
            },
          ].map((item) => (
            <div className="help-item" key={item.q}>
              <Button
                variant="ghost"
                onClick={() => setHelp(help === item.q ? null : item.q)}
                aria-expanded={help === item.q}
              >
                {item.q}
                <ChevronDown />
              </Button>
              {help === item.q && <p>{item.a}</p>}
            </div>
          ))}
        </div>
      </StateGate>
    );
  if (view === "busqueda") {
    const result = authorizedModules().filter((m) =>
      (m.name + " " + m.description).toLowerCase().includes(query.toLowerCase()),
    );
    const found = tasks.filter((t) => t.title.toLowerCase().includes(query.toLowerCase()));
    return (
      <StateGate>
        <PageHeading
          title="Búsqueda global"
          description="Encuentra herramientas y trabajo pendiente."
        />
        <div className="page-search">
          <Search />
          <input
            aria-label="Buscar módulos y pendientes"
            placeholder="Buscar en Intercore…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <section className="section-block">
          <SectionHeading title="Módulos" count={result.length} />
          <div className="module-grid">
            {result.map((m) => (
              <ModuleCard key={m.id} module={m} />
            ))}
          </div>
        </section>
        <section>
          <SectionHeading title="Pendientes" count={found.length} />
          {found.map((t) => (
            <ModuleLink id={t.moduleId} className="search-result" key={t.id}>
              <FileText size={18} />
              <div>
                <strong>{t.title}</strong>
                <small>{t.module}</small>
              </div>
              <ArrowUpRight size={17} />
            </ModuleLink>
          ))}
          {!result.length && !found.length && (
            <EmptyState
              title="No encontramos resultados"
              description="Prueba con otro nombre de módulo o pendiente."
            />
          )}
        </section>
      </StateGate>
    );
  }
  const headings: Record<string, { title: string; description: string }> = {
    pendientes: {
      title: "Mis pendientes",
      description: "Prioriza, da seguimiento y mantén tu trabajo al día.",
    },
    notificaciones: {
      title: "Notificaciones",
      description: "Las novedades importantes de tu espacio de trabajo.",
    },
    favoritos: { title: "Mis favoritos", description: "Tus herramientas de siempre, a un clic." },
    modulos: {
      title: "Explora tus módulos",
      description: "Las herramientas que conectan tu trabajo con el de todo Intercon.",
    },
  };
  const h = headings[view] ?? {
    title: "Explora tus módulos",
    description: "Las herramientas que conectan tu trabajo con el de todo Intercon.",
  };
  return (
    <StateGate>
      <PageHeading {...h}>
        {view === "pendientes" && (
          <span className="heading-counter">
            {tasks.filter((t) => t.status !== "Completado").length} por atender
          </span>
        )}
        {view === "notificaciones" && (
          <span className="heading-counter">
            {notifications.filter((n) => !n.read).length} sin leer
          </span>
        )}
      </PageHeading>
      {view === "pendientes" ? (
        <PendingTaskList />
      ) : view === "notificaciones" ? (
        <NotificationCenter />
      ) : (
        <ModuleGrid favoritesOnly={view === "favoritos"} />
      )}
    </StateGate>
  );
}
export function ModuleView({ id, section }: { id: string; section?: string }) {
  const { search, quotes, updateQuote, addQuote } = useWorkspace();
  const m = modules.find((m) => m.id === id);
  const [saved, setSaved] = useState(false);
  const [quoteTab, setQuoteTab] = useState("Todas");
  const [prefsSaved, setPrefsSaved] = useState(false);
  if (!m?.authorized)
    return (
      <EmptyState
        title="Acceso no autorizado"
        description="No tienes permisos para entrar a este módulo."
        icon="lock"
        action={
          <Button asChild>
            <Link to="/modulos" search={search}>
              Volver a módulos
            </Link>
          </Button>
        }
      />
    );
  if (!canAccessModule(id))
    return (
      <EmptyState
        title="Módulo deshabilitado"
        description={`${m.name} estará disponible próximamente.`}
        action={
          <Button asChild variant="outline">
            <Link to="/modulos" search={search}>
              Explorar otros módulos
            </Link>
          </Button>
        }
      />
    );
  const quoteNav = [
    { name: "Inicio", section: undefined },
    { name: "Nueva cotización", section: "nueva" },
    { name: "Mis cotizaciones", section: "cotizaciones" },
    { name: "Borradores", section: "borradores" },
    { name: "Configuración", section: "configuracion" },
  ];
  const heading =
    section === "nueva"
      ? "Nueva cotización"
      : section === "cotizaciones"
        ? "Mis cotizaciones"
        : section === "borradores"
          ? "Borradores"
          : section === "configuracion"
            ? "Configuración"
            : m.name;
  return (
    <StateGate>
      <div className="module-context-top">
        <span className={cn("module-icon", `tone-${m.tone}`)}>
          {(() => {
            const Icon = moduleIcons[m.icon as keyof typeof moduleIcons];
            return <Icon size={23} />;
          })()}
        </span>
        <select
          aria-label="Cambiar módulo"
          value={id}
          onChange={(e) => document.getElementById(`module-switch-${e.target.value}`)?.click()}
        >
          {authorizedModules()
            .filter((m) => m.available)
            .map((m) => (
              <option value={m.id} key={m.id}>
                {m.name}
              </option>
            ))}
        </select>
        {authorizedModules()
          .filter((m) => m.available)
          .map((m) => (
            <ModuleLink id={m.id} key={m.id} className="sr-only">
              <span id={`module-switch-${m.id}`}>{m.name}</span>
            </ModuleLink>
          ))}
      </div>
      {id === "cotizador" && (
        <nav className="module-tabs" aria-label="Navegación de Cotizador Light">
          {quoteNav.map((n) => (
            <Button
              asChild
              variant="ghost"
              className={cn("tab", section === n.section && "active")}
              key={n.name}
            >
              <ModuleLink id={id} section={n.section}>
                {n.name}
              </ModuleLink>
            </Button>
          ))}
        </nav>
      )}
      <PageHeading
        title={heading}
        description={section === "nueva" ? "Prepara una propuesta para tu cliente." : m.description}
      >
        {id === "cotizador" && section !== "nueva" && (
          <Button asChild>
            <ModuleLink id={id} section="nueva">
              <Plus />
              Nueva cotización
            </ModuleLink>
          </Button>
        )}
      </PageHeading>
      {id === "cotizador" ? (
        section === "nueva" ? (
          <form
            className="quote-form"
            onSubmit={(e) => {
              e.preventDefault();
              const form = new FormData(e.currentTarget);
              const client = String(form.get("client") ?? "");
              const quantity = Number(form.get("quantity") ?? 1);
              const price = Number(form.get("price") ?? 0);
              addQuote(client, quantity * price);
              setSaved(true);
            }}
          >
            <SectionHeading title="Datos de la cotización" />
            <div className="form-grid">
              <label>
                Cliente
                <input name="client" required placeholder="Razón social del cliente" />
              </label>
              <label>
                Contacto
                <input name="contact" type="email" required placeholder="contacto@empresa.mx" />
              </label>
              <label className="form-wide">
                Concepto
                <input name="concept" required placeholder="Descripción del producto o servicio" />
              </label>
              <label>
                Cantidad
                <input name="quantity" type="number" min="1" required defaultValue="1" />
              </label>
              <label>
                Precio unitario (MXN)
                <input name="price" type="number" min="0" step="0.01" required placeholder="0.00" />
              </label>
              <label className="form-wide">
                Notas
                <textarea
                  name="notes"
                  placeholder="Condiciones comerciales y observaciones"
                  rows={3}
                />
              </label>
            </div>
            <div className="form-actions">
              <Button type="submit">
                <FileText />
                Guardar borrador
              </Button>
              <Button asChild variant="outline">
                <ModuleLink id={id} section="cotizaciones">
                  Ver cotizaciones
                </ModuleLink>
              </Button>
            </div>
            {saved && (
              <div role="status" className="success-message">
                <CheckCircle2 size={18} />
                Borrador guardado en esta sesión del prototipo.
              </div>
            )}
          </form>
        ) : section === "configuracion" ? (
          <form
            className="quote-form"
            onSubmit={(e) => {
              e.preventDefault();
              setPrefsSaved(true);
            }}
          >
            <SectionHeading title="Preferencias del cotizador" />
            <div className="form-grid">
              <label>
                Moneda
                <select defaultValue="MXN">
                  <option>MXN</option>
                  <option>USD</option>
                </select>
              </label>
              <label>
                Vigencia (días)
                <input type="number" min="1" defaultValue="30" required />
              </label>
              <label className="form-wide">
                Firma comercial
                <textarea defaultValue="Alejandro Ramírez · Intercon México" />
              </label>
            </div>
            <Button type="submit">Guardar cambios</Button>
            {prefsSaved && (
              <p className="success-message" role="status">
                <CheckCircle2 />
                Preferencias actualizadas en esta sesión.
              </p>
            )}
          </form>
        ) : (
          <>
            <div className="quote-metrics">
              <div>
                <span>Cotizaciones activas</span>
                <strong>{quotes.length}</strong>
              </div>
              <div>
                <span>Por aprobar</span>
                <strong>{quotes.filter((q) => q.status === "Por aprobar").length}</strong>
              </div>
              <div>
                <span>Borradores</span>
                <strong>{quotes.filter((q) => q.status === "Borrador").length}</strong>
              </div>
            </div>
            <SectionHeading
              title={section === "borradores" ? "Borradores guardados" : "Cotizaciones recientes"}
            />
            {section !== "borradores" && (
              <div className="tabs mb-4">
                {["Todas", "Por aprobar", "Enviada", "Borrador"].map((s) => (
                  <Button
                    key={s}
                    variant="ghost"
                    className={cn("tab", quoteTab === s && "active")}
                    aria-pressed={quoteTab === s}
                    onClick={() => setQuoteTab(s)}
                  >
                    {s}
                  </Button>
                ))}
              </div>
            )}
            <div className="quote-list">
              {quotes
                .filter((q) =>
                  section === "borradores"
                    ? q.status === "Borrador"
                    : quoteTab === "Todas" || q.status === quoteTab,
                )
                .map((q) => (
                  <div className="quote-row" key={q.id}>
                    <FileText size={20} />
                    <div>
                      <strong>{q.client}</strong>
                      <small>{q.id}</small>
                    </div>
                    <span>
                      {new Intl.NumberFormat("es-MX", {
                        style: "currency",
                        currency: "MXN",
                      }).format(q.total)}
                    </span>
                    <StatusBadge status={q.status} />
                    <DropdownQuote
                      id={q.id}
                      status={q.status}
                      onChange={(status) => updateQuote(q.id, status)}
                    />
                  </div>
                ))}
            </div>
          </>
        )
      ) : (
        <>
          <div className="module-overview">
            <div>
              <span className="eyebrow">{m.tag}</span>
              <h2>Tu trabajo en {m.name}</h2>
              <p>Consulta las solicitudes y actualizaciones de tu área.</p>
              <Button asChild variant="outline">
                <Link to="/pendientes" search={search}>
                  <CheckSquare />
                  Ver mis pendientes
                </Link>
              </Button>
            </div>
            <div>
              <ShieldCheck size={36} />
              <strong>Acceso autorizado</strong>
              <span>Coordinador comercial</span>
            </div>
          </div>
          <section className="section-block">
            <SectionHeading title="Actividad del módulo" />
            <RecentActivity />
          </section>
          <SectionHeading title="Notificaciones recientes" />
          <NotificationCenter compact />
        </>
      )}
    </StateGate>
  );
}
function DropdownQuote({
  id,
  status,
  onChange,
}: {
  id: string;
  status: string;
  onChange: (status: string) => void;
}) {
  return (
    <select
      aria-label={`Estado de cotización ${id}`}
      value={status}
      onChange={(e) => onChange(e.target.value)}
    >
      <option>Borrador</option>
      <option>Por aprobar</option>
      <option>Enviada</option>
      <option>Aceptada</option>
    </select>
  );
}
