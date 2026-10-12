import { createContext, useContext, useState, type ReactNode } from "react";
import { Link, useLocation, useNavigate, useSearch } from "@tanstack/react-router";
import {
  Home,
  CheckSquare,
  Bell,
  Star,
  Search,
  Calculator,
  Building2,
  ShieldCheck,
  ChartNoAxesCombined,
  Users,
  Layers,
  ChevronDown,
  ChevronRight,
  ArrowUpRight,
  PanelLeft,
  HelpCircle,
  LogOut,
  Settings,
  UserRound,
  LayoutGrid,
  Command,
  Check,
  FlaskConical,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import {
  authorizedModules,
  initialTasks,
  initialNotifications,
  initialQuotes,
  modules,
  styles,
  stateOptions,
  parseStyle,
  type VisualStyle,
  type TaskStatus,
} from "@/data/intercore";
import { cn } from "@/lib/utils";
export const moduleIcons = {
  calculator: Calculator,
  building: Building2,
  shield: ShieldCheck,
  chart: ChartNoAxesCombined,
  users: Users,
  layers: Layers,
};
export type Destination =
  | "/"
  | "/pendientes"
  | "/notificaciones"
  | "/favoritos"
  | "/busqueda"
  | "/perfil"
  | "/preferencias"
  | "/ayuda"
  | "/modulos";
const globals = [
  { to: "/" as Destination, label: "Inicio", icon: Home },
  { to: "/pendientes" as Destination, label: "Mis pendientes", icon: CheckSquare },
  { to: "/notificaciones" as Destination, label: "Notificaciones", icon: Bell },
  { to: "/favoritos" as Destination, label: "Favoritos", icon: Star },
];
const WorkspaceContext = createContext<{
  quotes: typeof initialQuotes;
  updateQuote: (id: string, status: string) => void;
  addQuote: (client: string, total: number) => void;
  style: VisualStyle;
  state: string;
  search: { style: VisualStyle; state: string };
  tasks: typeof initialTasks;
  notifications: typeof initialNotifications;
  favorites: string[];
  setStatus: (id: number, status: TaskStatus) => void;
  markRead: (id?: number) => void;
  toggleFavorite: (id: string) => void;
  setStyle: (style: VisualStyle) => void;
  setState: (state: string) => void;
  signOut: () => void;
  query: string;
  setQuery: (q: string) => void;
} | null>(null);
export function useWorkspace() {
  const ctx = useContext(WorkspaceContext);
  if (!ctx) throw new Error("Workspace context missing");
  return ctx;
}
export function AppShell({ children }: { children: ReactNode }) {
  const params = useSearch({ strict: false }) as { style?: VisualStyle; state?: string };
  const style = parseStyle(params.style);
  const state = params.state ?? "normal";
  const navigate = useNavigate();
  const [quotes, setQuotes] = useState(initialQuotes);
  const [tasks, setTasks] = useState(initialTasks);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [favorites, setFavorites] = useState(["cotizador", "price-model"]);
  const [query, setQuery] = useState("");
  const [signedOut, setSignedOut] = useState(false);
  const search = { style, state };
  const ctx = {
    quotes,
    updateQuote: (id: string, status: string) =>
      setQuotes((v) => v.map((q) => (q.id === id ? { ...q, status } : q))),
    addQuote: (client: string, total: number) =>
      setQuotes((v) => [
        ...v,
        { id: `COT-2026-0${146 + v.length}`, client, total, status: "Borrador" },
      ]),
    style,
    state,
    search,
    tasks,
    notifications,
    favorites,
    query,
    setQuery,
    setStatus: (id: number, status: TaskStatus) =>
      setTasks((v) => v.map((t) => (t.id === id ? { ...t, status } : t))),
    markRead: (id?: number) =>
      setNotifications((v) =>
        v.map((n) => (id === undefined || n.id === id ? { ...n, read: true } : n)),
      ),
    toggleFavorite: (id: string) =>
      setFavorites((v) => (v.includes(id) ? v.filter((f) => f !== id) : [...v, id])),
    setStyle: (next: VisualStyle) => {
      navigate({ to: ".", search: { style: next, state } });
    },
    setState: (next: string) => {
      navigate({ to: ".", search: { style, state: next } });
    },
    signOut: () => setSignedOut(true),
  };
  return (
    <WorkspaceContext.Provider value={ctx}>
      <div className={cn("workspace", `style-${style}`)}>
        <a href="#page-content" className="skip-link">
          Ir al contenido
        </a>
        <StyleSwitcher />
        {signedOut ? (
          <div className="signed-out">
            <Wordmark />
            <LogOut size={36} />
            <h1>Sesión cerrada</h1>
            <p>Nos vemos pronto, Alejandro.</p>
            <Button onClick={() => setSignedOut(false)}>Volver a Intercore</Button>
          </div>
        ) : (
          <>
            <aside className="desktop-sidebar">
              <Sidebar />
            </aside>
            <div className="workspace-body">
              <Header />
              {style === "portal" && (
                <nav className="portal-nav" aria-label="Navegación global">
                  {globals.map((item) => (
                    <NavLink key={item.to} to={item.to} icon={item.icon}>
                      {item.label}
                    </NavLink>
                  ))}
                  <NavLink to="/modulos" icon={LayoutGrid}>
                    Todos los módulos
                  </NavLink>
                </nav>
              )}
              <div id="page-content" className="page-content">
                <Breadcrumbs />
                {children}
              </div>
              <footer className="workspace-footer">
                <span>© 2026 Intercon · Intercore</span>
                <span>
                  <span className="status-dot" />
                  Todos los sistemas operativos<span className="footer-divider">|</span>v0.1
                </span>
              </footer>
            </div>
          </>
        )}
      </div>
    </WorkspaceContext.Provider>
  );
}
export function Wordmark() {
  return (
    <div className="wordmark">
      <span>
        INTERCON<span className="wordmark-period">.</span>
      </span>
      <div>
        INTERCORE <span>WORKSPACE</span>
      </div>
    </div>
  );
}
export function StyleSwitcher() {
  const { style, setStyle, state, setState } = useWorkspace();
  return (
    <div className="prototype-bar">
      <div className="prototype-label">
        <FlaskConical size={14} />
        <span>PROTOTIPO</span>
      </div>
      <div className="style-options" aria-label="Estilo visual">
        {styles.map((s, i) => (
          <Button
            variant="ghost"
            key={s.id}
            onClick={() => setStyle(s.id)}
            aria-pressed={style === s.id}
            className={cn("style-option", style === s.id && "selected")}
          >
            <span className="style-letter">{String.fromCharCode(65 + i)}</span>
            <span>{s.name}</span>
            {style === s.id && <Check size={13} />}
          </Button>
        ))}
      </div>
      <label className="state-selector">
        <span>Estado:</span>
        <select
          aria-label="Estado del prototipo"
          value={state}
          onChange={(e) => setState(e.target.value)}
        >
          {stateOptions.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
export function NavLink({
  to,
  children,
  icon: Icon,
  badge,
  onClick,
}: {
  to: Destination;
  children: ReactNode;
  icon: typeof Home;
  badge?: number | undefined;
  onClick?: (() => void) | undefined;
}) {
  const { search } = useWorkspace();
  const path = useLocation().pathname;
  return (
    <Button
      asChild
      variant="ghost"
      title={
        typeof children === "string" ? children : to === "/ayuda" ? "Centro de ayuda" : undefined
      }
      className={cn(
        "nav-item",
        (path === to || (to !== "/" && path.startsWith(to))) && "is-active",
      )}
    >
      <Link
        to={to}
        search={search}
        onClick={onClick}
        aria-label={
          typeof children === "string" ? children : to === "/ayuda" ? "Centro de ayuda" : undefined
        }
        aria-current={path === to ? "page" : undefined}
      >
        <Icon size={18} />
        <span className="nav-text">{children}</span>
        {badge ? <span className="nav-badge">{badge}</span> : null}
      </Link>
    </Button>
  );
}
export function ModuleLink({
  id,
  section,
  children,
  className,
  onClick,
}: {
  id: string;
  section?: string | undefined;
  children: ReactNode;
  className?: string;
  onClick?: (() => void) | undefined;
}) {
  const { search } = useWorkspace();
  return section ? (
    <Link
      to="/modulos/$module/$section"
      params={{ module: id, section }}
      search={search}
      className={className}
      onClick={onClick}
    >
      {children}
    </Link>
  ) : (
    <Link
      to="/modulos/$module"
      params={{ module: id }}
      search={search}
      className={className}
      title={modules.find((m) => m.id === id)?.name}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const { tasks, notifications, state } = useWorkspace();
  const path = useLocation().pathname;
  const inQuote = path.startsWith("/modulos/cotizador");
  return (
    <div className="sidebar-inner">
      <Wordmark />
      <div className="workspace-select">
        <div className="workspace-avatar">IC</div>
        <div className="nav-text">
          <strong>Mi espacio de trabajo</strong>
          <small>Intercon México</small>
        </div>
        <ChevronDown size={14} />
      </div>
      <nav aria-label="Navegación principal">
        <div className="nav-section-label">GENERAL</div>
        {globals.map((g) => (
          <NavLink
            key={g.to}
            {...g}
            onClick={onNavigate}
            badge={
              g.to === "/pendientes"
                ? tasks.filter((t) => t.status !== "Completado").length
                : g.to === "/notificaciones"
                  ? notifications.filter((n) => !n.read).length
                  : undefined
            }
          >
            {g.label}
          </NavLink>
        ))}
        <div className="nav-section-label modules-label">
          MÓDULOS <LayoutGrid size={13} />
        </div>
        {state !== "no-modules" &&
          authorizedModules()
            .filter((m) => m.available)
            .map((m) => {
              const Icon = moduleIcons[m.icon as keyof typeof moduleIcons];
              return (
                <Button
                  asChild
                  variant="ghost"
                  className={cn("nav-item", path.includes("/modulos/" + m.id) && "is-active")}
                  key={m.id}
                >
                  <ModuleLink id={m.id} onClick={onNavigate}>
                    <Icon size={18} />
                    <span className="nav-text">{m.name}</span>
                    {m.id === "cotizador" && <ChevronRight size={14} className="nav-trailing" />}
                  </ModuleLink>
                </Button>
              );
            })}
        {inQuote && (
          <div className="context-nav" aria-label="Cotizador Light">
            {[
              { name: "Inicio", section: undefined },
              { name: "Nueva cotización", section: "nueva" },
              { name: "Mis cotizaciones", section: "cotizaciones" },
              { name: "Borradores", section: "borradores" },
              { name: "Configuración", section: "configuracion" },
            ].map((s) => (
              <ModuleLink
                id="cotizador"
                section={s.section}
                key={s.name}
                onClick={onNavigate}
                className={cn(
                  "context-link",
                  path === `/modulos/cotizador${s.section ? "/" + s.section : ""}` && "active",
                )}
              >
                {s.name}
              </ModuleLink>
            ))}
          </div>
        )}
        <NavLink to="/modulos" icon={Layers} onClick={onNavigate}>
          Explorar módulos
        </NavLink>
      </nav>
      <div className="sidebar-bottom">
        <NavLink to="/ayuda" icon={HelpCircle} onClick={onNavigate}>
          Centro de ayuda
          <ArrowUpRight size={13} />
        </NavLink>
        <NavLink to="/preferencias" icon={Settings} onClick={onNavigate}>
          Preferencias
        </NavLink>
        <div className="sidebar-user">
          <div className="avatar">AR</div>
          <div className="nav-text">
            <strong>Alejandro Ramírez</strong>
            <small>Coordinador comercial</small>
          </div>
          <UserMenu />
        </div>
      </div>
    </div>
  );
}
export function UserMenu() {
  const { search, signOut } = useWorkspace();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Abrir menú de usuario"
          className="user-menu-trigger"
        >
          <ChevronDown size={15} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-56">
        <DropdownMenuLabel>
          Alejandro Ramírez
          <small className="block font-normal text-muted-foreground">
            alejandro.ramirez@intercon.mx
          </small>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/perfil" search={search}>
            <UserRound />
            Mi perfil
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/preferencias" search={search}>
            <Settings />
            Preferencias
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={signOut}>
          <LogOut />
          Cerrar sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export function Header() {
  const { search, query, setQuery, notifications, tasks } = useWorkspace();
  const navigate = useNavigate();
  const [menu, setMenu] = useState(false);
  return (
    <header className="global-header">
      <div className="header-start">
        <Sheet open={menu} onOpenChange={setMenu}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Abrir navegación"
              className="mobile-menu"
            >
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="mobile-sidebar">
            <SheetTitle className="sr-only">Navegación de Intercore</SheetTitle>
            <SheetDescription className="sr-only">Módulos y cuenta</SheetDescription>
            <Sidebar onNavigate={() => setMenu(false)} />
          </SheetContent>
        </Sheet>
        <span className="header-workspace">
          <PanelLeft size={18} />
          <span>Mi espacio de trabajo</span>
        </span>
        <div className="portal-wordmark">
          <Wordmark />
        </div>
      </div>
      <form
        className="header-search"
        onSubmit={(e) => {
          e.preventDefault();
          navigate({ to: "/busqueda", search });
        }}
      >
        <Search size={17} />
        <input
          aria-label="Búsqueda global"
          placeholder="Buscar en Intercore..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <span className="search-shortcut">↵</span>
      </form>
      <div className="header-tools">
        <Button variant="ghost" size="icon" asChild className="header-tool" title="Mis pendientes">
          <Link
            to="/pendientes"
            search={search}
            aria-label={`Mis pendientes: ${tasks.filter((t) => t.status !== "Completado").length}`}
          >
            <CheckSquare />
          </Link>
        </Button>
        <Button variant="ghost" size="icon" asChild className="header-tool notification-tool">
          <Link to="/notificaciones" search={search} aria-label="Abrir notificaciones">
            <Bell />
            {notifications.some((n) => !n.read) && <span className="notification-dot" />}
          </Link>
        </Button>
        <span className="header-tools-divider" />
        <Button asChild variant="ghost" className="header-avatar">
          <Link to="/perfil" search={search} aria-label="Mi perfil">
            AR
          </Link>
        </Button>
        <UserMenu />
      </div>
    </header>
  );
}
export function Breadcrumbs() {
  const path = useLocation().pathname;
  const { search } = useWorkspace();
  const parts = path.split("/").filter(Boolean);
  const names: Record<string, string> = {
    pendientes: "Mis pendientes",
    notificaciones: "Notificaciones",
    favoritos: "Favoritos",
    busqueda: "Búsqueda global",
    perfil: "Mi perfil",
    preferencias: "Preferencias",
    ayuda: "Centro de ayuda",
    modulos: "Módulos",
    cotizador: "Cotizador Light",
    administracion: "Administración",
    auditoria: "Auditoría",
    "price-model": "Price Model",
    "recursos-humanos": "Recursos humanos",
    proyectos: "Gestión de proyectos",
    nueva: "Nueva cotización",
    cotizaciones: "Mis cotizaciones",
    borradores: "Borradores",
    configuracion: "Configuración",
  };
  return (
    <nav className="breadcrumbs" aria-label="Ruta de navegación">
      <Link to="/" search={search}>
        <Home size={13} />
        <span>Intercore</span>
      </Link>
      <ChevronRight size={12} />
      {parts.length ? (
        parts.map((p, i) => (
          <span key={i} className="breadcrumb-part">
            {i > 0 && <ChevronRight size={12} />}
            <span aria-current={i === parts.length - 1 ? "page" : undefined}>{names[p] ?? p}</span>
          </span>
        ))
      ) : (
        <span aria-current="page">Inicio</span>
      )}
    </nav>
  );
}
