import Navigation from "@/components/ui/Navigation";
import Footer from "@/components/marketing/Footer";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navigation />
      <main className="container-full flex flex-col">{children}</main>
      <Footer />
    </>
  );
}
