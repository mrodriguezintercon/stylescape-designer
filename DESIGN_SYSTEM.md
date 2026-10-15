# Intercore Design System

Documentación del sistema visual **real** de Intercore (Corporate Workspace). Fuente de verdad del código: `src/styles.css` (tokens y clases), `src/components/intercore/shell.tsx` (shell y navegación), `widgets.tsx` (piezas operativas) y `views.tsx` (composiciones de pantalla).

> La paleta y los wordmarks (`INTERCON.` / `INTERCORE WORKSPACE`) son **provisionales**. Cambia valores solo en los tokens de `:root` en `src/styles.css`.

---

## 1. Lenguaje visual

- Herramienta de trabajo corporativa: sobria, densa, funcional. No es una landing.
- Sidebar institucional **oscuro** + área de trabajo **clara y neutra**.
- El azul institucional (`--primary`) se reserva para acciones principales, enlaces, foco, punto del wordmark e indicador de ruta activa.
- Separación por **líneas de 1 px** antes que por tarjetas. Las tarjetas solo representan objetos individuales (módulos).
- Sin gradientes, sin sombras pesadas, sin animaciones continuas. Transiciones solo de color (0.15 s).
- Idioma de interfaz: español de México.

---

## 2. Paleta de colores

Todos los colores están en OKLCH y se consumen vía `var(--token)`.

### Principales
| Token | Valor | Uso |
|---|---|---|
| `--primary` | `oklch(0.54 0.2 258)` | Botón principal, enlaces, foco (`--ring`), indicador activo, punto del wordmark |
| `--primary-foreground` | `oklch(1 0 0)` | Texto sobre primary |
| `--brand-soft` | `oklch(0.952 0.025 260)` | Fondo de avatar, badge brand, ícono de módulo brand |
| `--accent` | `oklch(0.94 0.02 258)` | Hover en menús shadcn; `--accent-foreground` = primary |

### Institucional (sidebar / drawer)
| Token | Valor | Uso |
|---|---|---|
| `--institutional` | `oklch(0.235 0.027 253)` | Fondo del sidebar y drawer |
| `--institutional-fg` | `oklch(0.94 0.007 250)` | Texto activo/hover en sidebar |
| `--institutional-muted` | `oklch(0.73 0.023 254)` | Texto por defecto de items, labels de sección |
| `--institutional-active` | `oklch(0.31 0.041 255)` | Fondo hover y activo de nav items |
| `--institutional-border` | `oklch(0.35 0.028 254)` | Bordes internos, fondo de `nav-badge` |

### Fondos, superficies, texto y bordes
| Token | Valor | Uso |
|---|---|---|
| `--background` | `oklch(0.979 0.003 250)` | Fondo de página, fondo de búsqueda, cabecera de tabla |
| `--card` / `--popover` | `oklch(1 0 0)` | Header global, tarjetas, inputs, menús |
| `--foreground` | `oklch(0.28 0.021 258)` | Texto principal |
| `--muted-foreground` | `oklch(0.53 0.018 258)` | Texto secundario, descripciones, captions |
| `--muted` | `oklch(0.956 0.004 250)` | Íconos de estado vacío, skeletons, badge neutral |
| `--secondary` | `oklch(0.95 0.007 250)` | Variante secondary de shadcn |
| `--border` / `--input` | `oklch(0.917 0.007 250)` | Todos los bordes y divisores |

### Semánticos (par fuerte + suave)
| Estado | Texto/borde | Fondo suave |
|---|---|---|
| Success | `--success` `oklch(0.48 0.105 165)` | `--success-soft` `oklch(0.954 0.024 160)` |
| Warning | `--warning` `oklch(0.51 0.112 69)` | `--warning-soft` `oklch(0.966 0.026 80)` |
| Error | `--danger` `oklch(0.55 0.19 26)` | `--danger-soft` `oklch(0.969 0.015 24)` |
| Info | No existe token propio: se usa `--primary` + `--brand-soft` (`badge-brand`) |

`--destructive` hereda el valor base de shadcn (`oklch(0.577 0.245 27.325)`) y solo aplica a variantes `destructive` de shadcn.

### Tonos de módulo (identificación, no estado)
`tone-brand` (primary), `tone-teal` (`--teal`/`--teal-soft`), `tone-violet`, `tone-amber` (usa warning), `tone-rose`, `tone-neutral` (muted). Solo para el cuadro del ícono de módulo.

