# Project Structure

This project uses Next.js App Router under `src/` and separates the public site from the admin panel at the route level.

## Directory Layout

```text
src/
  app/
    (public)/
      page.tsx
    admin/
      layout.tsx
      page.tsx
    favicon.ico
    globals.css
    layout.tsx
  components/
    layout/
    ui/
      public/
      admin/
    features/
      public/
      admin/
  lib/
    supabase/
      client.ts
      server.ts
      admin.ts
  types/
    bakery-item.ts
    database.ts
```

## App Router Rules

- `src/app/(public)` contains the public marketing site and product browsing experience.
- `src/app/admin` contains the admin panel only.
- Route groups are used to keep public pages grouped without adding `/public` to URLs.
- Shared app-wide concerns stay in `src/app/layout.tsx` and `src/app/globals.css`.

## Component Rules

- `src/components/ui/public` is for custom public-facing UI only.
- `src/components/ui/admin` is the only place where `shadcn/ui` components may be used.
- `src/components/features/public` is for composed public sections like hero, menu grid, and item gallery.
- `src/components/features/admin` is for admin workflows like item forms, image upload panels, and item tables.
- `src/components/layout` is for cross-app structural primitives such as container, section, header shells, and wrappers.

## Supabase Locations

- `src/lib/supabase/client.ts` for the browser client.
- `src/lib/supabase/server.ts` for server-side usage in App Router.
- `src/lib/supabase/admin.ts` for protected server-only admin operations that need elevated access.
- `src/types/database.ts` stores generated Supabase schema types.

## Naming Conventions

- Use `PascalCase` for React component files and exported component names.
- Use `kebab-case` for non-component utility files and route segment folders.
- Use singular type names for core domain models when possible, for example `bakery-item.ts`.
- Keep one main export per file unless a file is intentionally a small utility module.
- Name public feature components by brand-facing purpose, such as `HeroSection.tsx` or `MenuGrid.tsx`.
- Name admin feature components by task, such as `ItemForm.tsx` or `ItemsTable.tsx`.
