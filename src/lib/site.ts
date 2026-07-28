export const RAW_WHATSAPP = "201555570269";
export const DISPLAY_PHONE = "01555570269";
export const OFFICIAL_EMAIL = "sales@omran-trading.com";

export interface NavLink {
  name: string;
  label: string;
  href: string;
}

export interface Branch {
  id: string;
  name: string;
  address: string;
  phone: string;
  whatsapp: string;
  services: string;
  mapUrl: string;
}

export interface SiteConfig {
  name: string;
  shortName: string;
  legalName: string;
  tagline: string;
  description: string;
  url: string;
  ogImage: string;
  phone: string;
  phoneDisplay: string;
  phoneRaw: string;
  phoneHref: string;
  whatsappUrl: string;
  whatsappNumber: string;
  email: string;
  address: string;
  city: string;
  governorate: string;
  country: string;
  workingHours: string;
  currency: string;
  currencySymbol: string;
  navLinks: NavLink[];
  branches: Branch[];
  links: {
    whatsapp: string;
  };
}

export const navLinks: NavLink[] = [
  { name: "المنتجات", label: "المنتجات", href: "/#products" },
  { name: "الأقسام", label: "الأقسام", href: "/#categories" },
  { name: "خدمة الجملة", label: "خدمة الجملة", href: "/#wholesale" },
  { name: "عن الشركة", label: "عن الشركة", href: "/#about" },
  { name: "التواصل", label: "التواصل", href: "/#contact" },
];

export const branches: Branch[] = [
  {
    id: "badawi-branch",
    name: "فرع السيد البدوي",
    address: "طنطا — ميدان السيد البدوي — شارع درب الابشيهي",
    phone: DISPLAY_PHONE,
    whatsapp: RAW_WHATSAPP,
    services: "معرض الجملة والقطاعي وتجهيز الطلبات",
    mapUrl: "https://maps.google.com/?q=Tanta",
  },
  {
    id: "stadium-branch",
    name: "فرع الاستاد",
    address: "طنطا — منطقة الاستاد — أمام نادي سيتي كلوب ومطعم سي السيد",
    phone: DISPLAY_PHONE,
    whatsapp: RAW_WHATSAPP,
    services: "معرض المبيعات المباشرة والتوزيع",
    mapUrl: "https://maps.google.com/?q=Tanta",
  },
];

export const siteConfig: SiteConfig = {
  name: "شركة عمران التجارية",
  shortName: "عمران للألعاب والهدايا",
  legalName: "شركة عمران التجارية لألعاب الأطفال والبالونات والهدايا",
  tagline: "توريد ألعاب أطفال وبالونات ومستلزمات حفلات وهدايا — جملة وقطاعي",
  description:
    "شركة عمران التجارية لتوريد وتوزيع ألعاب الأطفال بالجملة في طنطا وجميع المحافظات: سيارات وعرائس وألعاب تعليمية وبالونات لاتكس وفويل ومستلزمات الحفلات والهدايا. أسعار جملة معلنة وحد أدنى واضح لكل صنف، مع بيع قطاعي للأفراد وشحن لكل مصر.",
  url: "https://omrantoys.store",
  ogImage: "https://omrantoys.store/og.jpg",
  
  phone: DISPLAY_PHONE,
  phoneDisplay: DISPLAY_PHONE,
  phoneRaw: RAW_WHATSAPP,
  phoneHref: `tel:+${RAW_WHATSAPP}`,
  whatsappUrl: `https://wa.me/${RAW_WHATSAPP}`,
  whatsappNumber: RAW_WHATSAPP,
  email: OFFICIAL_EMAIL,
  
  address: "طنطا — ميدان السيد البدوي — شارع درب الابشيهي / الاستاد أمام نادي سيتي كلوب",
  city: "طنطا",
  governorate: "محافظة الغربية",
  country: "مصر",
  workingHours: "السبت إلى الخميس، من 9 صباحاً حتى 6 مساءً",
  currency: "EGP",
  currencySymbol: "ج.م",

  navLinks,
  branches,

  links: {
    whatsapp: `https://wa.me/${RAW_WHATSAPP}`,
  },
};