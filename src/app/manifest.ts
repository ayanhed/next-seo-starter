import type { MetadataRoute } from "next";
import { appConfig } from "@/config/app";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: appConfig.app.name,
    short_name: appConfig.app.name,
    description: appConfig.app.description,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: appConfig.theme.background,
    theme_color: appConfig.theme.background,
    orientation: "portrait",
    lang: appConfig.app.locale,
    icons: [
      {
        src: "/favicon-96x96.png",
        sizes: "96x96",
        type: "image/png",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
    categories: appConfig.app.categories,
    id: "/",
    prefer_related_applications: false,
  };
}
