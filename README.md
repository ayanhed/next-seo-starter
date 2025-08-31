### Use this template

1. Click “Use this template” on GitHub (or clone the repo)
2. Update `src/config/app.ts` with your app name, description, and URL
3. Create `.env.local` from the Quick Start section below
4. Replace icons/OG image under `public/` if needed
5. Run `npm run dev`

## Next SEO Starter

A modern Next.js starter focused on speed, SEO, PWA (offline + push), analytics, theming, and great DX. Clone or “Use this template” to kick off new projects fast.

### Features

- **TypeScript + App Router**: Next.js 15, React 19, strict TS
- **Tailwind CSS 4**: Utility-first styling with semantic tokens
- **Theming**: Light/dark/terminal via `next-themes` and CSS variables
- **SEO**: Next Metadata API, Open Graph, robots, sitemap, JSON‑LD helpers
- **PWA**: Service worker (Serwist), offline route, navigation preload
- **Push Notifications**: Client subscription using Web Push (VAPID)
- **Analytics**: PostHog (client init, rewrites for ingest)
- **UI**: Polished component set using semantic color tokens

### Quick Start

1. Install dependencies

```bash
npm install
```

2. Configure environment

Create `.env.local` in the project root with:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_APP_NAME=Your App Name
NEXT_PUBLIC_APP_DESCRIPTION=Your app description
NEXT_PUBLIC_APP_AUTHOR=Your Name

# PostHog
NEXT_PUBLIC_POSTHOG_KEY=phc_your_posthog_public_key

# Web Push (VAPID public key)
NEXT_PUBLIC_VAPID_PUBLIC_KEY=BP_your_vapid_public_key
```

3. Start development

```bash
npm run dev
```

Visit `http://localhost:3000`.

### Configuration

- **App metadata**: `src/config/app.ts` is the single source of truth for
  - `name`, `description`, `keywords`, `baseUrl`, `locale`, `authors`, `categories`
  - default Open Graph image and theme colors
- **Global styles & tokens**: `src/app/globals.css` defines semantic CSS variables
  consumed by Tailwind classes (e.g., `--color-bg`, `--color-primary`).
- **Metadata**: `src/app/layout.tsx`, `manifest.ts`, `robots.ts`, `sitemap.ts` consume `appConfig`.
- **JSON‑LD**: Use `src/components/JsonLd.tsx` with helpers in `src/lib/jsonld.ts` for structured data.

### PWA & Push

- **Service worker**: `src/app/sw.ts` (Serwist) precaches offline page (`/offline`), claims clients, and enables navigation preload.
- **TypeScript**: `tsconfig.json` excludes `src/app/sw.ts` from main DOM types.
- **Push**: `src/components/PushNotificationManager.tsx` auto-subscribes if `NEXT_PUBLIC_VAPID_PUBLIC_KEY` is present. Generate keys using your preferred tooling (e.g., `web-push`).

### Analytics (PostHog)

- **Initialization**: `instrumentation-client.ts` runs in the client when imported by `src/app/providers.tsx`.
- **Rewrites**: `next.config.ts` proxies `/ingest` to PostHog.
- **Production**: set `NEXT_PUBLIC_POSTHOG_KEY`. In dev without a key, analytics remain inactive.

### Scripts

- `dev`: Start development server
- `build`: Production build
- `start`: Run production server
- `lint`: Lint the codebase
- `check`: Typecheck and lint (`tsc --noEmit && eslint .`)

### Project Structure (high level)

- `src/config/app.ts`: App-wide configuration
- `src/app/*`: App Router routes, metadata, providers, service worker
- `src/components/*`: UI components and utilities (`JsonLd`, `ThemeColorMeta`)
- `src/lib/*`: Utility modules (`jsonld`, `utils`)
- `public/*`: Icons, manifest output (`sw.js`), OG images, favicon

### Deployment

- Netlify: `netlify.toml` included; build command: `npm run build`, publish: `.next`
- Vercel: No config needed; ensure env variables are set in the dashboard

### Notes

- Replace `public/logo.png` and default OG image as desired
- Update `src/config/app.ts` for your domain and branding
- Confirm PWA and push behavior locally via HTTPS dev (`npm run dev` starts with experimental HTTPS)

### License

MIT
