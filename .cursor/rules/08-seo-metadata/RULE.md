---
description: "SEO optimization, metadata management, Open Graph, sitemaps, and robots.txt configuration"
alwaysApply: true
---

# SEO and Metadata

## App Configuration

All SEO metadata is centralized in `src/config/app.ts`:

```typescript
export const appConfig: AppConfig = {
  app: {
    name: process.env.NEXT_PUBLIC_APP_NAME || "Next SEO Starter",
    description: process.env.NEXT_PUBLIC_APP_DESCRIPTION || "App description",
    keywords: ["keyword1", "keyword2", "keyword3"],
    baseUrl: envSiteUrl || "https://localhost:3000",
    locale: "en-GB",
    authors: [{ name: process.env.NEXT_PUBLIC_APP_AUTHOR || "Author" }],
    categories: ["Software Development", "Web Applications"],
  },
  branding: {
    defaultOgImage: "/opengraph-image.jpg",
    social: {
      twitter: "https://twitter.com/username",
      github: "https://github.com/username",
      linkedin: "https://www.linkedin.com/in/username/",
      instagram: "https://www.instagram.com/username/",
    },
  },
  theme: {
    primary: "#ad46ff",
    background: "#1A1A1A",
  },
};

export function getCanonicalUrl(path: string = ""): string {
  const base = appConfig.app.baseUrl;
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${path ? normalizedPath : ""}`;
}
```

## Root Layout Metadata

Located in `src/app/layout.tsx`:

```typescript
import { appConfig, getCanonicalUrl } from "@/config/app";
import type { Metadata, Viewport } from "next";

const title = `${appConfig.app.name} - ${appConfig.app.description}`;

export const metadata: Metadata = {
  metadataBase: new URL(appConfig.app.baseUrl),
  alternates: { canonical: appConfig.app.baseUrl },
  title: title,
  description: appConfig.app.description,
  keywords: appConfig.app.keywords,
  authors: appConfig.app.authors,
  openGraph: {
    title: title,
    description: appConfig.app.description,
    url: appConfig.app.baseUrl,
    siteName: appConfig.app.name,
    type: "website",
    locale: appConfig.app.locale,
    images: [
      {
        url: getCanonicalUrl(appConfig.branding.defaultOgImage),
        width: 1200,
        height: 630,
        alt: `${appConfig.app.name} social preview`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: appConfig.app.description,
    images: [getCanonicalUrl(appConfig.branding.defaultOgImage)],
    creator: appConfig.branding.social?.twitter,
  },
  applicationName: appConfig.app.name,
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: title,
  },
};

export const viewport: Viewport = {
  themeColor: appConfig.theme.background,
  viewportFit: "cover",
};
```

## Page-Level Metadata

### Static Metadata

```typescript
import type { Metadata } from "next";
import { appConfig, getCanonicalUrl } from "@/config/app";

export const metadata: Metadata = {
  title: "Page Title",
  description: "Page description for SEO",
  keywords: ["keyword1", "keyword2"],
  openGraph: {
    title: "Page Title",
    description: "Page description",
    images: ["/images/page-og-image.jpg"],
  },
  alternates: {
    canonical: getCanonicalUrl("/page-path"),
  },
};

export default function Page() {
  return <div>Page content</div>;
}
```

### Dynamic Metadata

```typescript
import type { Metadata } from "next";
import { appConfig, getCanonicalUrl } from "@/config/app";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
      type: "article",
      publishedTime: post.publishedAt.toISOString(),
    },
    alternates: {
      canonical: getCanonicalUrl(`/blog/${slug}`),
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  // ...
}
```

## Structured Data (JSON-LD)

### JSON-LD Component

Located in `src/components/JsonLd.tsx`:

```typescript
export interface JsonLdProps {
  data: Record<string, unknown>;
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
```

### Base Schemas

Located in `src/lib/jsonld.ts`:

```typescript
import { appConfig, getCanonicalUrl } from "@/config/app";

export function getBaseSchemas() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${appConfig.app.baseUrl}/#organization`,
        name: appConfig.app.name,
        url: appConfig.app.baseUrl,
        logo: getCanonicalUrl("/logo.png"),
        sameAs: Object.values(appConfig.branding.social || {}).filter(Boolean),
      },
      {
        "@type": "WebSite",
        "@id": `${appConfig.app.baseUrl}/#website`,
        url: appConfig.app.baseUrl,
        name: appConfig.app.name,
        publisher: { "@id": `${appConfig.app.baseUrl}/#organization` },
      },
    ],
  };
}
```

### Usage in Layout

```typescript
import JsonLd from "@/components/JsonLd";
import { getBaseSchemas } from "@/lib/jsonld";

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <JsonLd data={getBaseSchemas()} />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

