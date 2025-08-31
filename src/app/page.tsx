"use client";

import { Heading, Text, Link } from "@/components/ui";
export default function Home() {
  return (
    <div className="text-center grow flex h-full flex-col items-center justify-center">
      {/* Some demo content */}
      <Heading level={1}>NextJS SEO Starter</Heading>
      <Text>
        This is a demo of the homepage. Click the button below to see the demo
        components.
      </Text>
      <Link variant="button" href="/demo">
        Demo
      </Link>
    </div>
  );
}
