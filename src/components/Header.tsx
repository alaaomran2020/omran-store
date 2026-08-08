"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, Phone, ShoppingCart, X } from "lucide-react";
import { useStore } from "@/context/StoreProvider";
import { PricingToggle } from "@/components/PricingToggle";
import { formatNumber } from "@/lib/format";
import { navLinks, siteConfig } from "@/lib/site";

/** الهيدر الثابت: الشعار، التنقل، مفتاح التسعير، وزر السلة */
export function Header() {
  const { totals, openCart, hydrated } = useStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  const itemCount = hydrated ? totals.itemCount : 0;

  return (
    <header
      className={`sticky top-0 z-40 w-full border-b bg-white/95 backdrop-blur transition-shadow ${
        scrolled ? "border-ink-200 shadow-sm" : "border-transparent"
      }`}
    >
      {/* شريط علوي بمعلومات التواصل */}
      <div className="hidden bg-brand-900 text-brand-100 lg:block">
        <div className="container-page flex h-9 items-center justify-between text-xs">
          <p>{siteConfig.tagline}</p>
          <div className="flex items-center gap-5">
            <span>{siteConfig.workingHours}</span>
            <a
              href={siteConfig.phoneHref}
              className="flex items-center gap-1.5 font-semibold text-white hover:text-accent-300"
            >
              <Phone className="size-3.5" aria-hidden="true" />
              <span className="num">{siteConfig.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </div>

      <div className="container-page flex h-16 items-center justify-between gap-3 lg:h-20">
        {/* الشعار */}
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <Image
            src="/logo.svg"
            alt=""
            width={44}
            height={44}
            className="size-10 rounded-xl lg:size-11"
            priority
          />
          <span className="flex flex-col leading-tight">
            <span className="text-base font-extrabold text-brand-900 lg:text-lg">
              {siteConfig.name}
            </span>
            <span className="hidden text-[11px] font-medium text-ink-500 sm:block">
              ألعاب أطفال · بالونات · هدايا
            </span>
          </span>
        </Link>

        {/* روابط التنقل */}
        <nav aria-label="التنقل الرئيسي" className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="rounded-lg px-3 py-2 text-sm font-semibold text-ink-700 transition-colors hover:bg-ink-100 hover:text-brand-800"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <PricingToggle className="hidden md:inline-flex" />

          <button
            type="button"
            onClick={openCart}
            aria-label={`فتح سلة الطلب، ${itemCount} صنف`}
            className="relative flex items-center gap-2 rounded-full bg-brand-700 px-3.5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand-800"
          >
            <ShoppingCart className="size-4.5" aria-hidden="true" />
            <span className="hidden sm:inline">سلة الطلب</span>
            {itemCount > 0 && (
              <span className="num absolute -top-1.5 -start-1.5 flex size-5.5 items-center justify-center rounded-full bg-accent-500 text-[11px] font-extrabold text-white ring-2 ring-white">
                {formatNumber(itemCount)}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((value) => !value)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label="قائمة التنقل"
            className="rounded-lg border border-ink-200 p-2.5 text-ink-700 transition-colors hover:bg-ink-100 xl:hidden"
          >
            {mobileOpen ? (
              <X className="size-5" aria-hidden="true" />
            ) : (
              <Menu className="size-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* قائمة الجوال */}
      {mobileOpen && (
        <div
          id="mobile-nav"
          className="animate-fade-in border-t border-ink-200 bg-white xl:hidden"
        >
          <div className="container-page space-y-3 py-4">
            <nav aria-label="تنقل الجوال">
              <ul className="grid gap-1">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-ink-700 transition-colors hover:bg-ink-100"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="md:hidden">
              <p className="mb-2 text-xs font-semibold text-ink-500">
                وضع عرض الأسعار
              </p>
              <PricingToggle size="sm" className="w-full justify-between" />
            </div>
            <a
              href={siteConfig.phoneHref}
              className="flex items-center justify-center gap-2 rounded-lg bg-ink-100 px-3 py-2.5 text-sm font-bold text-ink-800"
            >
              <Phone className="size-4" aria-hidden="true" />
              <span className="num">{siteConfig.phoneDisplay}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