### Colores de interacción
- **Hover sidebar:** fondo `--institutional-active`, texto `--institutional-fg`.
- **Hover área clara:** botones ghost/outline de shadcn (`bg-accent`); `module-card:hover` cambia borde a `--ring`; `task-title:hover` pasa a `--primary`.
- **Focus:** `outline: 2px solid var(--ring)` + `outline-offset: 3px` (global `:focus-visible`).
- **Active (ruta):** fondo `--institutional-active` + barra izquierda de 3 px `--primary` + `font-weight: 500`.
- **Disabled:** opacidad 50 % y `pointer-events: none` (estándar de shadcn Button); módulos no disponibles usan `module-unavailable` + texto “Próximamente”.

---

## 3. Tipografía

Cargadas desde Google Fonts con `<link>` en `src/routes/__root.tsx`.

- **Interfaz:** `--font-interface: "Roboto", Arial, sans-serif` (body, 14 px base, `letter-spacing: 0`).
- **Títulos:** `--font-heading: "Manrope", Arial, sans-serif` (h1, h2, h3, wordmark).

| Rol | Clase | Tamaño | Peso | Line-height |
|---|---|---|---|---|
| Título de página | `.page-heading h1` | 26 px | 700 (corporate) | 1.4 |
| Descripción de página | `.page-heading p` | 12 px | 400, muted | normal |
| Título de sección | `.section-heading h2` | 16 px | 700 (corporate) | normal |
| Título tarjeta módulo | `.module-card h3` | 14 px | 700 | normal |
| Texto tarjeta | `.module-card p` | 12 px | 400, muted | 1.8 |
| Título de tarea | `.task-title` | 11 px (12 px en compacto y ≥1450 px) | 500 | 1.5 |
| Detalle / caption | `.task-detail`, `.task-due` | 9 px | 400, muted | 1.4 |
| Label de formulario | `.form-grid label` | 12 px | 500 | — |
| Label de sección sidebar | `.nav-section-label` | 9 px, `letter-spacing 1.4px`, mayúsculas | 400 | — |
| Nav item | `.nav-item` | 12 px | 400 / 500 activo | — |
| Badge | `.status-badge` | 9 px | 500 | — |
| Breadcrumbs | `.breadcrumbs` | 10 px | 400 | — |
| Botón acción rápida | `.quick-actions > a` | 12 px | 500 (shadcn) | — |
| Estado vacío | `.empty-state h2` / `p` | 21 px 700 / 13 px | — | 1.8 en p |
| Métrica grande | `.quote-metrics strong` | 27 px | 700 | — |
| Wordmark | `.wordmark > span` | 25 px, 800, `letter-spacing 1.5px` | — | 1 |

---

## 4. Espaciado y tamaños

| Token | Valor |
|---|---|
| `--space-sm` | 8 px |
| `--space-md` | 16 px |
| `--space-lg` | 24 px |
| `--space-section` | 30 px (separación entre bloques del inicio) |
| `--sidebar-width` | 244 px |
| `--sidebar-compact-width` | 72 px |
| `--header-height` | 72 px |
| `--prototype-height` | 48 px (86 px ≤640 px; solo desarrollo) |

Valores recurrentes en el código: gaps 8–16 px; padding de página `22px 34px 35px`; padding de fila de tarea `18px 16px`; altura nav item 40 px; inputs `10px 12px`; botones de acción 40 px de alto; íconos 18 px en navegación, 16 px en contexto, 14–17 px en header/acciones, 20–23 px en ícono de módulo, 30 px en estado vacío.

---

## 5. Radios

`--radius: 0.375rem` (6 px). Derivados de shadcn: `--radius-sm` 2 px, `md` 4 px, `lg` 6 px, `xl` 10 px.

Uso real: inputs, tarjetas corporate y botones = `--radius`; listas y búsqueda 5 px; badges 4 px; ícono de módulo 7 px; checkbox 3 px; avatares y dots 50 %.

---

## 6. Sombras, elevación y bordes

- Única sombra: `--shadow-subtle: 0 2px 5px oklch(0.2 0.02 250 / 0.025)`. En Corporate las tarjetas de módulo la anulan (`box-shadow: none`). Los botones tienen `box-shadow: none !important`.
- Elevación = **borde de 1 px `--border`** + fondo `--card` sobre `--background`.
- En Corporate, `.task-list`, `.favorite-links` y `.notifications-list` son transparentes, sin bordes laterales ni radio: solo líneas horizontales.
- Capas z-index: barra de prototipo 45, sidebar 30, Sheet/Dropdown (shadcn) por encima.

---

## 7. Breakpoints y responsive

