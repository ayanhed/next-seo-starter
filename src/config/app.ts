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
      "A modern Next.js starter with Tailwind, SEO, PWA, Push, and PostHog.",
    keywords: ["Next.js", "React", "TypeScript", "Tailwind", "PWA", "SEO"],
    baseUrl: envSiteUrl || "http://localhost:3000",
    locale: "en-GB",
    authors: [{ name: process.env.NEXT_PUBLIC_APP_AUTHOR || "Your Name" }],
    categories: ["productivity", "portfolio", "business"],
  },
  branding: {
    defaultOgImage: "/opengraph-image.jpg",
    social: {},
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
