import { BadgeCheck, Boxes, Handshake, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/lib/site";

const pillars = [
  {
    icon: Boxes,
    title: "مخزون جاهز على مدار العام",
    body: "نحتفظ بمخزون دائم من الأصناف سريعة الدوران، فلا يتوقف رفّك عن البيع بانتظار وصول شحنة جديدة.",
  },
  {
    icon: ShieldCheck,
    title: "فحص وتغليف قبل الشحن",
    body: "تُفحص كل كرتونة قبل خروجها للتأكد من سلامة التغليف ومطابقة الكميات لأمر التوريد — تستلم ما طلبته بالضبط.",
  },
  {
    icon: BadgeCheck,
    title: "بيانات صريحة لكل صنف",
    body: "الخامة والفئة العمرية والمنشأ وعدد قطع الكرتونة ووزنها وأبعادها — كل ما تحتاجه لقرار شراء واثق معلن على صفحة المنتج.",
  },
  {
    icon: Handshake,
    title: "شراكة تدوم، لا صفقة واحدة",
    body: "نلتزم مع عملاء التوريد الدوري بجداول متفق عليها للكميات ومواعيد التسليم، ونخلّط الأصناف في الشحنة الواحدة حسب احتياج محلك.",
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
              {siteConfig.legalName} شركة مصرية متخصصة في توريد وتوزيع ألعاب
              الأطفال والبالونات ومستلزمات الحفلات والهدايا، تخدم محلات التجزئة
              ومنافذ التوزيع في مختلف المحافظات من مقرّها بطنطا، وتتيح للأفراد
              الشراء بأسعار القطاعي على نفس أصناف الكتالوج.
            </p>
            <p>
              بنينا أسلوب عملنا على قاعدة واحدة: التاجر الذي يعرف أرقامه يعود
              ليكرر الشراء. لذلك تجد لكل صنف سعراً معلناً في وضعي الجملة
              والقطاعي، وعدداً محدداً لقطع الكرتونة، وحدّاً أدنى واضحاً — تحسب
              تكلفتك وهامش ربحك قبل أن ترسل الطلب، لا بعده.
            </p>
            <p>
              تشكيلتنا تجمع منتجات مستوردة وأخرى محلية الصنع مُنتقاة لجودتها
              وسرعة دورانها، مع ذكر المنشأ بشفافية في صفحة كل منتج.
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
