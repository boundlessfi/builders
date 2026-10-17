<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="public/brand/boundless-logo-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="public/brand/boundless-logo-light.svg">
  <img alt="Boundless" src="public/brand/boundless-logo-dark.svg" width="380">
</picture>

### Boundless Builders

The public showcase for the builders and projects shipping on Boundless.

</div>

---

> [!IMPORTANT]
> **This codebase has been converted from `bounties` to Boundless Builders.**
> Bounties was originally going to be a separate app, so this repository started
> as the bounties frontend. We have since decided to incorporate bounties into
> the main Boundless app, so this codebase has been repurposed as the Boundless
> Builders showcase instead. The original bounties app is preserved under
> [`archive/`](./archive).

---

## Overview

**Boundless Builders** is a display-only sub-app of the Boundless platform, served at
`builders.boundlessfi.xyz`. It presents the people and work of the ecosystem:
builders and their projects.

This app **only displays** data. Creating, editing, and uploading builders and
projects all happen in the main Boundless app
([boundlessfi.xyz](https://boundlessfi.xyz)). This showcase reads that data and
renders it, so expect mostly read (`GET`) flows and no creation forms here.

> This repository replaces the previous `bounties` app. The prior codebase is
> preserved in full under [`archive/`](./archive) for reference.

## Tech stack

| Concern | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, React Server Components, Turbopack) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 (CSS-first `@theme` tokens, no `tailwind.config.js`) |
| Components | shadcn/ui (`new-york`), customized to the Boundless design system |
| Icons | Design-system icon library (`components/icons`) + lucide-react |
| Theme | Dark by default (next-themes), matching the canonical Boundless theme |

## Design system

The look and feel is lifted directly from the main
[boundless-platform](https://boundlessfi.xyz) frontend so this app is visually
native to Boundless. The full reference lives in **[design.md](./design.md)**:
color scales, semantic tokens, typography, spacing, component patterns, and code
style.

**If you are contributing UI, read [design.md](./design.md) first and follow it
strictly.** When something is missing, port it from boundless-platform rather
than inventing it.

## Project structure

```
app/                  # routes (thin components that compose features)
  layout.tsx          # root layout: fonts + provider tree
  page.tsx            # landing page (nav + hero + footer)
  globals.css         # Tailwind v4 @theme tokens (identical to boundless-platform)
components/
  ui/                 # shadcn primitives, themed to the design system
  layout/             # site header, footer, logo, brand glyphs
  marketing/          # reusable sections and backgrounds (hero gradient, etc.)
  cards/              # project / opportunity display cards
  icons/              # design-system icon library (Linear + Bold)
config/               # marketing-nav (header/footer/social links)
lib/                  # cn() and small helpers
providers/            # theme provider tree (dark default)
public/               # brand assets, logos, currency, illustrations
archive/              # the previous bounties app, kept for reference
```

## Getting started

Requires Node `>=20.19` (Next 16). Install and run:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

Before opening a PR, run the full local check:

```bash
npm run lint && npm run build
```

## Contributing

This project is open source and welcomes contributions. **Read
[CONTRIBUTING.md](./CONTRIBUTING.md) before your first pull request.** It is the
contributor guide, and it covers the rules that keep this app consistent:

- Follow the design system in [design.md](./design.md). Build UI from the
  primitives in `components/ui` and the tokens in `globals.css`.
- Reuse existing components before building new ones. When something is missing,
  port it from boundless-platform rather than inventing it.
- Keep this app display-only. Data creation belongs in the main Boundless app.
- No em dashes in code, comments, or copy (house style).
- Attach a UI screenshot on any frontend change so reviewers can see the result.
