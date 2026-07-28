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

const RAW_PHONE = "01555570269";
const WHATSAPP_NUMBER = "201555570269";
const SITE_URL = "https://omrantoys.store";

export const siteConfig = {
  /** الاسم المختصر المعروض في الواجهة */
  name: "شركة عمران التجارية",
  /** الاسم القانوني الكامل (يُستخدم في البيانات المنظمة) */
  legalName: "شركة عمران التجارية للألعاب والهدايا",
  tagline: "أسعار جملة برة المنافسة",
  /** وصف الموقع لمحركات البحث ومواقع التواصل */
  description:
    "شركة عمران التجارية — أكبر تشكيل لعب أطفال وبالونات وهدايا في طنطا، بأسعار جملة برة المنافسة وبيع قطاعي للأفراد، مع توريد لجميع المحافظات.",
  url: SITE_URL,
  logoUrl: "/logo.svg",

  /** العملة المستخدمة في كل الأسعار */
  currency: "EGP",
  currencySymbol: "ج.م",

  /* ----------------------------- بيانات التواصل ----------------------------- */
  contact: {
    phone: RAW_PHONE,
    whatsapp: WHATSAPP_NUMBER,
    email: "",
  },
  /** رقم الهاتف كما يُعرض للمستخدم */
  phoneDisplay: RAW_PHONE,
  /** رابط الاتصال المباشر */
  phoneHref: `tel:+${WHATSAPP_NUMBER}`,
  /** رقم الواتساب بالصيغة الدولية بدون علامة + */
  whatsappNumber: WHATSAPP_NUMBER,
  email: "",
  address: "طنطا — محافظة الغربية، جمهورية مصر العربية",
  workingHours: "يومياً من 9 صباحاً حتى 11 مساءً",

  footerDescription:
    "كل اللي تحتاجه لأطفالك في مكان واحد — أكبر تشكيل لعب أطفال وبالونات ومستلزمات حفلات وهدايا، بأسعار جملة برة المنافسة وبيع قطاعي للأفراد.",

  /* --------------------------------- الفروع -------------------------------- */
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
  ] as Branch[],

  /* ------------------------------ إعدادات التشغيل ----------------------------- */
  operations: {
    maintenanceMode: false,
    announcementEnabled: true,
    announcementText: "شحن مجاني للطلبات فوق 1000 جنيه · أسعار جملة برة المنافسة",
    wholesaleNotice:
      "أسعار الجملة مخصصة للكميات التجارية بدءاً من دستة كاملة (12 قطعة) من نفس الصنف، مع إتاحة الشراء الفردي بأسعار القطاعي المعلنة.",
    /** أقل عدد قطع للحصول على سعر الجملة (دستة) */
    wholesaleMinUnits: 12,
    /** حد الشحن المجاني بالجنيه */
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
} as const;

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
