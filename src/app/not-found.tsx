import React from "react";
import Heading from "@/components/ui/Heading";
import Text from "@/components/ui/Text";
import Button from "@/components/ui/Button";
import Animate from "@/components/ui/Animate";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="text-center max-w-xl mx-auto">
        <Animate type="fade" duration={0.4}>
          <Heading level={1} lead={1}>
            404
          </Heading>
          <Heading level={6}>Page not found</Heading>

          <Text size="lg" variant="muted" align="center" className="max-w-md">
            The page you are looking for does not exist.
          </Text>

          <div className="mt-8 flex items-center justify-center gap-4">
            <Button
              as="a"
              href="/"
              variant="ghost"
              size="lg"
              icon={ArrowLeft}
              iconPosition="left"
            >
              Back to home
            </Button>
          </div>
        </Animate>
      </div>
    </div>
  );
}
