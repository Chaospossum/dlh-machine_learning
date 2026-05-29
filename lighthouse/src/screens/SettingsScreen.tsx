import { useSettings } from "../lib/settings";
import { THEMES } from "../lib/themes";
import { Card, Label } from "../ui/primitives";
import type { Settings, Tone } from "../db/types";

function Toggle({
  label,
  value,
  onChange,
  hint,
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
  hint?: string;
}) {
  return (
    <label className="flex items-center justify-between gap-4 py-2 cursor-pointer">
      <span>
        {label}
        {hint && <span className="block text-xs" style={{ color: "var(--ink-soft)" }}>{hint}</span>}
      </span>
      <button
        type="button"
        onClick={() => onChange(!value)}
        className="w-12 h-7 rounded-full relative transition-colors shrink-0"
        style={{ background: value ? "var(--accent)" : "var(--border)" }}
        aria-pressed={value}
      >
        <span
          className="absolute top-1 w-5 h-5 rounded-full bg-white transition-all"
          style={{ left: value ? "26px" : "4px" }}
        />
      </button>
    </label>
  );
}

const TONES: { key: Tone; label: string }[] = [
  { key: "gentle", label: "Gentle" },
  { key: "neutral", label: "Neutral" },
  { key: "cheerleader", label: "Cheerleader" },
  { key: "dry", label: "Dry" },
];

const FONTS: { key: Settings["font"]; label: string }[] = [
  { key: "system", label: "System" },
  { key: "atkinson", label: "Atkinson Hyperlegible" },
  { key: "opendyslexic", label: "OpenDyslexic" },
];

export function SettingsScreen() {
  const { settings, update } = useSettings();

  return (
    <div className="max-w-xl mx-auto flex flex-col gap-5">
      <Card>
        <Label>Tone of voice</Label>
        <div className="flex flex-wrap gap-2">
          {TONES.map((t) => (
            <button
              key={t.key}
              onClick={() => update({ tone: t.key })}
              className="rounded-full px-4 py-2 text-sm"
              style={{
                background: settings.tone === t.key ? "var(--accent)" : "var(--accent-soft)",
                color: settings.tone === t.key ? "white" : "var(--ink)",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </Card>

      <Card>
        <Label>Accent theme</Label>
        <div className="flex flex-wrap gap-2">
          {THEMES.map((t) => (
            <button
              key={t.key}
              onClick={() => update({ theme: t.key })}
              title={t.name}
              className="w-9 h-9 rounded-full"
              style={{
                background: t.accent,
                outline: settings.theme === t.key ? "3px solid var(--ink-soft)" : "none",
                outlineOffset: "2px",
              }}
            />
          ))}
        </div>
      </Card>

      <Card>
        <Label>Comfort</Label>
        <Toggle label="Dark mode" value={settings.dark_mode} onChange={(v) => update({ dark_mode: v })} />
        <Toggle label="True-dark mode" hint="Pure black, for OLED and very low light" value={settings.true_dark} onChange={(v) => update({ true_dark: v })} />
        <Toggle label="Reduce motion" hint="Stills all animation; the ring still updates calmly" value={settings.reduce_motion} onChange={(v) => update({ reduce_motion: v })} />
        <Toggle label="Show the numbers in focus" hint="Off by default — ticking digits can add pressure" value={settings.digital_readout_visible} onChange={(v) => update({ digital_readout_visible: v })} />
        <Toggle
          label="Low-arousal mode"
          hint="One tap: strips colour, motion, and sound to the calm minimum"
          value={settings.low_arousal}
          onChange={(v) => update({ low_arousal: v })}
        />
      </Card>

      <Card>
        <Label>Reading</Label>
        <div className="mb-3">
          <div className="text-sm mb-1">Font</div>
          <div className="flex flex-wrap gap-2">
            {FONTS.map((f) => (
              <button
                key={f.key}
                onClick={() => update({ font: f.key })}
                className="rounded-full px-3 py-1 text-sm"
                style={{
                  background: settings.font === f.key ? "var(--accent)" : "var(--accent-soft)",
                  color: settings.font === f.key ? "white" : "var(--ink)",
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
        <div className="mb-3">
          <div className="text-sm mb-1">Text size</div>
          <input type="range" min={0.9} max={1.4} step={0.05} value={settings.text_scale}
            onChange={(e) => update({ text_scale: Number(e.target.value) })}
            className="w-full accent-[color:var(--accent)]" />
        </div>
        <div className="mb-3">
          <div className="text-sm mb-1">Line spacing</div>
          <input type="range" min={1.4} max={2.0} step={0.1} value={settings.line_spacing}
            onChange={(e) => update({ line_spacing: Number(e.target.value) })}
            className="w-full accent-[color:var(--accent)]" />
        </div>
        <div>
          <div className="text-sm mb-1">Density</div>
          <div className="flex gap-2">
            {(["cosy", "compact"] as const).map((d) => (
              <button key={d} onClick={() => update({ density: d })}
                className="rounded-full px-4 py-1 text-sm capitalize"
                style={{ background: settings.density === d ? "var(--accent)" : "var(--accent-soft)", color: settings.density === d ? "white" : "var(--ink)" }}>
                {d}
              </button>
            ))}
          </div>
        </div>
      </Card>

      <div className="text-xs text-center pb-4" style={{ color: "var(--ink-soft)" }}>
        Everything you capture lives only on this device.
      </div>
    </div>
  );
}
