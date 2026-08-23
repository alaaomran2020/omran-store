import { MessageCircle, Search, Eye, Package } from "lucide-react";
import { buildInquiryUrl } from "@/lib/whatsapp";

const steps = [
  {
    icon: Search,
    title: "١ — تصفح الكتالوج",
    body: "استخدم البحث أو تصفية الأقسام للوصول إلى المنتج المطلوب بسرعة — 12 منتجاً بصور حقيقية.",
  },
  {
    icon: Eye,
    title: "٢ — افتح التفاصيل",
    body: "اضغط على بطاقة المنتج لرؤية الصور الإضافية والوصف والمواصفات والكود.",
  },
  {
    icon: MessageCircle,
    title: "٣ — استفسر عبر واتساب",
    body: "اضغط زر واتساب في البطاقة أو صفحة التفاصيل، تفتح رسالة جاهزة باسم المنتج وكوده.",
  },
  {
    icon: Package,
    title: "٤ — احصل على السعر والتوفر",
    body: "يرد فريق المبيعات خلال مواعيد العمل بالسعر والتوفر وخيارات التوصيل.",
  },
];

/** قسم كيفية استخدام الكتالوج — بدون سلة */
export function WholesaleSection() {
  return (
    <section id="how-it-works" className="scroll-mt-28 bg-white py-14 sm:py-20">
      <div className="container-page">
        <div className="mb-8 max-w-2xl">
          <p className="mb-1.5 text-sm font-bold text-brand-700">كيف يعمل الكتالوج؟</p>
          <h2 className="text-2xl font-extrabold text-ink-900 sm:text-3xl">من التصفح إلى الاستفسار في 4 خطوات</h2>
          <p className="mt-2 text-sm text-ink-600">كتالوج احترافي بدون سلة أو دفع — تصفح واستفسر فقط عبر واتساب.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div key={step.title} className="card-surface flex flex-col gap-3 p-5">
              <span className="flex size-11 items-center justify-center rounded-xl bg-brand-50">
                <step.icon className="size-5 text-brand-700" aria-hidden="true" />
              </span>
              <h3 className="text-sm font-bold text-ink-900">{step.title}</h3>
              <p className="text-sm leading-relaxed text-ink-600">{step.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <a
            href={buildInquiryUrl("الاستفسار عن منتجات كتالوج عمران")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-2xl bg-brand-900 px-8 py-4 text-sm font-extrabold text-white shadow-xl hover:bg-brand-800 transition-colors"
          >
            <MessageCircle className="size-5" aria-hidden="true" />
            ابدأ التصفح والاستفسار
          </a>
        </div>
      </div>
    </section>
  );
}
