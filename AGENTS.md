<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Intercore architecture
- Keep mock business state in the shared AppShell context, never external services or browser storage; all visual variants must share behavior and session data.
- Use TanStack file routes for content screens and nested module routes; URL search parameters preserve the chosen visual variant across navigation.
- Keep reusable shell/navigation in shell.tsx, operational widgets in widgets.tsx and page compositions in views.tsx; variants alter layout through centralized CSS without duplicating navigation logic.
- Use global semantic CSS tokens for identity and dimensions; official branding can then replace provisional values without changing feature code.
- Gate the prototype toolbar and legacy style resolution with import.meta.env.DEV; outside development normalize every style to corporate so URL parameters cannot restore experimental layouts.
- Use one operational home composition for all development styles; functional improvements belong in that shared composition, not alternative home implementations.
- Keep desktop sidebar collapse state in AppShell memory and scope compact styling to desktop; the mobile drawer always retains labels and contextual navigation.
