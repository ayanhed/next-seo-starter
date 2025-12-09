import Navigation from "@/components/ui/Navigation";
import Footer from "@/app/(marketing)/components/Footer";
import Hero from "@/app/(marketing)/components/Hero";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navigation />
      <Hero />
      <main className="flex flex-col container mx-auto px-5">{children}</main>
      <Footer />
    </>
  );
}
