# Copilot Instructions

## Project Overview

Minimal React 19 + TypeScript + Vite 7 + Tailwind CSS 4 starter with pnpm workspace support.

## Tech Stack

- **Framework**: React 19.2 (`react-jsx` transform)
- **Build**: Vite 7 + `@vitejs/plugin-react` (Fast Refresh enabled)
- **Styling**: Tailwind CSS 4 (via `@tailwindcss/vite`, applied with `@import "tailwindcss"`)
- **Utilities**: `clsx` + `tailwind-merge` (combined as `cn` function), `class-variance-authority` (for variant APIs), `tailwind-variants` (for slot-based multi-element styling)
- **Linter/Formatter**: Biome 2.3 (strict configuration in `.biome.json`)
- **Package Manager**: pnpm (`pnpm-workspace.yaml` with `@tailwindcss/oxide`, `esbuild` as build dependencies only)

## Key Structure

- **Entry**: `index.html` → `src/main.tsx` → TanStack Router (`src/routes/__root.tsx`)
- **Routes**: `src/routes/` for page components (index, button-cn, button-cva, card-tv, playground)
- **Styles**: `src/index.css` with `@import "tailwindcss"` only (no config file, v4 approach)
- **Components**: `src/components/` for reusable UI components
- **Utilities**: `src/lib/utils.ts` with `cn` function (clsx + tailwind-merge)
- **Path Alias**: `@/` maps to `src/` for cleaner imports (configured in both `vite.config.ts` and `tsconfig.app.json`)
- **TypeScript**: Project references (`tsconfig.json` references `tsconfig.app.json` and `tsconfig.node.json`)
- **Vite Config**: `vite.config.ts` with `base: './'` (relative path deployment)

## Coding Conventions

### React

- **Omit React Import**: Project uses `react-jsx` transform — **never** write `import React from 'react'`
- **Hook Imports**: Import hooks as named imports: `import { useState, useEffect } from 'react'`
- **Component Structure**:
  - Use semantic HTML tags (`header`, `main`, `footer`, `section`, `article`, `nav`, `aside`)
  - Define props explicitly with TypeScript interfaces
  - Example:
    ```tsx
    interface ButtonProps {
      label: string
      onClick: () => void
    }

    function Button({ label, onClick }: ButtonProps) {
      return <button onClick={onClick}>{label}</button>
    }
    ```

### TypeScript

- **Strict Mode**: `strict: true`, unused variables/parameters error, `noUncheckedSideEffectImports` enabled
- **Module**: `moduleResolution: "bundler"`, `allowImportingTsExtensions: true`
- **JSX**: `react-jsx` transform (no `import React` needed)
- **Type Checking**: `erasableSyntaxOnly: true` (limited to type-only syntax)
- **Path Mapping**: `baseUrl: "./src"` with `@/*` alias for absolute imports from `src/`

### Biome Rules

- **Format**: 2 spaces, LF, 80 char width, semicolons `asNeeded`, single quotes, trailing commas `all`
- **Linter**: `recommended` base + strict TypeScript rules (`noExplicitAny: error`, `noUnusedVariables: error`)
- **React**: `useExhaustiveDependencies: warn`, `useHookAtTopLevel: error`
- **CSS**: Tailwind directives parsing enabled

## Development Workflow

```fish
# Start dev server (HMR enabled)
pnpm dev

# Build (type check → Vite build)
pnpm build

# Preview build artifacts
pnpm preview

# Code quality check (Biome format + lint)
pnpm check
```

### Mise Tasks (Recommended)

Tasks defined in `mise.toml` can be run with `mise run <task>`:

- `vite:dev` / `vite:build` / `vite:preview`
- `biome:format` / `biome:lint` / `biome:check` (with confirmation prompts)

## Dependency Management

- **Lock File**: `pnpm-lock.yaml` (pnpm v9+ format)
- **Updates**: `ncu -i -u` for interactive updates (from history)

## Tailwind CSS v4 Notes

- **No Config Needed**: No `tailwind.config.js`, just `@import "tailwindcss"` in `src/index.css`
- **Customization**: Use CSS variables or `@theme` directives (not traditional JS config)
- **Vite Plugin**: `@tailwindcss/vite` required (no PostCSS needed)

### Theme Management

- **Use @theme Block**: Define project-specific design tokens in `src/index.css`:
  ```css
  @import "tailwindcss";

  @theme {
    --color-primary: #294779;
    --color-secondary: #f59e0b;
  }
  ```
