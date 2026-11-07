# OnnoMart — storefront

Multi-vendor marketplace for Bangladesh. Next.js App Router front end for the
`onno-mart-server` API (Express + Prisma + Postgres).

Live: https://onno-mart.vercel.app

## Stack

| | |
|---|---|
| Framework | Next.js 14 (App Router, RSC) |
| State | Redux Toolkit + RTK Query (cart, compare, user-scoped reads) |
| Styling | Tailwind + CSS variables in `src/styles/globals.css` |
| Auth | httpOnly `session` cookie holding the API's access token |
| Data | Server components fetch through `src/lib/api.ts` with cache tags |

## Getting started

```bash
pnpm install
cp .env.example .env.local     # then fill in the two values below
pnpm dev
```

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_BASE_URL` | API origin, e.g. `https://onnomart-api.vercel.app` |
| `AUTH_SECRET` | Signs the session cookie. Set it to the API's `JWT_ACCESS_SECRET` if you want signature verification; otherwise the cookie payload is read and expiry-checked. |

Seeded demo accounts (local only, hidden in production builds):

| Role | Email | Password |
|---|---|---|
| Admin | `admin@onnomart.dev` | `OnnoMart@123` |
| Vendor | `gadget@onnomart.dev` | `OnnoMart@123` |
| Customer | `customer@onnomart.dev` | `OnnoMart@123` |

## Scripts

```bash
pnpm dev                  # local dev server
pnpm build                # production build (also runs ESLint)
pnpm start                # serve the build
pnpm lint                 # eslint only
pnpm exec tsc --noEmit    # typecheck
```

## How the main pieces fit

**Caching.** Every server read goes through `apiGet(path, { tags, revalidate })`
in `src/lib/api.ts`, so one file decides the cache window. Tags are declared in
`cacheTags`; `revalidateCatalogue()` (`src/actions/revalidate.ts`) is a guarded
server action the admin panel calls after a mutation, because those mutations
run in the browser through RTK Query and cannot reach `revalidateTag` directly.

**Routing.** Browse state lives in the URL, not in React state:

```
/products                     all products
/category/beauty-care         category scope
/brand/nivea                  brand scope
/…?searchTerm=&minPrice=&sort=&page=
```

`/products?categoryId=…` and `?brandId=…` are 308-redirected by middleware to
the canonical path. `ProductListing` (`src/components/shop/product-listing.tsx`)
renders all three routes; filters submit as a plain GET form.

**Auth.** `verifyCredentials` (`src/lib/auth.ts`) exchanges credentials for an
access token and stores it in an httpOnly cookie. `getSession()` reads it back
for the session provider and the route guard in `src/middleware.ts`.

**Admin.** `/dashboard` is ADMIN/VENDOR only. The orders table edits status
inline; the dashboard header can flush the storefront cache.

## Conventions

- Body/UI text 14–15px, card titles 15–16px, section headings 26–30px.
- Colour comes from tokens (`--primary`, `--sale`, `--navy`); no raw hex in
  components.
- Server components by default. `"use client"` only where a browser API is
  actually needed.
