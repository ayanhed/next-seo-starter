import { appConfig, getCanonicalUrl } from "@/config/app";
import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { createWebPage } from "@/lib/jsonld";
import LoginForm from "./components/LoginForm";

const pageTitle = `Sign in | ${appConfig.app.name}`;
const pageDescription =
  "Access your Next SEO Starter dashboard or continue with a guest session.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: getCanonicalUrl("/login") },
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: pageTitle,
    description:
      "Sign in securely with email credentials or an instant guest account.",
    url: getCanonicalUrl("/login"),
  },
};

export default function LoginPage() {
  const jsonLd = createWebPage({
    name: "Sign In",
    path: "/login",
    description: pageDescription,
    breadcrumbItems: [
      { name: "Home", url: "/" },
      { name: "Sign In", url: "/login" },
    ],
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <LoginForm />
    </>
  );
}