| Media query | Cambio |
|---|---|
| `≥1450px` | Textos de tareas, notificaciones y tarjetas suben a 12–13 px |
| `≤1100px` | Header padding 22 px, búsqueda 250 px, página `20px 24px 30px`, columnas de inicio `1.55fr 1fr`, tabla de tareas más estrecha |
| `≤900px` | Se oculta el sidebar desktop y el botón de compresión; aparece `.mobile-menu` (44×44) que abre un `Sheet` izquierdo de 280 px con fondo institucional, **siempre con etiquetas y navegación contextual** |
| `≤640px` | Barra de prototipo de 2 filas (86 px), grids a 1 columna, ajustes de densidad |
| `901px+ y alto ≤830px` | Sidebar más compacto en vertical |
| `prefers-reduced-motion` | Se anulan transiciones |

El modo compacto del sidebar (`.sidebar-collapsed`) aplica **solo ≥901 px**.

---

## 8. Layout

```text
+--------------------------------------------------------------+
| [barra de prototipo — solo DEV, fija, 48px]                  |
+-----------+--------------------------------------------------+
| SIDEBAR   | HEADER 72px: [≡/⇤] Mi espacio   [buscar 320] ☑ 🔔 | AR ▾ |
| 244px     +--------------------------------------------------+
| fijo      | Breadcrumbs (10px)                               |
| oscuro    | Page heading (h1 26px + desc + acciones)         |
|           | Contenido (max-width 1560px, centrado)           |
|           +--------------------------------------------------+
|           | Footer: © 2026 Intercon · Intercore | estado v0.1 |
+-----------+--------------------------------------------------+
```

- **Contenedor:** `.page-content` — padding `22px 34px 35px`, `max-width: 1560px`, `margin: 0 auto`.
- **Sidebar** (`.desktop-sidebar`): `position: fixed`, ancho `--sidebar-width`, de arriba (bajo la barra de prototipo) hasta abajo. Orden interno: Wordmark → selector de espacio de trabajo → `GENERAL` (Inicio, Mis pendientes [badge], Notificaciones [badge], Favoritos) → `MÓDULOS` (solo autorizados y disponibles) → navegación contextual del módulo (solo dentro de Cotizador) → Explorar módulos → abajo: Centro de ayuda, Preferencias, usuario + menú. Scroll interno sin scrollbar visible.
- **Header** (`.global-header`): 72 px, fondo card, borde inferior. Izquierda: menú móvil / botón comprimir + “Mi espacio de trabajo”. Derecha: búsqueda (36 px alto, 320 px), Mis pendientes, Notificaciones (punto rojo si hay no leídas), divisor, avatar, menú de usuario.
- **Grids:**
  - Inicio: `.home-columns` `minmax(0,1.7fr) minmax(0,1fr)`, gap 26 px.
  - Módulos: `.module-grid` `repeat(3, minmax(0,1fr))`, gap 16 px.
  - Formularios: `.form-grid` 2 columnas, gap 20 px; `.form-wide` ocupa toda la fila; `max-width: 780px`.
  - Métricas: `.quote-metrics` 3 columnas separadas por bordes verticales.
- **Tablas:** no se usa `<table>`. Patrón de lista-tabla con CSS grid: `.task-table-head` + `.task-row` con `grid-template-columns: minmax(0,1fr) 72px 100px 135px`; filas separadas por `border-top`. Cotizaciones: `.quote-list` + `.quote-row` (flex).
- **Modales:** no hay diálogos en las pantallas actuales. Los overlays existentes son `Sheet` (drawer móvil) y `DropdownMenu` (usuario, acciones de tarea/cotización). Si se necesita un modal, usar `@/components/ui/dialog` con tokens existentes.
- **Formularios:** label encima del control (columna, gap 8 px), inputs nativos estilizados globalmente, acciones en `.form-actions` (flex, gap 10 px), botón principal primero.

---

## 9. Componentes y variantes

