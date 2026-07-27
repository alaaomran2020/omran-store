import type { Metadata, Viewport } from "next";
// خط القاهرة العربي مستضاف محلياً (بدون طلبات خارجية)
import "@fontsource/cairo/arabic-400.css";
import "@fontsource/cairo/arabic-500.css";
import "@fontsource/cairo/arabic-600.css";
import "@fontsource/cairo/arabic-700.css";
import "@fontsource/cairo/arabic-800.css";
import "@fontsource/cairo/latin-400.css";
import "@fontsource/cairo/latin-600.css";
import "@fontsource/cairo/latin-700.css";
import "./globals.css";
import { StoreProvider } from "@/context/StoreProvider";
import { Header } from "@/components/Header";
import { CartDrawer } from "@/components/CartDrawer";
import { FloatingCartBar } from "@/components/FloatingCartBar";
import { Footer } from "@/components/Footer";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "ألعاب أطفال جملة",
    "توزيع ألعاب",
    "بالونات جملة",
    "هدايا ومناسبات",
    "ألعاب تعليمية",
    "عرائس ومجسمات",
    "شركة عمران التجارية",
  ],
  authors: [{ name: siteConfig.legalName }],
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    type: "website",
    locale: "ar_EG",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: ["/og-image.svg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#1a2e6d",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl">
      <body className="min-h-dvh bg-ink-50 antialiased">
        <StoreProvider>
          <a
            href="#products"
            className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-3 focus:rounded-lg focus:bg-brand-700 focus:px-4 focus:py-2 focus:text-white"
          >
            تخطي إلى المنتجات
          </a>
          <Header />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
          <FloatingCartBar />
        </StoreProvider>
      </body>
    </html>
  );
}
