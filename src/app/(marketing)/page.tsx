import Hero from "@/components/marketing/Hero";
import Benefits from "@/components/marketing/Benefits";
import Pricing from "@/components/marketing/Pricing";
import Testimonials from "@/components/marketing/Testimonials";
import FAQ from "@/components/marketing/FAQ";
import FinalCTA from "@/components/marketing/FinalCTA";

export default function Home() {
  return (
    <>
      {/* Hero Section - Main value proposition */}
      <Hero />

      {/* Benefits Section - Focus on how it helps users */}
      <Benefits />

      {/* Pricing Section - Clear plans with CTAs */}
      <Pricing />

      {/* Testimonials Section - Social proof next to pricing */}
      <Testimonials />

      {/* FAQ Section - Address major concerns */}
      <FAQ items={[]} />

      {/* Final CTA Section - Prominent call to action */}
      <FinalCTA />
    </>
  );
}
