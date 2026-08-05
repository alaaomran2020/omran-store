"use client";

import { StructuredData } from "@/components/StructuredDataPages";
import { Phone, Mail, Clock, MapPin, Send, MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/site";

export default function ContactPage() {
  return (
    <>
      <StructuredData type="contact" />
      <main>
        <div className="relative overflow-hidden bg-gradient-to-br from-brand-950 via-brand-900 to-brand-800 text-white">
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute -top-24 -start-24 size-80 rounded-full bg-brand-400/15 blur-3xl" />
          </div>
          <div className="container-page relative py-16 sm:py-24">
            <div className="max-w-2xl">
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">تواصل معنا</h1>
              <p className="mt-5 text-base text-brand-100 leading-relaxed">فريقنا متاح للرد على استفساراتك خلال ساعات العمل الرسمية عبر واتساب أو الهاتف.</p>
            </div>
          </div>
        </div>

        <section className="py-14 sm:py-20">
          <div className="container-page">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
              <div>
                <h2 className="text-2xl font-extrabold text-ink-900">بيانات الاتصال</h2>
                <div className="mt-6 space-y-4">
                  <a href={`https://wa.me/${siteConfig.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 rounded-2xl bg-gradient-to-r from-[#25D366]/10 to-[#25D366]/5 border border-[#25D366]/20 p-5 hover:shadow-lg transition-shadow group">
                    <span className="flex size-12 items-center justify-center rounded-2xl bg-[#25D366] text-white shadow-lg shadow-[#25D366]/20"><MessageCircle className="size-6" /></span>
                    <div className="flex-1">
                      <p className="text-xs text-ink-400">واتساب</p>
                      <p className="num text-base font-extrabold text-ink-900">{siteConfig.whatsappNumber}</p>
                      <p className="text-xs text-ink-500 mt-0.5">استفسارات الجملة والقطاعي</p>
                    </div>
                    <span className="text-xs font-bold text-[#25D366]">فتح المحادثة →</span>
                  </a>
                  <a href={siteConfig.phoneHref} className="flex items-center gap-4 rounded-2xl bg-brand-50 border border-brand-100 p-5 hover:shadow-lg transition-shadow group">
                    <span className="flex size-12 items-center justify-center rounded-2xl bg-brand-700 text-white shadow-lg shadow-brand-900/15"><Phone className="size-6" /></span>
                    <div className="flex-1">
                      <p className="text-xs text-ink-400">هاتف</p>
                      <p className="num text-base font-extrabold text-ink-900">{siteConfig.phoneDisplay}</p>
                    </div>
                    <span className="text-xs font-bold text-brand-700">اتصال →</span>
                  </a>
                  <div className="flex items-center gap-4 rounded-2xl bg-ink-50 border border-ink-100 p-5">
                    <span className="flex size-12 items-center justify-center rounded-2xl bg-brand-700 text-white"><Mail className="size-6" /></span>
                    <div>
                      <p className="text-xs text-ink-400">بريد إلكتروني</p>
                      <p className="text-sm font-extrabold text-ink-900">{siteConfig.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 rounded-2xl bg-ink-50 border border-ink-100 p-5">
                    <span className="flex size-12 items-center justify-center rounded-2xl bg-brand-700 text-white"><Clock className="size-6" /></span>
                    <div>
                      <p className="text-xs text-ink-400">ساعات العمل</p>
                      <p className="text-sm font-extrabold text-ink-900">{siteConfig.workingHours}</p>
                    </div>
                  </div>
                </div>
              </div>

              <form
                className="rounded-[2rem] bg-white border border-ink-100 shadow-xl shadow-ink-900/5 p-8"
                onSubmit={(e) => { e.preventDefault(); alert("تم إرسال رسالتك بنجاح! سنرد عليك قريباً."); }}
              >
                <h3 className="text-xl font-extrabold text-ink-900">أرسل رسالة</h3>
                <div className="mt-6 space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-bold text-ink-500 mb-1">الاسم</label>
                    <input id="name" type="text" required className="w-full rounded-xl border border-ink-200 bg-ink-50 px-4 py-3 text-sm text-ink-900 outline-none focus:border-brand-500 focus:bg-white transition-colors" placeholder="اسمك الكريم" />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-bold text-ink-500 mb-1">البريد أو الهاتف</label>
                    <input id="contact-email" type="text" required className="w-full rounded-xl border border-ink-200 bg-ink-50 px-4 py-3 text-sm text-ink-900 outline-none focus:border-brand-500 focus:bg-white transition-colors" placeholder="example@email.com أو 01xxx" />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-xs font-bold text-ink-500 mb-1">رسالتك</label>
                    <textarea id="message" rows={4} required className="w-full rounded-xl border border-ink-200 bg-ink-50 px-4 py-3 text-sm text-ink-900 outline-none focus:border-brand-500 focus:bg-white transition-colors resize-none" placeholder="أخبرنا بما تحتاجه..." />
                  </div>
                  <button type="submit" className="w-full flex items-center justify-center gap-2 rounded-2xl bg-brand-700 px-6 py-3.5 text-sm font-extrabold text-white hover:bg-brand-800 transition-colors shadow-lg shadow-brand-900/15">
                    <Send className="size-4" aria-hidden="true" />
                    إرسال الرسالة
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
