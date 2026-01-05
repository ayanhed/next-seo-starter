export type AppConfig = {
  app: {
    name: string;
    description: string;
    keywords: string[];
    baseUrl: string;
    locale: string;
    authors: { name: string }[];
    categories: string[];
  };
  branding: {
    defaultOgImage: string;
    social?: {
      twitter?: string;
      github?: string;
      linkedin?: string;
      instagram?: string;
    };
  };
  theme: {
    primary: string;
    background: string;
  };
};

const envSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");

export const appConfig: AppConfig = {
  app: {
    name: process.env.NEXT_PUBLIC_APP_NAME || "Next SEO Starter",
    description:
      process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
      "Ship SEO-ready Next.js 15 apps faster with structured data, auth, and PWA defaults.",
    keywords: [
      "next.js seo template",
      "structured data",
      "pwa starter",
      "mantine ui",
      "better auth",
      "typescript",
    ],
    baseUrl: envSiteUrl || "https://next-seo-starter.vercel.app",
    locale: "en-UK",
    authors: [{ name: process.env.NEXT_PUBLIC_APP_AUTHOR || "Ayan Hedayati" }],
    categories: ["Software Development", "Web Applications", "SaaS"],
  },
  branding: {
    defaultOgImage: "/opengraph-image.jpg",
    social: {
      twitter: "https://twitter.com/ayanhedayati",
      github: "https://github.com/ayanhedayati",
      linkedin: "https://www.linkedin.com/in/ayanhedayati/",
      instagram: "https://www.instagram.com/ayanhedayati/",
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
