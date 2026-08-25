import type { CSSProperties } from "react";

import siteSettings from "@/data/site-settings.json";

export type PublishedSiteTheme = {
  primary: string;
  accent: string;
  background: string;
};

type ThemeStyle = CSSProperties & Record<`--${string}`, string>;

function normalizeHex(value: string, fallback: string) {
  const normalized = value.trim().replace("#", "");
  return /^[0-9a-fA-F]{6}$/.test(normalized) ? `#${normalized.toUpperCase()}` : fallback;
}

function mix(color: string, target: string, amount: number) {
  const parse = (value: string): [number, number, number] => [
    Number.parseInt(value.slice(1, 3), 16),
    Number.parseInt(value.slice(3, 5), 16),
    Number.parseInt(value.slice(5, 7), 16),
  ];
  const [red, green, blue] = parse(normalizeHex(color, "#3263F0"));
  const [targetRed, targetGreen, targetBlue] = parse(normalizeHex(target, "#FFFFFF"));
  const channel = (source: number, targetValue: number) => Math.round(source + (targetValue - source) * amount).toString(16).padStart(2, "0");
  return `#${channel(red, targetRed)}${channel(green, targetGreen)}${channel(blue, targetBlue)}`.toUpperCase();
}

export const publishedSiteTheme: PublishedSiteTheme = {
  primary: normalizeHex(siteSettings.theme.primary, "#3263F0"),
  accent: normalizeHex(siteSettings.theme.accent, "#F05C0F"),
  background: normalizeHex(siteSettings.theme.background, "#FFFDF8"),
};

export function getThemeCssVariables(theme = publishedSiteTheme): ThemeStyle {
  return {
    "--color-brand-50": mix(theme.primary, "#FFFFFF", 0.94),
    "--color-brand-100": mix(theme.primary, "#FFFFFF", 0.86),
    "--color-brand-200": mix(theme.primary, "#FFFFFF", 0.73),
    "--color-brand-300": mix(theme.primary, "#FFFFFF", 0.55),
    "--color-brand-400": mix(theme.primary, "#FFFFFF", 0.28),
    "--color-brand-500": theme.primary,
    "--color-brand-600": mix(theme.primary, "#000000", 0.12),
    "--color-brand-700": mix(theme.primary, "#000000", 0.25),
    "--color-brand-800": mix(theme.primary, "#000000", 0.39),
    "--color-brand-900": mix(theme.primary, "#000000", 0.52),
    "--color-brand-950": mix(theme.primary, "#000000", 0.68),
    "--color-accent-50": mix(theme.accent, "#FFFFFF", 0.94),
    "--color-accent-100": mix(theme.accent, "#FFFFFF", 0.84),
    "--color-accent-200": mix(theme.accent, "#FFFFFF", 0.7),
    "--color-accent-300": mix(theme.accent, "#FFFFFF", 0.5),
    "--color-accent-400": mix(theme.accent, "#FFFFFF", 0.25),
    "--color-accent-500": theme.accent,
    "--color-accent-600": mix(theme.accent, "#000000", 0.12),
    "--color-accent-700": mix(theme.accent, "#000000", 0.24),
    "--color-accent-800": mix(theme.accent, "#000000", 0.37),
    "--color-accent-900": mix(theme.accent, "#000000", 0.5),
    "--color-cream": theme.background,
    "--color-cream-deep": mix(theme.background, "#000000", 0.03),
  };
}
