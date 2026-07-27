export const RAW_WHATSAPP = "201555570269";
export const DISPLAY_PHONE = "01555570269";

// قائمة روابط التنقل المطلوبة لمكون الهيدر
export const navLinks = [
  { name: "المنتجات", href: "/#products" },
  { name: "الأقسام", href: "/#categories" },
  { name: "خدمة الجملة", href: "/#wholesale" },
  { name: "عن الشركة", href: "/#about" },
  { name: "التواصل", href: "/#contact" },
];

export const siteConfig = {
  name: "شركة عمران التجارية",
  shortName: "عمران للألعاب والهدايا",
  legalName: "شركة عمران التجارية لألعاب الأطفال والبالونات والهدايا",
  tagline: "توزيع ألعاب الأطفال والبالونات والهدايا — جملة وقطاعي",
  description:
    "نوفر للمحلات ومنافذ التوزيع تشكيلة ثابتة من ألعاب الأطفال والعرائس والألعاب التعليمية ومستلزمات المناسبات، بأسعار جملة محدودة وكميات تعبئة واضحة.",
  url: "https://www.omrantoys.store",
  ogImage: "https://www.omrantoys.store/og.jpg",
  
  // بيانات التواصل الرسمية
  phone: DISPLAY_PHONE,
  phoneRaw: RAW_WHATSAPP,
  phoneHref: `tel:+${RAW_WHATSAPP}`,
  whatsappUrl: `https://wa.me/${RAW_WHATSAPP}`,
  email: "sales@omran-trading.com",
  
  // العنوان الرئيسي
  address: `طنطا — ميدان السيد البدوي — شارع درب الابشيهي / الاستاد أمام نادي سيتي كلوب`,
  city: "طنطا",
  governorate: "محافظة الغربية",
  country: "مصر",

  // روابط الهيدر
  navLinks,

  // فروع شركة عمران في طنطا
  branches: [
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
  ],

  links: {
    whatsapp: `https://wa.me/${RAW_WHATSAPP}`,
  },
};

export type SiteConfig = typeof siteConfig;