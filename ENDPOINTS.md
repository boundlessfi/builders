# Builders App — API Endpoints

This app is **read-only**. It displays builders and projects that are
created and managed in the main Boundless app. Every read comes from the shared
`boundless-nestjs` backend, so this app and boundless-platform stay consistent.

The public read API was implemented by the backend team. This document mirrors
`boundless-nestjs/docs/builders-public-reads.md` and maps each endpoint to the
screen that uses it. If the two ever drift, the backend doc is the source of
truth.

## Rules and conventions

- This app calls **`GET` endpoints only**. All writes (follow, create, edit,
  upload) stay in boundless-platform.
- Follows and profiles are stored once and shared. We reuse the same reads, we
  do not duplicate the data model.
- **Prefix:** every path is served under the global `/api` prefix. `GET /projects`
  is `GET /api/projects`. Base URL comes from `NEXT_PUBLIC_API_URL`
  (staging: `https://stage-api.boundlessfi.xyz`).
- **Auth:** the backend runs a global session guard. These routes opt out with
  `@AllowAnonymous()`, so they are public. Personalize-if-present routes use
  `@OptionalAuth()`.
- **No PII:** public reads never return `email` or other sensitive account
  fields. Identity and user-authored public profile fields only.
- **Pagination:** list responses return
  `{ data, pagination: { page, limit, total, totalPages, hasNext, hasPrev } }`.

## Status legend

- **Public**: implemented and public. Use directly.
- **Private-aware**: public, but returns `404` when the target profile is
  private.

---

## `/` — Home / Landing

| Endpoint | Purpose | Status |
| --- | --- | --- |
| `GET /users/top-builders` | Top builders row. Card-ready. Accepts `limit`. | Public |
| `GET /projects/featured` | Featured projects row | Public |
| `GET /discover/landing` | Ecosystem feed / counts | Public |
| `GET /discover/recent-winners` | Recent winners highlight | Public |
| `GET /users/directory?limit=N` | Source for builders strip count | Public |
| `GET /projects?limit=N` | Source for projects strip count | Public |

---

## `/builders` — Builders Directory

| Endpoint | Purpose | Status |
| --- | --- | --- |
| `GET /users/directory` | Public builders directory. Filters: `country`, `skills` (repeatable/CSV), `status`, `search`, `sort` (`name_asc\|name_desc\|newest\|oldest`), `page`, `limit`. Public profiles only. | Public |
| `GET /users/filters` | Facets: `skills[]`, `countries[]` (with counts), `statuses[]` | Public |

### Builder Listing Rule
The builders directory lists only people who qualify on the backend:
- A username, profile photo, and at least one skill on their Boundless profile.
- A public profile.
- At least one piece of real work on Boundless: a published project they created or joined, a hackathon entry, a bounty submission, or a bounty, quest, or grant award.
- Not a staff account.
Signing up or creating an organization alone no longer qualifies someone for listing. The filtering rule is enforced by the backend API.

---

## Main App Destinations

This showcase app links directly to the main Boundless application for full detail pages and interactive features:
- Builder Profile: `<main app>/profile/:username`
- Project Detail: `<main app>/projects/:slug`
- Organization Profile: `<main app>/organizations/:slug`
- Projects Directory: `<main app>/projects`
- Newsletter Subscription: `<main app>/#newsletter`