| Componente | Implementación | Variantes / notas |
|---|---|---|
| Botón | `@/components/ui/button` | `default` (primary, acción principal, una por grupo), `outline` (secundarias), `ghost` (navegación, íconos), `size="icon"`, `size="sm"`; siempre `asChild` + `Link` para navegar |
| Input | `<input>` nativo con estilos globales | borde `--input`, fondo card, radio `--radius`, padding `10px 12px`; búsqueda del header sin borde interno |
| Select | `<select>` nativo | mismos estilos que input; filtros 35 px alto, 11 px |
| Card | `ModuleCard` (`.module-card`) | ícono en tono + favorito (estrella), título, descripción, pie con disponibilidad y “Acceder”; `module-unavailable` |
| Badge | `StatusBadge` (`.status-badge`) | `badge-danger` (Alta, con dot), `badge-warning` (Media), `badge-success` (Completado), `badge-brand` (En progreso), `badge-neutral` |
| Contadores | `.nav-badge`, `.section-count` | numéricos, 10 px |
| Alertas / errores | `StateGate` + `EmptyState icon="error"` | No se usa `Alert` de shadcn |
| Lista-tabla | `PendingTaskList`, lista de cotizaciones | `compact` para el inicio |
| Notificaciones | `NotificationCenter` | `compact`; marcar una / todas como leídas |
| Tabs | No hay tabs; la navegación contextual del módulo cumple ese rol | — |
| Navegación | `NavLink`, `ModuleLink`, `Sidebar`, `Breadcrumbs` | activo por ruta; contextual separada por borde y label |
| Dropdown | `@/components/ui/dropdown-menu` | `UserMenu`, cambiar estado de tarea/cotización |
| Drawer | `@/components/ui/sheet` `side="left"` | `.mobile-sidebar` |
| Carga | `StateGate` estado `loading` | `LoaderCircle` + texto + `.skeleton-grid` de 3 bloques, `role="status"` |
| Vacío | `EmptyState` | íconos `inbox`, `bell`, `lock`, `error`; título + descripción + acción opcional |
| Encabezados | `PageHeading`, `SectionHeading` | `SectionHeading` acepta `count` y `to` (“Ver todos →”) |
| Acciones rápidas | `QuickActions` | 1 primaria + outlines; se oculta sin módulos |

Ejemplo de pantalla estándar:

```tsx
<StateGate>
  <PageHeading title="Mis pendientes" description="Prioriza y actualiza tu trabajo.">
    <Button variant="outline">Exportar</Button>
  </PageHeading>
  <section className="section-block">
    <SectionHeading title="Pendientes" count={4} />
    <PendingTaskList />
  </section>
</StateGate>
```

Ejemplo de acción hacia un módulo:

```tsx
<Button asChild>
  <ModuleLink id="cotizador" section="nueva"><Plus />Nueva cotización</ModuleLink>
</Button>
```

**Íconos:** exclusivamente `lucide-react`, trazo por defecto. Mapa de módulos en `moduleIcons` (`calculator`, `building`, `shield`, `chart`, `users`, `layers`).

---

## 10. Estados interactivos y accesibilidad

- **Hover:** solo cambio de color/fondo/borde, 0.15 s.
- **Focus:** anillo de 2 px `--ring` con offset 3 px en todo elemento enfocable; nunca quitarlo.
- **Active:** `aria-current="page"` + `.is-active` en navegación; `aria-pressed` en favoritos y selector de estilo.
- **Disabled:** shadcn (opacidad 50 %); módulos deshabilitados muestran estado, no se ocultan del flujo (`/modulos/proyectos`).
- **Loading:** `role="status"` con texto visible.
- **Error / sesión / permisos:** `EmptyState` con acción de recuperación (“Reintentar”, “Volver a entrar”, “Volver a mi espacio”).
- **Teclado:** skip-link “Ir al contenido” → `#page-content`; todo es `Link`/`button` reales; Sheet y Dropdown de Radix gestionan foco y Escape.
- **Etiquetas:** botones de ícono con `aria-label` (y `title` en modo compacto); `aria-expanded` + `aria-controls` en el botón de compresión; `<nav aria-label>` distinto para principal, contextual y breadcrumbs.
- `-webkit-tap-highlight-color: transparent`; objetivos táctiles móviles de 44 px.

---

## 11. Patrones de UX a mantener

1. Navegación global (GENERAL) separada de la contextual del módulo (bloque con borde y label en mayúsculas dentro del sidebar).
2. Solo módulos autorizados aparecen; los no autorizados nunca se listan (`/modulos/finanzas` muestra acceso no autorizado).
3. Breadcrumbs en todas las vistas, empezando por “Intercore”.
4. Inicio: saludo → acciones rápidas → pendientes prioritarios + favoritos → módulos autorizados → actividad + notificaciones.
5. Contadores de pendientes y no leídas visibles en sidebar y header.
6. Sidebar comprimible a íconos en desktop (estado en memoria); drawer móvil siempre completo.
7. Todo estado especial tiene una salida clara.
8. Los datos viven en el contexto de `AppShell`; navegar no pierde cambios.

---

## 12. Hacer / No hacer

