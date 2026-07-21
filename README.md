# Arzon Registration

A full-stack web application built with [TanStack Start](https://tanstack.com/start), [Vite](https://vitejs.dev/), [React](https://react.dev/), and [Supabase](https://supabase.com/).

## Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [Bun](https://bun.sh/) (recommended for package management)

## Getting Started

1. **Install dependencies:**

   ```bash
   bun install
   ```

   _(Alternatively, use `npm install` or `pnpm install`)_

2. **Environment Setup:**
   Copy the `.env.example` to `.env` (if applicable) and fill in the necessary environment variables, such as your Supabase credentials:

   ```bash
   cp .env.example .env
   ```

3. **Start the development server:**

   ```bash
   bun run dev
   ```

4. **Build for production:**
   ```bash
   bun run build
   ```

## Scripts

- `bun run dev`: Start the local development server.
- `bun run build`: Build the app for production.
- `bun run preview`: Preview the production build locally.
- `bun run lint`: Run ESLint to catch code issues.
- `bun run format`: Format code using Prettier.
- `bun run typecheck`: Run TypeScript type checking.
- `bun run test:all`: Run type checks, linting, and tests.

## Tech Stack

- **Framework**: TanStack Start + Vite
- **UI**: React 19, Tailwind CSS, Radix UI Primitives, Lucide Icons
- **Backend/Database**: Supabase
- **Forms & Validation**: React Hook Form, Zod
- **Testing**: Playwright, Vitest

## License

This project is private and proprietary.
