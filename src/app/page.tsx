"use client";

import { Heading, Text, Link, Button } from "@/components/ui";
import { authClient } from "@/lib/auth-client";

export default function Home() {
  const { data } = authClient.useSession();
  return (
    <div className="text-center grow flex h-full flex-col items-center justify-center">
      {/* Some demo content */}
      <Heading level={1}>NextJS SEO Starter</Heading>
      <Text>
        This is a demo of the homepage. Click the button below to try logging
        in.
      </Text>
      {data?.session ? (
        <Button variant="primary" onClick={() => authClient.signOut()}>
          Sign Out
        </Button>
      ) : (
        <Link variant="button" href="/login">
          Login
        </Link>
      )}
    </div>
  );
}
