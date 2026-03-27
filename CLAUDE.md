# Claude Code Instructions

## Project Overview

Minimal React 19 + TypeScript + Vite 8 + Tailwind CSS 4 starter with pnpm workspace support.

## Tech Stack

- **Framework**: React 19.2 (`react-jsx` transform)
- **Build**: Vite 8 + `@vitejs/plugin-react` (Fast Refresh enabled)
- **Styling**: Tailwind CSS 4 (via `@tailwindcss/vite`, applied with `@import "tailwindcss"`)
- **Utilities**: `clsx` + `tailwind-merge` (combined as `cn` function), `class-variance-authority` (for variant APIs), `tailwind-variants` (for slot-based multi-element styling)
- **Linter/Formatter**: Biome 2.4 (strict configuration in [.biome.json](.biome.json))
- **Package Manager**: pnpm (`pnpm-workspace.yaml` with `@tailwindcss/oxide`, `esbuild` as build dependencies only)

## Key Structure

- **Entry**: [index.html](index.html) → [src/main.tsx](src/main.tsx) → TanStack Router ([src/routes/__root.tsx](src/routes/__root.tsx))
- **Routes**: [src/routes/](src/routes/) for page components (index, button-cn, button-cva, card-tv, playground)
- **Styles**: [src/index.css](src/index.css) with `@import "tailwindcss"` only (no config file, v4 approach)
- **Components**: [src/components/](src/components/) for reusable UI components
- **Utilities**: [src/lib/utils.ts](src/lib/utils.ts) with `cn` function (clsx + tailwind-merge), [src/lib/image.ts](src/lib/image.ts) for eager image loading, [src/lib/imageAsync.ts](src/lib/imageAsync.ts) for lazy image loading
- **Path Alias**: `@/` maps to `src/` for cleaner imports (configured in both [vite.config.ts](vite.config.ts) and [tsconfig.app.json](tsconfig.app.json))
- **TypeScript**: Project references ([tsconfig.json](tsconfig.json) references [tsconfig.app.json](tsconfig.app.json) and [tsconfig.node.json](tsconfig.node.json))
- **Vite Config**: [vite.config.ts](vite.config.ts) with `base: './'` (relative path deployment)

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

Tasks defined in [mise.toml](mise.toml) can be run with `mise run <task>`:

- `vite:dev` / `vite:build` / `vite:preview`
- `biome:format` / `biome:lint` / `biome:check` (with confirmation prompts)

## Tailwind CSS v4 Notes

- **No Config Needed**: No `tailwind.config.js`, just `@import "tailwindcss"` in [src/index.css](src/index.css)
- **Customization**: Use CSS variables or `@theme` directives (not traditional JS config)
- **Vite Plugin**: `@tailwindcss/vite` required (no PostCSS needed)

### Theme Management

- **Use @theme Block**: Define project-specific design tokens in [src/index.css](src/index.css):
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

### MCP Tools for Documentation Reference

When Claude Code has access to the Tailwind CSS MCP server, **prefer using MCP tools to reference up-to-date documentation** instead of relying solely on training data.

**Available MCP Tools:**

- `mcp__TailwindCSS__search_tailwind_docs` - Search official Tailwind documentation
  - Use when: Looking for specific utilities, patterns, or configuration options
  - Example: Searching for "flexbox utilities", "responsive design", "dark mode"

- `mcp__TailwindCSS__get_tailwind_utilities` - Get utilities by category/property
  - Use when: Need to verify available utility classes for a specific CSS property
  - Example: Getting all margin utilities, color classes, or typography options

- `mcp__TailwindCSS__get_tailwind_colors` - Get color palette information
  - Use when: Need to verify available color shades or create consistent color schemes
  - Example: Getting all shades of `blue`, `gray`, or custom color definitions

- `mcp__TailwindCSS__convert_css_to_tailwind` - Convert traditional CSS to Tailwind classes
  - Use when: Need to translate existing CSS styles to Tailwind v4 syntax
  - Example: Converting legacy CSS rules to modern utility classes

- `mcp__TailwindCSS__generate_color_palette` - Generate custom color palettes
  - Use when: Creating custom theme colors with proper shade variations
  - Example: Generating brand color palettes from hex values

