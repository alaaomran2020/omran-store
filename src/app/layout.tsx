import type { Metadata, Viewport } from "next";
// خط القاهرة المتغيّر مستضاف محلياً — معرّف في globals.css
import "./globals.css";
import { preload } from "react-dom";
import { Analytics } from "@vercel/analytics/next";
import { StoreProvider } from "@/context/StoreProvider";
import { Header } from "@/components/Header";
import { BackToTop } from "@/components/BackToTop";
import { Footer } from "@/components/Footer";
import { siteConfig, openGraphImage } from "@/lib/site";
import { getThemeCssVariables } from "@/lib/site-theme";

const defaultTitle = `${siteConfig.name} | ${siteConfig.tagline}`;
const defaultDescription = siteConfig.description;
const defaultCanonical = siteConfig.url;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: defaultTitle,
    template: `%s | ${siteConfig.name}`,
  },
  description: defaultDescription,
  applicationName: siteConfig.name,
  keywords: [
    "كتالوج ألعاب أطفال",
    "ألعاب أطفال في طنطا",
    "منتجات عمران للألعاب",
    "ألعاب تعليمية للأطفال",
    "عرائس ودمى",
    "هدايا وألعاب أطفال",
    "ألعاب أطفال بالجملة",
    "توريد ألعاب محلات",
    "شركة عمران التجارية",
  ],
  authors: [{ name: siteConfig.legalName }],
  creator: siteConfig.legalName,
  publisher: siteConfig.legalName,
  alternates: {
    canonical: defaultCanonical,
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  other: {
    "geo.region": "EG-GHB",
    "geo.placename": "Tanta, Egypt",
    "geo.position": "30.793;30.999",
    ICBM: "30.793, 30.999",
  },
  openGraph: {
    type: "website",
    locale: "ar_EG",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: defaultTitle,
    description: defaultDescription,
    images: [
      {
        url: openGraphImage.url,
        width: openGraphImage.width,
        height: openGraphImage.height,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: [openGraphImage.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
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
      <body className="min-h-dvh bg-ink-50 antialiased" style={getThemeCssVariables()}>
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
        </StoreProvider>
        <Analytics />
      </body>
    </html>
  );
}