- **Reference Custom Classes**: Use theme variables (`text-primary`) instead of arbitrary values (`text-[#294779]`)
- **Avoid Hardcoded Values**: Centralize colors/spacing in `@theme` for consistency

### Spacing and Value Guidelines

- **Prioritize Standard Scale**: Tailwind's spacing scale (1 unit = 4px) should be used first:
  - ✅ Good: `gap-2` (8px), `p-4` (16px), `m-6` (24px), `w-80` (320px)
  - ❌ Avoid: `gap-[8px]`, `p-[16px]`, `w-[320px]`
- **Arbitrary Values as Last Resort**: Use `[...]` syntax **only** when standard scale or theme variables cannot achieve the design:
  - Acceptable: `w-[42px]` (if design requires exact 42px)
  - Better: Add to `@theme` if used multiple times
- **Responsive Design**: Use standard breakpoints (`sm:`, `md:`, `lg:`, `xl:`, `2xl:`)

### V4 Class Name Changes (CRITICAL)

Tailwind CSS v4 has updated class naming conventions. **Always use v4 syntax**:

```tsx
// ❌ WRONG (v3 syntax)
<div className="text-gray-500 bg-gray-50 space-y-4">

// ✅ CORRECT (v4 syntax)
<div className="text-gray-500 bg-gray-50 flex flex-col gap-4">
```

**Key v4 changes:**
- ❌ `space-x-*` / `space-y-*` → ✅ Use `gap-*` with flex/grid
- ❌ `divide-*` → ✅ Use borders on individual children
- ✅ All utility classes remain: `flex`, `grid`, `p-*`, `m-*`, `w-*`, `h-*`, etc.
- ✅ Arbitrary values: Use sparingly (`w-[42px]`). Prefer standard scale (`w-2.5`) or CSS variables (`text-primary`)
- ✅ Responsive: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`
- ✅ State variants: `hover:`, `focus:`, `active:`, `disabled:`, etc.

**Never generate or suggest v3-specific utilities.** When refactoring, convert deprecated utilities to modern flex/grid patterns.

## Component Patterns

### cn Function

The `cn` utility (in `src/lib/utils.ts`) combines `clsx` and `tailwind-merge` to handle conditional class names and resolve Tailwind conflicts:

```tsx
import { cn } from '@/lib/utils'

// Basic usage with conditional classes
<button
  className={cn(
    'base-styles',
    isActive && 'active-styles',
    disabled && 'disabled-styles',
    className  // Allow external override
  )}
