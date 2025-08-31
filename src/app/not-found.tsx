import React from "react";
import Heading from "@/components/ui/Heading";
import Text from "@/components/ui/Text";
import Button from "@/components/ui/Button";
import Animate from "@/components/ui/Animate";

export default function NotFound() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="text-center max-w-xl mx-auto">
        <Animate type="fade" duration={0.4}>
          <Heading level={1} className="tracking-tight">
            404
          </Heading>
          <Heading level={6} className="tracking-tight">
            Page not found
          </Heading>

          <Text size="lg" variant="muted" align="center" className="max-w-md">
            Not sure how you got here. But you can click the button below and
            forget about it.
          </Text>

          <div className="mt-8 flex items-center justify-center gap-4">
            <Button as="a" href="/" variant="ghost" size="lg">
              Go home
            </Button>
          </div>
        </Animate>
      </div>
    </div>
  );
}