**Hacer**
- Usar `var(--token)` para todo color, radio, sombra y medida estructural.
- Separar con líneas de 1 px; tarjetas solo para objetos individuales.
- Un botón primario por grupo de acciones.
- Íconos lucide de 14–18 px junto a texto.
- Agregar las clases nuevas en `src/styles.css`, cerca de las existentes.

**No hacer**
- No hardcodear colores (`#hex`, `text-white`, `bg-black`).
- No usar gradientes, sombras fuertes, banners decorativos ni animaciones continuas.
- No usar el azul para decoración ni fondos grandes.
- No introducir otras fuentes, otra librería de íconos ni otro router.
- No duplicar la lógica de navegación ni crear un sidebar nuevo (no usar `ui/sidebar.tsx`).
- No persistir datos en localStorage ni conectar servicios sin indicación expresa.

---

## 13. Componentes a reutilizar primero

`AppShell`, `useWorkspace`, `NavLink`, `ModuleLink`, `Breadcrumbs`, `PageHeading`, `SectionHeading`, `ModuleCard`, `ModuleGrid`, `StatusBadge`, `PendingTaskList`, `NotificationCenter`, `EmptyState`, `StateGate`, `QuickActions`, `RecentActivity`; y de shadcn: `Button`, `DropdownMenu`, `Sheet`.

---

## 14. Rutas de referencia

| Ruta | Referencia de |
|---|---|
| `/` | Composición operativa del inicio |
| `/pendientes` | Lista-tabla con filtros y badges |
| `/notificaciones` | Lista con estados leído/no leído |
| `/favoritos`, `/modulos` | Grid de tarjetas de módulo |
| `/busqueda` | Resultados de búsqueda global |
| `/perfil`, `/preferencias`, `/ayuda` | Pantallas de cuenta y soporte |
| `/modulos/cotizador` (+ `/nueva`, `/cotizaciones`, `/borradores`, `/configuracion`) | Navegación contextual, formulario, métricas, lista |
| `/modulos/finanzas` | Acceso no autorizado |
| `/modulos/proyectos` | Módulo deshabilitado |
| `?state=loading\|no-modules\|no-tasks\|no-notifications\|error\|expired\|unauthorized\|disabled` | Estados (en desarrollo) |

**Excepciones:** las variantes `style-command` y `style-portal` existen en `styles.css` solo como referencias de desarrollo; fuera de desarrollo todo se normaliza a Corporate. No tomarlas como patrón.

---

## 15. Reglas para agentes de código (Lovable, OpenCode y otros)

1. Lee `AGENTS.md`, este archivo y `src/styles.css` antes de cambiar UI.
2. Crea cada pantalla como ruta de archivo en `src/routes/` con `validateSearch: searchValidator` y su propio `head()`; nunca edites `routeTree.gen.ts`.
3. Toda pantalla nueva se renderiza dentro de `AppShell` (ya en `__root.tsx`): no agregues headers, sidebars ni footers propios.
4. Estructura de una pantalla: `StateGate` → `PageHeading` → `section.section-block` con `SectionHeading` → contenido.
5. Navega siempre con `NavLink`/`ModuleLink` o `Link` pasando `search={search}` de `useWorkspace()`.
6. Un módulo nuevo se agrega en `modules` (`src/data/intercore.ts`) con `icon`, `tone`, `available`, `authorized`, y su ícono en `moduleIcons`; su navegación contextual sigue el patrón de Cotizador en `Sidebar`.
7. Estado y datos mock en el contexto de `AppShell`; nada de backend, polling o almacenamiento del navegador salvo petición explícita.
8. Estilos: clases semánticas en `src/styles.css` con tokens existentes; si falta un valor, crea un token en `:root` en vez de un literal.
9. Cubre siempre: hover, `:focus-visible`, activo, deshabilitado, cargando, vacío y error; `aria-label` en botones de ícono.
10. Verifica a 1280 px, 900 px y 390 px: sin desbordes, drawer funcional y sidebar compacto correcto.
11. No cambies tokens de identidad salvo que se entregue la marca oficial de Intercon.

---

## 16. Especificaciones para componentes futuros

> **Estado: normativo, aún no implementado.** Estas piezas no existen en las pantallas actuales. Definen cómo deben construirse cuando se necesiten (dashboards, ERP, CRM, monitoreo, nómina, calendario) para mantener el lenguaje de Corporate Workspace. Al implementarlas:
> - Base: primitivos de `src/components/ui/*` (shadcn/Radix) ya instalados; estilarlos con clases semánticas en `src/styles.css`.
> - Ubicación: wrappers reutilizables en `src/components/intercore/widgets.tsx` (o un archivo nuevo `data.tsx` si crece), nunca estilos sueltos por pantalla.
> - Solo tokens existentes; si falta uno, se agrega a `:root`.
> - Al implementar una pieza, mover su fila de "futuro" a la sección 9.