>
```

### Button Component Patterns

Three approaches for building components with variant styles:

**1. Simple Conditional Approach (`ButtonCn.tsx`)**:
- Use `cn` function for conditional styling
- Best for simple components with few variations or single DOM elements
- Example:
  ```tsx
  import { cn } from '@/lib/utils'
  import type { ComponentProps } from 'react'

  type ButtonProps = ComponentProps<'button'> & {
    active?: boolean
  }

  export const Button = ({ className, active, disabled, ...props }: ButtonProps) => (
    <button
      className={cn(
        'base-classes',
        active && 'active-classes',
        disabled && 'disabled-classes',
        className
      )}
      {...props}
    />
  )
  ```

**2. Variant API Approach (`ButtonCva.tsx`)**:
- Use `class-variance-authority` (CVA) for complex variants
- Best for single-element components with multiple design system variants
- Type-safe variant props with `VariantProps<typeof variants>`
- Example:
  ```tsx
  import { cva, type VariantProps } from 'class-variance-authority'
  import { cn } from '@/lib/utils'

  const buttonVariants = cva('base-classes', {
    variants: {
      intent: {
        primary: 'primary-classes',
        secondary: 'secondary-classes'
      },
      size: {
        sm: 'small-classes',
        md: 'medium-classes'
      }
    },
    defaultVariants: { intent: 'primary', size: 'md' }
  })

  type ButtonProps = ComponentProps<'button'> & VariantProps<typeof buttonVariants>

  export const ButtonCva = ({ intent, size, className, ...props }: ButtonProps) => (
    <button className={cn(buttonVariants({ intent, size }), className )} {...props} />
  )
  ```

**3. Slot-Based Approach (`CardTv.tsx`)**:
- Use `tailwind-variants` for complex multi-element components
- Best for components with multiple DOM elements requiring coordinated variant styling
- Built-in `twMerge` functionality (no need to wrap with `cn`)
- Type-safe with `VariantProps<typeof config>`
- Example:
  ```tsx
  import { tv, type VariantProps } from 'tailwind-variants'
  import type { ReactNode } from 'react'

  // Define component variants with slots
  const card = tv({
    slots: {
      base: 'rounded-lg overflow-hidden shadow-md',
      image: 'w-full h-48 object-cover',
      content: 'p-6',
      title: 'text-xl font-bold mb-2',
      description: 'text-sm mt-2',
    },
    variants: {
      tone: {
        default: {
          base: 'bg-white',
          title: 'text-gray-900',
          description: 'text-gray-500',
        },
        dark: {
          base: 'bg-slate-900',
          title: 'text-white',
          description: 'text-slate-400',
        },
      },
    },
    defaultVariants: {
      tone: 'default',
    },
  })

  // Extract type-safe props
  type CardVariants = VariantProps<typeof card>

  interface CardProps extends CardVariants {
    title: string
    imageUrl?: string
    children: ReactNode
    className?: string
  }

  // Component implementation
  export const Card = ({ tone, title, imageUrl, children, className }: CardProps) => {
    const { base, image, content, title: titleClass, description } = card({ tone })
    
    return (
      <div className={base({ class: className })}>
        {imageUrl && <img src={imageUrl} alt="Thumbnail" className={image()} />}
        <div className={content()}>
          <h3 className={titleClass()}>{title}</h3>
          <div className={description()}>{children}</div>
        </div>
      </div>
    )
  }
  ```

**When to use each approach:**
- **cn function**: Simple components, few conditionals, single element
- **CVA**: Single-element components with multiple variant combinations (buttons, badges)
- **tailwind-variants**: Multi-element components where variants affect multiple child elements (cards, forms, navigation)

### Icons

```tsx
// lucide-react icon usage example (see src/routes/__root.tsx, src/routes/button-cn.tsx)
import { IconName } from 'lucide-react'

function Component() {
  return (
    <div className="flex items-center gap-2">
      <IconName className="w-6 h-6" />
      <h1 className="text-2xl font-bold">Title</h1>
    </div>
  )
}
```

### Styling Guidelines

- **CSS Classes**: Tailwind utilities preferred
- **Conditional Classes**: Always use `cn` function to merge classes safely
- **Component Overrides**: Accept `className` prop and apply it last in `cn` call
- **Type Safety**: Local CSS like `App.css` can be used alongside (`import './App.css'`)

## Accessibility (a11y)

### Navigation Structure

- **TanStack Router Link**: Use `Link` component from TanStack Router for navigation:
  ```tsx
  import { Link } from '@tanstack/react-router'
  
  <nav aria-label="Main navigation">
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/about">About</Link></li>
    </ul>
  </nav>
  ```
- **Active State Styling**: TanStack Router's `Link` automatically applies `.active` class to active links:
  ```tsx
  <Link 
    to="/about"
    className="[&.active]:font-bold [&.active]:text-blue-600"
  >
    About
  </Link>
  ```
- **ARIA Labels**: Provide descriptive `aria-label` to `<nav>` elements (e.g., `"Main navigation"`, `"Footer links"`)

### Interactive Elements

- **Mobile Menu Buttons**: Use proper ARIA attributes:
  ```tsx
  <button
    aria-expanded={isOpen}
    aria-controls="mobile-menu"
    aria-label="Toggle menu"
  >
    Menu
  </button>
  ```
- **State Indication**: Set `aria-expanded` to `true`/`false` for collapsible sections
- **Control Relationships**: Use `aria-controls` to link buttons with their target elements
- **Focus Management**: Ensure keyboard navigation works for all interactive elements

### Best Practices

- **Alt Text**: Always provide meaningful `alt` attributes for images
- **Color Contrast**: Ensure text meets WCAG AA standards (4.5:1 for normal text)
- **Keyboard Navigation**: All functionality must be accessible via keyboard
- **Screen Reader Testing**: Test with VoiceOver (macOS) or NVDA/JAWS (Windows)

## Troubleshooting

- **Biome LSP Errors**: Reload VSCode (`Developer: Reload Window`), verify workspace trust
- **HMR Stopped**: Restart `pnpm dev`, delete `node_modules/.vite` cache
- **Type Errors**: Pre-check with `pnpm build` (`tsc -b` → `vite build`)