- `mcp__TailwindCSS__generate_component_template` - Generate component templates
  - Use when: Scaffolding new UI components with Tailwind patterns
  - Example: Creating buttons, cards, forms with modern Tailwind v4 classes

**When to Use MCP Tools:**

1. **Before Writing Code**: Search documentation to verify correct v4 syntax
2. **When Uncertain**: Check utilities when syntax is unclear or deprecated
3. **For Complex Patterns**: Look up responsive design, state variants, or advanced configurations
4. **Color Systems**: Verify color names and shades before using arbitrary values
5. **Component Scaffolding**: Generate starting templates for common UI patterns

**Best Practices:**

- Always verify class names with MCP tools when working with Tailwind v4 features
- Use `search_tailwind_docs` as the primary reference for best practices
- Prefer MCP-generated code over assumptions to ensure v4 compatibility
- Check `get_tailwind_utilities` when converting v3 syntax to v4

## Component Patterns

### cn Function

The `cn` utility (in [src/lib/utils.ts](src/lib/utils.ts)) combines `clsx` and `tailwind-merge` to handle conditional class names and resolve Tailwind conflicts:

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

**1. Simple Conditional Approach ([src/routes/button-cn.tsx](src/routes/button-cn.tsx))**:
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

**2. Variant API Approach ([src/routes/button-cva.tsx](src/routes/button-cva.tsx))**:
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

**3. Slot-Based Approach ([src/routes/card-tv.tsx](src/routes/card-tv.tsx))**:
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

## Asset Management

### Image Utilities

This project uses Vite's `import.meta.glob` for optimized image handling. All images should be placed in [src/assets/images/](src/assets/images/).

**Files**:
- [src/lib/image.ts](src/lib/image.ts) - Eager loading (sync functions)
- [src/lib/imageAsync.ts](src/lib/imageAsync.ts) - Lazy loading (async functions)

**Supported formats**: `jpg`, `jpeg`, `png`, `webp`, `svg`

#### getImage()

Get images with or without file extension. Automatically resolves extension if omitted.

```tsx
import { getImage } from '@/lib/image'

function Component() {
  return (
    <>
      <img
        src={getImage('portrait.jpg')}  // With extension
        alt="Portrait"
      />
      {/* or */}
      <img
        src={getImage('portrait')}      // Auto-detects portrait.jpg
        alt="Portrait"
      />
    </>
  )
}
```

- Returns empty string if image not found
- Dev mode: Logs console warning for missing images
- Eager loading (all images loaded at build time)

#### getImageAsync()

Lazy-load large images for better performance:

```tsx
import { getImageAsync } from '@/lib/imageAsync'
import { useState, useEffect } from 'react'

function Gallery() {
  const [imageUrl, setImageUrl] = useState('')

  useEffect(() => {
    getImageAsync('large-photo.jpg').then(setImageUrl)
  }, [])

  return imageUrl ? <img src={imageUrl} alt="Large" /> : <p>Loading...</p>
}
```

#### getAllImages()

Get all images as a key-value map (useful for galleries):

```tsx
import { getAllImages } from '@/lib/image'

function ImageGallery() {
  const images = getAllImages() // { filename: url, ... }

  return (
    <div className="grid grid-cols-3 gap-4">
      {Object.entries(images).map(([name, url]) => (
        <img key={name} src={url} alt={name} className="w-full h-auto" />
      ))}
    </div>
  )
}
```

#### getAllImagesAsync()

Asynchronously get all images as a key-value map:

```tsx
import { getAllImagesAsync } from '@/lib/imageAsync'
import { useState, useEffect } from 'react'

function ImageGallery() {
  const [images, setImages] = useState<Record<string, string>>({})

  useEffect(() => {
    getAllImagesAsync().then(setImages)
  }, [])

  return (
    <div className="grid grid-cols-3 gap-4">
      {Object.entries(images).map(([name, url]) => (
        <img key={name} src={url} alt={name} className="w-full h-auto" />
      ))}
    </div>
  )
}
```

