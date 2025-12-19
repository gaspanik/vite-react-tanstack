# Tailwind Vite Project Context

## Project Overview

This is a **minimal starter template** for building modern web applications. It leverages the latest technologies for performance and developer experience, featuring **TanStack Router** for type-safe file-based routing.

## Tech Stack

*   **Framework:** React 19.2 + React DOM 19.2
*   **Routing:** TanStack Router (File-based, type-safe routing)
*   **Build Tool:** Vite 7 (Fast Refresh enabled)
*   **Language:** TypeScript 5.9 (Strict mode, `noExplicitAny`, `react-jsx` transform)
*   **Styling:** Tailwind CSS 4 (Zero-configuration via `@tailwindcss/vite`)
*   **Utilities:**
    *   `clsx` + `tailwind-merge` (combined as `cn` helper)
    *   `class-variance-authority` (CVA) for component variants
    *   `lucide-react` for icons
*   **Tooling:** Biome 2.3 (Linter & Formatter), pnpm (Package Manager)

## Directory Structure

```text
/Users/cipher/Desktop/cn-button/
├── .github/
│   └── copilot-instructions.md   # Detailed AI coding instructions
├── src/
│   ├── components/               # Reusable UI components
│   │   ├── ButtonCn.tsx          # Simple button using 'cn'
│   │   └── ButtonCva.tsx         # Variant-based button using 'cva'
│   ├── lib/
│   │   └── utils.ts              # Utilities (contains 'cn' function)
│   ├── routes/                   # TanStack Router routes
│   │   ├── __root.tsx            # Root layout
│   │   ├── index.tsx             # Home page
│   │   ├── button-cn.tsx         # ButtonCn demo page
│   │   └── button-cva.tsx        # ButtonCva demo page
│   ├── index.css                 # Global styles (@import "tailwindcss")
│   ├── main.tsx                  # Entry point (renders RouterProvider)
│   ├── routeTree.gen.ts          # Auto-generated route tree
│   └── vite-env.d.ts             # Vite types
├── biome.json                    # Biome configuration
├── index.html                    # HTML entry point
├── mise.toml                     # Task runner configuration
├── package.json                  # Dependencies
├── pnpm-workspace.yaml           # Workspace config
├── tsconfig.json                 # TS root config
└── vite.config.ts                # Vite config (defines '@/' alias)
```

## Development Workflow

### Prerequisites
*   **Node.js:** >= 20.19
*   **Package Manager:** pnpm

### Key Commands

| Command | Action | Description |
| :--- | :--- | :--- |
| `pnpm dev` | `vite` | Start dev server (HMR enabled). |
| `pnpm build` | `tsc -b && vite build` | Type-check and build for production. |
| `pnpm preview` | `vite preview` | Preview production build. |
| `pnpm check` | `biome check --write` | Format and lint code. |

**Note:** If `mise` is installed, you can use `mise run vite:dev`, `mise run biome:check`, etc.

## Coding Conventions

### React 19
*   **Imports:** **NEVER** import React (`import React from 'react'`). Use the `react-jsx` transform.
*   **Hooks:** Use named imports: `import { useState, useEffect } from 'react'`.
*   **Structure:** Use semantic HTML (`<nav>`, `<main>`, `<section>`). Define explicit props interfaces.

### TanStack Router
*   **File-Based Routing:** Create files in `src/routes/` to define routes.
    *   `src/routes/index.tsx` -> `/`
    *   `src/routes/about.tsx` -> `/about`
*   **Navigation:** Use the `<Link>` component for internal navigation.
    ```tsx
    import { Link } from '@tanstack/react-router'
    <Link to="/about" className="[&.active]:font-bold">About</Link>
    ```
*   **Layout:** Use `src/routes/__root.tsx` for the main application layout (navbar, footer, etc.).
*   **Generators:** Do not manually edit `routeTree.gen.ts`. It is auto-generated.

### TypeScript
*   **Strict Mode:** Enabled. `noExplicitAny` and `noUnusedVariables` are enforced errors.
*   **Path Alias:** Use `@/` to import from `src/` (e.g., `import { cn } from '@/lib/utils'`).

### Tailwind CSS v4 (CRITICAL)
*   **Configuration:** **NO** `tailwind.config.js`. Config is handled in `src/index.css` via `@import "tailwindcss";` and `@theme` blocks.
*   **Class Names (v4):**
    *   ❌ `space-x-*` / `space-y-*` -> ✅ Use `gap-*` with flex/grid.
    *   ❌ `divide-*` -> ✅ Use borders on children.
*   **Values:**
    *   Prioritize standard scale (e.g., `p-4`, `gap-2`).
    *   Use `@theme` variables for colors (e.g., `text-primary`).
    *   Avoid arbitrary values (`w-[35px]`) unless absolutely necessary.

### Component Patterns

#### `cn` Utility
Always use the `cn` function (from `@/lib/utils`) to merge classes and handle conditionals.
```tsx
<div className={cn('base-class', isActive && 'active-class', className)} />
```

#### Button Patterns
1.  **Simple (`ButtonCn.tsx`):** Use `cn` for simple boolean states (`active`, `disabled`).
2.  **Variants (`ButtonCva.tsx`):** Use `class-variance-authority` (CVA) for multiple variants (`size`, `intent`).

### Accessibility (a11y)
*   **Navigation:** Use `<nav>` with `aria-label`.
*   **Interactive:** Use `aria-expanded`, `aria-controls` for menus/toggles.
*   **Images:** Always provide `alt` text.
*   **Contrast:** Ensure WCAG AA compliance.

### Formatting (Biome)
*   **Indentation:** 2 spaces.
*   **Quotes:** Single quotes (JSX attributes use double quotes).
*   **Semicolons:** As needed.
*   **Trailing Commas:** All.
