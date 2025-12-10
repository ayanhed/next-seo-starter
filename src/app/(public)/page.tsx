import JsonLd from "@/components/JsonLd";
import { getHomePageSchemas } from "@/lib/jsonld";
import Hero from "./components/Hero";
import Partners from "./components/Partners";
import Benefits from "./components/Benefits";
import HowItWorks from "./components/HowItWorks";
import Pricing from "./components/Pricing";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import FinalCTA from "./components/FinalCTA";
import { faqItems } from "./components/FAQ";

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
