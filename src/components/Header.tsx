"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, Phone, ShoppingCart, X } from "lucide-react";
import { useStore } from "@/context/StoreProvider";
import { formatNumber } from "@/lib/format";
import { navLinks, siteConfig } from "@/lib/site";

/**
 * الهيدر العادي: شريط تنبيهات السعر العلوي، الشعار، التنقل السريع،
 * وزر السلة الذي يقود مباشرة إلى صفحة إتمام الطلب.
 */
export function Header() {
  const { totals, hydrated } = useStore();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const itemCount = hydrated ? totals.itemCount : 0;
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-ink-200 bg-white/95 backdrop-blur">
      {/* شريط تنبيهات السعر */}
      {siteConfig.operations.announcementEnabled && (
        <div className="bg-brand-900 text-brand-100">
          <div className="container-page flex h-9 items-center justify-between gap-3 text-[11px] sm:text-xs">
            <p className="truncate font-semibold">
              {siteConfig.operations.announcementText}
            </p>
            <a
              href={siteConfig.phoneHref}
              className="flex shrink-0 items-center gap-1.5 font-bold text-white transition-colors hover:text-accent-300"
            >
              <Phone className="size-3.5" aria-hidden="true" />
              <span className="num">{siteConfig.phoneDisplay}</span>
            </a>
          </div>
        </div>
      )}

      <div className="container-page flex h-16 items-center justify-between gap-3">
        {/* الشعار */}
        <Link href="/" className="press flex min-w-0 shrink items-center gap-2.5">
          <Image
            src="/logo.svg"
            alt=""
            width={40}
            height={40}
            className="size-9 shrink-0 rounded-xl sm:size-10"
            priority
          />
          <span className="flex min-w-0 flex-col leading-tight">
            <span className="truncate text-sm font-extrabold text-brand-900 sm:text-base">
              {siteConfig.name}
            </span>
            <span className="hidden truncate text-[11px] font-medium text-ink-500 sm:block">
              {siteConfig.tagline}
            </span>
          </span>
        </Link>

        {/* التنقل السريع */}
        <nav aria-label="التنقل الرئيسي" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={`press block rounded-lg px-3 py-2 text-sm font-semibold ${
                    isActive(link.href)
                      ? "bg-brand-50 text-brand-800"
                      : "text-ink-700 hover:bg-ink-100 hover:text-brand-800"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <Link
            href="/checkout"
            aria-label={`سلة الطلب، ${itemCount} صنف`}
            className="press relative flex items-center gap-2 rounded-full bg-brand-700 px-3.5 py-2.5 text-sm font-bold text-white hover:bg-brand-800"
          >
            <ShoppingCart className="size-4" aria-hidden="true" />
            <span className="hidden sm:inline">السلة</span>
            {itemCount > 0 && (
              <span className="num absolute -top-1.5 -start-1.5 flex size-5 items-center justify-center rounded-full bg-accent-500 text-[11px] font-extrabold text-white ring-2 ring-white">
                {formatNumber(itemCount)}
              </span>
            )}
          </Link>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label="قائمة التنقل"
            className="press rounded-lg border border-ink-200 p-2.5 text-ink-700 hover:bg-ink-100 md:hidden"
          >
            {open ? (
              <X className="size-5" aria-hidden="true" />
            ) : (
              <Menu className="size-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* قائمة الجوال */}
      {open && (
        <nav
          id="mobile-nav"
          aria-label="تنقل الجوال"
          className="animate-fade-in border-t border-ink-200 bg-white md:hidden"
        >
          <ul className="container-page grid gap-1 py-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={`press block rounded-lg px-3 py-2.5 text-sm font-semibold ${
                    isActive(link.href)
                      ? "bg-brand-50 text-brand-800"
                      : "text-ink-700 hover:bg-ink-100"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
