import { Center } from "@mantine/core";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import AppShellLayout from "@/components/AppShellLayout";
import type { Metadata } from "next";
import { appConfig, getCanonicalUrl } from "@/config/app";

const pageTitle = `Dashboard | ${appConfig.app.name}`;

export const metadata: Metadata = {
  title: pageTitle,
  description: "Secure dashboard area for authenticated users.",
  alternates: { canonical: getCanonicalUrl("/dashboard") },
  robots: {
    index: false,
    follow: false,
  },
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Get session for UI state and actual auth validation
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <AppShellLayout>
      <Center mih="100vh" pt="lg">
        {children}
      </Center>
    </AppShellLayout>
  );
}