### 16.1 Reglas transversales

| Aspecto | Regla |
|---|---|
| Densidad | Filas 44 px (estándar) / 36 px (compacta, monitoreo y nómina). Texto de datos 12 px; encabezados de columna 10 px, mayúsculas, `letter-spacing 0.5px`, `--muted-foreground` |
| Superficie | `--card` con borde 1 px `--border`, radio `--radius`; sin sombra. Overlays usan la única sombra permitida para flotantes: `--shadow-overlay` (crear: `0 8px 24px oklch(0.2 0.02 250 / 0.12)`) |
| Números | Alineados a la derecha, `font-variant-numeric: tabular-nums`; moneda `es-MX` (`$12,450.00 MXN`); fechas `11 oct 2026`, horas 24 h |
| Color | Azul solo para selección/acción; estados con pares semánticos (fuerte + soft). Nunca codificar significado solo con color: acompañar con texto o ícono |
| Íconos | lucide, 16 px en controles, 14 px en celdas |
| Movimiento | Solo apertura/cierre de overlays ≤150 ms (`tw-animate-css` de shadcn); respetar `prefers-reduced-motion` |
| Estados | Toda pieza de datos define: cargando (skeleton con `--muted`), vacío (`EmptyState`), error (`EmptyState icon="error"` + Reintentar), sin permiso (`icon="lock"`) |
| Overlay z-index | Popover/Dropdown 50, Dialog/Sheet 50 sobre fondo `oklch(0.235 0.027 253 / 0.45)` (institucional translúcido, token `--overlay` a crear) |

### 16.2 Tablas de datos (`DataTable`)
- Base: `ui/table` (+ `ui/checkbox`, `ui/dropdown-menu`, `ui/pagination`).
- Estructura: `section` → barra de herramientas → tabla → pie con paginación.
- **Barra de herramientas** (`.filter-toolbar` existente): búsqueda 36 px a la izquierda; filtros (select 35 px) y acciones a la derecha; botón primario máximo uno ("Nuevo registro"). Con filas seleccionadas se reemplaza por barra de acción masiva: fondo `--brand-soft`, texto `--primary`, "3 seleccionados · Exportar · Eliminar".
- **Encabezado:** fondo `--background`, borde inferior, `position: sticky; top: 0`. Ordenable con `ChevronsUpDown`/`ArrowUp`/`ArrowDown` 12 px y `aria-sort`.
- **Filas:** separadas por `border-top`; hover `--background`; seleccionada `--brand-soft` + checkbox marcado; sin zebra. Primera columna = identificador en `font-weight 500`, enlazable (hover `--primary`).
- **Celdas:** estado con `StatusBadge`; acciones de fila en última columna con botón ghost icono `MoreHorizontal` (`aria-label="Acciones de <registro>"`) que abre `DropdownMenu`; acción destructiva al final, separada, color `--danger`.
- **Paginación:** pie 48 px, "1–25 de 312" a la izquierda (11 px muted), selector de filas por página y botones outline icono a la derecha.
- **Responsive:** ≤900 px scroll horizontal con primera columna fija; ≤640 px cambiar a lista de tarjetas (`.task-row` como modelo).
- Vacío con filtros: "Sin resultados para estos filtros" + botón outline "Limpiar filtros".

```tsx
<DataTable
  columns={columns}
  rows={rows}
  toolbar={<Button><Plus />Nuevo empleado</Button>}
  selectable
  emptyState={<EmptyState title="Sin empleados" description="Agrega el primer registro." />}
/>
```

### 16.3 Ventanas emergentes (`Dialog`, `AlertDialog`, `Sheet`)
- **Dialog** (`ui/dialog`): fondo `--card`, radio `--radius`, `--shadow-overlay`, padding 24 px. Anchos: `sm` 400 px (confirmación), `md` 560 px (formulario corto, por defecto), `lg` 800 px (detalle). Alto máx. `85vh` con cuerpo desplazable y header/footer fijos.
  - Header: título Manrope 16 px 700 + descripción 12 px muted; cerrar con `X` ghost icono.
  - Footer: borde superior, acciones alineadas a la derecha; secundaria `outline` a la izquierda de la primaria.
