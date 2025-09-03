import { redirect } from "next/navigation";
import { auth } from "../../../lib/auth";
import { headers } from "next/headers";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};

export default async function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect("/search");
  }
  return <>{children}</>;
}
