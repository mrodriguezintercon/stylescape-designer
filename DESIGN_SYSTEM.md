# Intercore Design System

Sistema visual de Intercore (Corporate Workspace). Fuente de verdad del código:

| Archivo | Contiene |
|---|---|
| `src/styles.css` | Tokens (`:root`) y clases semánticas |
| `src/components/intercore/shell.tsx` | `AppShell`, sidebar, header, navegación, breadcrumbs |
| `src/components/intercore/widgets.tsx` | Piezas operativas reutilizables |
| `src/components/intercore/views.tsx` | Composiciones de pantalla |
| `src/routes/__root.tsx` | Carga de fuentes, metadatos y montaje de `AppShell` |

> La paleta y los wordmarks (`INTERCON.` / `INTERCORE WORKSPACE`) son **provisionales**. Cambia valores solo en los tokens de `:root` en `src/styles.css`.

---

## Reglas críticas para agentes

1. Leer primero la **Parte I** (lo que existe).
2. Tratar la **Parte II** únicamente como propuesta: no asumir que existe.
3. Reutilizar componentes existentes antes de crear otros.
4. Usar tokens en lugar de valores arbitrarios.
5. Mantener el estilo **Corporate Workspace**.
6. No modificar lógica de negocio, APIs, autenticación ni datos.
7. Verificar el código fuente antes de asumir que algo existe.
8. Mantener accesibilidad, responsive y los estados loading, empty y error.

> **Prioridad:** estas reglas prevalecen sobre cualquier recomendación, ejemplo o propuesta posterior del documento. Orden de precedencia: Reglas críticas → secciones A–G → Parte I → Parte III → Parte II.

---

## Índice