- **AlertDialog** (`ui/alert-dialog`): solo para acciones destructivas o irreversibles. Título como pregunta ("¿Eliminar la cotización COT-2026-0148?"), consecuencia explícita, botón con `variant="destructive"` nombrando la acción ("Eliminar"), nunca "Aceptar". Foco inicial en Cancelar.
- **Sheet lateral derecho** (`ui/sheet side="right"`): edición o detalle de un registro sin perder la lista (CRM, ERP). Ancho 480 px (≤640 px: 100 %). Mismo header/footer que Dialog.
- Reglas: no apilar más de un overlay; Escape y clic fuera cierran salvo formularios con cambios (pedir confirmación); devolver el foco al disparador; nunca abrir un modal al cargar una página.

### 16.4 Pestañas (`Tabs`)
- Base: `ui/tabs`. Uso: alternar vistas de un mismo objeto (Resumen · Actividad · Documentos). Para secciones de un módulo usar la navegación contextual del sidebar, no tabs.
- Estilo: subrayado, no "píldoras". Lista con borde inferior 1 px `--border`, gap 24 px; trigger 40 px alto, 12 px, `--muted-foreground`; activo `--foreground`, 500, línea inferior 2 px `--primary`; hover `--foreground`.
- Contador opcional como `.section-count`. Máximo 6 pestañas; ≤640 px scroll horizontal sin scrollbar visible.
- Si la pestaña cambia el contenido principal de la página, reflejarla en un parámetro de búsqueda de la URL.

### 16.5 Formularios avanzados
- Base: `ui/form`, `ui/label`, `ui/input`, `ui/textarea`, `ui/select`, `ui/checkbox`, `ui/radio-group`, `ui/switch`.
- Diseño de `.form-grid` (2 columnas, gap 20 px); agrupar en secciones con `SectionHeading` y separadas por borde. Formularios largos (alta de empleado, factura): índice de secciones a la izquierda de 200 px fijo.
- Obligatorios con `*` en `--danger` y `aria-required`; ayuda 11 px muted debajo del campo.
- Error: borde `--danger`, mensaje 11 px `--danger` con `AlertCircle` 12 px, `aria-invalid` + `aria-describedby`; validar al salir del campo y al enviar, enfocando el primer error.
- `Switch` solo para ajustes de efecto inmediato; `Checkbox` para opciones que se guardan con botón.
- Botón de envío muestra `LoaderCircle` girando y queda deshabilitado mientras envía.

### 16.6 Selectores, combobox y fechas
- **Combobox/búsqueda en lista** (`ui/command` en `ui/popover`): para listas >10 opciones (clientes, empleados). Input 36 px, opciones 32 px, seleccionada con `Check` `--primary`.
- **Multiselección:** valores como chips `badge-neutral` con `X` 12 px dentro del control.
- **Date picker** (`ui/calendar` en popover): celdas 32 px, día actual con borde `--primary`, seleccionado fondo `--primary` texto `--primary-foreground`, rango con `--brand-soft`, fines de semana `--muted-foreground`. Semana inicia en lunes, locale `es`.

### 16.7 KPIs y tarjetas de métricas (dashboards)
- Patrón base: `.quote-metrics` (franja con divisores verticales), no tarjetas separadas con sombra.
- Contenido: label 12 px muted → valor Manrope 27 px 700 tabular → variación 11 px con `TrendingUp`/`TrendingDown` en `--success`/`--danger` y periodo ("vs. mes anterior").
- 3–4 KPIs por fila; ≤900 px 2 columnas; ≤640 px 1.

### 16.8 Gráficas
- Base: `ui/chart` (Recharts). Colores en orden: `--primary`, `--teal`, `--violet`, `--warning`, `--rose`; nunca más de 5 series. Semánticos solo cuando la serie significa estado.
- Ejes y cuadrícula `--border`, etiquetas 10 px muted, sin fondo ni gradientes de área fuertes (relleno máx. 12 % de opacidad). Tooltip = popover estándar.
- Contenedor con `SectionHeading` + selector de periodo a la derecha; alto 240–320 px; texto alternativo o tabla equivalente disponible.

### 16.9 Monitoreo y estados en vivo
- Indicador de estado: dot 8 px + texto (Operativo `--success`, Degradado `--warning`, Caído `--danger`, Sin datos `--muted-foreground`); nunca pulsos ni parpadeos.
- "Actualizado hace 2 min" 11 px muted + botón ghost `RefreshCw` para refrescar manualmente; sin polling en el prototipo.
- Tablas de incidentes en densidad compacta; severidad con `StatusBadge`.

