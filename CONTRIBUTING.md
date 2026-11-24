# Contributing to Boundless Builders

Thanks for contributing. This app is the public showcase for the builders,
projects, and teams on Boundless. It is **display-only**: it presents data that
is created and managed in the main Boundless app.

The single most important thing to understand before you write any UI:

> **This app must look and behave like a native part of Boundless.**
> We do not invent new visual design here. We follow the shared design system
> and reuse the shared components. When something is missing, we port it from
> [boundless-platform](https://boundlessfi.xyz) rather than making up our own.

Please read this whole guide before your first pull request.

## Table of contents

- [Golden rules](#golden-rules)
- [Local setup](#local-setup)
- [Follow the design system](#follow-the-design-system)
- [Reuse components before building new ones](#reuse-components-before-building-new-ones)
- [Component inventory](#component-inventory)
- [Patterns and conventions](#patterns-and-conventions)
- [Code style](#code-style)
- [Branches, commits, and PRs](#branches-commits-and-prs)
- [Pull request checklist](#pull-request-checklist)
- [SEO checklist for new pages](#seo-checklist-for-new-pages)

## Golden rules

1. **Follow the design system.** Read [design.md](./design.md) and use the
   tokens and primitives it documents. No hard-coded colors, fonts, or spacing
   when a token exists.
2. **Reuse before you build.** Check [`components/`](./components) first. If a
   button, card, dialog, or section already exists, use it. Do not hand-roll a
   second version.
3. **Keep it display-only.** This app reads and renders data. Creating, editing,
   and uploading belong in the main Boundless app. Do not add creation forms or
   write flows here.
4. **When in doubt, copy from boundless-platform.** It is the source of truth for
   look, feel, and component behavior.
5. **House style: no em dashes** in code, comments, or copy. Use periods, commas,
   or rewrite.

## Local setup

Requires Node `>=20.19`.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The page hot-reloads as you
edit.

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server (Turbopack) |
| `npm run build` | Production build (also runs the TypeScript check) |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |
| `npm run test` | Run unit tests (single run) |
| `npm run test:watch` | Run unit tests in watch mode |

## Follow the design system

The full reference is **[design.md](./design.md)**. The essentials:

- **Colors.** Use the token utilities: `bg-primary-500`, `text-muted-foreground`,
  `border-border`, `bg-card`, and the semantic tokens. Do not paste raw hex when
  a token exists. The brand teal is `primary-500` (`#2eedaa`).
- **Typography.** Headings use `font-heading` and the `text-h1`..`text-h6` /
  `text-display-*` scale. Body uses the default sans (`text-body`, `text-body-sm`).
  Do not set arbitrary font sizes.
- **Theme.** The app is dark by default. Style with semantic tokens so both
  themes work. Do not assume a light background.
- **Spacing and radius.** Use the Tailwind scale and the shared radii
  (`rounded-lg`, `rounded-xl`, `rounded-pill`). Page content caps at
  `max-w-page` (1440px).
- **Icons.** Prefer the design-system icon library in
  [`components/icons`](./components/icons) (Linear and Bold styles). Use
  `lucide-react` only where a library icon does not exist.

Avoid arbitrary Tailwind values (`w-[137px]`, `text-[#123456]`) unless you are
matching an exact spec that has no token. If you find yourself reaching for one
often, that is a sign a token or component is missing. Raise it.

## Reuse components before building new ones

Before you build any UI, search [`components/`](./components). The order to work
in:

1. **Is there a primitive for it?** Look in
   [`components/ui`](./components/ui) (buttons, inputs, dialogs, cards, tabs,
   and so on). Compose it with props and `className`.
2. **Is there a section or layout piece?** Look in
   [`components/marketing`](./components/marketing) (hero background, sections,
   CTAs, FAQ) and [`components/layout`](./components/layout) (header, footer).
3. **Is there a card?** Look in [`components/cards`](./components/cards).
4. **Still missing?** Port it from boundless-platform, keeping its structure and
   styles, then adapt it to this app (usually by decoupling it from data
   fetching so it takes plain props). Only build from scratch as a last resort,
   and match the design system when you do.

Customize primitives through their variants and `className`, not by copying and
editing. For example, the `Button` composes `intent` x `appearance` x `size` x
`shape`:

```tsx
import { Button } from '@/components/ui/button';

<Button>Primary</Button>
<Button intent='secondary' appearance='outline' size='small'>Secondary</Button>
<Button intent='destructive'>Delete</Button>
```

## Component inventory

A quick map of what already exists so you can reuse it.

### `components/ui` (design-system primitives)

`button`, `card`, `input`, `textarea`, `label`, `checkbox`, `select`, `dialog`,
`popover`, `dropdown-menu`, `hover-card`, `command`, `tabs`, `avatar`,
`avatar-group`, `pagination`, `skeleton`, `sonner` (toasts), `form`,
`country-select`, `image-cropper`, `option-card`, `snapshot-card`, `entity-row`,
`glow-banner`, `stats-bar`, `token-amount`, `success-dialog` (the reusable
success modal), `sparks-icon`.

### `components/layout` (site chrome)

`site-header` (nav), `site-footer` + `footer-glow`, `pill-button`,
`boundless-logo` (`BoundlessLogo` lockup and `BoundlessMark`), `brand-icons`
(social and GitHub glyphs).

### `components/marketing` (reusable sections and backgrounds)

`hero-background` (the animated hero gradient), `glow`, `section`
(`Section` / `SectionHeading` / `Eyebrow`), `reveal`, `cta-section`, `cta-pill`,
`cta-ticker`, `marketing-button`, `partner-logos`, `pillar-card`, `personas`,
`testimonials`, `four-steps`, `trust-bar`, `faq` + `faq-accordion`,
`prize-pool`, `funding-paths`, and more.

### `components/cards`

`opportunity-card` (the project / opportunity display card) and its skeleton.
It takes an `OpportunityCardView` prop, so it is fully presentational.

### `components/icons`

The full design-system icon library, ~410 icons in Linear and Bold styles. Same
ergonomics as lucide: color from `currentColor`, size from Tailwind.

```tsx
import { BellIcon, BellBoldIcon } from '@/components/icons';

<BellIcon className='size-5 text-foreground/80' aria-hidden />
```

## Patterns and conventions

- **Imports.** Use the `@/` path alias (`@/components/ui/button`, `@/lib/utils`).
- **`cn()`.** Merge class names with `cn` from [`lib/utils`](./lib/utils.ts). It
  resolves Tailwind conflicts (last wins).
- **Variants.** Build component variants with `class-variance-authority` (cva),
  following the pattern in `components/ui/button.tsx`.
- **Server vs client.** Components are server components by default. Add
  `'use client'` only when you need state, effects, or browser APIs.
- **Routes stay thin.** Files in [`app/`](./app) compose components. Keep logic
  in components and helpers, not in route files.
- **Display-only data.** This app renders data shaped elsewhere. Card and view
  components should take plain props (view models), not fetch or transform API
  data themselves.
- **API types come from the snapshot.** Type every API call with the generated
  DTOs through `Schemas` in [`lib/api/types.ts`](./lib/api/types.ts), for
  example `apiFetch<Schemas['PublicProjectListDto']>('/projects')`. Do not
  hand-write an interface that mirrors an API response. The types are generated
  from [`openapi.snapshot.json`](./openapi.snapshot.json), which holds only the
  public routes this app calls. Maintainers update it when the API changes; if
  you need a field or route that is not there, say so in your issue or PR.

## Code style

ESLint owns linting; run `npm run lint`. The house conventions:

- Single quotes, semicolons, 2-space indentation.
- JSX attributes use single quotes.
- **No em dashes** in code, comments, or copy.
- Write user-facing copy and comments in short, plain English. Many readers are
  not native speakers.

## Branches, commits, and PRs

- **Branch** off `main` with a descriptive name, for example
  `feat/builders-grid` or `fix/footer-blend`.
- **Commits** follow [Conventional Commits](https://www.conventionalcommits.org):
  `feat`, `fix`, `chore`, `docs`, `refactor`, `test`, `style`. Example:
  `feat(cards): add team card variant`.
- **One focused change per PR.** Keep it reviewable.
- **Screenshots.** Any PR that changes UI must include a screenshot (and a short
  clip for animation or interaction). Reviewers need to see the result.

## Pull request checklist

Before you open a PR, confirm:

- [ ] I reused existing components and tokens where possible.
- [ ] New UI follows [design.md](./design.md) (no stray hex, arbitrary sizes, or
      off-system spacing).
- [ ] The change is display-only (no creation or upload flows).
- [ ] `npm run lint` passes.
- [ ] `npm run test` passes.
- [ ] `npm run build` passes (this also type-checks).
- [ ] I attached a screenshot for any visual change.
- [ ] No em dashes in code, comments, or copy.

## SEO checklist for new pages

Every new route must satisfy all of the following before merging. The goal is
to keep SEO consistent and prevent regressions as the app grows.

Refer to the [generate-metadata docs](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
and the [metadata file conventions](https://nextjs.org/docs/app/api-reference/file-conventions/metadata)
for the API details. Check them against the Next.js version installed in this
project (`next` in `package.json`).

- [ ] The route file exports a `metadata` object (or a `generateMetadata`
      function) built with `buildPageMetadata` from `lib/seo/metadata.ts`.
      Do not hand-write `<meta>` or `<link>` tags.
- [ ] The new route is added to `lib/seo/routes.ts` so the sitemap picks it up.
- [ ] If the page has a distinct topic (not just a sub-list of an existing
      page), add an `opengraph-image.tsx` in the route folder using the shared
      OG image template.
- [ ] If a structured-data schema type applies (e.g. `WebPage`, `ProfilePage`,
      `ItemList`), add the corresponding JSON-LD in the route file.
- [ ] Run `npm run build`, then `npm run seo:check`, and confirm it exits with
      code 0. The script starts the production build, fetches the four core
      routes, and validates that `og:image`, `twitter:card`,
      `link rel="canonical"`, and `description` are all present. It also
      checks that `/robots.txt` and `/sitemap.xml` return 200. If port 3000
      is busy, set `SEO_CHECK_PORT` to a free port.

Thanks again for helping make Boundless Builders great.
