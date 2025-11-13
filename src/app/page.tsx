import Navigation from "@/components/ui/Navigation";
import Hero from "@/components/marketing/Hero";
import Partners from "@/components/marketing/Partners";
import Benefits from "@/components/marketing/Benefits";
import { Steps } from "@/components/marketing/Steps";
import Pricing from "@/components/marketing/Pricing";
import Testimonials from "@/components/marketing/Testimonials";
import { FAQ } from "@/components/marketing/FAQ";
import FinalCTA from "@/components/marketing/FinalCTA";
import Footer from "@/components/marketing/Footer";

export default function Home() {
  // Default steps for the Steps component
  const defaultSteps = [
    {
      title: "Sign Up",
      description:
        "Create your account in seconds with just your email address.",
      icon: "📝",
    },
    {
      title: "Configure",
      description: "Set up your workspace and customize your preferences.",
      icon: "⚙️",
    },
    {
      title: "Launch",
      description: "Start using our platform and see immediate results.",
      icon: "🚀",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section - Main value proposition */}
      <Hero />

      {/* Partners Section - Social proof */}
      <Partners />

      {/* Benefits Section - Focus on how it helps users */}
      <Benefits />

      {/* How it works Section - 3 simple steps */}
      <Steps steps={defaultSteps} />

      {/* Pricing Section - Clear plans with CTAs */}
      <Pricing />

      {/* Testimonials Section - Social proof next to pricing */}
      <Testimonials />

      {/* FAQ Section - Address major concerns */}
      <FAQ items={[]} />

      {/* Final CTA Section - Prominent call to action */}
      <FinalCTA />
    </div>
  );
}
