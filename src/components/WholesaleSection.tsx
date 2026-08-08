import {
  ClipboardList,
  FileText,
  MessageCircle,
  PackageSearch,
  Truck,
} from "lucide-react";
import { buildInquiryUrl } from "@/lib/whatsapp";

const steps = [
  {
    icon: PackageSearch,
    title: "١ — اختيار الأصناف",
    body: "فعّل عرض سعر الجملة من أعلى الصفحة، ثم أضف الأصناف والكميات المطلوبة إلى السلة.",
  },
  {
    icon: MessageCircle,
    title: "٢ — إرسال الطلب",
    body: "اضغط «تأكيد الطلب عبر واتساب» ليصل الطلب إلى فريق المبيعات بتفاصيله كاملة.",
  },
  {
    icon: ClipboardList,
    title: "٣ — مراجعة وتأكيد",
    body: "نراجع التوفر ونرسل عرض السعر النهائي شاملاً قيمة الشحن وموعد التسليم.",
  },
  {
    icon: Truck,
    title: "٤ — التجهيز والشحن",
    body: "يتم تجهيز الكراتين وشحنها عبر شركة الشحن المتفق عليها مع بيان محتويات الشحنة.",
  },
];

const terms = [
  "أسعار الجملة سارية عند الوصول إلى الحد الأدنى للكمية الموضح مع كل صنف.",
  "يمكن خلط أصناف مختلفة في الشحنة الواحدة مع احتساب سعر الجملة لكل صنف على حدة.",
  "الأسعار المعروضة لا تشمل الشحن، ويتم تحديده حسب الوزن والوجهة قبل التنفيذ.",
  "تُراجع الكميات المتوفرة قبل تأكيد الطلب، ويُخطر العميل بأي صنف غير متاح.",
  "تُقبل طلبات التوريد الدوري للمحلات باتفاق مسبق على الكميات والمواعيد.",
];

/** قسم خدمة الجملة: خطوات التعامل وشروط التوريد */
export function WholesaleSection() {
  return (
    <section id="wholesale" className="scroll-mt-28 bg-white py-14 sm:py-20">
      <div className="container-page">
        <div className="mb-8 max-w-2xl">
          <p className="mb-1.5 text-sm font-bold text-brand-700">خدمة الجملة</p>
          <h2 className="text-2xl font-extrabold text-ink-900 sm:text-3xl">
            آلية التعامل مع التجار
          </h2>
          <p className="mt-2 text-sm text-ink-600">
            نعمل مع محلات الألعاب ومحلات الهدايا وموزعي المناسبات وفق خطوات واضحة
            من اختيار الأصناف حتى استلام الشحنة.
          </p>
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

        <div className="mt-6 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
          <div className="card-surface p-6">
            <h3 className="mb-4 flex items-center gap-2 text-base font-bold text-ink-900">
              <FileText className="size-5 text-brand-700" aria-hidden="true" />
              شروط التوريد
            </h3>
            <ul className="space-y-2.5">
              {terms.map((term) => (
                <li key={term} className="flex gap-2.5 text-sm text-ink-600">
                  <span
                    className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-600"
                    aria-hidden="true"
                  />
                  {term}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col justify-center gap-4 rounded-2xl bg-brand-900 p-6 text-white">
            <h3 className="text-lg font-extrabold">
              هل تحتاج قائمة أسعار محدّثة؟
            </h3>
            <p className="text-sm leading-relaxed text-brand-100">
              يمكن لفريق المبيعات إرسال قائمة الأسعار بصيغة PDF مع بيان الكميات
              المتوفرة ومواعيد التوريد القادمة.
            </p>
            <a
              href={buildInquiryUrl("قائمة أسعار الجملة بصيغة PDF")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-emerald-700"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              التواصل عبر واتساب
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
