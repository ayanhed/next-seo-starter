import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { appConfig, getCanonicalUrl } from "@/config/app";
import JsonLd from "@/components/JsonLd";
import { getBaseSchemas } from "@/lib/jsonld";
import { ColorSchemeScript, mantineHtmlProps } from "@mantine/core";
import type { Metadata, Viewport } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import Providers from "./providers";

import "./globals.css";

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const title = `${appConfig.app.name} - ${appConfig.app.description}`;

export const metadata: Metadata = {
  metadataBase: new URL(appConfig.app.baseUrl),
  alternates: { canonical: appConfig.app.baseUrl },
  title: title,
  description: appConfig.app.description,
  keywords: appConfig.app.keywords,
  authors: appConfig.app.authors,
  openGraph: {
    title: title,
    description: appConfig.app.description,
    url: appConfig.app.baseUrl,
    siteName: appConfig.app.name,
    type: "website",
    locale: appConfig.app.locale,
    images: [
      {
        url: getCanonicalUrl(appConfig.branding.defaultOgImage),
        width: 1200,
        height: 630,
        alt: `${appConfig.app.name} social preview`,
      },
    ],
  },
  applicationName: appConfig.app.name,
  twitter: {
    card: "summary_large_image",
    title,
    description: appConfig.app.description,
    images: [getCanonicalUrl(appConfig.branding.defaultOgImage)],
    creator: appConfig.branding.social?.twitter,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: title,
  },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-touch-fullscreen": "yes",
  } as Record<string, string>,
};

export const viewport: Viewport = {
  themeColor: appConfig.theme.background,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistMono.variable} ${inter.variable}`}
      {...mantineHtmlProps}
    >
      <head>
        <JsonLd data={getBaseSchemas()} />
        <ColorSchemeScript defaultColorScheme="auto" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
