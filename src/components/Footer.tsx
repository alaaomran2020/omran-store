import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone, Clock, ShieldCheck, Truck, Sparkles, CreditCard } from "lucide-react";
import { categories } from "@/lib/categories";
import { navLinks, siteConfig } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-brand-950 via-brand-900 to-ink-950 text-ink-200">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 start-1/2 -translate-x-1/2 size-[40rem] rounded-full bg-brand-800/20 blur-3xl" />
      </div>

      <div className="container-page relative py-14 sm:py-20">
        {/* Trust badges strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
          {[
            { icon: Truck, title: "كتالوج متجدد", desc: "منتجات مختارة بعناية" },
            { icon: ShieldCheck, title: "صور واضحة", desc: "اطّلع على المنتج قبل السؤال" },
            { icon: Sparkles, title: "بيانات قابلة للتحديث", desc: "الاسم والوصف والسعر يُضافون لاحقاً" },
            { icon: CreditCard, title: "استفسار سريع", desc: "تواصل مباشر عبر واتساب" },
          ].map((badge) => (
            <div key={badge.title} className="flex items-center gap-3 rounded-2xl bg-white/5 border border-white/10 px-4 py-3.5 backdrop-blur-sm">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-brand-700 text-white">
                <badge.icon className="size-4" aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs font-extrabold text-white">{badge.title}</p>
                <p className="text-[10px] text-ink-400">{badge.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Main footer grid */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="relative flex items-center justify-center size-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-900 text-white shadow-lg shadow-brand-900/20">
                <Image src="/logo.svg" alt="" width={28} height={28} className="size-7" />
              </div>
              <span className="text-base font-extrabold text-white tracking-tight">عمران للألعاب</span>
            </Link>
            <p className="text-sm leading-relaxed text-ink-400">
              كتالوج عمران للألعاب والعرائس والألعاب التعليمية والهدايا. تصفّح المنتجات وتواصل معنا مباشرة للاستفسار عن التفاصيل والتوفر.
            </p>
          </div>

          {/* Quick links */}
          <nav aria-label="روابط سريعة">
            <h3 className="mb-4 text-sm font-extrabold text-white tracking-wide">روابط سريعة</h3>
            <ul className="space-y-2.5 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-ink-400 hover:text-white transition-colors font-medium">{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Categories */}
          <div>
            <h3 className="mb-4 text-sm font-extrabold text-white tracking-wide">الأقسام</h3>
            <ul className="space-y-2.5 text-sm">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <a href="#products" className="text-ink-400 hover:text-white transition-colors font-medium">{cat.name}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-sm font-extrabold text-white tracking-wide">تواصل معنا</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href={siteConfig.phoneHref} className="flex items-center gap-2.5 text-ink-400 hover:text-white transition-colors group">
                  <span className="flex size-7 items-center justify-center rounded-lg bg-brand-800 text-brand-200 group-hover:text-white transition-colors"><Phone className="size-3.5" /></span>
                  <span className="num font-medium">{siteConfig.phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-2.5 text-ink-400 hover:text-white transition-colors group">
                  <span className="flex size-7 items-center justify-center rounded-lg bg-brand-800 text-brand-200 group-hover:text-white transition-colors"><Mail className="size-3.5" /></span>
                  <span className="num">{siteConfig.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-ink-400">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-brand-800 text-brand-200"><MapPin className="size-3.5" /></span>
                <span>{siteConfig.address}</span>
              </li>
              <li className="flex items-center gap-2.5 text-ink-400">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-brand-800 text-brand-200"><Clock className="size-3.5" /></span>
                <span>{siteConfig.workingHours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-ink-400">
          <p>© <span className="num">{year}</span> {siteConfig.legalName}. جميع الحقوق محفوظة.</p>
          <p className="text-center">بيانات المنتجات الحالية أولية، وسيتم تحديث الاسم والوصف والسعر عند اعتمادها.</p>
        </div>
      </div>
    </footer>
  );
}
