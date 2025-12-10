import Hero from "./components/Hero";
import Partners from "./components/Partners";
import Benefits from "./components/Benefits";
import HowItWorks from "./components/HowItWorks";
import Pricing from "./components/Pricing";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import FinalCTA from "./components/FinalCTA";

export default function Home() {
  return (
    <>
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
