export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  url: string;
  logoUrl: string;
  footerDescription: string;
  currency: string;
  currencySymbol: string;
  legalName: string;
  email: string;
  whatsappNumber: string;
  phoneHref: string;
  phoneDisplay: string;
  address: string;
  contact: {
    phone: string;
    whatsapp: string;
    email: string;
  };
  workingHours: string;
  branches: Array<{
    id: string;
    name: string;
    address: string;
    mapUrl: string;
    active: boolean;
  }>;
  operations: {
    maintenanceMode: boolean;
    announcementEnabled: boolean;
    announcementText: string;
    wholesaleNotice: string;
  };
  social: {
    facebook: string;
    instagram: string;
    telegram: string;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
  };
}

export const navLinks = [
  { name: "الرئيسية", href: "/", label: "الرئيسية" },
  { name: "المنتجات", href: "/products", label: "المنتجات" },
  { name: "عن الشركة", href: "/about", label: "عن الشركة" },
  { name: "تواصل معنا", href: "/contact", label: "تواصل معنا" },
];

export const siteConfig: SiteConfig = {
  name: "عمران للألعاب",
  tagline: "كتالوج ألعاب أطفال وهدايا",
  description: "كتالوج عمران للألعاب — تعرّف على ألعاب الأطفال والعرائس والهدايا والمنتجات المتاحة، وتواصل معنا عبر واتساب للاستفسار.",
  url: "https://omrantoys.store",
  logoUrl: "/logo.svg",
  footerDescription: "كتالوج ألعاب أطفال وهدايا وعرائس. تصفّح المنتجات وتواصل معنا مباشرة للاستفسار عن التفاصيل والتوفر.",
  contact: {
    phone: "01555570269",
    whatsapp: "201555570269",
    email: "hello@omrantoys.store"
  },
  workingHours: "يومياً من 9 صباحاً إلى 11 مساءً",
  branches: [
    {
      id: "c976c79a",
      name: "فرع ميدان السيد البدوي",
      address: "طنطا - ميدان السيد البدوي",
      mapUrl: "https://www.google.com/maps/dir/%D8%A7%D9%84%D8%A7%D8%B3%D9%80%D8%AA%D9%80%D9%80%D8%A7%D8%AF%D8%8C+%D8%B7%D9%86%D8%B7%D8%A7+(%D9%82%D8%B3%D9%85+2)%D8%8C+%D9%82%D8%B3%D9%85+%D8%AB%D8%A7%D9%86+%D8%B7%D9%86%D8%B7%D8%A7%D8%8C+%D9%82%D8%AD%D8%A7%D9%81%D8%B8%D8%A9+%D8%A7%D9%84%D8%BA%D8%B1%D8%A8%D9%8A%D8%A9%E2%80%AD/%D8%B4%D8%B1%D9%83%D8%A9+%D8%B9%D9%85%D8%B1%D8%A7%D9%8BD8%A7%D9%84%D8%AA%D8%AC%D8%A7%D8%B1%D9%8A%D8%A9%D8%8C+%D8%A7%D9%85%D8%A7%D9%85+%D9%86%D8%A7%D8%AF%D9%8A+%D8%B3%D9%8A%D8%AA%D9%8A+%D9%83%D9%84%D9%88%D8%A8+%D9%88+%D9%85%D8%B7%D8%B9%D9%85+%D8%B3%D9%8A+%D8%A7%D9%84%D8%B3%D9%8A%D8%AF%D8%8C+%D8%A7%D9%84%D8%A7%D8%B3%D9%80%D8%AA%D9%80%D9%80%D8%A7%D8%AF%D8%8C+%D8%B7%D9%86%D8%B7%D8%A7+(%D9%82%D8%B3%D9%85+2)%D8%8C+%D9%82%D8%B3%D9%85+%D8%AB%D8%A7%D9%86+%D8%B7%D9%86%D8%B7%D8%A7%D8%8C+%D9%82%D8%AD%D8%A7%D9%81%D8%B8%D8%A9+%D8%A7%D9%84%D8%BA%D8%B1%D8%A8%D9%8A%D8%A9+31511%E2%80%AD/@30.8119293,30.9939895,76m/data=!3m1!1e3!4m13!4m12!1m5!1m1!1s0x14f7c985cceb169b:0x20e938a2a98b7882!2m2!1d30.9942558!2d30.8109845!1m5!1m1!1s0x14f7c9763b305b7b:0xea81425db7047c2e!2m2!1d30.9939374!2d30.8120613?entry=ttu&g_ep=EgoyMDI2MDcyMi4wIKXMDSoASAFQAw%3D%3D",
      active: true
    },
    {
      id: "cef83e67",
      name: "فرع الاستاد",
      address: "الاستاد امام نادي سيتي كلوب و مطعم سي السيد",
      mapUrl: "https://www.google.com/maps/dir/%D8%A7%D9%84%D8%A7%D8%B3%D9%80%D8%AA%D9%80%D9%80%D8%A7%D8%AF%D8%8C+%D8%B7%D9%86%D8%B7%D8%A7+(%D9%82%D8%B3%D9%85+2)%D8%8C+%D9%82%D8%B3%D9%85+%D8%AB%D8%A7%D9%86+%D8%B7%D9%86%D8%B7%D8%A7%D8%8C+%D9%82%D8%AD%D8%A7%D9%81%D8%B8%D8%A9+%D8%A7%D9%84%D8%BA%D8%B1%D8%A8%D9%8A%D8%A9%E2%80%AD/%D8%B4%D8%B1%D9%83%D8%A9+%D8%B9%D9%85%D8%B1%D8%A7%D9%8BD8%A7%D9%84%D8%AA%D8%AC%D8%A7%D8%B1%D9%8A%D8%A9%D8%8C+%D8%A7%D9%85%D8%A7%D9%85+%D9%86%D8%A7%D8%AF%D9%8A+%D8%B3%D9%8A%D8%AA%D9%8A+%D9%83%D9%84%D9%88%D8%A8+%D9%88+%D9%85%D8%B7%D8%B9%D9%85+%D8%B3%D9%8A+%D8%A7%D9%84%D8%B3%D9%8A%D8%AF%D8%8C+%D8%A7%D9%84%D8%A7%D8%B3%D9%80%D8%AA%D9%80%D9%80%D8%A7%D8%AF%D8%8C+%D8%B7%D9%86%D8%B7%D8%A7+(%D9%82%D8%B3%D9%85+2)%D8%8C+%D9%82%D8%B3%D9%85+%D8%AB%D8%A7%D9%86+%D8%B7%D9%86%D8%B7%D8%A7%D8%8C+%D9%82%D8%AD%D8%A7%D9%81%D8%B8%D8%A9+%D8%A7%D9%84%D8%BA%D8%B1%D8%A8%D9%8A%D8%A9+31511%E2%80%AD/@30.8119293,30.9939895,76m/data=!3m1!1e3!4m13!4m12!1m5!1m1!1s0x14f7c985cceb169b:0x20e938a2a98b7882!2m2!1d30.9942558!2d30.8109845!1m5!1m1!1s0x14f7c9763b305b7b:0xea81425db7047c2e!2m2!1d30.9939374!2d30.8120613?entry=ttu&g_ep=EgoyMDI2MDcyMi4wIKXMDSoASAFQAw%3D%3D",
      active: true
    }
  ],
  operations: {
    maintenanceMode: false,
    announcementEnabled: true,
    announcementText: "كتالوج احترافي — استفسر عن أي منتج مباشرة عبر واتساب",
    wholesaleNotice: "كتالوج مصوّر احترافي — جميع المنتجات معروضة للاستفسار عبر واتساب، الأسعار والتوفر يُحددان عند التواصل."
  },
  social: {
    facebook: "https://www.facebook.com/profile.php?id=61590544803396",
    instagram: "https://www.instagram.com/omrantoys.store",
    telegram: ""
  },
  seo: {
    metaTitle: "عمران للألعاب | كتالوج ألعاب أطفال وهدايا",
    metaDescription: "كتالوج عمران للألعاب — ألعاب أطفال وعرائس وألعاب تعليمية وهدايا. تصفّح المنتجات وتواصل معنا عبر واتساب للاستفسار عن السعر والتوفر في طنطا ومصر."
  },
  currency: "EGP",
  currencySymbol: "ج.م",
  legalName: "عمران للألعاب — شركة عمران التجارية",
  email: "hello@omrantoys.store",
  whatsappNumber: "201555570269",
  phoneHref: "tel:+201555570269",
  phoneDisplay: "01555570269",
  address: "طنطا - ميدان السيد البدوي — فرع الاستاد",
};
/** القيم الافتراضية للصورة المشاركة عبر منصات التواصل (Open Graph). */
export const openGraphImage = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
};
