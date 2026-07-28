import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { buildInquiryUrl } from "@/lib/whatsapp";

/** بيانات التواصل مع الشركة */
export function ContactSection() {
  const channels = [
    {
      icon: Phone,
      label: "الهاتف",
      value: siteConfig.phoneDisplay,
      href: siteConfig.phoneHref,
      ltr: true,
    },
    {
      icon: Mail,
      label: "البريد الإلكتروني",
      value: siteConfig.email,
      href: `mailto:${siteConfig.email}`,
      ltr: true,
    },
    {
      icon: MapPin,
      label: "العنوان",
      value: siteConfig.address,
      href: undefined,
      ltr: false,
    },
    {
      icon: Clock,
      label: "مواعيد العمل",
      value: siteConfig.workingHours,
      href: undefined,
      ltr: false,
    },
  ];

  return (
    <section id="contact" className="scroll-mt-28 bg-white py-14 sm:py-20">
      <div className="container-page">
        <div className="mb-8 max-w-2xl">
          <p className="mb-1.5 text-sm font-bold text-brand-700">التواصل</p>
          <h2 className="text-2xl font-extrabold text-ink-900 sm:text-3xl">
            فريق المبيعات جاهز لخدمتك
          </h2>
          <p className="mt-2 text-sm text-ink-600">
            سؤال عن سعر أو توفر؟ تريد ترتيب توريد دوري لمحلك؟ تواصل معنا عبر
            القنوات التالية خلال مواعيد العمل الرسمية وسنرد عليك بأسرع ما يمكن.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.3fr_1fr]">
          <ul className="grid gap-3 sm:grid-cols-2">
            {channels.map((channel) => {
              const content = (
                <>
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-50">
                    <channel.icon
                      className="size-5 text-brand-700"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs font-semibold text-ink-500">
                      {channel.label}
                    </span>
                    <span
                      className={`block truncate text-sm font-bold text-ink-900 ${
                        channel.ltr ? "num" : ""
                      }`}
                    >
                      {channel.value}
                    </span>
                  </span>
                </>
              );

              return (
                <li key={channel.label}>
                  {channel.href ? (
                    <a
                      href={channel.href}
                      className="card-surface flex items-center gap-3 p-4 transition-colors hover:border-brand-300 hover:bg-brand-50/40"
                    >
                      {content}
                    </a>
                  ) : (
                    <div className="card-surface flex items-center gap-3 p-4">
                      {content}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="flex flex-col justify-center gap-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
            <h3 className="text-lg font-extrabold text-emerald-900">
              أسرع طريق لطلبك: واتساب
            </h3>
            <p className="text-sm leading-relaxed text-emerald-800">
              جهّز طلبك من الكتالوج وأرسله برسالة واحدة مفصلة، أو ابدأ محادثة
              للاستفسار عن صنف معين — فريقنا يرد خلال مواعيد العمل.
            </p>
            <a
              href={buildInquiryUrl("الأصناف المتاحة وأسعار التوريد")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-emerald-700"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              ابدأ المحادثة الآن
            </a>
            <p className="num text-center text-xs font-semibold text-emerald-800" dir="ltr">
              +{siteConfig.whatsappNumber}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
