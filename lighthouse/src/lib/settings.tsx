import { createContext, useContext, useEffect } from "react";
import type { ReactNode } from "react";
import { useLiveQuery } from "./useLiveQuery";
import { getSettings, patchSettings, DEFAULT_SETTINGS } from "../db/db";
import type { Settings } from "../db/types";
import { themeByKey } from "./themes";

interface SettingsCtx {
  settings: Settings;
  update: (patch: Partial<Settings>) => Promise<void>;
}

const Ctx = createContext<SettingsCtx>({
  settings: DEFAULT_SETTINGS,
  update: async () => {},
});

const FONT_STACK: Record<Settings["font"], string> = {
  system: "system-ui, -apple-system, sans-serif",
  atkinson: "'Atkinson Hyperlegible', system-ui, sans-serif",
  opendyslexic: "'OpenDyslexic', 'Comic Sans MS', system-ui, sans-serif",
};

export function SettingsProvider({ children }: { children: ReactNode }) {
  const settings = useLiveQuery(() => getSettings(), []) ?? DEFAULT_SETTINGS;

  useEffect(() => {
    const root = document.documentElement;
    const low = settings.low_arousal;
    const theme = themeByKey(settings.theme);

    // Low-arousal mode strips colour to a calm neutral everywhere.
    root.style.setProperty("--accent", low ? "#8a8a86" : theme.accent);
    root.style.setProperty("--accent-soft", low ? "#e9e7e2" : theme.accentSoft);
    root.style.setProperty("--app-font", FONT_STACK[settings.font]);
    root.style.setProperty("--text-scale", String(settings.text_scale));
    root.style.setProperty("--line-spacing", String(settings.line_spacing));

    root.classList.toggle("dark", settings.dark_mode || settings.true_dark);
    root.classList.toggle("true-dark", settings.true_dark);
    root.classList.toggle(
      "reduce-motion",
      settings.reduce_motion || settings.low_arousal,
    );
    root.classList.toggle("low-arousal", settings.low_arousal);
    root.classList.toggle("compact", settings.density === "compact");
  }, [settings]);

  const update = (patch: Partial<Settings>) => patchSettings(patch);

  return <Ctx.Provider value={{ settings, update }}>{children}</Ctx.Provider>;
}

export function useSettings() {
  return useContext(Ctx);
}
