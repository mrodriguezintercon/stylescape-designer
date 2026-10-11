# Intercore · Intercon

Prototipo navegable, exclusivamente con datos ficticios en memoria. No hay backend, autenticación real, polling ni almacenamiento persistente. Recargar reinicia los cambios; navegar entre pantallas conserva tareas, notificaciones, favoritos y cotizaciones.

## Comparar estilos

Usa el selector superior en desarrollo o agrega a cualquier URL:
- `?style=corporate` — Corporate Workspace: estructura institucional y navegación jerárquica.
- `?style=command` — Command Center: navegación compacta y foco en trabajo pendiente.
- `?style=portal` — Modular Portal: catálogo visual y descubrimiento.

Los enlaces conservan la variante. El selector y el control de estados se ocultan con `import.meta.env.PROD` (equivalente a la compilación de producción). La variante puede seleccionarse por URL también en producción.

## Pantallas y simulación

Inicio, pendientes, notificaciones, favoritos, búsqueda, perfil, preferencias, ayuda y módulos. Cotizador Light ofrece Inicio, Nueva cotización, Mis cotizaciones, Borradores y Configuración. Los otros módulos muestran espacios de trabajo ilustrativos, no implementaciones productivas.

El selector Estado simula carga, permisos vacíos, pendientes vacíos, notificaciones vacías, error, sesión expirada, acceso denegado y módulo deshabilitado. También se puede usar `&state=loading|no-modules|no-tasks|no-notifications|error|expired|unauthorized|disabled`.

`/modulos/finanzas` demuestra acceso no autorizado; `/modulos/proyectos` demuestra un módulo deshabilitado. Los módulos no autorizados nunca aparecen en el catálogo.

## Desarrollo

`bun install` y `bun run dev`. Pruebas: `bun run test`.

## Decisiones pendientes

- Confirmar paleta, tipografía y wordmarks oficiales de Intercon; los valores de identidad se centralizan en `src/styles.css`.
- Validar densidad y prioridades con usuarios operativos de cada área.
- Definir permisos reales, fuente de datos, autenticación, plazos de tareas y reglas del cotizador en una etapa posterior.
- Confirmar textos, estructura de cada módulo y comportamiento de notificaciones.
- La fotografía corporativa es generada e ilustrativa, no una sede real. Nombres, clientes, correo, importes y fecha son datos mock.

## Recomendaciones finales

1. **Corporate Workspace:** conservar la separación entre navegación global y contextual, los breadcrumbs y el header estable como estructura base para uso diario.
2. **Command Center:** conservar búsqueda prominente, filtros y acciones de estado en pendientes; usar su mayor densidad para roles operativos.
3. **Modular Portal:** conservar catálogo descriptivo, disponibilidad y favoritos para descubrimiento y crecimiento del ecosistema.
4. **Síntesis recomendada:** estructura A, productividad B y catálogo/favoritos C. Validar con tareas reales antes de elegir una variante definitiva.
