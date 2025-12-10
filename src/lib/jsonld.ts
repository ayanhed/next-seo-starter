import { appConfig, getCanonicalUrl } from "@/config/app";

const SCHEMA_CONTEXT = "https://schema.org";

type SchemaWithType = { "@type": string };

const toAbsoluteUrl = (value?: string) => {
  if (!value) return undefined;
  return value.startsWith("http://") || value.startsWith("https://")
    ? value
    : getCanonicalUrl(value);
};

const withContext = <T extends SchemaWithType>(
  schema: Omit<T, "@context">
): T & { "@context": string } => ({
  "@context": SCHEMA_CONTEXT,
  ...(schema as T),
});

// Base schema types (generic, reusable)
export interface BaseSchema {
  "@context": string;
  "@type": string;
}

export interface ImageObject extends BaseSchema {
  "@type": "ImageObject";
  url: string;
  width?: number;
  height?: number;
  caption?: string;
}

export interface Organization extends BaseSchema {
  "@type": "Organization";
  name: string;
  url?: string;
  logo?: ImageObject;
  description?: string;
  sameAs?: string[];
}

export interface Person extends BaseSchema {
  "@type": "Person";
  name: string;
  url?: string;
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
  image?: string | string[] | ImageObject | ImageObject[];
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

export interface FAQPage extends BaseSchema {
  "@type": "FAQPage";
  name: string;
  description?: string;
  url: string;
  inLanguage?: string;
  mainEntity: Question[];
}

export interface Question extends BaseSchema {
  "@type": "Question";
  name: string;
  acceptedAnswer: Answer;
}

export interface Answer extends BaseSchema {
  "@type": "Answer";
  text: string;
}

export type FAQItem = { question: string; answer: string };

const defaultSocialProfiles = Object.values(appConfig.branding.social || {}).filter(
  (profile): profile is string => Boolean(profile)
);

export const createImageObject = (params: {
  url: string;
  width?: number;
  height?: number;
  caption?: string;
}): ImageObject => {
  const absoluteUrl = toAbsoluteUrl(params.url) || params.url;

  return withContext<ImageObject>({
    "@type": "ImageObject",
    url: absoluteUrl,
    width: params.width,
    height: params.height,
    caption: params.caption,
  });
};

export const createOrganization = (params?: {
  name?: string;
  url?: string;
  logo?: string;
  description?: string;
  sameAs?: string[];
}): Organization => {
  const name = params?.name || appConfig.app.name;
  const url = params?.url || appConfig.app.baseUrl;
  const description = params?.description || appConfig.app.description;
  const sameAs = params?.sameAs || defaultSocialProfiles;
  const logoUrl = params?.logo || appConfig.branding.defaultOgImage;

  return withContext<Organization>({
    "@type": "Organization",
    name,
    url,
    description,
    sameAs,
    logo: logoUrl ? createImageObject({ url: logoUrl }) : undefined,
  });
};

export const createPerson = (params: {
  name: string;
  url?: string;
  sameAs?: string[];
}): Person =>
  withContext<Person>({
    "@type": "Person",
    name: params.name,
    url: params.url,
    sameAs: params.sameAs,
  });

export const createWebsite = (params?: {
  name?: string;
  url?: string;
  description?: string;
  inLanguage?: string;
  publisher?: Organization;
}): Website => {
  const name = params?.name || appConfig.app.name;
  const url = params?.url || appConfig.app.baseUrl;
  const description = params?.description || appConfig.app.description;
  const inLanguage = params?.inLanguage || appConfig.app.locale;
  const publisher = params?.publisher || createOrganization();

  return withContext<Website>({
    "@type": "Website",
    name,
    url,
    description,
    inLanguage,
    publisher,
  });
};

export const createWebPage = (params: {
  name: string;
  path: string;
  description?: string;
  datePublished?: string;
  dateModified?: string;
  breadcrumbItems?: { name: string; url?: string }[];
  images?: string[];
}): WebPage => {
  const { name, path, description, datePublished, dateModified, images } = params;
  const breadcrumb =
    params.breadcrumbItems && params.breadcrumbItems.length > 0
      ? createBreadcrumbList(params.breadcrumbItems)
      : undefined;

  const imageList =
    images && images.length
      ? images.map((image) => toAbsoluteUrl(image) || image)
      : undefined;

  return withContext<WebPage>({
    "@type": "WebPage",
    name,
    url: getCanonicalUrl(path),
    description: description || appConfig.app.description,
    inLanguage: appConfig.app.locale,
    isPartOf: createWebsite(),
    datePublished,
    dateModified,
    breadcrumb,
    image: imageList,
  });
};

export const createBreadcrumbList = (
  items: { name: string; url?: string }[]
): BreadcrumbList => {
  return withContext<BreadcrumbList>({
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) =>
      withContext<ListItem>({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: item.url ? getCanonicalUrl(item.url) : undefined,
      })
    ),
  });
};

export const createFAQPage = (params: {
  name?: string;
  description?: string;
  path: string;
  faqs: FAQItem[];
}): FAQPage =>
  withContext<FAQPage>({
    "@type": "FAQPage",
    name: params.name || `${appConfig.app.name} FAQs`,
    description: params.description || appConfig.app.description,
    url: getCanonicalUrl(params.path),
    inLanguage: appConfig.app.locale,
    mainEntity: params.faqs.map((faq) =>
      withContext<Question>({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: withContext<Answer>({
          "@type": "Answer",
          text: faq.answer,
        }),
      })
    ),
  });

export const getBaseSchemas = (): BaseSchema[] => [
  createOrganization(),
  createWebsite(),
];

export const getHomePageSchemas = (params?: {
  faqs?: FAQItem[];
  breadcrumbItems?: { name: string; url?: string }[];
}): BaseSchema[] => {
  const schemas: BaseSchema[] = [
    createWebPage({
      name: appConfig.app.name,
      path: "/",
      description: appConfig.app.description,
      breadcrumbItems: params?.breadcrumbItems,
    }),
  ];

  if (params?.faqs?.length) {
    schemas.push(
      createFAQPage({
        path: "/",
        faqs: params.faqs,
      })
    );
  }

  return schemas;
};
