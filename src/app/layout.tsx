import type { Metadata, Viewport } from "next";
// خط القاهرة المتغيّر مستضاف محلياً — معرّف في globals.css
import "./globals.css";
import { preload } from "react-dom";
import { Analytics } from "@vercel/analytics/next";
import { StoreProvider } from "@/context/StoreProvider";
import { Header } from "@/components/Header";
import { BackToTop } from "@/components/BackToTop";
import { LeadCaptureModal } from "@/components/LeadCaptureModal";
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
    "كتالوج ألعاب أطفال",
    "ألعاب أطفال في طنطا",
    "منتجات عمران للألعاب",
    "ألعاب تعليمية للأطفال",
    "عرائس ودمى",
    "هدايا وألعاب أطفال",
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
  // تحميل مسبق للخطين الأساسيين (النص العربي عنصر LCP، والأسعار لاتينية)
  // ليبدأ جلبهما مع أول بايت بدل انتظار اكتشاف CSS
  preload("/fonts/cairo-arabic-wght-normal.woff2", {
    as: "font",
    type: "font/woff2",
    crossOrigin: "anonymous",
  });
  preload("/fonts/cairo-latin-wght-normal.woff2", {
    as: "font",
    type: "font/woff2",
    crossOrigin: "anonymous",
  });

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
          <BackToTop />
          <LeadCaptureModal />
        </StoreProvider>
        <Analytics />
      </body>
    </html>
  );
}
