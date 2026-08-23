"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

/** ارتفاع التمرير (بكسل) الذي يظهر بعده الزر */
const SHOW_AFTER = 640;

/**
 * زر عائم للعودة إلى أعلى الصفحة — نسخة كتالوج احترافي بدون سلة
 */
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="العودة إلى أعلى الصفحة"
      className="animate-fade-in fixed start-4 bottom-24 md:bottom-6 z-30 flex size-11 items-center justify-center rounded-full border border-ink-200 bg-white/95 text-ink-700 shadow-lg backdrop-blur transition-colors hover:bg-white hover:text-brand-800"
    >
      <ArrowUp className="size-5" aria-hidden="true" />
    </button>
  );
}
