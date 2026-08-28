"use client";

import { Send } from "lucide-react";

/** نموذج التواصل التفاعلي — مكوّن عميل بعيداً عن صفحة الخادم حتى يدعم بيانات المنظمة المرفقة. */
export function ContactForm() {
  return (
    <form
      className="rounded-[2rem] bg-white border border-ink-100 shadow-xl shadow-ink-900/5 p-8"
      onSubmit={(e) => {
        e.preventDefault();
        alert("هذا النموذج واجهة تمهيدية تجريبية فقط. للتواصل الفعلي والحصول على رد سريع ومباشر، يرجى استخدام هاتف الشركة أو مراسلتنا عبر واتساب.");
      }}
    >
      <h3 className="text-xl font-extrabold text-ink-900">أرسل رسالة</h3>
      <div className="mt-6 space-y-4">
        <div>
          <label htmlFor="name" className="block text-xs font-bold text-ink-500 mb-1">
            الاسم
          </label>
          <input
            id="name"
            type="text"
            required
            className="w-full rounded-xl border border-ink-200 bg-ink-50 px-4 py-3 text-sm text-ink-900 outline-none focus:border-brand-500 focus:bg-white transition-colors"
            placeholder="اسمك الكريم"
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="block text-xs font-bold text-ink-500 mb-1">
            البريد أو الهاتف
          </label>
          <input
            id="contact-email"
            type="text"
            required
            className="w-full rounded-xl border border-ink-200 bg-ink-50 px-4 py-3 text-sm text-ink-900 outline-none focus:border-brand-500 focus:bg-white transition-colors"
            placeholder="example@email.com أو 01xxx"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-xs font-bold text-ink-500 mb-1">
            رسالتك
          </label>
          <textarea
            id="message"
            rows={4}
            required
            className="w-full rounded-xl border border-ink-200 bg-ink-50 px-4 py-3 text-sm text-ink-900 outline-none focus:border-brand-500 focus:bg-white transition-colors resize-none"
            placeholder="أخبرنا بما تحتاجه..."
          />
        </div>
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 rounded-2xl bg-brand-700 px-6 py-3.5 text-sm font-extrabold text-white hover:bg-brand-800 transition-colors shadow-lg shadow-brand-900/15"
        >
          <Send className="size-4" aria-hidden="true" />
          إرسال الرسالة
        </button>

        <p className="text-[11px] text-ink-500 text-center leading-relaxed">
          * تنويه: هذا النموذج واجهة توضيحية تجريبية ولا يقوم بالإرسال الفعلي. يرجى التواصل معنا عبر واتساب أو الاتصال الهاتفي مباشرة.
        </p>
      </div>
    </form>
  );
}