- [A. Categorías de estado](#a-categorías-de-estado)
- [B. Clasificación de decisiones](#b-clasificación-de-decisiones)
- [C. Política de tokens y excepciones](#c-política-de-tokens-y-excepciones)
- [D. Inventario de tokens](#d-inventario-de-tokens)
- [E. Accesibilidad transversal](#e-accesibilidad-transversal)
- [F. Convenciones para datos](#f-convenciones-para-datos)
- [G. Tabla de decisión para componentes similares](#g-tabla-de-decisión-para-componentes-similares)
- [Parte I. Componentes existentes](#parte-i-componentes-existentes) — secciones 1 a 14
- [Parte II. Componentes propuestos](#parte-ii-componentes-propuestos) — secciones 15 a 23
- [Parte III. Reglas para agentes de código](#parte-iii-reglas-para-agentes-de-código)
- [Checklist antes de entregar UI](#checklist-antes-de-entregar-ui)

---

## A. Categorías de estado

Cada componente y token lleva una de estas categorías:

| Categoría | Significado |
|---|---|
| **Implementado** | Existe en el código fuente y se puede reutilizar tal cual |
| **Documentado pero no tokenizado** | Existe en el código como valor literal repetido; debe migrarse a token |
| **Propuesto** | No existe; la especificación está suficientemente definida para implementarse |
| **Propuesto — especificación pendiente** | No existe (o solo existe la base); falta definición antes de implementar. No inventar detalles |
| **Deprecado** | Existe pero no debe usarse en trabajo nuevo |

Una ficha puede combinar: "**Implementado** · extensión **Propuesto**" significa que la base existe y solo la extensión es nueva.

Elementos **Deprecados** actuales: las variantes `.style-command` y `.style-portal` (solo referencias de desarrollo) y el `--radius: 0.625rem` base de shadcn, sobrescrito por el bloque de identidad Intercore.

---

## B. Clasificación de decisiones

| Nivel | Uso |
|---|---|
| **Obligatorio** | Regla que no admite excepción sin actualizar este documento |
| **Preferido** | Opción por defecto; otra solo con justificación |
| **Permitido** | Aceptable cuando el caso lo pide |
| **No permitido** | Prohibido |
| **Pendiente de decisión** | No confirmado por Intercon; no tratarlo como regla definitiva |

Decisiones transversales:

| Decisión | Nivel |
|---|---|
| Usar tokens para color, radio, sombra y medidas repetidas | Obligatorio |
| Un botón primario por grupo de acciones | Obligatorio |
| Estados loading, empty, error y disabled en toda pieza de datos | Obligatorio |
| Nuevas pantallas dentro de `AppShell` | Obligatorio |
| Separar por líneas de 1 px antes que por tarjetas | Preferido |
| Selects nativos para ≤10 opciones | Preferido |
| Navegación contextual en el sidebar frente a sub-navegación horizontal | Preferido |
| Sheet derecho para editar sin perder la lista | Permitido |
| Tres columnas | Permitido (con moderación) |
| Gradientes, sombras fuertes, animaciones continuas, scroll infinito | No permitido |
| Tabs estilo píldora; `ui/sidebar.tsx`; otra librería de íconos o fuentes | No permitido |
| Paleta, tipografía y wordmarks definitivos | Pendiente de decisión |
| Token `--info` separado de `--primary` | Pendiente de decisión |
| Selectores nativos de fecha/hora en móvil | Pendiente de decisión |
| Sparklines en KPI; menciones en comentarios; selección multi-columna de orden | Pendiente de decisión |
| Zona horaria oficial del negocio | Pendiente de decisión (provisional `America/Mexico_City`) |

En la Parte II, las marcas "(Pendiente de decisión)" señalan propuestas no confirmadas.

---

## C. Política de tokens y excepciones

- **Obligatorio:** colores, radios, sombras y medidas repetidas usan tokens (`var(--token)`).
- Los valores directos solo se permiten como **excepciones documentadas** en la tabla siguiente.
- Los **breakpoints CSS** pueden mantenerse como valores literales (los media queries no aceptan variables).
- Los **grid templates específicos** de un componente (p. ej. `minmax(0,1fr) 72px 100px 135px`) pueden usar valores directos.
- Las **dimensiones estructurales repetidas** (ancho de página, padding de página, alturas de control, z-index, duraciones) deben migrarse a tokens; mientras no se migren figuran como "Documentado pero no tokenizado".
- **No permitido:** que un agente cree nuevos valores visuales sin documentarlos aquí y en `:root`.

| Excepción permitida | Ejemplo |
|---|---|
| Breakpoints | `@media (max-width: 900px)` |
| Grid templates de un componente | `.task-row`, `.home-columns` |
| Bordes de 1 px y offsets de foco | `outline-offset: 3px` |
| Ajustes ópticos puntuales de un solo uso | tamaño del wordmark compacto |
| Valores heredados de primitivos shadcn | clases Tailwind de `src/components/ui/*` |

---

## D. Inventario de tokens

Verificado contra `:root` de `src/styles.css`.

### D.1 Tokens existentes (Implementado)
| Grupo | Tokens |
|---|---|
| Color | `--background`, `--foreground`, `--card`, `--popover`, `--primary`, `--primary-foreground`, `--secondary`, `--muted`, `--muted-foreground`, `--accent`, `--accent-foreground`, `--border`, `--input`, `--ring`, `--brand-soft` |
| Institucional | `--institutional`, `--institutional-fg`, `--institutional-muted`, `--institutional-active`, `--institutional-border` |
| Semánticos | `--success`, `--success-soft`, `--warning`, `--warning-soft`, `--danger`, `--danger-soft` |
| Tonos | `--teal`, `--teal-soft`, `--violet`, `--violet-soft`, `--rose`, `--rose-soft` |
| Sombras / overlay | `--shadow-subtle`, `--shadow-floating`, `--overlay-backdrop` |
| Tipografía | `--font-interface`, `--font-heading`, `--font-numeric` |
| Espaciado | `--space-sm` (8), `--space-md` (16), `--space-lg` (24), `--space-section` (30) |
| Estructura | `--sidebar-width` (244), `--sidebar-compact-width` (72), `--header-height` (72), `--prototype-height` (48) |
| Radio | `--radius` (6 px) y derivados `--radius-sm/md/lg/xl` |

### D.2 Documentados pero no tokenizados (pendientes de migración desde literales)
| Token propuesto | Valor literal actual | Dónde |
|---|---|---|
| `--page-max-width` | `1560px` | `.page-content` |
| `--page-padding` | `22px 34px 35px` | `.page-content` |
| `--z-sticky` | `2` | encabezados fijos |
| `--z-sidebar` | `30` | `.desktop-sidebar` |
| `--z-prototype` | `45` | barra de prototipo |
| `--z-skip` | `100` | skip-link |
| `--duration-fast` | `0.15s` | transiciones globales |
| `--nav-item-height` | `40px` | `.nav-item` |
| `--touch-target` | `44px` | `.mobile-menu` |

### D.3 Propuestos con valor de referencia (no existen como token; los valores aparecen dispersos o no aparecen en el código)
`--control-sm` (32), `--control-md` (36), `--control-lg` (40), `--row-height` (44), `--row-height-compact` (36), `--icon-sm/md/lg` (14/16/18), `--radius-badge` (4), `--radius-full`, escala `--text-*` (9–26 px), `--text-display` (27).

### D.4 Propuestos sin valor previo en el código
`--z-overlay` (50; hoy lo aplican los primitivos shadcn, sin token), `--z-toast` (60), `--duration-overlay` (150 ms), `--ease-standard` (`cubic-bezier(0.2, 0, 0, 1)`), `--space-2xs` / `--space-xs` (4 / 6), `--space-xl` (32), `--row-hover`, `--row-selected`, `--info` / `--info-soft` (Pendiente de decisión).

---

## E. Accesibilidad transversal

| Tema | Regla (Obligatorio) |
|---|---|
| Deshabilitado nativo | Usar el atributo `disabled` en `button`, `input`, `select`, `textarea` |
| Deshabilitado custom | Usar `aria-disabled="true"` y bloquear la acción en el manejador; el elemento sigue siendo enfocable si necesita explicarse |
| `pointer-events: none` | **No** usarlo como regla general para deshabilitados. Solo se acepta dentro de primitivos shadcn cuando el control no requiere explicación (p. ej. `ui/button` lo trae por defecto); si el estado debe explicarse, envolver o usar `aria-disabled` |
| Explicar el porqué | Todo elemento deshabilitado conserva información suficiente: texto visible ("Próximamente", "Sin permiso") o descripción asociada (`aria-describedby`) |
| Tooltips | Un tooltip que explica un estado debe poder activarse con hover **y** foco de teclado; nunca colocarlo sobre un elemento no enfocable o con `pointer-events: none` |
| Color | Ningún estado se comunica solo por color: acompañar con texto o ícono |
| Contraste | Texto ≥4.5:1, texto grande e íconos funcionales ≥3:1 |
| Foco | `:focus-visible` con 2 px `--ring` y offset 3 px; no eliminarlo |
| Teclado | Todo flujo se completa sin mouse; Escape cierra overlays y devuelve el foco |
| Lectores de pantalla | Botones de ícono con `aria-label`; regiones con `<nav aria-label>`; cambios dinámicos con `aria-live="polite"`; carga con `role="status"` |
| Táctil | Objetivos ≥44 px en móvil |
| Movimiento | Respetar `prefers-reduced-motion` (Implementado) |

---

## F. Convenciones para datos

| Dato | Regla | Ejemplo |
|---|---|---|
| Moneda | `new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' })`; añadir "MXN" cuando pueda haber otras monedas | `$12,450.00 MXN` |
| Porcentaje | `Intl.NumberFormat('es-MX', { style: 'percent', maximumFractionDigits: 1 })` | `12.5 %` |
| Negativos | Signo menos antes del símbolo; color `--danger` solo si significa pérdida, siempre con el signo | `-$1,200.00` |
| Números | `tabular-nums`, alineados a la derecha; `--font-numeric` en columnas densas | `1,250` |
| Fechas | `Intl.DateTimeFormat('es-MX', { day: 'numeric', month: 'short', year: 'numeric' })` | `11 oct 2026` |
| Fecha y hora | Fecha + hora 24 h | `11 oct 2026, 14:30` |
| Horas | Formato 24 h (`hourCycle: 'h23'`) | `09:05` |
| Zona horaria | Mostrar en la zona horaria del negocio, igual en todas las pantallas. Pendiente de decisión; provisional `America/Mexico_City` | — |
| Relativas | Solo para actividad reciente (<7 días), con fecha completa en `title` | `hace 2 h` |
| `null` / `undefined` / `NaN` | **No permitido** mostrarlos; formatear con un helper que devuelva "—" | `—` |
| Información faltante | "—" en `--muted-foreground`; en formularios, campo vacío con placeholder | `—` |
| Vencidas | Texto `--danger` + ícono `AlertCircle` + palabra "Vencida" | `Vencida · 8 oct 2026` |
| Estados de cotización | Siempre con `StatusBadge` y texto, según los estados de `initialQuotes` en `src/data/intercore.ts`. Hoy `StatusBadge` solo asigna color a `Alta`, `Media`, `Completado` y `En progreso`; los estados de cotización se muestran en `badge-neutral`. Su color propio es **Pendiente de decisión** | `Borrador`, `Por aprobar`, `Enviada` |

---

## G. Tabla de decisión para componentes similares

| Grupo | Usar | Cuándo | No usar cuando |
|---|---|---|---|
| Input / Combobox / Autocomplete | Input | Texto libre sin sugerencias | El valor debe pertenecer a una lista |
| | Combobox | Elegir de una lista larga (>10) con búsqueda | El texto es libre |
| | Autocomplete | Texto libre con sugerencias opcionales | El valor debe validarse contra la lista |
| Tabs / Sub-navigation | Tabs | Vistas del mismo objeto en una página | Las vistas son secciones de un módulo |
| | Sub-navigation | Secciones de un módulo, cada una con ruta | Solo cambia una parte de un registro |
| Data Table / Tabla responsive | Data Table | Comparar y operar registros en ≥640 px | Móvil o menos de 3 columnas útiles |
| | Tabla responsive | La misma tabla en ≤640 px | Escritorio |
| Métricas / KPI cards | Métricas (`.quote-metrics`) | Resumen numérico de un módulo | Se necesita variación o tendencia |
| | KPI cards (`MetricStrip`) | Dashboards con variación vs. periodo | Solo hay un valor aislado |
| Modal / Confirmation dialog | Modal | Tarea breve con formulario | La acción es destructiva |
| | Confirmation dialog | Confirmar acción destructiva o irreversible | La acción es reversible (usar Toast con Deshacer) |
| Skeleton / Loading state | Skeleton | Carga de una sección cuya forma se conoce | Toda la pantalla está bloqueada |
| | Loading state (`StateGate`) | Carga de la pantalla completa | Solo carga una sección |
| Activity feed / Activity log | Activity feed (`RecentActivity`) | Actividad reciente resumida para el usuario | Se requiere trazabilidad completa |
| | Activity log | Auditoría de cambios con valor anterior/nuevo | Es un resumen informal |
| Cards / ModuleCard | ModuleCard | Representar un módulo | Representar registros |
| | Cards (`RecordCard`) | Registro individual (kanban, resultados) | Agrupar secciones de página |


---

El documento tiene tres partes separadas:

| Parte | Contenido | Estado |
|---|---|---|
| **I. Componentes existentes** | Solo lo que ya está en el código | Implementado |
| **II. Componentes propuestos** | Especificaciones para piezas futuras | **Propuesto** |
| **III. Reglas para agentes de código** | Cómo trabajar con este sistema | Obligatorio |

Nada de la Parte II debe tratarse como existente. Cuando una pieza propuesta se implemente, se mueve a la Parte I.

---

# Parte I. Componentes existentes

> Todo lo de esta parte representa el comportamiento esperado del código actual. Antes de implementar cambios, el agente debe verificarlo contra los archivos fuente indicados al inicio del documento.

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
- **Disabled:** opacidad 50 % y atributo `disabled` (el primitivo `ui/button` además aplica `pointer-events: none`; ver sección E para cuándo no basta); módulos no disponibles usan `module-unavailable` + texto “Próximamente”.

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
- **Modales:** no hay diálogos en las pantallas actuales. Los overlays existentes son `Sheet` (drawer móvil) y `DropdownMenu` (usuario, acciones de tarea/cotización). Para modales, tablas, pestañas y demás piezas propuestas ver la Parte II.
- **Formularios:** label encima del control (columna, gap 8 px), inputs nativos estilizados globalmente, acciones en `.form-actions` (flex, gap 10 px), botón principal primero.

---

## 9. Componentes y variantes

| Componente | Implementación | Variantes / notas |
|---|---|---|
| Botón | `@/components/ui/button` | `default` (primary, acción principal, una por grupo), `outline` (secundarias), `ghost` (navegación, íconos), `size="icon"`, `size="sm"`; siempre `asChild` + `Link` para navegar |
| Input | `<input>` nativo con estilos globales | borde `--input`, fondo card, radio `--radius`, padding `10px 12px`; búsqueda del header sin borde interno |
| Select | `<select>` nativo | mismos estilos que input; filtros 35 px alto, 11 px |
| Card | `ModuleCard` (`.module-card`) | ícono en tono + favorito (estrella), título, descripción, pie con disponibilidad y “Acceder”; `module-unavailable` |
| Badge | `StatusBadge` (`.status-badge`), prop única `status` (texto) | La clase se deriva del texto: `badge-danger` (Alta, con dot), `badge-warning` (Media), `badge-success` (Completado), `badge-brand` (En progreso), `badge-neutral` (cualquier otro, p. ej. Pendiente, Borrador, Enviada) |
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
- **Disabled:** atributo `disabled` u `aria-disabled` con motivo visible (sección E); módulos deshabilitados muestran estado, no se ocultan del flujo (`/modulos/proyectos`).
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

---

# Parte II. Componentes propuestos

> **Estado de toda esta parte: Propuesto**, salvo cuando una ficha indica "**Implementado** · extensión **Propuesto**", en cuyo caso solo la extensión es nueva. Las decisiones no confirmadas se marcan como **Pendiente de decisión** (sección B). Categorías en la sección A.
>
> Al implementar:
> - Base: primitivos de `src/components/ui/*` (shadcn/Radix) ya instalados, estilados con clases semánticas en `src/styles.css`.
> - Wrappers reutilizables en `src/components/intercore/widgets.tsx` (o un archivo nuevo, p. ej. `data.tsx`, si crece). Nunca estilos sueltos por pantalla.
> - Solo tokens existentes o los propuestos en la sección 15; nunca literales.

---

## 15. Tokens reutilizables

Categorías de la sección A. El inventario consolidado está en la sección D.

### 15.1 Colores
| Token | Estado | Valor |
|---|---|---|
| `--primary`, `--primary-foreground`, `--brand-soft`, `--accent` | Implementado | ver sección 2 |
| `--institutional`, `-fg`, `-muted`, `-active`, `-border` | Implementado | ver sección 2 |
| `--background`, `--card`, `--foreground`, `--muted`, `--muted-foreground`, `--border`, `--input`, `--ring` | Implementado | ver sección 2 |
| `--success` / `-soft`, `--warning` / `-soft`, `--danger` / `-soft` | Implementado | ver sección 2 |
| `--teal`, `--violet`, `--rose` (+ `-soft`) | Implementado | tonos de módulo y series de gráficas |
| `--overlay-backdrop` | Implementado | `oklch(0.15 0.02 250 / 0.5)` |
| `--info` / `--info-soft` | Pendiente de decisión | alias de `--primary` / `--brand-soft`; solo crear si "información" debe diferenciarse de "acción" |
| `--row-hover` | Propuesto | alias de `--background` |
| `--row-selected` | Propuesto | alias de `--brand-soft` |

### 15.2 Tipografía
| Token | Estado | Valor |
|---|---|---|
| `--font-interface` | Implementado | Roboto |
| `--font-heading` | Implementado | Manrope |
| `--font-numeric` | Implementado | Roboto Mono |
| Escala `--text-2xs/xs/sm/md/lg/xl/2xl` | Propuesto | 9 / 10 / 11 / 12 / 14 / 16 / 26 px (valores ya usados en el código, sección 3) |
| `--text-display` | Propuesto | 27 px (métricas) |

### 15.3 Spacing
| Token | Estado | Valor |
|---|---|---|
| `--space-sm` / `--space-md` / `--space-lg` | Implementado | 8 / 16 / 24 px |
| `--space-section` | Implementado | 30 px |
| `--space-2xs` / `--space-xs` | Propuesto | 4 / 6 px (gaps de íconos y chips) |
| `--space-xl` | Propuesto | 32 px |
| `--page-max-width` | Documentado pero no tokenizado | 1560 px |
| `--page-padding` | Documentado pero no tokenizado | `22px 34px 35px` |

### 15.4 Border radius
| Token | Estado | Valor |
|---|---|---|
| `--radius` | Implementado | 6 px (controles, tarjetas, overlays) |
| `--radius-sm` / `-md` / `-lg` / `-xl` | Implementado | derivados shadcn |
| `--radius-badge` | Propuesto | 4 px (badges, tooltips, chips) |
| `--radius-full` | Propuesto | 9999 px (avatares, dots, switch) |

### 15.5 Sombras
| Token | Estado | Uso |
|---|---|---|
| `--shadow-subtle` | Implementado | casi invisible; tarjetas en estilos de desarrollo |
| `--shadow-floating` | Implementado | **única** sombra para overlays: popover, dropdown, dialog, sheet, toast |
| Otras sombras | No permitidas | la elevación se expresa con borde 1 px |

### 15.6 Z-index
| Capa | Estado | Valor |
|---|---|---|
| Contenido sticky | Documentado pero no tokenizado | 2 |
| Sidebar fijo | Documentado pero no tokenizado | 30 |
| Barra de prototipo | Documentado pero no tokenizado | 45 |
| Overlays Radix (popover, dropdown, dialog, sheet) | Implementado en shadcn, sin token Intercore | 50 |
| Toast | Propuesto | 60 |
| Skip-link | Documentado pero no tokenizado | 100 |
| Pendiente de migración | — | crear `--z-sticky`, `--z-sidebar`, `--z-prototype`, `--z-overlay`, `--z-toast`, `--z-skip` y sustituir los literales |

### 15.7 Breakpoints
| Nombre | Estado | Media query | Dispositivo |
|---|---|---|---|
| wide | Implementado | `≥1450px` | escritorio amplio |
| desktop | Implementado | `901–1449px` | escritorio |
| laptop | Implementado | `≤1100px` | escritorio estrecho / tablet horizontal |
| tablet | Implementado | `≤900px` | tablet; sidebar → drawer |
| mobile | Implementado | `≤640px` | móvil |
Los media queries CSS no admiten variables: mantener estos valores literales y documentados aquí.

### 15.8 Tamaños de controles
| Token | Estado | Valor | Uso |
|---|---|---|---|
| `--control-sm` | Propuesto | 32 px | filtros densos, opciones de lista, celdas de calendario |
| `--control-md` | Propuesto | 36 px | inputs, búsqueda, selects (valor actual en búsqueda) |
| `--control-lg` | Propuesto | 40 px | botones de acción, nav items, triggers de tabs |
| `--touch-target` | Documentado pero no tokenizado | 44 px | mínimo táctil en móvil (ya usado en `.mobile-menu`) |
| `--row-height` / `--row-height-compact` | Propuesto | 44 / 36 px | filas de tabla |
| `--icon-sm` / `--icon-md` / `--icon-lg` | Propuesto | 14 / 16 / 18 px | celdas / controles / navegación |

### 15.9 Movimiento
| Token | Estado | Valor | Uso |
|---|---|---|---|
| `--duration-fast` | Documentado pero no tokenizado | 150 ms | hover, color, borde (valor actual `0.15s`) |
| `--duration-overlay` | Propuesto | 150 ms | apertura/cierre de overlays |
| `--ease-standard` | Propuesto | `cubic-bezier(0.2, 0, 0, 1)` | todas las transiciones |
| Reglas | — | sin animaciones continuas, pulsos ni parallax; `prefers-reduced-motion` anula todo (ya implementado) |

---

## 16. Reglas transversales para componentes propuestos

- **Estados obligatorios** en toda pieza interactiva: default, hover (cambio de color 150 ms), focus (`:focus-visible` 2 px `--ring`, offset 3 px — ya global), active, disabled (opacidad 50 %, `cursor: not-allowed`, `disabled` nativo o `aria-disabled` con motivo visible; ver sección E), loading (spinner `LoaderCircle` o skeleton con `--muted`, `aria-busy`), error (borde/texto `--danger` + texto explicativo), empty (`EmptyState`).
- **Densidad:** texto de datos 12 px; encabezados de columna 10 px mayúsculas `letter-spacing 0.5px` muted.
- **Números:** derecha, `tabular-nums`, `--font-numeric` en cifras densas; moneda `es-MX` (`$12,450.00 MXN`), fechas `11 oct 2026`, horas 24 h.
- **Color:** azul solo para acción/selección; nunca significado solo por color.
- **Íconos:** lucide, 14 / 16 / 18 px.
- **Superficie:** `--card` + borde 1 px; overlays con `--shadow-floating` sobre `--overlay-backdrop`.

Estructura de cada ficha: Estado · Propósito · Variantes · Estructura visual · Props sugeridas · Estados · Responsive · Accesibilidad · Ejemplo · Reglas de uso y relación. La **relación con otros componentes** y el **cuándo no usarlo** se indican en ese apartado y en la tabla de decisión (sección G). Las fichas resumidas sin estos apartados están marcadas como "especificación pendiente". Los estados solo listan lo que difiere de la regla transversal.

---

## 17. Navegación

### Componente: Sidebar
Estado: **Implementado** · extensión **Propuesto** (grupos colapsables por módulo con más de 6 secciones)
#### Propósito
Navegación global y contextual persistente (ver sección 8).
#### Variantes
Expandido 244 px · Compacto 72 px (Implementado) · Drawer móvil 280 px (Implementado) · extensión **Propuesto**: grupo colapsable.
#### Estructura visual
Grupo: label 9 px mayúsculas `--institutional-muted` + `ChevronDown` 12 px; hijos con sangría 12 px.
#### Props sugeridas
`groups: { label, items, defaultOpen }[]`.
#### Estados
Grupo con ruta activa siempre abierto; activo = barra 3 px `--primary`.
#### Responsive
Drawer siempre expandido y con etiquetas; compacto muestra solo íconos con `title`.
#### Accesibilidad
`aria-expanded` en el botón del grupo; `<nav aria-label>` único.
#### Ejemplo de uso
```tsx
<SidebarGroup label="Cotizador" defaultOpen>{items}</SidebarGroup>
```
#### Reglas de uso y relación
No crear un segundo sidebar ni usar `ui/sidebar.tsx`. No agregar más de 2 niveles.

### Componente: Header
Estado: **Implementado** · extensión **Propuesto** (acción contextual de página)
#### Propósito
Búsqueda global, pendientes, notificaciones y perfil (sección 8).
#### Variantes
Estándar (Implementado) · extensión **Propuesto**: con `SystemBanner` debajo.
#### Estructura visual
72 px, `--card`, borde inferior; acciones a la derecha separadas por divisor 1 px.
#### Props sugeridas
Ninguna nueva; las pantallas no inyectan elementos en el header.
#### Estados
Punto `--danger` en notificaciones no leídas (Implementado).
#### Responsive
≤900 px búsqueda se reduce (Implementado); ≤640 px botón ícono que abre Command palette (Pendiente de decisión).
#### Accesibilidad
Botones de ícono con `aria-label` y contador en texto ("Notificaciones, 3 sin leer").
#### Ejemplo de uso
Provisto por `AppShell`; no se instancia en pantallas.
#### Reglas de uso y relación
Las acciones de la página van en `PageHeading`, nunca en el header global.

### Componente: Breadcrumbs
Estado: **Implementado** · extensión **Propuesto** (truncado y etiquetas personalizadas)
#### Propósito
Ubicación en vistas profundas, empieza en "Intercore". Implementado: `<Breadcrumbs />` sin props, lo renderiza `AppShell` automáticamente a partir de la URL; las pantallas no lo instancian.
#### Variantes
Estándar (Implementado) · extensión **Propuesto**: truncado con `…` cuando hay más de 4 niveles.
#### Estructura visual
10 px muted, separador `ChevronRight` (12 px en el código); último nivel `--foreground` sin enlace.
#### Props sugeridas
Extensión **Propuesto**: `items?: { label, to? }[]` para sobrescribir etiquetas (p. ej. folio de un registro), `maxItems = 4`. Hoy no acepta props.
#### Estados
Hover en enlace `--primary`.
#### Responsive
≤640 px muestra solo "‹ Nivel anterior" (Pendiente de decisión).
#### Accesibilidad
`nav aria-label="Ruta de navegación"`, último con `aria-current="page"` (Implementado).
#### Ejemplo de uso
```tsx
// Propuesto, no funciona hoy
<Breadcrumbs items={[{label:"Cotizador", to:"/modulos/cotizador"},{label:"COT-2026-0148"}]} />
```
#### Reglas de uso y relación
No usar como navegación principal.

### Componente: Tabs
Estado: **Propuesto**
#### Propósito
Alternar vistas de un mismo objeto (Resumen · Actividad · Documentos).
#### Variantes
Subrayado (único estilo) · con contador.
#### Estructura visual
Lista con borde inferior 1 px, gap 24 px; trigger 40 px, 12 px muted; activo `--foreground` 500 + línea 2 px `--primary`.
#### Props sugeridas
`tabs: { value, label, count?, disabled? }[]`, `value`, `onValueChange`, `syncWithUrl?: boolean`.
#### Estados
Hover `--foreground`; disabled 50 %; loading del panel con skeleton, no en el trigger.
#### Responsive
≤640 px scroll horizontal sin scrollbar visible.
#### Accesibilidad
`ui/tabs` (Radix): `role="tablist"`, flechas izquierda/derecha, Home/End.
#### Ejemplo de uso
```tsx
<RecordTabs tabs={[{value:"resumen",label:"Resumen"},{value:"actividad",label:"Actividad",count:4}]} syncWithUrl />
```
#### Reglas de uso y relación
Máximo 6. No usar estilo píldora. No usar para secciones de un módulo (eso es sub-navegación).

### Componente: Sub-navigation
Estado: **Implementado** como navegación contextual de Cotizador en el sidebar · extensión **Propuesto**: variante horizontal en página
#### Propósito
Secciones de un módulo.
#### Variantes
En sidebar (Implementado, Preferido) · Horizontal bajo `PageHeading` (Pendiente de decisión, solo si el módulo no tiene sidebar contextual).
#### Estructura visual
Horizontal: igual que Tabs pero cada item es un `Link` a una ruta.
#### Props sugeridas
`items: { label, to, icon? }[]`.
#### Estados
Activo por ruta (`aria-current="page"`).
#### Responsive
En móvil la contextual vive dentro del drawer.
#### Accesibilidad
`<nav aria-label="Secciones de <módulo>">`.
#### Ejemplo de uso
Patrón de Cotizador en `Sidebar`.
#### Reglas de uso y relación
Cada sección es una ruta de archivo, no un estado local.

### Componente: Menú contextual (Context menu)
Estado: **Propuesto**
#### Propósito
Acciones sobre un registro con clic derecho en tablas, kanban o calendario.
#### Variantes
Simple · con grupos y separadores · con atajos.
#### Estructura visual
Igual a `DropdownMenu`: `--popover`, borde, `--shadow-floating`, items 32 px 12 px, ícono 14 px; destructivo al final en `--danger`.
#### Props sugeridas
`items: { label, icon?, shortcut?, onSelect, destructive?, disabled? }[]`.
#### Estados
Item hover `--accent`; disabled 50 %.
#### Responsive
En táctil no existe clic derecho: las mismas acciones deben estar en el botón `MoreHorizontal`.
#### Accesibilidad
`ui/context-menu`; también abrir con Shift+F10 / tecla Menú.
#### Ejemplo de uso
```tsx
<ContextMenu><ContextMenuTrigger><Row/></ContextMenuTrigger><ContextMenuContent>…</ContextMenuContent></ContextMenu>
```
#### Reglas de uso y relación
Nunca como único acceso a una acción.

### Componente: Command palette
Estado: **Propuesto**
#### Propósito
Extensión de la búsqueda global con teclado (`Ctrl/⌘ K`).
#### Variantes
Única.
#### Estructura visual
Dialog 560 px, input 44 px sin borde con `Search`, resultados agrupados (Módulos, Registros, Acciones) con label 10 px mayúsculas; item 36 px.
#### Props sugeridas
`groups`, `onSelect`, `placeholder`.
#### Estados
Vacío: "Sin resultados para «…»"; loading: skeleton de 3 filas.
#### Responsive
≤640 px pantalla completa.
#### Accesibilidad
`ui/command`; flechas, Enter, Escape; anuncio del número de resultados (`aria-live="polite"`).
#### Ejemplo de uso
```tsx
<CommandPalette groups={[{label:"Módulos", items: authorizedModules}]} />
```
#### Reglas de uso y relación
Solo muestra módulos y registros autorizados. No sustituye a `/busqueda`.

### Componente: Pagination
Estado: **Propuesto**
#### Propósito
Navegar páginas de tablas y listados.
#### Variantes
Completa (rango + filas por página + flechas) · Simple (anterior/siguiente) · "Cargar más" para feeds.
#### Estructura visual
Pie 48 px con borde superior: "1–25 de 312" 11 px muted a la izquierda; select de filas y botones outline ícono 32 px a la derecha.
#### Props sugeridas
`page`, `pageSize`, `total`, `onPageChange`, `pageSizeOptions = [25, 50, 100]`.
#### Estados
Flechas disabled en extremos.
#### Responsive
≤640 px solo flechas y "Página 2 de 13".
#### Accesibilidad
`nav aria-label="Paginación"`, `aria-current="page"`; página en la URL.
#### Ejemplo de uso
```tsx
<Pagination page={2} pageSize={25} total={312} />
```
#### Reglas de uso y relación
Sin scroll infinito.

---

## 18. Entrada de datos

> Base común (Implementado): inputs y selects nativos con borde `--input`, fondo `--card`, radio `--radius`, padding `10px 12px`; label encima 12 px 500 (`.form-grid`). Los siguientes heredan esa base.

### Componente: Input
Estado: **Implementado** · extensión **Propuesto** (prefijo/sufijo, ayuda y error)
#### Propósito
Texto de una línea.
#### Variantes
Texto, email, número, búsqueda (con `Search`), con prefijo (`$`) o sufijo (`MXN`).
#### Estructura visual
Altura 36 px (Pendiente de decisión; hoy depende del padding). Ayuda 11 px muted debajo.
#### Props sugeridas
`label`, `hint?`, `error?`, `required?`, `prefix?`, `suffix?`.
#### Estados
Error: borde `--danger`, mensaje 11 px con `AlertCircle` 12 px. Disabled: fondo `--muted`. Read-only: sin borde, fondo `--background`.
#### Responsive
100 % del ancho de su celda; en móvil `font-size` ≥16 px para evitar zoom (Pendiente de decisión).
#### Accesibilidad
`<label for>`, `aria-invalid`, `aria-describedby` a ayuda/error, `aria-required`.
#### Ejemplo de uso
```tsx
<Field label="Cliente" required error={errors.client}><input id="client" /></Field>
```
#### Reglas de uso y relación
Placeholder nunca sustituye al label.

### Componente: Textarea
Estado: **Propuesto** como componente (hay textarea nativo en el formulario de cotización)
#### Propósito
Texto largo (observaciones, comentarios).
#### Variantes
Fija · autoajustable (máx. 8 líneas) · con contador.
#### Estructura visual
Base de input, mínimo 3 líneas, `resize: vertical`; contador "120/500" 11 px a la derecha.
#### Props sugeridas
`rows = 3`, `maxLength?`, `showCount?`.
#### Estados
Contador en `--danger` al superar el límite.
#### Responsive
Ancho completo (`.form-wide`).
#### Accesibilidad
Contador con `aria-live="polite"` solo al acercarse al límite.
#### Ejemplo de uso
```tsx
<Textarea label="Observaciones" maxLength={500} showCount />
```
#### Reglas de uso y relación
No usar para texto con formato; eso requiere un editor (no previsto).

### Componente: Select
Estado: **Implementado** (nativo) · extensión **Propuesto**: `ui/select` estilizado cuando se requieran íconos en opciones
#### Propósito
Elegir una opción de ≤10.
#### Variantes
Nativo (preferido) · Radix con íconos.
#### Estructura visual
Base de input + `ChevronDown` 14 px; filtros 35 px y 11 px (Implementado).
#### Props sugeridas
`options: { value, label, disabled? }[]`, `placeholder`.
#### Estados
Sin opciones: deshabilitado con texto "Sin opciones disponibles".
#### Responsive
Nativo en móvil para usar el selector del sistema.
#### Accesibilidad
Label asociado; nativo da teclado gratis.
#### Ejemplo de uso
```tsx
<select aria-label="Prioridad"><option>Alta</option></select>
```
#### Reglas de uso y relación
>10 opciones → Combobox. 2–4 opciones visibles → Radio group.

### Componente: Combobox
Estado: **Propuesto**
#### Propósito
Seleccionar de listas largas con búsqueda (clientes, empleados).
#### Variantes
Simple · Múltiple (chips) · Creable ("Crear «…»").
#### Estructura visual
Trigger como input con `ChevronsUpDown`; popover con input 36 px y opciones 32 px; seleccionada con `Check` `--primary`. Chips `badge-neutral` con `X` 12 px.
#### Props sugeridas
`options`, `value`, `onChange`, `multiple?`, `creatable?`, `loading?`.
#### Estados
Loading: `LoaderCircle` en la lista; vacío: "Sin coincidencias".
#### Responsive
≤640 px el popover pasa a Sheet inferior (Pendiente de decisión).
#### Accesibilidad
`ui/command` en `ui/popover`; `role="combobox"`, `aria-expanded`, flechas, Enter, Escape; chips eliminables con Backspace.
#### Ejemplo de uso
```tsx
<Combobox label="Cliente" options={clients} value={id} onChange={setId} />
```
#### Reglas de uso y relación
Relación: base de Autocomplete y de filtros avanzados.

### Componente: Autocomplete
Estado: **Propuesto**
#### Propósito
Input de texto libre con sugerencias (direcciones, conceptos).
#### Variantes
Sugerencias locales · remotas con debounce 250 ms.
#### Estructura visual
Input normal; lista bajo el input con coincidencia en `font-weight 600`.
#### Props sugeridas
`suggestions`, `onQueryChange`, `minChars = 2`.
#### Estados
Loading en la lista; sin sugerencias: la lista no aparece.
#### Responsive
Igual que input.
#### Accesibilidad
`aria-autocomplete="list"`, `aria-activedescendant`.
#### Ejemplo de uso
```tsx
<Autocomplete label="Concepto" suggestions={concepts} />
```
#### Reglas de uso y relación
Si el valor debe pertenecer a la lista, usar Combobox.

### Componente: Date picker
Estado: **Propuesto**
#### Propósito
Elegir una fecha.
#### Variantes
Popover · inline (en calendario).
#### Estructura visual
Trigger input con `CalendarDays` 14 px y fecha `11 oct 2026`; `ui/calendar` con celdas 32 px; hoy borde `--primary`; seleccionado fondo `--primary`; fines de semana muted.
#### Props sugeridas
`value`, `onChange`, `minDate?`, `maxDate?`, `disabledDates?`.
#### Estados
Fechas fuera de rango disabled; error si se escribe una fecha inválida.
#### Responsive
≤640 px input nativo `type="date"` (Pendiente de decisión).
#### Accesibilidad
Escritura directa permitida (`dd/mm/aaaa`); flechas en la cuadrícula, PageUp/PageDown cambian mes.
#### Ejemplo de uso
```tsx
<DatePicker label="Vigencia" value={date} onChange={setDate} />
```
#### Reglas de uso y relación
Semana inicia lunes, locale `es`.

### Componente: Date range picker
Estado: **Propuesto**
#### Propósito
Periodos (reportes, nómina, filtros).
#### Variantes
Con atajos (Hoy, Últimos 7 días, Este mes, Mes anterior) · libre.
#### Estructura visual
Dos meses lado a lado; rango en `--brand-soft`, extremos `--primary`; atajos en columna izquierda 140 px.
#### Props sugeridas
`value: { from, to }`, `presets?`, `maxRangeDays?`.
#### Estados
"Aplicar" disabled hasta tener ambos extremos.
#### Responsive
≤640 px un solo mes y atajos arriba.
#### Accesibilidad
Anunciar "Inicio" / "Fin" seleccionados.
#### Ejemplo de uso
```tsx
<DateRangePicker presets value={range} onChange={setRange} />
```
#### Reglas de uso y relación
Mostrar el rango como "1–15 oct 2026".

### Componente: Time picker
Estado: **Propuesto**
#### Propósito
Horas en agendas y turnos.
#### Variantes
Input `HH:mm` · lista de intervalos (15/30 min).
#### Estructura visual
Input con `Clock` 14 px; lista 32 px por opción.
#### Props sugeridas
`value`, `step = 30`, `min?`, `max?`.
#### Estados
Error si fuera de rango.
#### Responsive
Nativo `type="time"` en móvil.
#### Accesibilidad
Formato 24 h explícito en la ayuda.
#### Ejemplo de uso
```tsx
<TimePicker label="Inicio" step={15} />
```
#### Reglas de uso y relación
Siempre 24 h.

### Componente: Checkbox
Estado: **Implementado** (nativo, radio 3 px) · extensión **Propuesto**: estado indeterminado y grupo
#### Propósito
Opciones independientes que se guardan con un botón; selección de filas.
#### Variantes
Simple · con descripción · indeterminado.
#### Estructura visual
16 px, marcado `--primary`; label 12 px a la derecha, descripción 11 px muted.
#### Props sugeridas
`checked`, `indeterminate?`, `label`, `description?`.
#### Estados
Disabled 50 %; error en grupo con mensaje bajo el grupo.
#### Responsive
Área clicable incluye el label (≥44 px en móvil).
#### Accesibilidad
`fieldset` + `legend` en grupos; `aria-checked="mixed"`.
#### Ejemplo de uso
```tsx
<Checkbox label="Incluir IVA" />
```
#### Reglas de uso y relación
Efecto inmediato → Switch.

### Componente: Radio group
Estado: **Propuesto**
#### Propósito
Una opción de 2–5 visibles.
#### Variantes
Vertical · horizontal · tarjeta (borde 1 px, seleccionada borde `--primary` y fondo `--brand-soft`).
#### Estructura visual
Círculo 16 px, punto `--primary`.
#### Props sugeridas
`options`, `value`, `orientation`.
#### Estados
Grupo disabled; error bajo el grupo.
#### Responsive
Horizontal pasa a vertical ≤640 px.
#### Accesibilidad
`ui/radio-group`, flechas para moverse.
#### Ejemplo de uso
```tsx
<RadioGroup options={["Mensual","Quincenal"]} />
```
#### Reglas de uso y relación
Tarjetas solo si cada opción necesita descripción.

### Componente: Switch
Estado: **Propuesto**
#### Propósito
Ajustes de efecto inmediato (preferencias).
#### Variantes
Con label a la izquierda y descripción.
#### Estructura visual
36×20 px, pista `--input` / `--primary` activa, perilla `--card`.
#### Props sugeridas
`checked`, `onCheckedChange`, `label`, `description?`.
#### Estados
Loading: perilla con spinner mientras se aplica.
#### Responsive
Fila completa clicable.
#### Accesibilidad
`role="switch"`, `aria-checked`.
#### Ejemplo de uso
```tsx
<Switch label="Notificaciones por correo" />
```
#### Reglas de uso y relación
Nunca en formularios con botón Guardar.

### Componente: Slider
Estado: **Propuesto**
#### Propósito
Valores aproximados en un rango (márgenes, porcentajes en Price Model).
#### Variantes
Simple · rango · con input numérico acoplado.
#### Estructura visual
Pista 4 px `--muted`, relleno `--primary`, manija 16 px `--card` con borde `--primary`; valor en texto a la derecha.
#### Props sugeridas
`min`, `max`, `step`, `value`, `withInput?`.
#### Estados
Disabled 50 %.
#### Responsive
Manija 24 px en táctil.
#### Accesibilidad
`ui/slider`, flechas y PageUp/PageDown, `aria-valuetext` con unidad.
#### Ejemplo de uso
```tsx
<Slider label="Margen" min={0} max={40} step={1} withInput />
```
#### Reglas de uso y relación
Si el valor exacto importa, siempre con input acoplado.

### Componente: File upload
Estado: **Propuesto**
#### Propósito
Adjuntar documentos a registros.
#### Variantes
Botón · zona de arrastre · lista de archivos.
#### Estructura visual
Zona: borde 1 px discontinuo `--border`, `--background`, ícono `Upload` 20 px, "Arrastra o selecciona archivos" + límites 11 px muted. Archivo: fila con `FileText`, nombre, tamaño, `Progress` y botón quitar.
#### Props sugeridas
`accept`, `maxSizeMb`, `multiple`, `files`, `onFilesChange`.
#### Estados
Arrastrando: borde `--primary`, fondo `--brand-soft`. Error por archivo en `--danger` ("Supera 10 MB").
#### Responsive
≤640 px solo botón.
#### Accesibilidad
Input file real accesible por teclado; progreso con `aria-valuenow`.
#### Ejemplo de uso
```tsx
<FileUpload accept=".pdf,.xlsx" maxSizeMb={10} multiple />
```
#### Reglas de uso y relación
En el prototipo los archivos solo viven en memoria.

### Componente: Drag and drop
Estado: **Propuesto**
#### Propósito
Reordenar listas o mover tarjetas (kanban, columnas).
#### Variantes
Lista ordenable · entre columnas.
#### Estructura visual
Asa `GripVertical` 14 px muted; elemento arrastrado con `--shadow-floating`; destino con línea 2 px `--primary`.
#### Props sugeridas
`items`, `onReorder`.
#### Estados
Destino no permitido: cursor `not-allowed`.
#### Responsive
En táctil, pulsación larga; alternativa con menú "Mover a".
#### Accesibilidad
Alternativa por teclado obligatoria (Espacio para tomar, flechas, Espacio para soltar) y anuncio `aria-live`.
#### Ejemplo de uso
```tsx
<SortableList items={columns} onReorder={setColumns} />
```
#### Reglas de uso y relación
Nunca como única forma de realizar una acción. Requiere evaluar dependencia nueva antes de agregarla.

### Componente: Filtros avanzados
Estado: **Implementado** (parcial) (`.filter-toolbar` con selects en pendientes) · extensión **Propuesto**: constructor de filtros
#### Propósito
Combinar condiciones sobre listados.
#### Variantes
Barra rápida (Implementado) · Panel de filtros (Sheet derecho 400 px) · chips de filtros activos.
#### Estructura visual
Chips bajo la barra: `badge-neutral` "Prioridad: Alta ×" + enlace "Limpiar filtros"; panel con secciones Accordion.
#### Props sugeridas
`filters: FilterDef[]`, `value`, `onChange`.
#### Estados
Contador en el botón "Filtros (3)".
#### Responsive
≤900 px los filtros rápidos se mueven al panel.
#### Accesibilidad
Cambios anunciados "24 resultados".
#### Ejemplo de uso
```tsx
<FilterBar filters={taskFilters} value={search} />
```
#### Reglas de uso y relación
Persistir en la URL (ver patrón 22.10).

### Componente: Formularios multipaso
Estado: **Propuesto** (ver Stepper y Wizard, sección 21)
#### Propósito
Altas largas divididas (empleado, pedido).
#### Variantes
Lineal · con navegación libre entre pasos completados.
#### Estructura visual
`Stepper` arriba, un paso visible, footer con Atrás / Siguiente / Guardar borrador.
#### Props sugeridas
`steps`, `current`, `onStepChange`, `validateStep`.
#### Estados
Paso con error marcado en `--danger`; loading en Siguiente al validar.
#### Responsive
≤640 px Stepper compacto "Paso 2 de 4".
#### Accesibilidad
Mover foco al título del paso al avanzar.
#### Ejemplo de uso
Ver Wizard.
#### Reglas de uso y relación
Solo si hay más de ~12 campos; si no, formulario único con secciones.

---

## 19. Visualización de datos

### Componente: Data Table
Estado: **Propuesto**
#### Propósito
Listar, comparar y operar registros.
#### Variantes
Estándar (fila 44 px) · Compacta (36 px) · Seleccionable · Expandible.
#### Estructura visual
`section` → barra de herramientas (búsqueda 36 px, filtros, 1 primaria) → tabla `--card` con borde → pie de paginación. Encabezado `--background` sticky, 10 px mayúsculas. Filas con `border-top`, sin zebra; hover `--background`; seleccionada `--brand-soft`. Primera columna identificador 500 enlazable. Acciones de fila con `MoreHorizontal`.
#### Props sugeridas
`columns: { id, header, cell, sortable?, align?, width? }[]`, `rows`, `getRowId`, `selectable?`, `density?`, `loading?`, `error?`, `emptyState?`, `toolbar?`.
#### Estados
Loading: 5 filas skeleton. Empty: `EmptyState` dentro de la tabla. Empty por filtros: "Sin resultados para estos filtros" + Limpiar filtros. Error: `EmptyState icon="error"` + Reintentar.
#### Responsive
≤900 px scroll horizontal con primera columna fija; ≤640 px tabla responsive (abajo).
#### Accesibilidad
`<table>` semántica (`ui/table`), `scope="col"`, `aria-sort`, `caption` visualmente oculto, checkbox con `aria-label="Seleccionar <registro>"`.
#### Ejemplo de uso
```tsx
<DataTable columns={columns} rows={rows} selectable toolbar={<Button><Plus/>Nuevo empleado</Button>} />
```
#### Reglas de uso y relación
Hoy las listas usan grid (`.task-row`); al implementar, no mezclar ambos patrones en una pantalla.

### Componente: Tabla responsive
Estado: **Propuesto**
#### Propósito
Mostrar la tabla en móvil.
#### Variantes
Tarjetas apiladas (≤640 px) · scroll horizontal (≤900 px).
#### Estructura visual
Cada fila → bloque con borde inferior: identificador 12 px 500 + badge, 2–3 pares label/valor 11 px, acciones a la derecha. Modelo: `.task-row`.
#### Props sugeridas
`mobilePrimary`, `mobileFields` en la definición de columnas.
#### Estados
Iguales a Data Table.
#### Responsive
Es su razón de ser.
#### Accesibilidad
Cada tarjeta es `<li>` con encabezado.
#### Ejemplo de uso
`columns={[{id:"folio", mobilePrimary:true}, …]}`.
#### Reglas de uso y relación
No mostrar más de 4 campos por tarjeta.

### Componente: Columnas configurables
Estado: **Propuesto**
#### Propósito
Mostrar/ocultar y reordenar columnas.
#### Variantes
Menú de columnas.
#### Estructura visual
Botón outline `Columns3` "Columnas" → popover con checkboxes y asas de orden; "Restablecer".
#### Props sugeridas
`visibleColumns`, `onVisibleColumnsChange`, `lockedColumns`.
#### Estados
Columna identificador bloqueada (disabled).
#### Responsive
Oculto ≤640 px.
#### Accesibilidad
Reordenar también con botones "Subir/Bajar".
#### Ejemplo de uso
```tsx
<ColumnMenu columns={columns} />
```
#### Reglas de uso y relación
Preferencia en memoria del `AppShell` en el prototipo.

### Componente: Ordenamiento
Estado: **Propuesto**
#### Propósito
Ordenar por columna.
#### Estructura visual
Encabezado como botón; `ChevronsUpDown` 12 px inactivo, `ArrowUp/Down` activo en `--foreground`.
#### Variantes
Una columna (por defecto) · múltiple con Shift (No permitido hasta decisión).
#### Props sugeridas
`sort: { id, direction }`, `onSortChange`.
#### Estados
Hover en encabezado `--foreground`.
#### Responsive
En tarjetas, select "Ordenar por".
#### Accesibilidad
`aria-sort` en `th`.
#### Ejemplo de uso
`?sort=fecha.desc`.
#### Reglas de uso y relación
Estado en la URL.

### Componente: Filtrado de tabla
Estado: **Propuesto** — usa Filtros avanzados (sección 18).
#### Reglas de uso y relación
Búsqueda de la barra filtra al escribir (debounce 250 ms); filtros de columna solo en tablas con >8 columnas.

### Componente: Selección múltiple y acciones masivas
Estado: **Propuesto**
#### Propósito
Operar sobre varios registros.
#### Variantes
Por página · "Seleccionar los 312".
#### Estructura visual
Checkbox en encabezado (indeterminado); al seleccionar, la barra de herramientas se reemplaza por barra `--brand-soft`: "3 seleccionados · Exportar · Cambiar estado · Eliminar" + "Cancelar".
#### Props sugeridas
`selectedIds`, `onSelectionChange`, `bulkActions`.
#### Estados
Acción en curso: loading en el botón y filas bloqueadas.
#### Responsive
Barra fija inferior en móvil.
#### Accesibilidad
Anunciar el número de seleccionados.
#### Ejemplo de uso
```tsx
<BulkBar count={3} actions={[{label:"Exportar"}, {label:"Eliminar", destructive:true}]} />
```
#### Reglas de uso y relación
Destructivas con Confirmation dialog que indica cantidad.

### Componente: Cards
Estado: **Implementado** (`ModuleCard`) · extensión **Propuesto**: `RecordCard` genérica
#### Propósito
Representar un objeto individual.
#### Variantes
Módulo (Implementado) · Registro (kanban, resultados).
#### Estructura visual
`--card`, borde 1 px, radio `--radius`, padding 16 px, sin sombra; hover borde `--ring` solo si es clicable.
#### Props sugeridas
`title`, `meta?`, `status?`, `actions?`, `to?`.
#### Estados
Disabled: `module-unavailable`.
#### Responsive
Grid 3 → 2 → 1 columnas.
#### Accesibilidad
Un único enlace principal por tarjeta.
#### Ejemplo de uso
`<ModuleCard module={m} />`.
#### Reglas de uso y relación
No usar tarjetas para agrupar secciones de página.

### Componente: Métricas
Estado: Implementado (`.quote-metrics`) · extensiones: **Propuesto — especificación pendiente**
> Los valores siguientes son una propuesta inicial, no una especificación cerrada. Faltan por definir: props, estados completos, responsive y relación con otros componentes. No implementar sin completar la ficha.

Franja con divisores verticales, valor 27 px 700. Reutilizar tal cual para resúmenes de módulo.

### Componente: KPI cards
Estado: **Propuesto** (extiende `.quote-metrics` como `MetricStrip`)
#### Propósito
Indicadores de dashboard con variación.
#### Variantes
Simple · con variación · con mini gráfico (sparkline 24 px, Pendiente de decisión).
#### Estructura visual
Label 12 px muted → valor Manrope 27 px 700 tabular → variación 11 px con `TrendingUp/Down` en `--success`/`--danger` + "vs. mes anterior".
#### Props sugeridas
`items: { label, value, delta?, deltaLabel?, to? }[]`.
#### Estados
Loading: skeleton del valor; sin datos: "—" y "Sin datos del periodo".
#### Responsive
3–4 por fila → 2 (≤900) → 1 (≤640).
#### Accesibilidad
Variación en texto ("aumentó 12 %"), no solo flecha.
#### Ejemplo de uso
```tsx
<MetricStrip items={[{label:"Cotizado", value:"$1.2 M", delta:+12}]} />
```
#### Reglas de uso y relación
Máximo 4; no tarjetas separadas con sombra.

### Componente: Gráficos
Estado: **Propuesto**
#### Propósito
Tendencias y comparaciones.
#### Variantes
Línea, barras, barras apiladas, dona (máx. 5 segmentos).
#### Estructura visual
`ui/chart`; colores en orden `--primary`, `--teal`, `--violet`, `--warning`, `--rose`; ejes y cuadrícula `--border`, etiquetas 10 px muted; relleno de área ≤12 % de opacidad; alto 240–320 px dentro de sección con `SectionHeading` y selector de periodo.
#### Props sugeridas
`data`, `series`, `type`, `height`.
#### Estados
Loading skeleton del alto completo; vacío "Sin datos para el periodo".
#### Responsive
Ancho 100 %; leyenda debajo ≤640 px.
#### Accesibilidad
Tabla equivalente o resumen textual; no depender solo del color.
#### Ejemplo de uso
```tsx
<ChartPanel title="Cotizaciones por mes" type="bar" data={data} />
```
#### Reglas de uso y relación
Sin 3D ni gradientes; semánticos solo si la serie significa estado.

### Componente: Timeline
Estado: **Propuesto**
#### Propósito
Historial cronológico de un registro.
#### Estructura visual
Línea vertical 1 px `--border`, dot 8 px por evento (tono semántico si aplica), fecha 10 px muted, texto 12 px.
#### Variantes
Simple · agrupado por día.
#### Props sugeridas
`events: { date, title, actor?, tone? }[]`.
#### Estados
Vacío: "Sin actividad registrada".
#### Responsive
Igual en todos los tamaños.
#### Accesibilidad
`<ol>` con `<time datetime>`.
#### Ejemplo de uso
`<Timeline events={history} />`.
#### Reglas de uso y relación
Relación: Activity log usa este componente.

### Componente: Activity feed
Estado: Implementado (`RecentActivity`) · extensión ("Cargar más", filtros por tipo): **Propuesto — especificación pendiente**
> Los valores siguientes son una propuesta inicial, no una especificación cerrada. Faltan por definir: props, estados completos, responsive y relación con otros componentes. No implementar sin completar la ficha.


### Componente: Calendario
Estado: **Propuesto**
#### Propósito
Agenda, vacaciones, turnos.
#### Variantes
Mes · Semana · Día (Tabs) · Agenda (lista).
#### Estructura visual
Barra: título Manrope 16 px, "Hoy" outline, flechas ghost, Tabs de vista. Cuadrícula bordes 1 px sobre `--card`; hoy con número en círculo `--primary`; fuera de mes muted sobre `--background`. Eventos: fondo soft del tono + borde izquierdo 3 px; "+3 más". Línea de hora actual 1 px `--danger`.
#### Props sugeridas
`events`, `view`, `date`, `onEventClick`, `onSlotClick`.
#### Estados
Loading skeleton de cuadrícula; vacío "Sin eventos esta semana".
#### Responsive
≤640 px vista Agenda por defecto.
#### Accesibilidad
Cuadrícula `role="grid"`; eventos como botones con fecha completa en `aria-label`.
#### Ejemplo de uso
```tsx
<CalendarView view="semana" events={events} />
```
#### Reglas de uso y relación
Detalle en Popover; creación/edición en Drawer.

### Componente: Kanban
Estado: **Propuesto**
#### Propósito
Pipeline por etapas (CRM, proyectos).
#### Estructura visual
Columnas 280 px `--background`, título 12 px 600 + contador; tarjetas `--card` borde 1 px, padding 12 px, sin sombra.
#### Variantes
Con o sin límite por columna.
#### Props sugeridas
`columns`, `items`, `onMove`.
#### Estados
Columna vacía con texto muted "Sin elementos".
#### Responsive
Scroll horizontal; ≤640 px una columna con selector de etapa.
#### Accesibilidad
Menú "Mover a" en cada tarjeta.
#### Ejemplo de uso
`<Kanban columns={stages} items={deals} />`.
#### Reglas de uso y relación
Depende de Drag and drop; nunca solo arrastre.

### Componente: Lista con búsqueda
Estado: **Implementado** (parcial) (búsqueda global y `PendingTaskList` con filtros) · extensión **Propuesto**: `SearchableList` genérica
#### Propósito
Listas cortas filtrables sin tabla.
#### Estructura visual
Input búsqueda 36 px arriba; filas separadas por línea; coincidencia resaltada 600.
#### Props sugeridas
`items`, `filterBy`, `renderItem`.
#### Estados
Sin coincidencias: "Sin resultados para «…»".
#### Accesibilidad
Contador de resultados `aria-live`.
#### Reglas de uso y relación
>50 elementos o columnas comparables → Data Table.

---

## 20. Feedback y estados

### Componente: Alert
Estado: **Propuesto** (hoy los errores usan `EmptyState`)
#### Propósito
Mensaje en línea persistente dentro de una página o formulario.
#### Variantes
Info (`--brand-soft`/`--primary`), Success, Warning, Danger; cerrable o no; con acción.
#### Estructura visual
Fondo soft, borde 1 px del tono fuerte al 30 %, ícono 16 px, título 12 px 600 + texto 12 px.
#### Props sugeridas
`tone`, `title`, `children`, `action?`, `onClose?`.
#### Accesibilidad
`role="alert"` solo para errores; resto `role="status"`.
#### Reglas de uso y relación
No usar para confirmaciones pasajeras (eso es Toast).

### Componente: Toast
Estado: **Propuesto** (`<Toaster />` aún no montado)
#### Propósito
Confirmar acciones completadas.
#### Variantes
Éxito, error, info; con "Deshacer".
#### Estructura visual
Abajo a la derecha, `--card`, borde, `--shadow-floating`, ícono semántico, 12 px; 4 s.
#### Props sugeridas
`toast.success("Cotización guardada", { action })` (sonner).
#### Responsive
≤640 px arriba, ancho completo.
#### Accesibilidad
`aria-live="polite"`; no cerrar mientras tiene foco o hover.
#### Reglas de uso y relación
Montar una vez en `__root.tsx`. Nunca para errores de validación.

### Componente: Notification center
Estado: Implementado (`NotificationCenter`) · extensión (agrupación por día, filtro "No leídas"): **Propuesto — especificación pendiente**
> Los valores siguientes son una propuesta inicial, no una especificación cerrada. Faltan por definir: props, estados completos, responsive y relación con otros componentes. No implementar sin completar la ficha.


### Componente: Modal
Estado: **Propuesto**
#### Propósito
Tarea breve que requiere atención sin salir de la página.
#### Variantes
sm 400 px · md 560 px (por defecto) · lg 800 px.
#### Estructura visual
`--card`, radio `--radius`, `--shadow-floating`, padding 24 px, fondo `--overlay-backdrop`; header Manrope 16 px 700 + descripción 12 px + `X`; cuerpo desplazable (máx. 85vh); footer con borde, acciones a la derecha.
#### Props sugeridas
`title`, `description?`, `size`, `open`, `onOpenChange`, `footer`.
#### Estados
Envío: primaria con loading y cierre bloqueado.
#### Responsive
≤640 px pantalla completa.
#### Accesibilidad
`ui/dialog`: foco atrapado, Escape, retorno de foco al disparador, `aria-labelledby`.
#### Ejemplo de uso
```tsx
<FormDialog title="Nuevo cliente" size="md">…</FormDialog>
```
#### Reglas de uso y relación
No apilar overlays; no abrir al cargar la página; con cambios sin guardar, confirmar antes de cerrar.

### Componente: Drawer
Estado: **Implementado** (Sheet izquierdo móvil) · extensión **Propuesto**: Sheet derecho de detalle/edición
#### Propósito
Ver o editar un registro sin perder la lista.
#### Estructura visual
Derecho 480 px (≤640 px 100 %), mismo header/footer que Modal.
#### Props sugeridas
`title`, `open`, `onOpenChange`, `width = 480`.
#### Accesibilidad
`ui/sheet`, igual que Modal.
#### Reglas de uso y relación
Formularios de más de una columna → página de edición.

### Componente: Confirmation dialog
Estado: **Propuesto**
#### Propósito
Confirmar acciones destructivas o irreversibles.
#### Estructura visual
Modal sm; título como pregunta ("¿Eliminar la cotización COT-2026-0148?"), consecuencia explícita; botón `destructive` con el verbo ("Eliminar"); Cancelar outline.
#### Props sugeridas
`title`, `description`, `confirmLabel`, `onConfirm`, `requireText?` (escribir el nombre para casos críticos).
#### Accesibilidad
`ui/alert-dialog`; foco inicial en Cancelar.
#### Reglas de uso y relación
Nunca "Aceptar"/"Sí". Acciones reversibles → Toast con Deshacer en lugar de confirmar.

### Componente: Tooltip
Estado: Implementado (parcial: atributo `title` en sidebar compacto) · `ui/tooltip`: **Propuesto — especificación pendiente**
> Los valores siguientes son una propuesta inicial, no una especificación cerrada. Faltan por definir: props, estados completos, responsive y relación con otros componentes. No implementar sin completar la ficha.

Fondo `--institutional`, texto `--institutional-fg`, 11 px, radio 4 px, retardo 300 ms. Solo información complementaria; aparece también con foco de teclado.

### Componente: Popover
Estado: **Propuesto**
#### Propósito
Contenido interactivo ligero anclado (detalle de evento, filtros rápidos).
#### Estructura visual
`--popover`, borde, `--shadow-floating`, padding 12 px, ancho 280–360 px.
#### Accesibilidad
`ui/popover`, Escape, retorno de foco.
#### Reglas de uso y relación
Si contiene un formulario de más de 3 campos → Drawer.

### Componente: Progress bar
Estado: **Propuesto — especificación pendiente**
> Los valores siguientes son una propuesta inicial, no una especificación cerrada. Faltan por definir: props, estados completos, responsive y relación con otros componentes. No implementar sin completar la ficha.

6 px de alto, pista `--muted`, relleno `--primary` o semántico, porcentaje en texto 11 px. `role="progressbar"` con `aria-valuenow`. Indeterminado: sin animación continua; mostrar texto "Procesando…".

### Componente: Skeleton
Estado: Implementado (`.skeleton-grid` en `StateGate`) · variantes fila, texto y KPI: **Propuesto — especificación pendiente**
> Los valores siguientes son una propuesta inicial, no una especificación cerrada. Faltan por definir: props, estados completos, responsive y relación con otros componentes. No implementar sin completar la ficha.

Bloques `--muted`, radio 4 px, sin brillo animado (Obligatorio por la regla de no animaciones continuas).

### Componente: Loading state
Estado: Implementado (`StateGate` loading) · variantes parciales: **Propuesto — especificación pendiente**
> Los valores siguientes son una propuesta inicial, no una especificación cerrada. Faltan por definir: props, estados completos, responsive y relación con otros componentes. No implementar sin completar la ficha.


### Componente: Empty state
Estado: Implementado (`EmptyState`) · variante compacta: **Propuesto — especificación pendiente**
> Los valores siguientes son una propuesta inicial, no una especificación cerrada. Faltan por definir: props, estados completos, responsive y relación con otros componentes. No implementar sin completar la ficha.


### Componente: Error state
Estado: Implementado (`EmptyState icon="error"`) · código de referencia: **Propuesto — especificación pendiente**
> Los valores siguientes son una propuesta inicial, no una especificación cerrada. Faltan por definir: props, estados completos, responsive y relación con otros componentes. No implementar sin completar la ficha.


### Componente: Success state
Estado: **Propuesto**
#### Propósito
Cierre de un flujo largo (wizard, cierre de nómina).
#### Estructura visual
Patrón de `EmptyState` con `CircleCheck` 30 px en `--success`, título, resumen y 2 acciones ("Ver registro", "Crear otro").
#### Reglas de uso y relación
Acciones simples → Toast, no pantalla de éxito.

### Componente: Offline state
Estado: **Propuesto**
#### Propósito
Avisar pérdida de conexión cuando exista backend.
#### Estructura visual
`SystemBanner` warning bajo el header: `WifiOff` 14 px + "Sin conexión. Los cambios se guardarán al reconectar." + Reintentar.
#### Accesibilidad
`role="status"`.
#### Reglas de uso y relación
No aplica al prototipo actual (sin red); documentado para la fase con backend.

---

## 21. Acciones y contenido

### Componente: Buttons
Estado: Implementado (`ui/button`) · variante loading y uso de `destructive`: **Propuesto — especificación pendiente**
> Los valores siguientes son una propuesta inicial, no una especificación cerrada. Faltan por definir: props, estados completos, responsive y relación con otros componentes. No implementar sin completar la ficha.

Alturas: sm 32 px, default 40 px. Loading: `LoaderCircle` 14 px a la izquierda, texto se conserva, `disabled` + `aria-busy`. Una primaria por grupo.

### Componente: Button groups
Estado: **Propuesto — especificación pendiente**
> Los valores siguientes son una propuesta inicial, no una especificación cerrada. Faltan por definir: props, estados completos, responsive y relación con otros componentes. No implementar sin completar la ficha.

Botones outline unidos (borde compartido, radio solo en extremos); seleccionado fondo `--brand-soft`, texto `--primary`, `aria-pressed`. Uso: alternar vistas (Lista / Tarjetas). Máximo 4.

### Componente: Split button
Estado: **Propuesto**
Primaria + botón `ChevronDown` 32 px separado por borde 1 px `--primary-foreground` al 30 %; abre DropdownMenu con variantes ("Guardar" / "Guardar y enviar"). El chevron con `aria-label="Más opciones de guardado"`. No usar si las opciones tienen igual importancia.

### Componente: Badges
Estado: **Implementado** (`StatusBadge status="…"`; clase derivada del texto: danger, warning, success, brand, neutral). Extensión **Propuesto**: tamaño `sm` 16 px para celdas compactas. Siempre con texto.

### Componente: Avatars
Estado: **Implementado** (parcial) (avatar de usuario con iniciales en `--brand-soft`) · extensión **Propuesto**: `ui/avatar` 24/32/40 px con imagen y fallback de iniciales; `alt` con el nombre.

### Componente: Avatar group
Estado: **Propuesto**
Avatares 24 px superpuestos −6 px con borde 2 px `--card`, máximo 4 + "+N" en `--muted`. Tooltip con nombres; lista completa en Popover.

### Componente: Tags
Estado: **Propuesto**
Etiquetas de clasificación (no estado): `badge-neutral` 10 px, radio 4 px, eliminables con `X` 12 px (`aria-label="Quitar etiqueta X"`). No usar colores semánticos para tags.

### Componente: Command actions
Estado: **Propuesto**
Acciones registradas centralmente (`{ id, label, icon, shortcut, run, permission }`) que alimentan Command palette, menús y atajos. Atajo mostrado con `<kbd>` 10 px borde 1 px. Solo acciones permitidas al usuario.

### Componente: Dropdown menu
Estado: **Implementado** (`UserMenu`, acciones de tarea/cotización). Propuesto: grupos con label 10 px, atajos y destructivo al final en `--danger` separado.

### Componente: Accordion
Estado: **Propuesto — especificación pendiente**
> Los valores siguientes son una propuesta inicial, no una especificación cerrada. Faltan por definir: props, estados completos, responsive y relación con otros componentes. No implementar sin completar la ficha.

Filas con borde inferior, título 12 px 500 (40 px), `ChevronDown` que rota 180° (150 ms). `ui/accordion`. Uso: FAQ, filtros, secciones de configuración opcionales. No ocultar campos obligatorios.

### Componente: Collapsible sections
Estado: **Propuesto — especificación pendiente**
> Los valores siguientes son una propuesta inicial, no una especificación cerrada. Faltan por definir: props, estados completos, responsive y relación con otros componentes. No implementar sin completar la ficha.

`SectionHeading` con botón `ChevronDown` y `aria-expanded`; estado abierto por defecto si contiene errores. `ui/collapsible`.

### Componente: Stepper
Estado: **Propuesto**
#### Propósito
Indicar progreso en procesos por pasos.
#### Variantes
Horizontal · vertical · compacto ("Paso 2 de 4").
#### Estructura visual
Círculo 24 px (pendiente borde `--border`, actual `--primary`, completo `--success` con `Check`, error `--danger`), conectores 1 px, label 12 px.
#### Props sugeridas
`steps: { label, status }[]`, `current`, `onStepClick?`.
#### Accesibilidad
`<ol>`, paso actual `aria-current="step"`.
#### Reglas de uso y relación
3–6 pasos.

### Componente: Wizard
Estado: **Propuesto**
#### Propósito
Flujo guiado (cierre de nómina, alta de empleado).
#### Estructura visual
Página completa: `PageHeading` → Stepper → contenido del paso (`.form-grid`, máx. 780 px) → footer fijo con Atrás (outline), Guardar borrador (ghost), Siguiente/Finalizar (primaria). Final → Success state.
#### Props sugeridas
`steps`, `onFinish`, `onSaveDraft`.
#### Estados
Salir con cambios → confirmación.
#### Responsive
Footer fijo inferior en móvil.
#### Accesibilidad
Foco al título del paso; errores resumidos arriba.
#### Ejemplo de uso
```tsx
<Wizard steps={["Datos","Puesto","Nómina","Revisión"]} onFinish={save} />
```
#### Reglas de uso y relación
Último paso siempre "Revisión". No usar dentro de un Modal.

### Componente: Comments
Estado: **Propuesto — especificación pendiente**
> Los valores siguientes son una propuesta inicial, no una especificación cerrada. Faltan por definir: props, estados completos, responsive y relación con otros componentes. No implementar sin completar la ficha.

Lista: avatar 32 px, nombre 12 px 500, fecha 10 px muted, texto 12 px; caja de nuevo comentario (Textarea + "Comentar" primaria sm). Editar/eliminar propios en menú. Vacío: "Sin comentarios". Menciones (`@`): Pendiente de decisión.

### Componente: Activity log
Estado: **Propuesto — especificación pendiente**
> Los valores siguientes son una propuesta inicial, no una especificación cerrada. Faltan por definir: props, estados completos, responsive y relación con otros componentes. No implementar sin completar la ficha.

Auditoría de cambios ("Ana R. cambió Estado de Borrador a Enviada"): usa Timeline; valores anterior/nuevo en `--font-numeric` 11 px; filtros por usuario y fecha; solo lectura. Base para el módulo Auditoría.

### Componente: Attachments
Estado: **Propuesto — especificación pendiente**
> Los valores siguientes son una propuesta inicial, no una especificación cerrada. Faltan por definir: props, estados completos, responsive y relación con otros componentes. No implementar sin completar la ficha.

Lista de archivos: `FileText` 16 px, nombre (enlace), tamaño y fecha 11 px muted, acciones Descargar/Eliminar. Carga con File upload. Vacío: "Sin archivos adjuntos". Eliminar → Confirmation dialog.

---

## 22. Patrones de alto nivel

> Todos estos patrones se renderizan dentro de `AppShell` (que ya muestra `Breadcrumbs` automáticamente) y empiezan con `StateGate` → `PageHeading`. Las filas marcadas Implementado describen lo existente; el resto es Propuesto.

| # | Patrón | Estructura recomendada |
|---|---|---|
| 22.1 | **Dashboard** | `PageHeading` con selector de periodo → `MetricStrip` (3–4) → fila de 2 `ChartPanel` → lista de pendientes/alertas → actividad. El inicio actual (Implementado) es la referencia de jerarquía. |
| 22.2 | **Listado** | `PageHeading` con 1 primaria ("Nuevo …") → `FilterBar` → `DataTable` → paginación. Estados vacío/filtros/error dentro de la tabla. |
| 22.3 | **Detalle** | Encabezado con identificador, `StatusBadge`, acciones (primaria + menú) → `RecordTabs` (Resumen, Actividad, Documentos) → `dl` de 2 columnas (label 11 px muted 160 px / valor 12 px). Lateral derecho opcional 320 px con metadatos. |
| 22.4 | **Creación y edición** | Página propia (`/nuevo`, `/:id/editar`) con `.form-grid` en secciones, máx. 780 px; footer de acciones fijo; Cancelar vuelve al detalle/listado; confirmar al salir con cambios. Formularios cortos → Modal o Drawer. |
| 22.5 | **Configuración** | Sub-navegación contextual (patrón Cotizador → Configuración) + secciones con `SectionHeading`; Switch para efectos inmediatos, botón Guardar por sección para el resto. |
| 22.6 | **Permisos y roles** | Lo no autorizado no se lista (Implementado). Acción no permitida dentro de una pantalla: ocultar si el usuario nunca podrá usarla; deshabilitar con Tooltip explicativo si es temporal. Matriz de roles: Data Table con checkboxes por permiso y columna de rol fija. Acceso directo por URL → `EmptyState icon="lock"` (Implementado). |
| 22.7 | **Layout con sidebar** | Implementado; único layout de la aplicación. |
| 22.8 | **Dos columnas** | Implementado en inicio (`1.7fr / 1fr`). Preferido: principal `minmax(0,1fr)` + lateral 320 px; ≤1100 px lateral debajo. |
| 22.9 | **Tres columnas** | Lista 320 px · detalle `1fr` · contexto 280 px (bandejas, CRM). ≤1450 px se oculta el contexto en Drawer; ≤900 px solo una columna con navegación lista→detalle. Usar con moderación. |
| 22.10 | **Filtros persistentes** | Filtros, orden, página y pestaña en search params de la URL (junto a `style` y `state`), para compartir enlaces y conservar al volver. Nunca en almacenamiento del navegador en el prototipo. |
| 22.11 | **Búsqueda global** | Implementado (header + `/busqueda`). Propuesto: Command palette `Ctrl/⌘ K`, resultados agrupados por tipo, solo contenido autorizado. |
| 22.12 | **Acciones masivas** | Barra de selección (sección 19); resultado con Toast ("12 registros actualizados"); errores parciales con Alert listando los fallidos. |
| 22.13 | **Destructivas** | Confirmation dialog nombrando el objeto y la consecuencia; reversibles → Toast con Deshacer; críticas (eliminar módulo, cerrar nómina) → escribir el nombre para confirmar. |
| 22.14 | **Sin datos** | Distinguir siempre: primer uso (EmptyState + acción de crear), sin resultados por filtros (Limpiar filtros), sin permiso (lock), error (Reintentar). |
| 22.15 | **Responsive** | Escritorio ≥901 px: sidebar fijo/compacto, tablas completas. Tablet ≤900 px: drawer, tablas con scroll, lateral debajo. Móvil ≤640 px: 1 columna, tablas como tarjetas, overlays a pantalla completa, objetivos de 44 px, acciones principales visibles sin scroll horizontal. |

---

## 23. Mapa de componentes propuestos

| Necesidad | Primitivo base | Wrapper Intercore propuesto |
|---|---|---|
| Tabla | `ui/table` | `DataTable`, `TableToolbar`, `RowActions`, `BulkBar`, `ColumnMenu` |
| Overlays | `ui/dialog`, `ui/alert-dialog`, `ui/sheet`, `ui/popover` | `FormDialog`, `ConfirmDialog`, `RecordSheet` |
| Pestañas | `ui/tabs` | `RecordTabs` |
| KPIs y gráficas | `ui/chart` | `MetricStrip`, `ChartPanel` |
| Fechas | `ui/calendar`, `ui/popover` | `DatePicker`, `DateRangePicker`, `CalendarView` |
| Selección | `ui/command`, `ui/popover` | `Combobox`, `CommandPalette` |
| Formularios | `ui/form`, `ui/label` | `Field`, `Wizard`, `Stepper` |
| Avisos | `ui/sonner`, `ui/alert` | `InlineAlert`, `SystemBanner` |
| Contenido | — | `Timeline`, `Comments`, `Attachments`, `Kanban` |

Antes de crear cualquiera, revisar si ya existe en `widgets.tsx`.

---

# Parte III. Reglas para agentes de código

Complementan las *Reglas críticas para agentes* del inicio; en caso de conflicto prevalecen las reglas críticas.

1. Leer `DESIGN_SYSTEM.md` (empezando por las Reglas críticas y la Parte I) y `AGENTS.md` antes de crear o modificar UI.
2. Reutilizar componentes existentes (Parte I, sección 13) antes de crear otros.
3. Utilizar primero los tokens definidos en `src/styles.css`; si falta uno, crearlo en `:root` según las secciones C y D, y actualizar su estado en este documento.
4. No crear variantes visuales innecesarias.
5. No inventar colores, tamaños ni espaciados; no hardcodear `#hex`, `text-white` o `bg-black`.
6. Marcar como **Propuesto** cualquier decisión aún no implementada; al implementarla, moverla a la Parte I.
7. Conservar la consistencia entre módulos: mismo shell, mismas estructuras de pantalla y mismos componentes.
8. Validar escritorio (1280 px), tablet (900 px) y móvil (390 px).
9. Incluir siempre los estados loading, empty, error y disabled.
10. Respetar accesibilidad y navegación por teclado: foco visible, `aria-label` en botones de ícono, labels reales, Escape en overlays.

Reglas específicas del proyecto:
- Cada pantalla es una ruta de archivo en `src/routes/` con `validateSearch: searchValidator` y su propio `head()`; nunca editar `routeTree.gen.ts`.
- Toda pantalla se renderiza dentro de `AppShell`; estructura `StateGate` → `PageHeading` → `section.section-block` con `SectionHeading`.
- Navegar con `NavLink`/`ModuleLink` o `Link` pasando `search` de `useWorkspace()`.
- Módulos nuevos en `modules` (`src/data/intercore.ts`) con `icon`, `tone`, `available`, `authorized`.
- Datos mock en el contexto de `AppShell`; sin backend, polling ni almacenamiento del navegador salvo petición explícita.
- No cambiar tokens de identidad hasta recibir la marca oficial de Intercon.

---

## Checklist antes de entregar UI

- [ ] ¿Se reutilizaron componentes existentes?
- [ ] ¿Se usaron tokens?
- [ ] ¿Se mantuvo la jerarquía visual?
- [ ] ¿Se contemplaron desktop, tablet y móvil?
- [ ] ¿Se implementaron loading, empty, error y disabled?
- [ ] ¿Se respetó el foco visible y la navegación por teclado?
- [ ] ¿Se evitó duplicar navegación o layouts?
- [ ] ¿Se documentó cualquier componente nuevo?
- [ ] ¿Se verificó que no se afectó la lógica de negocio?
- [ ] ¿Se actualizaron los estados del design system?
