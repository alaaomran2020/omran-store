import { ArrowUpLeft, Camera, ExternalLink, Images } from "lucide-react";
import feed from "@/data/instagram-feed.json";

type FeedItem = {
  id: string;
  mediaType: string;
  imageUrl: string | null;
  mediaUrls: string[];
  thumbnailUrl: string | null;
  permalink: string;
  caption: string;
  timestamp: string | null;
};

const items = feed.items as FeedItem[];

function formatDate(timestamp: string | null) {
  if (!timestamp) return "منشور حديثاً";
  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) return "منشور حديثاً";
  return new Intl.DateTimeFormat("ar-EG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

function captionPreview(caption: string) {
  const compact = caption.replace(/\s+/g, " ").trim();
  return compact.length > 120 ? `${compact.slice(0, 120)}…` : compact || "شاهد أحدث منتجاتنا على إنستغرام";
}

function InstagramPostCard({ item }: { item: FeedItem }) {
  const isCarousel = item.mediaType === "CAROUSEL_ALBUM";
  return (
    <a
      href={item.permalink}
      target="_blank"
      rel="noreferrer"
      className="group flex min-w-0 flex-col overflow-hidden rounded-[1.75rem] border border-ink-100 bg-white shadow-[0_16px_45px_rgba(30,41,59,0.08)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_20px_55px_rgba(37,78,224,0.16)]"
      aria-label={`فتح منشور إنستغرام بتاريخ ${formatDate(item.timestamp)}`}
    >
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-brand-100 via-rose-50 to-accent-100">
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={captionPreview(item.caption)}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-3 px-5 text-center text-brand-800">
            <Camera className="h-10 w-10" aria-hidden="true" />
            <span className="text-sm font-bold">افتح المنشور لمشاهدة الصورة</span>
          </div>
        )}
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-3">
          <span className="rounded-full bg-white/90 px-3 py-1 text-[0.7rem] font-bold text-brand-800 shadow-sm backdrop-blur">
            {isCarousel ? "صور متعددة" : "منشور"}
          </span>
          <span className="grid h-9 w-9 place-items-center rounded-full bg-white/90 text-brand-700 shadow-sm backdrop-blur">
            {isCarousel ? <Images className="h-4 w-4" aria-hidden="true" /> : <Camera className="h-4 w-4" aria-hidden="true" />}
          </span>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <p className="text-xs font-bold text-brand-700">{formatDate(item.timestamp)}</p>
        <p className="line-clamp-3 text-sm font-semibold leading-7 text-ink-800">{captionPreview(item.caption)}</p>
        <span className="mt-auto inline-flex items-center gap-2 text-sm font-extrabold text-accent-600 transition group-hover:gap-3">
          شاهد على إنستغرام
          <ArrowUpLeft className="h-4 w-4" aria-hidden="true" />
        </span>
      </div>
    </a>
  );
}

export function InstagramFeed() {
  const hasItems = items.length > 0;
  return (
    <section id="instagram" className="relative overflow-hidden bg-brand-950 py-20 text-white sm:py-24">
      <div className="pointer-events-none absolute -right-28 top-8 h-64 w-64 rounded-full bg-brand-700/30 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-rose-500/20 blur-3xl" aria-hidden="true" />
      <div className="container relative">
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-brand-100 backdrop-blur">
              <Camera className="h-4 w-4" aria-hidden="true" />
              من إنستغرام مباشرة
            </div>
            <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">آخر جديد من عمران للألعاب</h2>
            <p className="mt-4 max-w-xl text-base leading-8 text-brand-100/80">
              شوف أحدث المنتجات والأفكار التي نشاركها على حسابنا، واضغط على أي منشور للتفاصيل والصور كاملة.
            </p>
          </div>
          <a
            href={feed.profileUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-fit items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-black text-brand-900 transition hover:-translate-y-0.5 hover:bg-brand-50"
          >
            تابع @{feed.username}
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>

        {hasItems ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {items.slice(0, 8).map((item) => (
              <InstagramPostCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="rounded-[2rem] border border-white/15 bg-white/10 p-8 text-center backdrop-blur sm:p-12">
            <Camera className="mx-auto h-10 w-10 text-brand-200" aria-hidden="true" />
            <h3 className="mt-4 text-xl font-black">الخلاصة هتظهر هنا قريباً</h3>
            <p className="mx-auto mt-2 max-w-lg text-sm leading-7 text-brand-100/75">
              بمجرد تشغيل أول مزامنة آمنة، هنعرض أحدث منشورات الحساب هنا تلقائياً.
            </p>
            <a
              href={feed.profileUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-accent-500 px-5 py-3 text-sm font-black text-white transition hover:bg-accent-400"
            >
              افتح حساب إنستغرام
              <ArrowUpLeft className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        )}

        <p className="mt-6 text-xs text-brand-100/55">
          {feed.lastSyncedAt ? `آخر تحديث: ${formatDate(feed.lastSyncedAt)}` : "يتم تحديث الخلاصة تلقائياً عبر المزامنة الدورية"}
        </p>
      </div>
    </section>
  );
}
