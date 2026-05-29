// Rotating accent themes for the ADHD-side novelty. These only change colour,
// never layout or behaviour. Muted, soft-contrast palettes throughout.
export interface AccentTheme {
  key: string;
  name: string;
  accent: string;
  accentSoft: string;
}

export const THEMES: AccentTheme[] = [
  { key: "sea", name: "Sea glass", accent: "#5b8a8c", accentSoft: "#dceae9" },
  { key: "sand", name: "Warm sand", accent: "#b08968", accentSoft: "#efe6da" },
  { key: "lavender", name: "Lavender", accent: "#8579a8", accentSoft: "#e7e2f0" },
  { key: "moss", name: "Soft moss", accent: "#6f8f5e", accentSoft: "#e2ecdb" },
  { key: "clay", name: "Dusty clay", accent: "#b07a76", accentSoft: "#efe0df" },
  { key: "slate", name: "Quiet slate", accent: "#6b7c93", accentSoft: "#e1e6ec" },
];

export function themeByKey(key: string): AccentTheme {
  return THEMES.find((t) => t.key === key) ?? THEMES[0];
}

export function nextThemeKey(current: string): string {
  const i = THEMES.findIndex((t) => t.key === current);
  return THEMES[(i + 1) % THEMES.length].key;
}
