import { useState, useEffect } from "react";
import { Button } from "./primitives";

// Always-reachable safety valve. Clears the screen to a single calm breathing
// prompt and hides all tasks until the user chooses to return.
export function Overwhelm({ onClose }: { onClose: () => void }) {
  const [cue, setCue] = useState("breathe in");
  useEffect(() => {
    const cues = ["breathe in", "hold", "breathe out", "rest"];
    let i = 0;
    const t = window.setInterval(() => {
      i = (i + 1) % cues.length;
      setCue(cues[i]);
    }, 4000);
    return () => window.clearInterval(t);
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-10"
      style={{ background: "var(--bg)" }}
    >
      <div
        className="w-40 h-40 rounded-full animate-breathe"
        style={{ background: "var(--accent-soft)", border: "2px solid var(--accent)" }}
      />
      <div className="text-xl" style={{ color: "var(--ink-soft)" }}>{cue}</div>
      <div className="text-center max-w-xs text-sm" style={{ color: "var(--ink-soft)" }}>
        Nothing is here but this. Your tasks are safely kept and out of sight.
      </div>
      <Button variant="soft" onClick={onClose}>
        Come back whenever you're ready
      </Button>
    </div>
  );
}
