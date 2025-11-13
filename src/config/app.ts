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
    name: process.env.NEXT_PUBLIC_APP_NAME || "[APP_NAME]",
    description: process.env.NEXT_PUBLIC_APP_DESCRIPTION || "[APP_DESCRIPTION]",
    keywords: ["[APP_KEYWORDS]"],
    baseUrl: envSiteUrl || "https://localhost:3000",
    locale: "en-GB",
    authors: [{ name: process.env.NEXT_PUBLIC_APP_AUTHOR || "[APP_AUTHOR]" }],
    categories: ["[APP_CATEGORIES]"],
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
