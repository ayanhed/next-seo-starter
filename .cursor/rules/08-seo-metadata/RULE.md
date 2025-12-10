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
    name: process.env.NEXT_PUBLIC_APP_NAME || "[APP_NAME]",
    description: process.env.NEXT_PUBLIC_APP_DESCRIPTION || "[APP_DESCRIPTION]",
    keywords: ["keyword1", "keyword2", "keyword3"],
    baseUrl: envSiteUrl || "https://localhost:3000",
    locale: "en-GB",
    authors: [{ name: process.env.NEXT_PUBLIC_APP_AUTHOR || "[APP_AUTHOR]" }],
    categories: ["category1", "category2"],
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
import { appConfig } from "@/config/app";
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
    type: "website",
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
  other: {
    "mobile-web-app-capable": "yes",
    "apple-touch-fullscreen": "yes",
  } as Record<string, string>,
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
import { appConfig } from "@/config/app";

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
    canonical: `${appConfig.app.baseUrl}/page-path`,
  },
};

export default function Page() {
  return <div>Page content</div>;
}
```

### Dynamic Metadata

```typescript
import type { Metadata } from "next";
import { appConfig } from "@/config/app";

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
      canonical: `${appConfig.app.baseUrl}/blog/${slug}`,
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  // ...
}
```

## Open Graph Images

### Static OG Image

Place in `src/app/opengraph-image.jpg` (1200x630px recommended)

### Dynamic OG Image with Next.js Image Generation

Create `src/app/opengraph-image.tsx`:

```typescript
import { ImageResponse } from "next/og";
import { appConfig } from "@/config/app";

export const runtime = "edge";
export const alt = appConfig.app.name;
export const size = {
  width: 1200,
  height: 630,
};
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
    {
      ...size,
    }
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
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
  ];

  // Dynamic pages (e.g., blog posts)
  const posts = await getPosts(); // Your data fetching function
  const postPages = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...postPages];
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
        disallow: ["/api/", "/admin/", "/dashboard/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
    ],
    sitemap: `${appConfig.app.baseUrl}/sitemap.xml`,
  };
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

### Usage Examples

```typescript
import JsonLd from "@/components/JsonLd";

// Organization
<JsonLd
  data={{
    "@context": "https://schema.org",
    "@type": "Organization",
    name: appConfig.app.name,
    url: appConfig.app.baseUrl,
    logo: `${appConfig.app.baseUrl}/logo.png`,
    sameAs: [
      appConfig.branding.social?.twitter,
      appConfig.branding.social?.github,
    ],
  }}
/>

// Article
<JsonLd
  data={{
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    image: post.image,
    datePublished: post.publishedAt.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    author: {
      "@type": "Person",
      name: post.author.name,
    },
  }}
/>

// BreadcrumbList
<JsonLd
  data={{
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: appConfig.app.baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${appConfig.app.baseUrl}/blog`,
      },
    ],
  }}
/>
```

## Canonical URLs

Always set canonical URLs to avoid duplicate content issues:

```typescript
export const metadata: Metadata = {
  alternates: {
    canonical: getCanonicalUrl("/page-path"),
  },
};
```

## Social Meta Tags

### Twitter Cards

```typescript
export const metadata: Metadata = {
  twitter: {
    card: "summary_large_image",
    site: "@username",
    creator: "@username",
    title: "Page Title",
    description: "Page description",
    images: ["/images/twitter-card.jpg"],
  },
};
```

### Facebook/Open Graph

```typescript
export const metadata: Metadata = {
  openGraph: {
    type: "website", // or 'article'
    url: `${appConfig.app.baseUrl}/page`,
    title: "Page Title",
    description: "Page description",
    siteName: appConfig.app.name,
    images: [
      {
        url: `${appConfig.app.baseUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Image description",
      },
    ],
    locale: appConfig.app.locale,
  },
};
```

## Icons and Favicons

Required files in `public/`:

- `favicon.ico` - 48x48px
- `favicon.svg` - Scalable vector favicon
- `apple-touch-icon.png` - 180x180px
- `android-chrome-192x192.png` - 192x192px
- `android-chrome-512x512.png` - 512x512px

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
  loading="lazy" // For below-the-fold images
/>;
```

- **Always provide alt text**
- **Use descriptive filenames**
- **Optimize file sizes**
- **Use modern formats (WebP)**

### Internal Linking

```typescript
import Link from "next/link";

<Link href="/related-page">Descriptive anchor text with keywords</Link>;
```

- **Use descriptive anchor text**
- **Link to related content**
- **Create a logical site structure**

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

## Monitoring SEO

### Tools to Use

- **Google Search Console** - Monitor indexing and search performance
- **Lighthouse** - Check SEO score and recommendations
- **PageSpeed Insights** - Measure Core Web Vitals
- **Ahrefs / SEMrush** - Track rankings and backlinks

### Core Web Vitals

- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

Use Next.js built-in optimizations:

- Image optimization with `next/image`
- Font optimization with `next/font`
- Automatic code splitting
- Server-side rendering
