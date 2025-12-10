# Next SEO Starter

A batteries-included Next.js 15 (React 19) template with a Mantine-powered UI kit, Prisma + Better Auth, SEO-ready metadata helpers, offline-first PWA setup, and PostHog analytics wiring. Use it as a launchpad for SaaS dashboards, marketing sites, or anything that needs fast iteration with best-practice defaults.

## What's inside

- **Modern stack**: TypeScript, App Router, route groups for marketing, auth, and the protected dashboard.
- **Design system**: Mantine theming with reusable UI primitives in `src/components/ui`.
- **Auth & data**: Better Auth hooked up to Prisma/Postgres, session-aware middleware, and example login/register flows.
- **SEO defaults**: Centralized metadata config (`src/config/app.ts`), JSON-LD helper, sitemap/robots/manifest wired to the config.
- **DX helpers**: PostHog instrumentation (opt-in), HTTPS dev server, reusable marketing sections, and structured project layout.
- **PWA ready**: Serwist service worker, `/offline` fallback page, and navigation preload enabled during production builds.

## Quick start

1. **Use this template or clone the repo.**
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Create `.env.local`**  
   ```bash
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   NEXT_PUBLIC_APP_NAME=Next SEO Starter
   NEXT_PUBLIC_APP_DESCRIPTION=Ship SEO-first apps fast
   NEXT_PUBLIC_APP_AUTHOR=Your Name
   DATABASE_URL="postgresql://user:password@localhost:5432/next-seo-starter"
   # Optional analytics
   NEXT_PUBLIC_POSTHOG_KEY=phc_your_posthog_public_key
   ```
4. **Sync the database (PostgreSQL)**
   ```bash
   npm run db:push
   ```
5. **Start developing (served over HTTPS by default)**
   ```bash
   npm run dev
   ```
   Visit <https://localhost:3000> (trust the generated certificate if prompted).

## Usage notes

- Update `src/config/app.ts` once and every metadata surface (layout, sitemap, manifest, social tags) stays in sync.
- Marketing UI lives under `src/components/marketing` and powers the landing page in `src/app/(marketing)`.
- Auth routes (`/login`, `/register`) are client components using `authClient`; the dashboard route group pulls the active session on the server and is also protected via `middleware.ts`.
- Service worker code is in `src/app/sw.ts`. It’s injected during `next build` via Serwist and precaches the offline page. Make edits there if you need custom caching.
- PostHog only initializes when `NEXT_PUBLIC_POSTHOG_KEY` is set; requests are proxied through `/ingest` via `next.config.ts`.

## Scripts

- `npm run dev` – Next dev server with `--experimental-https`.
- `npm run build` / `npm run start` – Production build & serve.
- `npm run lint` / `npm run check` – ESLint + type checks (`check` runs `tsc --noEmit && eslint .`).
- `npm run db:generate | db:push | db:migrate | db:studio | db:reset` – Prisma workflows for Better Auth tables or your own schema changes.

## Project layout

- `src/app/(marketing)` – Landing page composed of Hero, Benefits, Pricing, Testimonials, FAQ, and CTA sections.
- `src/app/(auth)` – Login/Register forms with Better Auth client helpers.
- `src/app/(main)/dashboard` – Example protected route; pulled session is rendered server-side.
- `src/components/ui` – Reusable primitives (buttons, cards, forms, layout helpers).
- `src/components/JsonLd.tsx` + `src/lib/jsonld.ts` – Drop-in helpers for structured data.
- `prisma/schema.prisma` – Database models used by Better Auth; extend these for app data.
- `public/*` – Icons, logos, generated `sw.js`, and OG assets. Replace these with your brand.

## Deploying

- **Vercel** – Works out of the box; add your environment variables (including `DATABASE_URL` and optional PostHog key).
- **Netlify** – `netlify.toml` already sets `npm run build` and publishes `.next`.
- **Other platforms** – Run `npm run build && npm run start` after setting env vars and running any Prisma migrations.

## Customize it

1. Adjust Mantine theme tokens in `src/app/providers.tsx` (colors, radius, fonts) and extend the UI components as needed.
2. Swap copy, images, and sections under `src/components/marketing` + `public/`.
3. Add new authenticated routes under `src/app/(main)`; reuse the dashboard layout pattern for access control.
4. Extend the Prisma schema, run `npm run db:migrate`, and query through `@/lib/prisma`.

MIT License.
