import { useSettings } from "../lib/settings";
import { Label } from "./primitives";

const WORDS = ["running low", "quiet", "steady", "good", "lots"];

// A gentle "energy today" check-in. No judgement, no demand — just a dial
// that reshapes what surfaces. Energy-matched, not time-matched.
export function EnergySlider() {
  const { settings, update } = useSettings();
  return (
    <div>
      <Label>Energy today</Label>
      <div className="flex items-center gap-3">
        <input
          type="range"
          min={1}
          max={5}
          step={1}
          value={settings.energy_today}
          onChange={(e) => update({ energy_today: Number(e.target.value) })}
          aria-label="Energy today, 1 to 5"
          className="flex-1 accent-[color:var(--accent)]"
        />
        <span className="text-sm w-24 text-right" style={{ color: "var(--ink-soft)" }}>
          {WORDS[settings.energy_today - 1]}
        </span>
      </div>
    </div>
  );
}