## Sitemap

Located in `src/app/sitemap.ts`:

```typescript
import { MetadataRoute } from "next";
import { appConfig } from "@/config/app";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = appConfig.app.baseUrl;

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/login`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/register`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
  ];

  return staticPages;
}
```

## Robots.txt

Located in `src/app/robots.ts`:

```typescript
import { MetadataRoute } from "next";
import { appConfig } from "@/config/app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/dashboard/"],
      },
    ],
    sitemap: `${appConfig.app.baseUrl}/sitemap.xml`,
  };
}
```

## Web Manifest

Located in `src/app/manifest.ts`:

```typescript
import type { MetadataRoute } from "next";
import { appConfig } from "@/config/app";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: appConfig.app.name,
    short_name: appConfig.app.name,
    description: appConfig.app.description,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: appConfig.theme.background,
    theme_color: appConfig.theme.background,
    orientation: "portrait",
    lang: appConfig.app.locale,
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
    ],
    categories: appConfig.app.categories,
    id: "/",
    prefer_related_applications: false,
  };
}
```

## Open Graph Images

### Static OG Image

Place in `src/app/opengraph-image.jpg` (1200x630px recommended)

### Dynamic OG Image

Create `src/app/opengraph-image.tsx`:

```typescript
import { ImageResponse } from "next/og";
import { appConfig } from "@/config/app";

export const runtime = "edge";
export const alt = appConfig.app.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 72,
          background: appConfig.theme.background,
          color: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {appConfig.app.name}
      </div>
    ),
    { ...size }
  );
}
```

## Icons and Favicons

Required files in `public/`:

- `favicon.ico` - 48x48px
- `favicon.svg` - Scalable vector favicon
- `apple-touch-icon.png` - 180x180px
- `android-chrome-192x192.png` - 192x192px
- `android-chrome-512x512.png` - 512x512px
- `logo.png` - For structured data

## SEO Best Practices

### Title Tags

- **Length**: 50-60 characters
- **Format**: `Page Title | Site Name`
- **Unique per page**
- **Include target keywords**

### Meta Descriptions

- **Length**: 150-160 characters
- **Compelling and actionable**
- **Include target keywords naturally**
- **Unique per page**

### Heading Hierarchy

```typescript
<Title order={1}>Main Page Title (H1)</Title>
<Title order={2}>Section Heading (H2)</Title>
<Title order={3}>Subsection Heading (H3)</Title>
```

- **One H1 per page**
- **Logical hierarchy (H1 → H2 → H3)**
- **Include keywords in headings**

### Image Optimization

```typescript
import Image from "next/image";

<Image
  src="/images/hero.jpg"
  alt="Descriptive alt text with keywords"
  width={1200}
  height={630}
  priority // For above-the-fold images
/>;
```

- **Always provide alt text**
- **Use descriptive filenames**
- **Use `priority` for LCP images**

### Internal Linking

```typescript
import Link from "next/link";

<Link href="/related-page">Descriptive anchor text</Link>;
```

## Environment Variables

Required for SEO:

```bash
# Public
NEXT_PUBLIC_SITE_URL="https://example.com"
NEXT_PUBLIC_APP_NAME="App Name"
NEXT_PUBLIC_APP_DESCRIPTION="App description for SEO"
NEXT_PUBLIC_APP_AUTHOR="Author Name"

# Analytics (optional)
NEXT_PUBLIC_POSTHOG_KEY="phc_..."
NEXT_PUBLIC_POSTHOG_HOST="https://us.i.posthog.com"
```

## Core Web Vitals

- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

Next.js optimizations:

- Image optimization with `next/image`
- Font optimization with `next/font`
- Automatic code splitting
- Server-side rendering
