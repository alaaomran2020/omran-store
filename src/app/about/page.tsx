import type { Metadata } from "next";
import { StructuredData } from "@/components/StructuredDataPages";
import { Award, Users, MapPin, Clock, Phone, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "عن عمران للألعاب",
  description:
    "تعرف على شركة عمران التجارية — مورّد متخصص في ألعاب الأطفال والعرائس والألعاب التعليمية ومستلزمات الحفلات في طنطا ومصر، مع أسعار جملة وقطاعي وتوصيل لجميع المحافظات.",
  alternates: { canonical: absoluteUrl("/about") },
  openGraph: {
    type: "website",
    locale: "ar_EG",
    url: absoluteUrl("/about"),
    siteName: siteConfig.name,
    title: "عن عمران للألعاب | شركة عمران التجارية",
    description:
      "مورّد متخصص في ألعاب الأطفال والهدايا ومستلزمات الحفلات في طنطا وجميع محافظات مصر. تواصل معنا عبر واتساب.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: { card: "summary_large_image", title: "عن عمران للألعاب", description: siteConfig.description, images: ["/og-image.png"] },
};

export default function AboutPage() {
  return (
    <>
      <StructuredData type="about" />
      <main>
        <div className="relative overflow-hidden bg-gradient-to-br from-brand-950 via-brand-900 to-brand-800 text-white">
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute -top-24 -end-24 size-80 rounded-full bg-brand-400/15 blur-3xl" />
          </div>
          <div className="container-page relative py-16 sm:py-24">
            <div className="max-w-2xl">
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">عن عمران للألعاب</h1>
              <p className="mt-5 text-base text-brand-100 leading-relaxed">نحن مورّدون متخصصون في ألعاب الأطفال والعرائس والألعاب التعليمية ومستلزمات الحفلات منذ سنوات. نؤمن بأن كل طفل يستحق لعبة آمنة وممتعة.</p>
            </div>
          </div>
        </div>

        <section className="py-14 sm:py-20">
          <div className="container-page">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-ink-900">من نحن</h2>
                <p className="mt-4 text-sm text-ink-600 leading-relaxed">عمران للألعاب — شركة عمران التجارية هي مورّد خدمات متكامل لألعاب الأطفال في طنطا وجميع محافظات مصر. نقدم أسعاراً معلنة للجملة والقطاعي، ونضمن جودة ثابتة مع شحن موثوق.</p>
                <ul className="mt-6 space-y-3">
                  {[
                    "أكثر من 16 صنف متاح من المخزون",
                    "أسعار جملة معلنة بدون مفاوضات",
                    "توصيل لشركات الشحن الموثوقة",
                    "فريق مبيعات متاح عبر واتساب",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-ink-700">
                      <span className="flex size-5 items-center justify-center rounded-full bg-brand-100 text-brand-700 shrink-0">
                        <ShieldCheck className="size-3" aria-hidden="true" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-[2rem] bg-gradient-to-br from-brand-50 to-ink-50 border border-ink-100 p-8 shadow-sm">
                <h3 className="text-xl font-extrabold text-ink-900">معلومات التواصل</h3>
                <div className="mt-6 space-y-4">
                  <a href={siteConfig.phoneHref} className="flex items-center gap-3 rounded-xl bg-white border border-ink-100 p-4 hover:shadow-md transition-shadow">
                    <span className="flex size-10 items-center justify-center rounded-xl bg-brand-700 text-white"><Phone className="size-4" /></span>
                    <div>
                      <p className="text-xs text-ink-400">هاتف</p>
                      <p className="num text-sm font-extrabold text-ink-900">{siteConfig.phoneDisplay}</p>
                    </div>
                  </a>
                  <div className="flex items-center gap-3 rounded-xl bg-white border border-ink-100 p-4">
                    <span className="flex size-10 items-center justify-center rounded-xl bg-brand-700 text-white"><Clock className="size-4" /></span>
                    <div>
                      <p className="text-xs text-ink-400">ساعات العمل</p>
                      <p className="text-sm font-extrabold text-ink-900">{siteConfig.workingHours}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-xl bg-white border border-ink-100 p-4">
                    <span className="flex size-10 items-center justify-center rounded-xl bg-brand-700 text-white"><MapPin className="size-4" /></span>
                    <div>
                      <p className="text-xs text-ink-400">العنوان</p>
                      <p className="text-sm font-extrabold text-ink-900">{siteConfig.address}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
