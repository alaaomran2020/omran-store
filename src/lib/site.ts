/**
 * بيانات الشركة والإعدادات العامة للموقع.
 * تُقرأ أرقام التواصل من متغيرات البيئة مع وجود قيم افتراضية آمنة.
 */

/** رقم واتساب بصيغة دولية بدون علامة (+) — مثال: 01555570269 */
const RAW_WHATSAPP =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") || "01555570269";

export interface SiteConfig {
  name: string;
  legalName: string;
  shortName: string;
  tagline: string;
  description: string;
  url: string;
  whatsappNumber: string;
  /** رقم الهاتف بصيغة العرض */
  phoneDisplay: string;
  /** رابط الاتصال المباشر */
  phoneHref: string;
  email: string;
  address: string;
  workingHours: string;
  currency: string;
  /** رمز العملة المعروض بجانب الأسعار */
  currencySymbol: string;
}

export const siteConfig: SiteConfig = {
  name: "شركة عمران التجارية",
  legalName: "شركة عمران التجارية للألعاب والهدايا",
  shortName: "عمران",
  tagline: "توزيع ألعاب الأطفال والبالونات والهدايا — جملة وقطاعي",
  description:
    "شركة عمران التجارية للتوريد والتوزيع: ألعاب أطفال، عرائس ومجسمات، ألعاب تعليمية، بالونات وهدايا. أسعار جملة للتجار وأسعار قطاعي للأفراد مع توريد منتظم لجميع المحافظات.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://omran-store.example.com",
  whatsappNumber: RAW_WHATSAPP,
  phoneDisplay: "01555570269  ",
  phoneHref: `tel:+${RAW_WHATSAPP}`,
  email: "sales@omran-trading.com",
  address: "لعب أطفال — هدايا
ميدان السيد البدوي
شارع درب الابشيهي
الاستاد امام نادي سيتي كلوب و مطعم سي السيد
,
  workingHours: "السبت إلى الخميس، من 9 صباحاً حتى 6 مساءً",
  currency: "EGP",
  currencySymbol: "ج.م",
};

/** روابط التنقل الرئيسية في الهيدر */
export const navLinks: { href: string; label: string }[] = [
  { href: "#products", label: "المنتجات" },
  { href: "#categories", label: "الأقسام" },
  { href: "#wholesale", label: "خدمة الجملة" },
  { href: "#about", label: "عن الشركة" },
  { href: "#contact", label: "التواصل" },
];
