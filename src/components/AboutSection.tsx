import { BadgeCheck, Boxes, Handshake, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/lib/site";

const pillars = [
  {
    icon: Boxes,
    title: "مخزون ثابت",
    body: "نحتفظ بمخزون دائم من الأصناف سريعة الدوران لتقليل فترات الانتظار على المحلات.",
  },
  {
    icon: ShieldCheck,
    title: "فحص قبل الشحن",
    body: "تُفحص الكراتين قبل الشحن للتأكد من سلامة التغليف ومطابقة الكميات لأمر التوريد.",
  },
  {
    icon: BadgeCheck,
    title: "بيانات منتج واضحة",
    body: "كل صنف موضح بخاماته وفئته العمرية وعدد قطع الكرتونة ووزنها وأبعادها.",
  },
  {
    icon: Handshake,
    title: "تعامل مستمر",
    body: "نعمل مع عملاء التوريد الدوري وفق جدول متفق عليه للكميات ومواعيد التسليم.",
  },
];

/** نبذة عن الشركة */
export function AboutSection() {
  return (
    <section id="about" className="scroll-mt-28 bg-ink-50 py-14 sm:py-20">
      <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div>
          <p className="mb-1.5 text-sm font-bold text-brand-700">عن الشركة</p>
          <h2 className="text-2xl font-extrabold text-ink-900 sm:text-3xl">
            {siteConfig.legalName}
          </h2>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-ink-600">
            <p>
              تعمل شركة عمران التجارية في توريد وتوزيع ألعاب الأطفال والبالونات
              ومستلزمات الهدايا والمناسبات. نتعامل مع محلات التجزئة ومنافذ التوزيع
              في مختلف المحافظات، ونخدم كذلك الأفراد بأسعار القطاعي على نفس الأصناف
              المعروضة في الكتالوج.
            </p>
            <p>
              يعتمد أسلوب عملنا على وضوح البيانات: سعر معلن لكل قطعة في وضعي القطاعي
              والجملة، وعدد محدد للقطع داخل الكرتونة، وحد أدنى معروف لكل صنف. هذا
              الوضوح يساعد التاجر على حساب تكلفته وهامشه قبل إرسال الطلب.
            </p>
            <p>
              الأصناف تشمل منتجات مستوردة وأخرى محلية الصنع، ويُذكر المنشأ مع كل صنف
              في صفحة العرض السريع.
            </p>
          </div>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2">
          {pillars.map((pillar) => (
            <li key={pillar.title} className="card-surface flex flex-col gap-3 p-5">
              <span className="flex size-11 items-center justify-center rounded-xl bg-accent-50">
                <pillar.icon
                  className="size-5 text-accent-600"
                  aria-hidden="true"
                />
              </span>
              <h3 className="text-sm font-bold text-ink-900">{pillar.title}</h3>
              <p className="text-sm leading-relaxed text-ink-600">{pillar.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