### 16.10 Calendario y agenda
- Vistas Mes · Semana · Día como `Tabs` en la barra de herramientas, más "Hoy" (outline) y flechas `ChevronLeft/Right` ghost; título del periodo Manrope 16 px.
- Cuadrícula con bordes 1 px `--border` sobre `--card`; día actual con número en círculo `--primary`; fuera de mes `--muted-foreground` sobre `--background`.
- Eventos: bloque con fondo soft del tono y borde izquierdo 3 px del tono fuerte (reutilizar `tone-*`), texto 11 px; "+3 más" como enlace. Línea de hora actual 1 px `--danger` en vistas semana/día.
- Detalle de evento en Popover; creación/edición en Sheet derecho.

### 16.11 Nómina, ERP y CRM (patrones de dominio)
- **Detalle de registro:** encabezado con identificador, `StatusBadge` y acciones; cuerpo con Tabs; lista de propiedades en `dl` de 2 columnas (label 11 px muted 160 px / valor 12 px), patrón ya usado en perfil.
- **Totales:** filas de resumen alineadas a la derecha; total final 600, separado por borde superior doble no, simple 1 px `--foreground`.
- **Procesos por pasos (Stepper)** para cierres de nómina o pedidos: pasos numerados en círculo 24 px (pendiente borde `--border`, actual `--primary`, completo `--success` con `Check`), conectores 1 px; acciones Atrás/Siguiente en footer.
- **Pipeline/Kanban (CRM):** columnas 280 px en `--background`, título 12 px 600 + contador; tarjetas `--card` borde 1 px, padding 12 px, sin sombra; arrastrar con alternativa por teclado/menú "Mover a".
- **Línea de tiempo/actividad:** reutilizar `RecentActivity`; dot 8 px por evento, fecha 10 px muted.

### 16.12 Retroalimentación
- **Toast** (`ui/sonner`, montar `<Toaster />` una vez en `__root.tsx`): abajo a la derecha, `--card` con borde y `--shadow-overlay`, ícono semántico; 4 s; incluir "Deshacer" tras eliminar. Solo confirma acciones, nunca reemplaza errores de formulario.
- **Alert en línea** (`ui/alert`): bloque con fondo soft semántico, borde 1 px del tono fuerte al 30 %, ícono 16 px, título 12 px 600 + texto 12 px. Info usa `--brand-soft`/`--primary`.
- **Banner de sistema** (mantenimiento, sesión por expirar): franja bajo el header, 40 px, `--warning-soft`, cerrable.
- **Progreso** (`ui/progress`): 6 px alto, pista `--muted`, relleno `--primary` (o semántico), con porcentaje en texto.
- **Tooltip** (`ui/tooltip`): fondo `--institutional`, texto `--institutional-fg`, 11 px, radio 4 px, retardo 300 ms; solo información complementaria, nunca contenido esencial.

### 16.13 Otros
- **Avatar** (`ui/avatar`): iniciales en `--brand-soft`/`--primary`, 24/32/40 px; grupos superpuestos con borde 2 px `--card`, "+N".
- **Acordeón** (`ui/accordion`): filas con borde inferior, título 12 px 500, `ChevronDown` que rota; para FAQ y filtros avanzados.
- **Paginación/carga:** paginación numérica en tablas; "Cargar más" outline en listas de actividad; no scroll infinito.
- **Command palette** (`ui/command` en dialog): atajo `Ctrl/⌘ K`, extensión de la búsqueda global; resultados agrupados (Módulos, Registros, Acciones).

### 16.14 Mapa de componentes futuros

| Necesidad | Primitivo base | Wrapper Intercore propuesto |
|---|---|---|
| Tabla de datos | `ui/table` | `DataTable`, `TableToolbar`, `RowActions` |
| Modal / confirmación | `ui/dialog`, `ui/alert-dialog` | `FormDialog`, `ConfirmDialog` |
| Panel de detalle | `ui/sheet` | `RecordSheet` |
| Pestañas | `ui/tabs` | `RecordTabs` |
| KPIs | — | `MetricStrip` (extiende `.quote-metrics`) |
| Gráficas | `ui/chart` | `ChartPanel` |
| Fechas | `ui/calendar`, `ui/popover` | `DatePicker`, `CalendarView` |
| Selección avanzada | `ui/command`, `ui/popover` | `Combobox` |
| Pasos | — | `Stepper` |
| Avisos | `ui/sonner`, `ui/alert` | `InlineAlert`, `SystemBanner` |

Antes de crear cualquiera de estos, revisar si ya fue implementado en `widgets.tsx` y reutilizarlo.
