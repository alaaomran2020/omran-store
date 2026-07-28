import type { Metadata } from "next";
import { CheckoutForm } from "@/components/CheckoutForm";

export const metadata: Metadata = {
  title: "إتمام الطلب",
  description:
    "أكمل طلبك في خطوة واحدة: الاسم ورقم الهاتف والفرع المفضل أو الشحن، ثم أرسل الطلب مباشرة عبر الواتساب.",
  alternates: { canonical: "/checkout" },
  robots: { index: false, follow: true },
};

export default function CheckoutPage() {
  return (
    <div className="container-page py-8">
      <h1 className="text-2xl font-extrabold text-ink-900 sm:text-3xl">
        إتمام الطلب
      </h1>
      <p className="mt-1.5 max-w-2xl text-sm text-ink-600">
        بيانات مختصرة فقط — نراجع الطلب معك ونؤكد التوفر وقيمة الشحن قبل التنفيذ.
      </p>

      <div className="mt-6">
        <CheckoutForm />
      </div>
    </div>
  );
}
