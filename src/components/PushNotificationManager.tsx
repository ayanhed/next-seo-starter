"use client";

import { useEffect, useState } from "react";

const publicVapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;

async function subscribeUserToPush(): Promise<PushSubscription | null> {
  if (!("serviceWorker" in navigator)) return null;
  const registration = await navigator.serviceWorker.ready;
  const permission = await Notification.requestPermission();
  if (permission !== "granted") return null;

  try {
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: publicVapidKey
        ? urlBase64ToUint8Array(publicVapidKey)
        : undefined,
    });
    return subscription;
  } catch {
    return null;
  }
}

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export default function PushNotificationManager() {
  const [, setStatus] = useState<
    "idle" | "subscribing" | "subscribed" | "error"
  >("idle");

  useEffect(() => {
    // Best-effort auto-subscribe if VAPID key exists
    if (!publicVapidKey) return;
    (async () => {
      setStatus("subscribing");
      const subscription = await subscribeUserToPush();
      setStatus(subscription ? "subscribed" : "error");
    })();
  }, []);

  return null;
}
