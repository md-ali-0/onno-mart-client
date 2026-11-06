# OnnoMart Storefront

The customer-facing side of **OnnoMart**, a multi-vendor marketplace. Shoppers browse
and compare products, vendors manage their own shop, and the platform admin sees
everything from one dashboard.

- **Live site**: https://onno-mart.vercel.app
- **API**: https://onnomart-api.vercel.app
- **API repo**: https://github.com/md-ali-0/onno-mart-server

## What's in here

| Area | Routes |
| --- | --- |
| Shopping | `/`, `/products`, `/product/[slug]`, `/shops`, `/shop`, `/flash-sale`, `/compare` |
| Account | `/auth/signin`, `/auth/signup`, `/auth/vendor-signup`, `/auth/forgot-password` |
| Shop pages | `/shop/[id]` (canonical; `/shop?shopId=…` redirects here) |
| Customer area | `/user/dashboard`, `/user/purchased-items`, `/user/my-reviews`, `/user/favorite-seller`, `/user/recent-view-products` |
| Vendor + admin | `/dashboard` and its children — products, categories, brands, coupons, orders, reviews, newsletter, users, shops |
| Checkout | `/cart`, `/payment/success`, `/payment/cancel`, `/payment/failed` |

Stack: Next.js 14 (App Router) · TypeScript · Redux Toolkit + RTK Query ·
Tailwind CSS · Radix UI primitives · React Hook Form + Zod · Recharts · Sonner.

Data reaches the pages two ways: RTK Query for anything behind a login or a user
action, and `fetch` inside server components for the catalogue, which keeps the
first paint fast and lets metadata render on the server.

## Local setup

```bash
git clone https://github.com/md-ali-0/onno-mart-client.git
cd onno-mart-client
pnpm install

cp .env.example .env.local     # point NEXT_PUBLIC_BASE_URL at the API
pnpm dev                       # http://localhost:3000
```

Run the API first (`onno-mart-server`, port 5000) — the catalogue pages are
server-rendered and will fail without it.

`pnpm build` for a production build, `pnpm lint` to check the code.

## Environment

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_BASE_URL` | API origin. Inlined at build time, so it must be set **before** building. |
| `AUTH_SECRET` | Signs the encrypted session cookie (`jose`). Server-side only. |

`.env` is ignored and no secret is committed. If you fork this, generate a fresh
`AUTH_SECRET`:

```bash
node -e "console.log(require('crypto').randomBytes(48).toString('base64url'))"
```

## Demo accounts

The sign-in page has three shortcut buttons that fill these in for you. Password
is the same for all of them: `OnnoMart@123`.

| Role | Email |
| --- | --- |
| Admin | `admin@onnomart.dev` |
| Vendor | `gadget@onnomart.dev` |
| Customer | `customer@onnomart.dev` |

## Deploying to Vercel

Straight Next.js deploy — nothing special beyond the two environment variables
above. `NEXT_PUBLIC_BASE_URL` is baked into the client bundle during the build,
so changing the API origin means redeploying, not just restarting.

The API's CORS allowlist is a single origin (`CLIENT_URL` on the server project).
Deploy the storefront under a new domain and the API will reject its requests
until that value is updated.

## Notes

- Images come from whatever URL the product record holds, so `next.config.mjs`
  allows any HTTPS host. Tighten that allowlist if you ever open uploads publicly.
- Payments redirect back into `/payment/*`. The redirect works; the gateway
  handshake needs real SSLCommerz credentials on the API side.

---

Built by [Mohammad Ali](https://github.com/md-ali-0).