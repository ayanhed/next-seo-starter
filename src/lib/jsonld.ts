import { appConfig, getCanonicalUrl } from "@/config/app";

// Base schema types (generic, reusable)
export interface BaseSchema {
  "@context": string;
  "@type": string;
}

export interface Organization extends BaseSchema {
  "@type": "Organization";
  name: string;
  url?: string;
  logo?: ImageObject;
  description?: string;
  sameAs?: string[];
}

export interface Website extends BaseSchema {
  "@type": "Website";
  name: string;
  url: string;
  description?: string;
  inLanguage?: string;
  publisher?: Organization;
}

export interface WebPage extends BaseSchema {
  "@type": "WebPage";
  name: string;
  url: string;
  description?: string;
  inLanguage?: string;
  isPartOf?: Website;
  datePublished?: string;
  dateModified?: string;
  breadcrumb?: BreadcrumbList;
}

export interface BreadcrumbList extends BaseSchema {
  "@type": "BreadcrumbList";
  itemListElement: ListItem[];
}

export interface ListItem extends BaseSchema {
  "@type": "ListItem";
  position: number;
  name: string;
  item?: string;
}

export interface ImageObject extends BaseSchema {
  "@type": "ImageObject";
  url: string;
  width?: number;
  height?: number;
  caption?: string;
}

export const createWebsite = (params?: {
  name?: string;
  url?: string;
  description?: string;
  inLanguage?: string;
  publisherName?: string;
}): Website => {
  const name = params?.name || appConfig.app.name;
  const url = params?.url || appConfig.app.baseUrl;
  const description = params?.description || appConfig.app.description;
  const inLanguage = params?.inLanguage || appConfig.app.locale;
  const publisherName = params?.publisherName || appConfig.app.name;

  return {
    "@context": "https://schema.org",
    "@type": "Website",
    name,
    url,
    description,
    inLanguage,
    publisher: {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: publisherName,
      url,
    },
  };
};

export const createWebPage = (params: {
  name: string;
  path: string;
  description?: string;
  datePublished?: string;
  dateModified?: string;
}): WebPage => {
  const { name, path, description, datePublished, dateModified } = params;
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    url: getCanonicalUrl(path),
    description: description || appConfig.app.description,
    inLanguage: appConfig.app.locale,
    isPartOf: createWebsite(),
    datePublished,
    dateModified,
  };
};

export const createBreadcrumbList = (
  items: { name: string; url?: string }[]
): BreadcrumbList => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@context": "https://schema.org",
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url ? getCanonicalUrl(item.url) : undefined,
    })),
  };
};

// Convenience aggregators
export const getHomePageSchemas = () => [createWebsite()];
