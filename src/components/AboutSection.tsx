import { BadgeCheck, Boxes, Handshake, ShieldCheck, Camera, MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/site";

const pillars = [
  {
    icon: Camera,
    title: "كتالوج مصوّر حقيقي",
    body: "صور فعلية من منتجاتنا المعروضة، مع وصف واضح وفئة محددة لتسهيل التصفح والاختيار قبل الاستفسار.",
  },
  {
    icon: ShieldCheck,
    title: "بيانات منظمة وواضحة",
    body: "كل منتج يحمل كود، فئة، وصف مختصر وتفصيلي، ومواصفات أولية — والأسعار تُحدد عبر واتساب بشفافية.",
  },
  {
    icon: MessageCircle,
    title: "استفسار مباشر عبر واتساب",
    body: "اضغط على زر الاستفسار في أي بطاقة منتج، تفتح رسالة واتساب جاهزة باسم المنتج وكوده لتسريع الرد.",
  },
  {
    icon: Handshake,
    title: "خدمة تجار وأفراد",
    body: "نخدم محلات التجزئة والعائلات — تصفح الكتالوج كزائر، وتواصل معنا لمعرفة التوفر والأسعار وخيارات التوصيل.",
  },
];

/** نبذة عن الشركة — نسخة كتالوج */
export function AboutSection() {
  return (
    <section id="about" className="scroll-mt-28 bg-ink-50 py-14 sm:py-20">
      <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div>
          <p className="mb-1.5 text-sm font-bold text-brand-700">عن الكتالوج</p>
          <h2 className="text-2xl font-extrabold text-ink-900 sm:text-3xl">
            {siteConfig.name} — كتالوج
          </h2>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-ink-600">
            <p>
              {siteConfig.legalName} تقدم كتالوجاً مصوراً لألعاب الأطفال والهدايا والعرائس والألعاب التعليمية،
              بهدف تسهيل تصفح المنتجات والتعرف على التشكيلة المتاحة قبل التواصل.
            </p>
            <p>
              لا يوجد شراء مباشر أو سلة في هذه النسخة — كل منتج يعرض زر <strong>استفسر عبر واتساب</strong> يفتح محادثة جاهزة
              باسم المنتج وكوده، ليرد فريق المبيعات بالسعر والتوفر وخيارات التوصيل خلال مواعيد العمل.
            </p>
            <p>
              الصور المعروضة حقيقية من تشكيلتنا (12 منتجاً حالياً)، والبيانات قابلة للتحديث المستمر. للانتقال السريع استخدم
              البحث، تصفية الأقسام، أو عرض التفاصيل لكل منتج.
            </p>
          </div>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2">
          {pillars.map((pillar) => (
            <li key={pillar.title} className="card-surface flex flex-col gap-3 p-5">
              <span className="flex size-11 items-center justify-center rounded-xl bg-brand-50">
                <pillar.icon className="size-5 text-brand-700" aria-hidden="true" />
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
