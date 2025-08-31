import { appConfig } from "@/config/app";
import type { Metadata, Viewport } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

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
    type: "website",
  },
  applicationName: appConfig.app.name,
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
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${geistMono.variable} ${inter.variable} antialiased bg-gradient-to-b from-[var(--color-bg)] via-[var(--color-surface)] to-[var(--color-bg)]`}
      >
        <main className="container md:mx-auto min-h-screen flex flex-col">
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  );
}
