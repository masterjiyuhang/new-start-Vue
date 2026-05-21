# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Vue 3 admin dashboard template (CchAdmin) built with Vite, TypeScript, Element Plus, and Pinia. Uses hash-based routing with dynamic route injection from backend API.

## Commands

| Task                  | Command               | Notes                                  |
| --------------------- | --------------------- | -------------------------------------- |
| Dev server            | `pnpm run dev`        | Port from .env.development (default 6688) |
| Build (type-check + bundle) | `pnpm run build` | Runs vue-tsc + vite build in parallel  |
| Build only (no type-check)  | `pnpm run build-only` | vite build only                        |
| Preview production build    | `pnpm run preview`    | Build + preview on port 8082           |
| Vercel build                | `pnpm run build-vercel` | vite build --mode vercel             |
| Type check                  | `pnpm run type-check` | vue-tsc --noEmit                       |
| Unit tests                  | `pnpm run test:unit`  | vitest with jsdom                      |
| ESLint                      | `pnpm run lint`       | eslint with --fix                      |
| Stylelint                   | `pnpm run style:fix`  | stylelint with --fix                   |

## Architecture

Vue 3 + TypeScript + Vite admin template using Element Plus, Pinia, Vue Router, and Tailwind CSS.

### Routing

- **Hash history** mode (`createWebHashHistory`), base URL from `VITE_BASE_URL`
- **Static routes** defined in `src/router/modules/*.ts` — auto-loaded via `import.meta.glob`. These are constant menu routes available without authentication
- **Dynamic routes** fetched from API at runtime via `src/router/dynamicRouter.ts` — the auth store fetches menu list and button permissions, then routes are added with `router.addRoute()`
- Route guard in `src/router/index.ts` handles: NProgress, title, token check, whitelist, dynamic route init
- Config constants (`HOME_URL`, `LOGIN_URL`, `ROUTER_WHITE_LIST`) in `src/config/index.ts`

### State Management

Pinia with `pinia-plugin-persistedstate`. Stores in `src/stores/modules/`:
- **globalSetting** — token, theme config, layout, language, keepAlive names, sidebar collapse. Persisted to localStorage
- **auth** — auth menu list, button permissions, public key for RSA encryption. Merges backend menu data with local `moduleRouteList`
- **count**, **tabs**, **test** — additional stores

### API Layer

- `src/utils/http` — axios-based HTTP client wrapped as `http.request(method, url, config)`
- `src/api/` — API endpoint definitions (auth, car, dashboard, mock, etc.)
- Mock data via `vite-plugin-mock` in `mock/` directory, enabled by `VITE_USE_MOCK` env var
- API prefix: `VITE_BASE_API` (`/basic-api` in dev, full URL in production)

### Key Integrations

- **Element Plus** with auto-import (`unplugin-auto-import`, `unplugin-vue-components`) and dark mode support
- **i18n** via `vue-i18n`, setup in `src/locales/setupI18n.ts`, message files in `src/locales/lang/`
- **SVG icons** via `vite-plugin-svg-icons` — place SVGs in `src/assets/icons/`, use `<SvgIcon>` component
- **Tailwind CSS** with PostCSS and `postcss-pxtorem`
- **SCSS** with auto-injected `@use` directives for element theme, mixins, and variables (see `vite.config.ts` css.preprocessorOptions)
- **Vercel deployment** supported via `vite-plugin-vercel` and `--mode vercel`

### Path Aliases

- `@/` → `src/`
- `~/` → `src/`
- Configured in both `vite.config.ts` resolve.alias and `tsconfig.json` paths

### Vite Plugins

All configured in `build/vite/plugins/index.ts`: Vue, JSX, SVG loader, i18n, mock, auto-import, compression, node polyfills, build info, and dev tooling (shift-click to locate source code).

### Custom Components

Globally registered in `src/components/index.ts`: `cchTable`, `cchDialog`, `cchTypeCode`, `CountTo`, `cchList`, `cchListItem`.

## Commit Convention

Uses `@commitlint/config-conventional`. Valid types: `feat`, `fix`, `perf`, `style`, `docs`, `test`, `refactor`, `build`, `ci`, `chore`, `revert`, `release`. Husky pre-commit hook enforces this.

## Linting

- ESLint: extends `@erhang/eslint-config/basic` + auto-import type definitions
- Stylelint: extends `@erhang/stylelint-config`
- Prettier config in `.prettierrc.cjs`
