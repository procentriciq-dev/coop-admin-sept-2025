# Tently Admin

An admin dashboard built with React, Vite, TypeScript, Tailwind CSS, and shadcn/ui. It provides management views for members, contributions, invites, and dashboard metrics.

## Tech Stack

- Vite + React 18 (TypeScript)
- Tailwind CSS (+ tailwind-merge, typography)
- shadcn/ui (Radix UI primitives)
- React Router v6
- TanStack Query
- Zod + React Hook Form

## Getting Started

Prerequisites: Node.js 18+ and npm.

```sh
# Install dependencies
npm i

# Start dev server (http://localhost:5173)
npm run dev

# Type-check and lint
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
```

## Available Scripts

- dev: Start Vite dev server
- build: Production build
- build:dev: Development-mode build (useful for debugging prod bundle)
- preview: Preview the production build
- lint: Run ESLint on the project

## Project Structure

```
src/
  components/           # Reusable UI and app components (incl. shadcn/ui)
  hooks/                # Custom hooks
  lib/                  # Utilities (e.g., className helpers)
  pages/                # Route-level pages
  main.tsx              # App bootstrap
  App.tsx               # Root layout/router mounting
```

Key pages in `src/pages`:

- Dashboard.tsx — overview metrics and charts
- Members.tsx — members table, filters, bulk actions
- Contributions.tsx — contributions overview
- Index.tsx — default landing route
- NotFound.tsx — fallback 404

Notable components in `src/components`:

- AppSidebar, DashboardLayout, MetricCard
- Member management dialogs: CreateMemberDialog, MemberFormDialog, SendInviteDialog
- UI primitives under `components/ui` (generated via shadcn/ui)

## Styling & UI

Tailwind is configured in `tailwind.config.ts` and global styles in `src/index.css`. shadcn/ui components live under `src/components/ui` and rely on Radix primitives.

## Routing

Client-side routing is handled by React Router (`react-router-dom`). See `App.tsx` for route mounting and `src/pages` for route components.

## Notes

- This project uses TanStack Query for data fetching/caching. Wire up real APIs in your page/components where needed.
- Forms use React Hook Form with Zod validation via `@hookform/resolvers`.
