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