**Best Practices:**
- Place all images in [src/assets/images/](src/assets/images/)
- Use descriptive filenames (e.g., `hero-banner.jpg`, not `img1.jpg`)
- Prefer `getImage()` for static assets (eager loading, faster initial load)
- Use `getImageAsync()` for large images or conditional loading (lazy loading)
- Import async functions from `@/lib/imageAsync`
- Import sync functions from `@/lib/image`
- Always provide meaningful `alt` text for accessibility

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

## Claude Code Workflow

### Before Starting Any Task

1. **Understand the Project Structure**: Read this file and relevant source files before making changes
2. **Search Before Creating**: Use `Glob` to check if similar components/utilities already exist
3. **Check Existing Patterns**: Look at existing components in [src/routes/](src/routes/) and [src/components/](src/components/) for consistency

### When Creating New Components

1. **Location**: Place reusable components in [src/components/](src/components/), page-specific components in [src/routes/](src/routes/)
2. **Naming**: Use PascalCase for component files (e.g., `ButtonGroup.tsx`, not `buttonGroup.tsx`)
3. **Exports**: Use named exports for components (e.g., `export const Button = ...`, not `export default`)
4. **Props Interface**: Always define TypeScript interfaces for component props
5. **Styling Approach**: Choose the appropriate pattern based on complexity:
   - Simple components → `cn` function
   - Single-element with variants → `class-variance-authority`
   - Multi-element with variants → `tailwind-variants`

### When Editing Files

1. **Read First**: Always use the `Read` tool to view the current file before editing
2. **Preserve Formatting**: Maintain the existing code style (2 spaces, single quotes, trailing commas)
3. **Type Safety**: Ensure all edits maintain TypeScript strict mode compliance
4. **Test After Changes**: Suggest running `pnpm check` to verify formatting and linting

### When Adding Dependencies

1. **Check Existing**: Verify if similar functionality already exists in the project
2. **Use pnpm**: Always use `pnpm add <package>` or `pnpm add -D <package>` for dev dependencies
3. **Update Lock File**: Ensure `pnpm-lock.yaml` is updated

### When Working with Routes

1. **File-Based Routing**: TanStack Router uses file-based routing in [src/routes/](src/routes/)
2. **Root Layout**: All routes inherit from [src/routes/__root.tsx](src/routes/__root.tsx)
3. **Navigation**: Use `Link` component from `@tanstack/react-router`, not `<a>` tags

### Quality Checks

Before completing any task, verify:

- [ ] Code follows Biome formatting rules (2 spaces, single quotes, trailing commas)
- [ ] No `import React from 'react'` statements
- [ ] TypeScript strict mode compliance (no `any` types, all variables typed)
- [ ] Tailwind CSS v4 syntax used (no `space-y-*`, use `gap-*` with flex)
- [ ] Accessibility attributes included (`aria-label`, `alt` text, etc.)
- [ ] Path aliases use `@/` prefix for imports from `src/`
- [ ] Component props have TypeScript interfaces defined
- [ ] `cn` function used for conditional class names

### Common Tasks

#### Adding a New Page

```bash
# 1. Create route file
touch src/routes/new-page.tsx

# 2. Add route content following the pattern in existing routes
# 3. Navigation link will be automatically available via TanStack Router
```

#### Adding a New Component

```bash
# 1. Create component file
touch src/components/NewComponent.tsx

# 2. Implement component following one of the three patterns (cn/CVA/TV)
# 3. Export as named export
# 4. Import in the page where needed using @/ alias
```

#### Running Quality Checks

```bash
# Format and lint check
pnpm check

# Type check and build
pnpm build

# Start dev server
pnpm dev
```

### Git Workflow

When creating commits:
- Use clear, descriptive commit messages
- Follow the pattern of recent commits (check `git log`)
- Run `pnpm check` before committing to ensure code quality

### Communication Style

When responding to requests:
- Be concise and direct
- Reference specific file paths using markdown links: [filename.tsx](src/filename.tsx)
- For code locations, use line references: [filename.tsx:42](src/filename.tsx#L42)
- Explain architectural decisions when making significant changes
- Suggest running relevant commands after file changes (`pnpm check`, `pnpm dev`, etc.)
