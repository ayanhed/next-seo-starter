"use client";

import PushNotificationManager from "@/components/PushNotificationManager";
import "../../instrumentation-client";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <PushNotificationManager />
    </>
  );
}
