import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin, Phone } from "lucide-react";
import { categories } from "@/lib/categories";
import { activeBranches, navLinks, siteConfig } from "@/lib/site";

/** تذييل شفاف وواضح: الهوية، الروابط، الأقسام، والفروع */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-ink-950 text-ink-300">
      <div className="container-page py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* الهوية */}
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
              {siteConfig.footerDescription}
            </p>
          </div>

          {/* روابط */}
          <nav aria-label="روابط التذييل">
            <h2 className="mb-3 text-sm font-bold text-white">روابط سريعة</h2>
            <ul className="space-y-2 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
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
                  <Link
                    href={`/products?cat=${category.id}`}
                    className="transition-colors hover:text-white"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* التواصل والفروع */}
          <div>
            <h2 className="mb-3 text-sm font-bold text-white">
              الفروع والتواصل
            </h2>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={siteConfig.phoneHref}
                  className="flex items-center gap-2 font-bold text-white transition-colors hover:text-accent-300"
                >
                  <Phone className="size-4 shrink-0" aria-hidden="true" />
                  <span className="num">{siteConfig.phoneDisplay}</span>
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                <span>{siteConfig.workingHours}</span>
              </li>
              {activeBranches.map((branch) => (
                <li key={branch.id}>
                  <a
                    href={branch.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-2 transition-colors hover:text-white"
                  >
                    <MapPin
                      className="mt-0.5 size-4 shrink-0"
                      aria-hidden="true"
                    />
                    <span>
                      <span className="block font-semibold text-white">
                        {branch.name}
                      </span>
                      <span className="block text-xs">{branch.address}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-8 border-t border-white/10 pt-5 text-center text-xs">
          © <span className="num">{year}</span> {siteConfig.legalName} — جميع
          الحقوق محفوظة.
        </p>
      </div>
    </footer>
  );
}
