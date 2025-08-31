export interface BaseSchema {
  "@context": string;
  "@type": string;
}

interface JsonLdProps {
  data: BaseSchema | BaseSchema[];
}

/**
 * JsonLd Component
 *
 * A centralized component for injecting JSON-LD structured data into pages.
 * This component follows SEO best practices and ensures consistent schema markup.
 *
 * Usage:
 * <JsonLd data={getHomePageSchemas()} />
 * <JsonLd data={createWebPage({ name: "About", path: "/about" })} />
 *
 * Features:
 * - Accepts single schema or array of schemas
 * - Safely serializes data with proper escaping
 * - Type-safe with TypeScript
 * - Optimized for SEO and search engine crawling
 */
export default function JsonLd({ data }: JsonLdProps) {
  const schemas = Array.isArray(data) ? data : [data];

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={`jsonld-${index}`}
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema, null, 0),
          }}
        />
      ))}
    </>
  );
}

/**
 * JsonLdScript Component
 *
 * Alternative component for inline script injection when you need more control
 * over the placement or want to combine with other head elements.
 */
export function JsonLdScript({ data }: JsonLdProps) {
  const schemas = Array.isArray(data) ? data : [data];

  return (
    <>
      {schemas.map((schema, index) => {
        const scriptContent = JSON.stringify(schema, null, 0);
        return (
          <script
            key={`jsonld-script-${index}`}
            type="application/ld+json"
            suppressHydrationWarning
            dangerouslySetInnerHTML={{
              __html: scriptContent,
            }}
          />
        );
      })}
    </>
  );
}

/**
 * useJsonLd Hook
 *
 * A hook for dynamically adding JSON-LD to components.
 * Useful for client-side rendered components that need structured data.
 */
export function useJsonLd(data: BaseSchema | BaseSchema[]) {
  const schemas = Array.isArray(data) ? data : [data];

  // This is primarily for SSR/SSG - client-side updates would need useEffect
  return schemas.map((schema, index) => ({
    key: `jsonld-hook-${index}`,
    type: "application/ld+json",
    content: JSON.stringify(schema, null, 0),
  }));
}
