/**
 * إعدادات الموقع المركزية — شركة عمران التجارية.
 *
 * كل النصوص وبيانات التواصل والفروع تُقرأ من هنا فقط، فلا تتكرر داخل المكونات.
 * أي تعديل على الأرقام أو الفروع أو نصوص التنبيهات يتم في هذا الملف وحده.
 */

/** فرع من فروع الشركة */
export interface Branch {
  id: string;
  name: string;
  address: string;
  mapUrl: string;
  active: boolean;
}

/** رابط داخل شريط التنقل */
export interface NavLink {
  href: string;
  label: string;
}

/** بيانات التواصل الخام */
export interface ContactInfo {
  phone: string;
  whatsapp: string;
  email: string;
}

/** إعدادات التشغيل والتنبيهات وسياسة الجملة */
export interface OperationsConfig {
  maintenanceMode: boolean;
  announcementEnabled: boolean;
  announcementText: string;
  wholesaleNotice: string;
  /** أقل عدد قطع للحصول على سعر الجملة (دستة) */
  wholesaleMinUnits: number;
  /** حد الشحن المجاني بالجنيه */
  freeShippingThreshold: number;
}

export interface SocialLinks {
  facebook: string;
  instagram: string;
  telegram: string;
}

export interface SeoConfig {
  metaTitle: string;
  metaDescription: string;
}

/** العقد الكامل لإعدادات الموقع */
export interface SiteConfig {
  /** الاسم المختصر المعروض في الواجهة */
  name: string;
  /** الاسم القانوني (يُستخدم في البيانات المنظمة وحقوق النشر) */
  legalName: string;
  /** الشعار التسويقي الأساسي */
  tagline: string;
  /** الشعار السعري المميز للشركة */
  wholesaleSlogan: string;
  /** وصف الموقع لمحركات البحث ومواقع التواصل */
  description: string;
  url: string;
  logoUrl: string;

  /** العملة المستخدمة في كل الأسعار */
  currency: string;
  currencySymbol: string;

  contact: ContactInfo;
  /** رقم الهاتف كما يُعرض للمستخدم */
  phoneDisplay: string;
  /** رابط الاتصال المباشر */
  phoneHref: string;
  /** رقم الواتساب بالصيغة الدولية بدون علامة + */
  whatsappNumber: string;
  email: string;
  address: string;
  workingHours: string;
  footerDescription: string;

  branches: Branch[];
  operations: OperationsConfig;
  social: SocialLinks;
  seo: SeoConfig;
}

const RAW_PHONE = "01555570269";
const WHATSAPP_NUMBER = "201555570269";

export const siteConfig: SiteConfig = {
  name: "شركة عمران التجارية",
  legalName: "شركة عمران التجارية",
  tagline: "أكبر تشكيل لعب أطفال",
  wholesaleSlogan: "أسعار جملة برة المنافسة",
  description:
    "أكبر تشكيل لعب أطفال وهدايا بأعلى جودة وأفضل أسعار جملة وقطاعي في مصر.",
  url: "https://omrantoys.store",
  logoUrl: "/logo.svg",

  currency: "EGP",
  currencySymbol: "ج.م",

  contact: {
    phone: RAW_PHONE,
    whatsapp: WHATSAPP_NUMBER,
    email: "",
  },
  phoneDisplay: RAW_PHONE,
  phoneHref: `tel:+${WHATSAPP_NUMBER}`,
  whatsappNumber: WHATSAPP_NUMBER,
  email: "",
  address: "طنطا — محافظة الغربية، جمهورية مصر العربية",
  workingHours: "يومياً من 9 صباحاً حتى 11 مساءً",

  footerDescription:
    "كل اللي تحتاجه لأطفالك في مكان واحد — أكبر تشكيل لعب أطفال وبالونات ومستلزمات حفلات وهدايا، بأسعار جملة برة المنافسة وبيع قطاعي للأفراد.",

  branches: [
    {
      id: "c976c79a",
      name: "فرع ميدان السيد البدوي",
      address: "طنطا — ميدان السيد البدوي",
      mapUrl: "https://maps.google.com/?q=30.8109845,30.9942558",
      active: true,
    },
    {
      id: "cef83e67",
      name: "فرع الاستاد",
      address: "طنطا — الاستاد، أمام نادي سيتي كلوب ومطعم سي السيد",
      mapUrl: "https://maps.google.com/?q=30.8120613,30.9939374",
      active: true,
    },
  ],

  operations: {
    maintenanceMode: false,
    announcementEnabled: true,
    announcementText: "شحن مجاني للطلبات فوق 1000 جنيه · أسعار جملة برة المنافسة",
    wholesaleNotice:
      "أسعار الجملة مخصصة للكميات التجارية بدءاً من دستة كاملة (12 قطعة) من نفس الصنف، مع إتاحة الشراء الفردي بأسعار القطاعي المعلنة.",
    wholesaleMinUnits: 12,
    freeShippingThreshold: 1000,
  },

  social: {
    facebook: "https://www.facebook.com/profile.php?id=61590544803396",
    instagram: "https://www.instagram.com/omrantoys.store",
    telegram: "",
  },

  seo: {
    metaTitle: "شركة عمران التجارية | لعب أطفال - هدايا - جملة وقطاعي",
    metaDescription:
      "ألعاب أطفال، بالونات، هدايا، ألعاب تعليمية — جملة وقطاعي في طنطا مع توريد لكل المحافظات.",
  },
};

/** الفروع العاملة فقط */
export const activeBranches: Branch[] = siteConfig.branches.filter(
  (branch) => branch.active,
);

/** روابط التنقل الأساسية — أربع صفحات فقط */
export const navLinks: NavLink[] = [
  { href: "/", label: "الرئيسية" },
  { href: "/products", label: "الكتالوج" },
  { href: "/checkout", label: "إتمام الطلب" },
];
