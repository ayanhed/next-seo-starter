import JsonLd from "@/components/JsonLd";
import { getHomePageSchemas } from "@/lib/jsonld";
import { appConfig, getCanonicalUrl } from "@/config/app";
import Hero from "./components/Hero";
import Partners from "./components/Partners";
import Benefits from "./components/Benefits";
import HowItWorks from "./components/HowItWorks";
import Pricing from "./components/Pricing";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import FinalCTA from "./components/FinalCTA";
import { faqItems } from "./components/FAQ";
import type { Metadata } from "next";

const pageTitle = `${appConfig.app.name} | SEO-first Next.js starter kit`;

export const metadata: Metadata = {
  title: pageTitle,
  description:
    "Next SEO Starter pairs structured data, Mantine UI, Better Auth, and PWA defaults so you can launch faster.",
  alternates: { canonical: getCanonicalUrl("/") },
  openGraph: {
    title: pageTitle,
    description:
      "Launch an SEO-ready marketing site, auth flow, and dashboard without wiring boilerplate.",
    url: getCanonicalUrl("/"),
    type: "website",
    images: [
      {
        url: getCanonicalUrl(appConfig.branding.defaultOgImage),
        width: 1200,
        height: 630,
        alt: `${appConfig.app.name} landing page preview`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description:
      "Next SEO Starter bundles structured data helpers, Mantine UI, and Better Auth for fast launches.",
    images: [getCanonicalUrl(appConfig.branding.defaultOgImage)],
    creator: appConfig.branding.social?.twitter,
  },
};

export default function Home() {
  const jsonLd = getHomePageSchemas({
    faqs: faqItems,
    breadcrumbItems: [{ name: "Home", url: "/" }],
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <Hero />
      <Partners />
      <Benefits />
      <HowItWorks />
      <Pricing />
      <Testimonials />
      <FAQ />
      <FinalCTA />
    </>
  );
}
