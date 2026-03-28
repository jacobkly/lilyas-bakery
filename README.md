# Lilya's Bakery

A premium bakery website built with Next.js App Router, Tailwind CSS, and Supabase.

The project has two clear surfaces:

- A custom-designed public website for the brand, menu, and item pages
- A simple admin panel for managing bakery items and images

## Stack

- Next.js 16
- React 19
- Tailwind CSS 4
- Supabase for database, auth, and storage

## Design Direction

- Warm, soft, minimal, premium
- Image-first layouts
- No pure white backgrounds
- No pure black text
- Public UI should never feel like a dashboard

## Project Structure

```text
src/
  app/
    (public)/
    admin/
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
  types/
```

## Conventions

- Public-facing components are custom only
- `shadcn/ui` is allowed only inside admin UI
- Shared layout primitives live in `src/components/layout`
- Supabase clients live in `src/lib/supabase`
- App-wide styles and theme tokens live in `src/app/globals.css`

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Notes

- Keep the public site visually premium and content-led
- Keep admin simple and practical
- Avoid unnecessary abstraction or feature complexity
