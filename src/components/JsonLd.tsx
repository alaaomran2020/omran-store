/**
 * مكوّن لعرض البيانات المنظمة (JSON-LD) ببطريقة آمنة.
 * نُهرّب علامة < لتجنّب كسر HTML وإغلاق الوسوم مبكراً عند وجود نص عربي أو رموز.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
