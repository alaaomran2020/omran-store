/**
 * مولّد صور المنتجات التوضيحية (SVG).
 * ينتج ملفات خفيفة داخل public/products بنفس المسارات المذكورة في كتالوج المنتجات.
 * التشغيل: node scripts/generate-product-images.mjs
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(here, "..", "public", "products");
mkdirSync(outDir, { recursive: true });

const palettes = {
  vehicles: ["#1d4ed8", "#3b82f6", "#dbeafe"],
  dolls: ["#be185d", "#ec4899", "#fce7f3"],
  educational: ["#047857", "#10b981", "#d1fae5"],
  gifts: ["#b45309", "#f59e0b", "#fef3c7"],
};

function shell(theme, inner, label, variant) {
  const [dark, mid, light] = palettes[theme];
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800" role="img" aria-label="${label}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="${light}"/>
    </linearGradient>
    <linearGradient id="body" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${mid}"/>
      <stop offset="100%" stop-color="${dark}"/>
    </linearGradient>
  </defs>
  <rect width="800" height="800" fill="url(#bg)"/>
  <circle cx="${variant === "b" ? 200 : 620}" cy="180" r="150" fill="${mid}" opacity="0.14"/>
  <circle cx="${variant === "b" ? 660 : 150}" cy="650" r="110" fill="${dark}" opacity="0.10"/>
  <g transform="translate(400 410)">${inner(dark, mid, light)}</g>
  <ellipse cx="400" cy="660" rx="230" ry="26" fill="${dark}" opacity="0.10"/>
</svg>
`;
}

const art = {
  car: (dark, mid) => `
    <g transform="translate(0 -20)">
      <path d="M-230 60 L-190 -30 Q-175 -70 -130 -75 L110 -95 Q160 -98 195 -60 L250 0 Q265 15 262 40 L258 70 Q255 92 232 92 L-208 92 Q-232 92 -230 60 Z" fill="url(#body)"/>
      <path d="M-150 -40 L-125 -55 L-15 -63 L-15 -12 L-160 -6 Z" fill="#ffffff" opacity="0.85"/>
      <path d="M15 -64 L120 -72 Q150 -74 172 -48 L205 -10 L15 -12 Z" fill="#ffffff" opacity="0.85"/>
      <rect x="-238" y="30" width="60" height="24" rx="10" fill="${mid}"/>
      <circle cx="-130" cy="95" r="62" fill="#1f2937"/><circle cx="-130" cy="95" r="28" fill="#e5e7eb"/>
      <circle cx="150" cy="95" r="62" fill="#1f2937"/><circle cx="150" cy="95" r="28" fill="#e5e7eb"/>
      <rect x="200" y="10" width="58" height="18" rx="9" fill="#fbbf24"/>
    </g>`,
  truck: (dark, mid) => `
    <g transform="translate(0 -20)">
      <rect x="-250" y="-120" width="270" height="180" rx="18" fill="url(#body)"/>
      <rect x="-230" y="-100" width="230" height="60" rx="10" fill="#ffffff" opacity="0.55"/>
      <path d="M40 -60 L150 -60 Q185 -60 200 -28 L240 40 L240 60 Q240 72 226 72 L40 72 Z" fill="${mid}"/>
      <rect x="70" y="-40" width="90" height="55" rx="8" fill="#ffffff" opacity="0.85"/>
      <circle cx="-160" cy="80" r="58" fill="#1f2937"/><circle cx="-160" cy="80" r="25" fill="#e5e7eb"/>
      <circle cx="140" cy="80" r="58" fill="#1f2937"/><circle cx="140" cy="80" r="25" fill="#e5e7eb"/>
      <rect x="-250" y="52" width="490" height="20" rx="8" fill="${dark}"/>
    </g>`,
  cars6: (dark, mid, light) => `
    <g>
      ${[0, 1, 2, 3, 4, 5]
        .map((i) => {
          const x = -240 + (i % 3) * 165;
          const y = -120 + Math.floor(i / 3) * 150;
          const fill = i % 2 ? mid : dark;
          return `<g transform="translate(${x} ${y})">
            <rect x="-10" y="-6" width="150" height="90" rx="14" fill="${light}"/>
            <path d="M0 60 L12 22 Q18 6 38 4 L96 0 Q114 -1 124 14 L140 38 Q146 48 144 58 L142 66 L2 66 Z" fill="${fill}"/>
            <circle cx="34" cy="68" r="17" fill="#1f2937"/><circle cx="106" cy="68" r="17" fill="#1f2937"/>
          </g>`;
        })
        .join("")}
    </g>`,
  trike: (dark, mid) => `
    <g transform="translate(0 -10)">
      <circle cx="-140" cy="70" r="90" fill="none" stroke="#1f2937" stroke-width="20"/>
      <circle cx="160" cy="110" r="50" fill="none" stroke="#1f2937" stroke-width="18"/>
      <path d="M-140 70 L40 -40 L160 110" stroke="url(#body)" stroke-width="22" fill="none" stroke-linecap="round"/>
      <path d="M40 -40 L60 -140" stroke="${mid}" stroke-width="18" stroke-linecap="round"/>
      <rect x="10" y="-170" width="110" height="26" rx="13" fill="${dark}"/>
      <rect x="-60" y="-90" width="130" height="34" rx="16" fill="${dark}"/>
      <path d="M170 100 L230 20" stroke="${mid}" stroke-width="16" stroke-linecap="round"/>
    </g>`,
  doll: (dark, mid) => `
    <g transform="translate(0 -30)">
      <circle cx="0" cy="-150" r="92" fill="#fcd9b6"/>
      <path d="M-95 -170 Q-80 -290 0 -290 Q80 -290 95 -170 Q70 -230 0 -225 Q-70 -230 -95 -170 Z" fill="#5b3a29"/>
      <circle cx="-32" cy="-155" r="10" fill="#1f2937"/><circle cx="32" cy="-155" r="10" fill="#1f2937"/>
      <path d="M-22 -110 Q0 -92 22 -110" stroke="#c2410c" stroke-width="8" fill="none" stroke-linecap="round"/>
      <path d="M-105 160 Q-90 -20 0 -50 Q90 -20 105 160 Z" fill="url(#body)"/>
      <rect x="-125" y="-40" width="42" height="150" rx="21" fill="#fcd9b6" transform="rotate(14 -104 35)"/>
      <rect x="83" y="-40" width="42" height="150" rx="21" fill="#fcd9b6" transform="rotate(-14 104 35)"/>
      <rect x="-52" y="150" width="40" height="90" rx="18" fill="#fcd9b6"/>
      <rect x="12" y="150" width="40" height="90" rx="18" fill="#fcd9b6"/>
    </g>`,
  plush: (dark, mid) => `
    <g transform="translate(0 -20)">
      <circle cx="-118" cy="-140" r="52" fill="${mid}"/><circle cx="118" cy="-140" r="52" fill="${mid}"/>
      <circle cx="0" cy="-70" r="120" fill="url(#body)"/>
      <circle cx="-42" cy="-88" r="13" fill="#1f2937"/><circle cx="42" cy="-88" r="13" fill="#1f2937"/>
      <ellipse cx="0" cy="-38" rx="40" ry="30" fill="#ffffff" opacity="0.85"/>
      <ellipse cx="0" cy="-48" rx="15" ry="11" fill="#1f2937"/>
      <ellipse cx="0" cy="105" rx="130" ry="115" fill="url(#body)"/>
      <ellipse cx="0" cy="120" rx="75" ry="70" fill="#ffffff" opacity="0.5"/>
      <ellipse cx="-140" cy="60" rx="46" ry="70" fill="${mid}" transform="rotate(18 -140 60)"/>
      <ellipse cx="140" cy="60" rx="46" ry="70" fill="${mid}" transform="rotate(-18 140 60)"/>
    </g>`,
  animals: (dark, mid, light) => `
    <g>
      <ellipse cx="-150" cy="30" rx="105" ry="80" fill="${mid}"/>
      <circle cx="-232" cy="-30" r="48" fill="${mid}"/>
      <circle cx="-248" cy="-70" r="16" fill="${dark}"/><circle cx="-208" cy="-72" r="16" fill="${dark}"/>
      <rect x="-200" y="90" width="26" height="50" rx="12" fill="${dark}"/>
      <rect x="-110" y="90" width="26" height="50" rx="12" fill="${dark}"/>
      <ellipse cx="130" cy="10" rx="120" ry="90" fill="${dark}"/>
      <circle cx="130" cy="-100" r="62" fill="${dark}"/>
      <circle cx="92" cy="-150" r="26" fill="${mid}"/><circle cx="168" cy="-150" r="26" fill="${mid}"/>
      <circle cx="110" cy="-108" r="11" fill="${light}"/><circle cx="152" cy="-108" r="11" fill="${light}"/>
      <ellipse cx="130" cy="-78" rx="22" ry="15" fill="${light}"/>
      <rect x="60" y="80" width="30" height="55" rx="14" fill="${dark}"/>
      <rect x="172" y="80" width="30" height="55" rx="14" fill="${dark}"/>
    </g>`,
  blocks: (dark, mid, light) => `
    <g>
      ${[
        [-190, 60, dark],
        [-40, 60, mid],
        [110, 60, "#f59e0b"],
        [-115, -80, "#ef4444"],
        [35, -80, dark],
        [-40, -220, mid],
      ]
        .map(
          ([x, y, c]) => `<g transform="translate(${x} ${y})">
            <rect x="0" y="0" width="140" height="120" rx="14" fill="${c}"/>
            <rect x="18" y="-22" width="38" height="28" rx="10" fill="${c}"/>
            <rect x="84" y="-22" width="38" height="28" rx="10" fill="${c}"/>
            <rect x="10" y="12" width="120" height="18" rx="9" fill="${light}" opacity="0.45"/>
          </g>`,
        )
        .join("")}
    </g>`,
  puzzle: (dark, mid, light) => `
    <g>
      <rect x="-260" y="-190" width="520" height="380" rx="26" fill="#d6b98c"/>
      <rect x="-232" y="-162" width="464" height="324" rx="18" fill="${light}"/>
      ${["أ", "ب", "ت", "ث", "ج", "ح", "خ", "د"]
        .map((ch, i) => {
          const x = -206 + (i % 4) * 112;
          const y = -140 + Math.floor(i / 4) * 150;
          const c = [dark, mid, "#f59e0b", "#ef4444"][i % 4];
          return `<g transform="translate(${x} ${y})">
            <rect width="92" height="118" rx="14" fill="${c}"/>
            <circle cx="46" cy="-14" r="14" fill="${c}"/>
            <text x="46" y="78" font-size="62" font-family="serif" fill="#ffffff" text-anchor="middle">${ch}</text>
          </g>`;
        })
        .join("")}
    </g>`,
  board: (dark, mid, light) => `
    <g>
      <rect x="-270" y="-200" width="540" height="400" rx="34" fill="url(#body)"/>
      <rect x="-215" y="-155" width="430" height="270" rx="18" fill="${light}"/>
      <path d="M-160 40 Q-110 -80 -40 30 Q10 100 70 -40 Q110 -120 170 20" stroke="${dark}" stroke-width="14" fill="none" stroke-linecap="round"/>
      <circle cx="-140" cy="150" r="30" fill="#f59e0b"/>
      <circle cx="-40" cy="150" r="30" fill="#ef4444"/>
      <circle cx="60" cy="150" r="30" fill="${light}"/>
      <rect x="150" y="120" width="120" height="26" rx="13" fill="${dark}"/>
      <rect x="250" y="-140" width="30" height="180" rx="15" fill="${dark}"/>
    </g>`,
  science: (dark, mid, light) => `
    <g>
      <path d="M-150 -180 L-150 -60 L-235 110 Q-250 150 -205 150 L-95 150 Q-50 150 -65 110 L-150 -60" fill="none" stroke="${dark}" stroke-width="16" stroke-linejoin="round"/>
      <path d="M-224 90 L-84 90 L-95 145 L-212 145 Z" fill="${mid}" opacity="0.75"/>
      <rect x="-175" y="-200" width="50" height="26" rx="10" fill="${dark}"/>
      <rect x="60" y="-150" width="110" height="300" rx="24" fill="none" stroke="${dark}" stroke-width="16"/>
      <rect x="76" y="40" width="78" height="94" rx="14" fill="#f59e0b" opacity="0.8"/>
      <circle cx="230" cy="-90" r="66" fill="none" stroke="${mid}" stroke-width="16"/>
      <path d="M276 -44 L330 10" stroke="${mid}" stroke-width="20" stroke-linecap="round"/>
      <circle cx="230" cy="-90" r="44" fill="${light}" opacity="0.7"/>
    </g>`,
  balloons: (dark, mid, light) => `
    <g transform="translate(0 -30)">
      ${[
        [-180, -60, "#ef4444"],
        [-20, -140, dark],
        [140, -70, "#f59e0b"],
        [-100, 30, mid],
        [60, 40, "#10b981"],
      ]
        .map(
          ([x, y, c]) => `<g transform="translate(${x} ${y})">
            <ellipse cx="0" cy="0" rx="82" ry="98" fill="${c}"/>
            <ellipse cx="-26" cy="-32" rx="20" ry="28" fill="#ffffff" opacity="0.45"/>
            <path d="M-12 96 L0 118 L12 96 Z" fill="${c}"/>
            <path d="M0 118 Q22 190 -6 258" stroke="${dark}" stroke-width="5" fill="none" opacity="0.6"/>
          </g>`,
        )
        .join("")}
    </g>`,
  foil: (dark, mid, light) => `
    <g>
      <path d="M-60 -230 h150 a34 34 0 0 1 34 34 v392 a34 34 0 0 1 -34 34 h-150 a34 34 0 0 1 -34 -34 v-392 a34 34 0 0 1 34 -34 z" fill="#eab308"/>
      <path d="M-14 -180 h58 v292 h-58 z" fill="#fde68a" opacity="0.7"/>
      <ellipse cx="-190" cy="-40" rx="86" ry="110" fill="#d4d4d8"/>
      <ellipse cx="-212" cy="-72" rx="22" ry="30" fill="#ffffff" opacity="0.6"/>
      <path d="M-190 74 Q-160 170 -200 250" stroke="${dark}" stroke-width="6" fill="none" opacity="0.5"/>
      <path d="M60 230 Q90 300 40 350" stroke="${dark}" stroke-width="6" fill="none" opacity="0.5"/>
    </g>`,
  party: (dark, mid, light) => `
    <g>
      <ellipse cx="-160" cy="60" rx="120" ry="30" fill="${light}"/>
      <ellipse cx="-160" cy="46" rx="120" ry="30" fill="#ffffff" stroke="${mid}" stroke-width="8"/>
      <rect x="80" y="-40" width="130" height="140" rx="12" fill="${light}" stroke="${mid}" stroke-width="8"/>
      <rect x="80" y="20" width="130" height="80" rx="8" fill="${mid}" opacity="0.4"/>
      <path d="M-280 -180 L-190 -120 L-250 -60" stroke="${dark}" stroke-width="12" fill="none" stroke-linecap="round"/>
      <path d="M-120 -200 Q-40 -120 40 -200 Q120 -280 200 -200" stroke="#f59e0b" stroke-width="14" fill="none" stroke-linecap="round"/>
      <circle cx="230" cy="-120" r="22" fill="#ef4444"/>
      <circle cx="-230" cy="150" r="18" fill="${dark}"/>
      <circle cx="180" cy="170" r="16" fill="#f59e0b"/>
    </g>`,
  giftbox: (dark, mid, light) => `
    <g>
      <rect x="-200" y="-40" width="400" height="240" rx="18" fill="url(#body)"/>
      <rect x="-220" y="-100" width="440" height="76" rx="16" fill="${mid}"/>
      <rect x="-40" y="-100" width="80" height="300" fill="#f8fafc" opacity="0.75"/>
      <path d="M0 -100 Q-90 -180 -30 -200 Q10 -212 0 -104 Q-10 -212 30 -200 Q90 -180 0 -100 Z" fill="#f8fafc" opacity="0.9"/>
      <rect x="-130" y="-170" width="150" height="60" rx="12" fill="${light}" opacity="0.7" transform="rotate(-8 -55 -140)"/>
    </g>`,
};

const items = [
  ["vehicles-01", "vehicles", art.car, "سيارة سباق بجهاز تحكم عن بعد"],
  ["vehicles-02", "vehicles", art.truck, "شاحنة نقل كبيرة"],
  ["vehicles-03", "vehicles", art.cars6, "طقم 6 سيارات معدنية"],
  ["vehicles-04", "vehicles", art.trike, "دراجة أطفال ثلاثية العجلات"],
  ["dolls-01", "dolls", art.doll, "عروسة كلاسيكية 45 سم"],
  ["dolls-02", "dolls", art.plush, "دمية قطنية 30 سم"],
  ["dolls-03", "dolls", art.animals, "مجموعة مجسمات حيوانات"],
  ["dolls-04", "dolls", art.plush, "دب قطني كبير 60 سم"],
  ["educational-01", "educational", art.blocks, "مكعبات تركيب 120 قطعة"],
  ["educational-02", "educational", art.puzzle, "بازل خشبي للحروف العربية"],
  ["educational-03", "educational", art.board, "لوحة رسم مغناطيسية"],
  ["educational-04", "educational", art.science, "مجموعة تجارب علمية"],
  ["gifts-01", "gifts", art.balloons, "بالونات لاتكس"],
  ["gifts-02", "gifts", art.foil, "بالونات فويل أرقام"],
  ["gifts-03", "gifts", art.party, "طقم تجهيز حفلة"],
  ["gifts-04", "gifts", art.giftbox, "علب هدايا"],
];

let count = 0;
for (const [name, theme, draw, label] of items) {
  for (const variant of ["a", "b"]) {
    const svg = shell(theme, draw, label, variant);
    writeFileSync(resolve(outDir, `${name}-${variant}.svg`), svg, "utf8");
    count += 1;
  }
}

console.log(`تم إنشاء ${count} صورة داخل public/products`);
