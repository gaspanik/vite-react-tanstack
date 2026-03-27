# Tailwind Vite Project Context

## Project Overview

This is a **minimal starter template** for building modern web applications. It leverages the latest technologies for performance and developer experience, featuring **TanStack Router** for type-safe file-based routing.

## Tech Stack

*   **Framework:** React 19.2 + React DOM 19.2
*   **Routing:** TanStack Router (File-based, type-safe routing)
*   **Build Tool:** Vite 8 (Fast Refresh enabled)
*   **Language:** TypeScript 6 (Strict mode, `noExplicitAny`, `erasableSyntaxOnly`, `react-jsx` transform)
*   **Styling:** Tailwind CSS 4 (Zero-configuration via `@tailwindcss/vite`)
*   **Utilities:**
    *   `clsx` + `tailwind-merge` (combined as `cn` helper)
    *   `class-variance-authority` (CVA) for component variants
    *   `tailwind-variants` (for slot-based multi-element styling)
    *   `lucide-react` for icons
*   **Tooling:** Biome 2.4 (Linter & Formatter), pnpm (Package Manager)

## Directory Structure

```text
/Users/cipher/Documents/projects/vite-react-tanstack/
├── .github/
│   └── copilot-instructions.md   # Detailed AI coding instructions
├── src/
│   ├── assets/
│   │   └── images/               # Image assets (for Image Utilities)
│   ├── components/               # Reusable UI components
│   │   ├── ButtonCn.tsx          # Simple button using 'cn'
│   │   ├── ButtonCva.tsx         # Variant-based button using 'cva'
│   │   └── CardTv.tsx            # Slot-based card using 'tailwind-variants'
│   ├── lib/
│   │   ├── image.ts              # Eager image loading utilities
│   │   ├── imageAsync.ts         # Lazy image loading utilities
│   │   └── utils.ts              # Utilities (contains 'cn' function)
│   ├── routes/                   # TanStack Router routes
│   │   ├── __root.tsx            # Root layout
│   │   ├── index.tsx             # Home page
│   │   ├── button-cn.tsx         # ButtonCn demo page
│   │   ├── button-cva.tsx        # ButtonCva demo page
│   │   └── card-tv.tsx           # CardTv demo page
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
*   **Type Checking:** `erasableSyntaxOnly: true` (limited to type-only syntax).
*   **Path Alias:** Use `@/` to import from `src/` (e.g., `import { cn } from '@/lib/utils'`).

### Tailwind CSS v4 (CRITICAL)
*   **Configuration:** **NO** `tailwind.config.js`. Config is handled in `src/index.css` via `@import "tailwindcss";` and `@theme` blocks.
*   **Theme Management:** Define project tokens in `src/index.css`:
    ```css
    @import "tailwindcss";
    @theme {
      --color-primary: #294779;
      --color-secondary: #f59e0b;
    }
    ```
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

#### 1. Simple Conditional (`ButtonCn.tsx`)
Use for simple components with few variations or single DOM elements.
```tsx
import { cn } from '@/lib/utils'
import type { ComponentProps } from 'react'

type ButtonProps = ComponentProps<'button'> & { active?: boolean }

export const Button = ({ className, active, disabled, ...props }: ButtonProps) => (
  <button
    className={cn('base-classes', active && 'active-classes', disabled && 'disabled-classes', className)}
    {...props}
  />
)
```

#### 2. Variant API (`ButtonCva.tsx`)
Use `class-variance-authority` (CVA) for single-element components with multiple variants.
```tsx
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva('base-classes', {
  variants: {
    intent: { primary: 'primary-classes', secondary: 'secondary-classes' },
    size: { sm: 'small-classes', md: 'medium-classes' }
  },
  defaultVariants: { intent: 'primary', size: 'md' }
})

type ButtonProps = ComponentProps<'button'> & VariantProps<typeof buttonVariants>

export const ButtonCva = ({ intent, size, className, ...props }: ButtonProps) => (
  <button className={cn(buttonVariants({ intent, size }), className)} {...props} />
)
```

#### 3. Slot-Based (`CardTv.tsx`)
Use `tailwind-variants` for multi-element components. Built-in `twMerge` (no `cn` needed).
```tsx
import { tv, type VariantProps } from 'tailwind-variants'

const card = tv({
  slots: { base: '...', title: '...', content: '...' },
  variants: { tone: { default: { base: 'bg-white' }, dark: { base: 'bg-slate-900' } } }
})

export const Card = ({ tone, className, ...props }) => {
  const { base, title, content } = card({ tone })
  return (
    <div className={base({ class: className })}>
      <h3 className={title()}>Title</h3>
      <div className={content()} />
    </div>
  )
}
```

## Asset Management

### Image Utilities
Images stored in `src/assets/images/` can be loaded using helper functions.

*   **Eager Loading (`@/lib/image`):** Use `getImage('name.jpg')` for static assets. Returns the URL or empty string.
*   **Lazy Loading (`@/lib/imageAsync`):** Use `getImageAsync('name.jpg')` for large images. Returns a Promise.
*   **Bulk Access:** `getAllImages()` and `getAllImagesAsync()` return a map of all images.

## Accessibility (a11y)
*   **Navigation:** Use `<nav>` with `aria-label`. Use TanStack `Link` for internal routing.
*   **Interactive:** Use `aria-expanded`, `aria-controls` for menus/toggles.
*   **Images:** Always provide `alt` text.
*   **Contrast:** Ensure WCAG AA compliance.

## MCP Tools Integration

If Tailwind CSS MCP tools are available, use them to:
1.  **Verify v4 Utilities:** `mcp_tailwindcss_m_get_tailwind_utilities`
2.  **Search Docs:** `mcp_tailwindcss_m_search_tailwind_docs`
3.  **Convert CSS:** `mcp_tailwindcss_m_convert_css_to_tailwind`
4.  **Generate Components:** `mcp_tailwindcss_m_generate_component_template`

Always prioritize **Tailwind CSS v4** syntax and conventions.

## Formatting (Biome)
*   **Indentation:** 2 spaces.
*   **Quotes:** Single quotes (JSX attributes use double quotes).
*   **Semicolons:** As needed.
*   **Trailing Commas:** All.
