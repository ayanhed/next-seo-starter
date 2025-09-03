import { redirect } from "next/navigation";
import { auth } from "../../../lib/auth";
import { headers } from "next/headers";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
  description: "Register to your account",
};

export default async function RegisterLayout({
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
