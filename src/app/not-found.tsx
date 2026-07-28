import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center gap-4 py-20 text-center">
      <p className="num text-5xl font-extrabold text-brand-800">404</p>
      <h1 className="text-xl font-extrabold text-ink-900">
        عذراً، الصفحة التي تبحث عنها غير متاحة
      </h1>
      <p className="max-w-md text-sm text-ink-600">
        ربما تغيّر عنوان الرابط أو أُزيلت الصفحة. لا تقلق — الكتالوج الكامل
        لألعاب الأطفال والبالونات والهدايا في انتظارك على الصفحة الرئيسية.
      </p>
      <Link
        href="/"
        className="flex items-center gap-2 rounded-xl bg-brand-700 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-800"
      >
        <Home className="size-4" aria-hidden="true" />
        العودة إلى الرئيسية
      </Link>
    </div>
  );
}
