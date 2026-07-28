import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { CategoryBrowseLink } from "@/components/CategoryBrowseLink";
import { categories } from "@/lib/categories";
import { navLinks, siteConfig } from "@/lib/site";

/** تذييل الموقع */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink-950 text-ink-300">
      <div className="container-page py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* الشركة */}
          <div>
            <div className="mb-3 flex items-center gap-2.5">
              <Image
                src="/logo.svg"
                alt=""
                width={40}
                height={40}
                className="size-10 rounded-xl"
              />
              <span className="text-base font-extrabold text-white">
                {siteConfig.name}
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              شركة متخصصة في توريد وتوزيع ألعاب الأطفال والبالونات ومستلزمات
              الحفلات والهدايا بالجملة لمحلات التجزئة ومنافذ التوزيع في جميع
              المحافظات، مع بيع قطاعي للأفراد من معرضينا بطنطا.
            </p>
          </div>

          {/* روابط */}
          <nav aria-label="روابط التذييل">
            <h2 className="mb-3 text-sm font-bold text-white">روابط سريعة</h2>
            <ul className="space-y-2 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="transition-colors hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* الأقسام */}
          <div>
            <h2 className="mb-3 text-sm font-bold text-white">الأقسام</h2>
            <ul className="space-y-2 text-sm">
              {categories.map((category) => (
                <li key={category.id}>
                  <CategoryBrowseLink
                    categoryId={category.id}
                    className="transition-colors hover:text-white"
                  >
                    {category.name}
                  </CategoryBrowseLink>
                </li>
              ))}
            </ul>
          </div>

          {/* التواصل */}
          <div>
            <h2 className="mb-3 text-sm font-bold text-white">التواصل</h2>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href={siteConfig.phoneHref}
                  className="flex items-center gap-2 transition-colors hover:text-white"
                >
                  <Phone className="size-4 shrink-0" aria-hidden="true" />
                  <span className="num">{siteConfig.phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-2 transition-colors hover:text-white"
                >
                  <Mail className="size-4 shrink-0" aria-hidden="true" />
                  <span className="num">{siteConfig.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                {siteConfig.address}
              </li>
              <li className="text-xs text-ink-400">{siteConfig.workingHours}</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs sm:flex-row">
          <p>
            © <span className="num">{year}</span> {siteConfig.legalName}. جميع
            الحقوق محفوظة.
          </p>
          <p>
            الأسعار المعروضة استرشادية، ويتم تأكيدها مع قيمة الشحن من فريق
            المبيعات قبل تنفيذ أي طلب.
          </p>
        </div>
      </div>
    </footer>
  );
}
