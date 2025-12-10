import Footer from "./components/Footer";
import AppShellLayout from "../../components/AppShellLayout";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppShellLayout>
      {children}
      <Footer />
    </AppShellLayout>
  );
}
