import Navigation from "@/components/ui/Navigation";
import Footer from "@/app/(marketing)/components/Footer";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navigation />
      <main className="flex items-center justify-center md:mt-20 p-5">
        {children}
      </main>
      <Footer />
    </>
  );
}
