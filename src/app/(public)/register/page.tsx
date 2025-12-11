import { appConfig, getCanonicalUrl } from "@/config/app";
import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { createWebPage } from "@/lib/jsonld";
import RegisterForm from "./components/RegisterForm";

const pageTitle = `Create account | ${appConfig.app.name}`;
const pageDescription =
  "Create your Next SEO Starter account to explore the dashboard and demo data.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: getCanonicalUrl("/register") },
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: pageTitle,
    description:
      "Register with email to try the SEO-ready Next.js starter experience.",
    url: getCanonicalUrl("/register"),
  },
};

export default function RegisterPage() {
  const jsonLd = createWebPage({
    name: "Create Account",
    path: "/register",
    description: pageDescription,
    breadcrumbItems: [
      { name: "Home", url: "/" },
      { name: "Create Account", url: "/register" },
    ],
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <RegisterForm />
    </>
  );
}
