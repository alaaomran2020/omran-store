"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
import { Menu, X, Search, Sparkles, ChevronDown, Clock } from "lucide-react";
import { navLinks, siteConfig } from "@/lib/site";
import { categories } from "@/lib/categories";
import { catalogProducts } from "@/lib/products";
import { useStore } from "@/context/StoreProvider";
import { trackCatalogEvent, trackWhatsAppClick } from "@/lib/analytics";

/** الهيدر — كتالوج مع زر واتساب عائم */
export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const { setCategoryFilter, browseCategory } = useStore();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return { cats: [], prods: [] };
    const q = searchQuery.toLowerCase();
    const matchedCategories = categories.filter(
      (c) => c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q)
    );
    const matchedProducts = catalogProducts.filter(
      (p) => p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q) || p.shortDescription.toLowerCase().includes(q)
    );
    return { cats: matchedCategories.slice(0, 3), prods: matchedProducts.slice(0, 5) };
  }, [searchQuery]);

  return (
    <>
      {/* Top announcement bar */}
      <div className="relative z-50 bg-gradient-to-r from-brand-950 via-brand-900 to-brand-800 text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute -top-10 -start-10 size-40 rounded-full bg-brand-400 blur-3xl" aria-hidden="true" />
          <div className="absolute -bottom-10 -end-10 size-40 rounded-full bg-accent-400 blur-3xl" aria-hidden="true" />
        </div>
        <div className="container-page relative flex h-9 items-center justify-between text-[11px] sm:text-xs">
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-brand-100">
              <Sparkles className="size-3.5" aria-hidden="true" />
              كتالوج — 12 منتج بصور حقيقية
            </span>
            <span className="hidden md:inline-flex items-center gap-1.5 text-brand-100">
              <Sparkles className="size-3.5" aria-hidden="true" />
              بدون سلة — استفسار عبر واتساب فقط
            </span>
            <span className="hidden lg:inline-flex items-center gap-1.5 text-brand-100">
              <Sparkles className="size-3.5" aria-hidden="true" />
              صور حقيقية من تشكيلتنا
            </span>
          </div>
          <div className="flex items-center gap-3 sm:gap-5">
            <span className="flex items-center gap-1.5 text-brand-100">
              <Clock className="size-3.5" aria-hidden="true" />
              <span className="hidden sm:inline">{siteConfig.workingHours}</span>
            </span>
            <a href={siteConfig.phoneHref} className="font-bold text-white hover:text-accent-300 transition-colors">
              <span className="num">{siteConfig.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main sticky header */}
      <header
        className={`sticky top-0 z-40 w-full border-b backdrop-blur-xl transition-all duration-300 ${
          scrolled ? "bg-white/90 border-ink-200/60 shadow-[0_4px_30px_rgba(15,23,42,0.06)]" : "bg-white/70 border-transparent"
        }`}
      >
        <div className="container-page flex h-[72px] items-center justify-between gap-3 lg:h-[84px]">
          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center gap-3 group">
            <div className="relative flex items-center justify-center size-11 lg:size-12 rounded-2xl bg-gradient-to-br from-brand-700 to-brand-900 text-white shadow-lg shadow-brand-900/20 group-hover:shadow-brand-900/30 transition-shadow">
              <Image src="/logo.svg" alt="" width={36} height={36} className="size-8 lg:size-9 drop-shadow-sm" priority />
              <span className="absolute -top-1 -end-1 size-3.5 rounded-full bg-emerald-500 ring-2 ring-white" aria-label="كتالوج نشط" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-[17px] lg:text-xl font-extrabold text-brand-950 tracking-tight">عمران للألعاب</span>
              <span className="text-[10px] lg:text-[11px] font-medium text-ink-500 mt-0.5">كتالوج • واتساب فقط</span>
            </div>
          </Link>

          {/* Navigation */}
          <nav aria-label="التنقل الرئيسي" className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-2 text-sm font-bold text-ink-700 hover:text-brand-800 hover:bg-brand-50 transition-all"
              >
                {link.label}
              </a>
            ))}
            <div className="relative">
              <button
                type="button"
                onMouseEnter={() => setCategoriesOpen(true)}
                onMouseLeave={() => setCategoriesOpen(false)}
                onClick={() => setCategoriesOpen((v) => !v)}
                className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-bold text-ink-700 hover:text-brand-800 hover:bg-brand-50 transition-all"
              >
                الأقسام
                <ChevronDown className={`size-3.5 transition-transform duration-200 ${categoriesOpen ? "rotate-180" : ""}`} aria-hidden="true" />
              </button>
              <div
                className={`absolute top-full start-0 mt-2 w-80 rounded-2xl bg-white border border-ink-200 shadow-2xl shadow-brand-900/5 overflow-hidden transition-all duration-200 origin-top ${
                  categoriesOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
                }`}
                onMouseEnter={() => setCategoriesOpen(true)}
                onMouseLeave={() => setCategoriesOpen(false)}
              >
                <div className="p-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => {
                        browseCategory(cat.id);
                        setCategoriesOpen(false);
                      }}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-3 hover:bg-brand-50 transition-colors group text-start"
                    >
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-100 to-brand-200 text-brand-700 group-hover:from-brand-200 group-hover:to-brand-300 transition-colors">
                        <Sparkles className="size-4" aria-hidden="true" />
                      </span>
                      <div>
                        <p className="text-sm font-bold text-ink-900">{cat.name}</p>
                        <p className="text-[11px] text-ink-500 line-clamp-1">{cat.description}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          {/* Search + Actions */}
          <div className="flex items-center gap-2 lg:gap-3">
            {/* Search */}
            <div className="relative">
              <div
                className={`flex items-center transition-all duration-300 overflow-hidden rounded-full border border-ink-200 bg-white shadow-sm ${searchOpen ? "w-48 sm:w-80 lg:w-96 px-3" : "w-10 px-0"}`}
              >
                <button
                  type="button"
                  onClick={() => setSearchOpen((v) => !v)}
                  aria-label="بحث"
                  className="shrink-0 flex items-center justify-center size-9 text-ink-500 hover:text-brand-700 transition-colors"
                >
                  <Search className="size-[18px]" aria-hidden="true" />
                </button>
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ابحث بالاسم أو الكود..."
                  className={`w-full bg-transparent text-sm outline-none placeholder:text-ink-400 text-ink-800 ${searchOpen ? "opacity-100 px-2" : "opacity-0 px-0 w-0"} transition-opacity`}
                  aria-label="بحث في المنتجات"
                />
              </div>
              {searchOpen && searchQuery.trim() && (
                <div className="absolute top-full end-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl border border-ink-200 shadow-2xl shadow-brand-900/5 overflow-hidden z-50">
                  <div className="p-3 max-h-[70vh] overflow-y-auto thin-scroll">
                    {searchResults.prods.length > 0 && (
                      <>
                        <p className="text-[10px] font-bold text-ink-400 uppercase tracking-wider mb-2 px-1">منتجات</p>
                        {searchResults.prods.map((prod) => (
                          <a
                            key={prod.id}
                            href={`/products/${prod.slug}`}
                            onClick={() =>
                              trackCatalogEvent("catalog_search", {
                                queryLength: searchQuery.trim().length,
                                result: "product",
                                sku: prod.sku,
                              })
                            }
                            className="flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-brand-50 transition-colors"
                          >
                            <span className="size-10 rounded-lg bg-ink-50 border border-ink-100 overflow-hidden relative shrink-0">
                              <Image src={prod.images[0]?.src ?? "/logo.svg"} alt="" fill className="object-contain p-1" />
                            </span>
                            <span className="min-w-0">
                              <span className="block text-sm font-bold text-ink-900 truncate">{prod.name}</span>
                              <span className="block text-[11px] text-ink-500 num">{prod.sku}</span>
                            </span>
                          </a>
                        ))}
                      </>
                    )}
                    {searchResults.cats.length > 0 && (
                      <>
                        <p className="text-[10px] font-bold text-ink-400 uppercase tracking-wider mb-2 mt-3 px-1">أقسام</p>
                        {searchResults.cats.map((cat) => (
                          <button
                            key={cat.id}
                            type="button"
                            onClick={() => {
                              browseCategory(cat.id);
                              trackCatalogEvent("catalog_filter", { filter: "header_category", value: cat.id });
                              setSearchOpen(false);
                              setSearchQuery("");
                            }}
                            className="w-full text-start block rounded-lg px-3 py-2.5 hover:bg-brand-50 text-sm font-semibold text-ink-800 transition-colors"
                          >
                            {cat.name}
                          </button>
                        ))}
                      </>
                    )}
                    {searchResults.cats.length === 0 && searchResults.prods.length === 0 && (
                      <p className="text-sm text-ink-500 py-3 px-2">لا توجد نتائج مطابقة</p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-expanded={mobileOpen}
              aria-label="القائمة"
              className="xl:hidden flex items-center justify-center size-10 rounded-xl bg-ink-50 text-ink-800 hover:bg-ink-100 transition-colors"
            >
              {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="xl:hidden animate-fade-in border-t border-ink-200 bg-white/95 backdrop-blur-xl">
            <div className="container-page py-4 space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-xl px-4 py-3 text-sm font-bold text-ink-800 hover:bg-brand-50 hover:text-brand-800 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-2 border-t border-ink-100">
                <p className="px-4 py-2 text-xs font-bold text-ink-400">الأقسام</p>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      browseCategory(cat.id);
                      setMobileOpen(false);
                    }}
                    className="block w-full text-start rounded-xl px-4 py-3 text-sm font-bold text-ink-700 hover:bg-brand-50 hover:text-brand-800 transition-colors"
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Floating WhatsApp Button */}
      <a
        href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent("السلام عليكم، أرغب في الاستفسار عن منتجاتكم من موقع عمران للألعاب - كتالوج شركة عمران التجارية.")}`}
        onClick={() => trackWhatsAppClick(null, "floating_button", { mode: "general", cta: "floating_header" })}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="تواصل عبر واتساب"
        className="fixed bottom-6 start-6 z-50 flex items-center gap-2.5 rounded-full bg-[#25D366] px-5 py-3.5 text-sm font-extrabold text-white shadow-2xl shadow-[#25D366]/30 hover:bg-[#22c05e] hover:scale-105 transition-all hover:-translate-y-1"
      >
        <svg className="size-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        <span>واتساب</span>
      </a>
    </>
  );
}
