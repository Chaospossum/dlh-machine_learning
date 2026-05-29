import { useSettings } from "../lib/settings";

// Optional gentle gamification for the ADHD side: a filling lighthouse beam.
// It ONLY ever grows with completions — it never shrinks or resets.
export function Beam() {
  const { settings } = useSettings();
  const p = settings.beam_progress;
  // Beam brightness grows and asymptotes; calm, never a "0% / behind" feeling.
  const fill = Math.min(1, p / (p + 8));
  return (
    <div className="flex items-center gap-3" title={`${p} small wins kept`}>
      <div
        className="relative w-7 h-10 rounded-t-full overflow-hidden shrink-0"
        style={{ background: "var(--accent-soft)", border: "1px solid var(--border)" }}
        aria-hidden
      >
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{ height: `${fill * 100}%`, background: "var(--accent)" }}
        />
      </div>
      <span className="text-xs" style={{ color: "var(--ink-soft)" }}>
        {p === 0 ? "Your lighthouse is ready to glow" : `${p} small win${p === 1 ? "" : "s"} kept`}
      </span>
    </div>
  );
}
