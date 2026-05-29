import { useEffect, useRef, useState } from "react";
import { useSettings } from "../lib/settings";
import { db, patchAppState } from "../db/db";
import type { Item } from "../db/types";
import { completeItem } from "../lib/items";
import { finishMessage, startInvitation } from "../lib/language";
import { Card, Button, Label } from "../ui/primitives";
import { CaptureBar } from "../ui/CaptureBar";

const PRESETS = [5, 15, 25];
type Phase = "setup" | "countin" | "running" | "ended" | "rest";

function fmt(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function FocusMode({
  item,
  onExit,
  onPeekNext,
}: {
  item: Item | null;
  onExit: () => void;
  onPeekNext: () => void;
}) {
  const { settings } = useSettings();
  const [phase, setPhase] = useState<Phase>("setup");
  const [planned, setPlanned] = useState(15 * 60);
  const [remaining, setRemaining] = useState(15 * 60);
  const [paused, setPaused] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [endMsg, setEndMsg] = useState("");
  const [park, setPark] = useState(false);
  const startedRef = useRef(0);

  // Count-in: a calm 3-2-1, never a beep.
  useEffect(() => {
    if (phase !== "countin") return;
    if (countdown <= 0) {
      startedRef.current = Date.now();
      setPhase("running");
      return;
    }
    const t = window.setTimeout(() => setCountdown((c) => c - 1), 900);
    return () => window.clearTimeout(t);
  }, [phase, countdown]);

  // The ticking timer.
  useEffect(() => {
    if (phase !== "running" || paused) return;
    if (remaining <= 0) {
      void finish(false);
      return;
    }
    const t = window.setTimeout(() => setRemaining((r) => r - 1), 1000);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, paused, remaining]);

  const begin = (seconds: number) => {
    setPlanned(seconds);
    setRemaining(seconds);
    setCountdown(3);
    setPhase("countin");
    if (item?.id != null) void patchAppState({ last_item_id: item.id, last_position: "focus" });
  };

  const finish = async (early: boolean) => {
    const actual = Math.max(0, Math.round((Date.now() - startedRef.current) / 1000));
    await db.focus_sessions.add({
      item_id: item?.id ?? null,
      duration_planned: planned,
      duration_actual: actual,
      ended_early: early, // logged neutrally, never shown as failure
      created_at: Date.now(),
    });
    if (item?.id != null) await patchAppState({ last_item_id: item.id, last_position: "after-focus" });
    setEndMsg(finishMessage(settings.tone, Math.round(actual / 60)));
    setPhase("ended");
  };

  // ----- The shrinking ring (analog, no digits as the centrepiece) -----
  const R = 130;
  const C = 2 * Math.PI * R;
  let frac = phase === "running" || paused ? remaining / planned : 1;
  // Reduce-motion / low-arousal: update in calm discrete steps, not smoothly.
  if (settings.reduce_motion || settings.low_arousal) {
    frac = Math.ceil(frac * 20) / 20;
  }
  const dash = C * frac;

  const Ring = ({ children }: { children?: React.ReactNode }) => (
    <svg width="320" height="320" viewBox="0 0 320 320" className="mx-auto">
      <circle cx="160" cy="160" r={R} fill="none" stroke="var(--accent-soft)" strokeWidth="22" />
      <circle
        cx="160"
        cy="160"
        r={R}
        fill="none"
        stroke="var(--accent)"
        strokeWidth="22"
        strokeLinecap="round"
        strokeDasharray={`${dash} ${C}`}
        transform="rotate(-90 160 160)"
        style={{
          transition: settings.reduce_motion || settings.low_arousal ? "none" : "stroke-dasharray 1s linear",
        }}
      />
      <foreignObject x="40" y="120" width="240" height="80">
        <div className="text-center">{children}</div>
      </foreignObject>
    </svg>
  );

  return (
    <div className="max-w-xl mx-auto flex flex-col gap-5 animate-fadein">
      <div className="flex items-center justify-between">
        <Label>Focus</Label>
        <button onClick={onExit} className="text-sm" style={{ color: "var(--ink-soft)" }}>
          ← back
        </button>
      </div>

      <Card>
        <div className="text-center text-base mb-1" style={{ color: "var(--ink-soft)" }}>
          {item ? item.tone_text?.trim() || item.raw_text : "Open focus"}
        </div>

        {phase === "setup" && (
          <div className="flex flex-col items-center gap-4">
            <Ring />
            <div className="flex flex-wrap gap-2 justify-center">
              {PRESETS.map((m) => (
                <Button key={m} variant="soft" onClick={() => begin(m * 60)}>
                  {m} min
                </Button>
              ))}
              <CustomDuration onPick={(s) => begin(s)} />
            </div>
            <Button variant="solid" onClick={() => begin(planned)}>
              {startInvitation(settings.tone)}
            </Button>
          </div>
        )}

        {phase === "countin" && (
          <div className="flex flex-col items-center gap-4">
            <Ring>
              <div className="text-5xl" style={{ color: "var(--accent)" }}>
                {countdown > 0 ? countdown : "·"}
              </div>
            </Ring>
            <div className="text-sm" style={{ color: "var(--ink-soft)" }}>
              easing in…
            </div>
          </div>
        )}

        {(phase === "running") && (
          <div className="flex flex-col items-center gap-4">
            <Ring>
              {settings.digital_readout_visible ? (
                <div className="text-3xl tabular-nums" style={{ color: "var(--ink-soft)" }}>
                  {fmt(remaining)}
                </div>
              ) : (
                <div className="text-sm" style={{ color: "var(--ink-soft)" }}>
                  {paused ? "paused" : "with you"}
                </div>
              )}
            </Ring>
            <div className="flex flex-wrap gap-2 justify-center">
              <Button variant="soft" onClick={() => setPaused((p) => !p)}>
                {paused ? "Resume" : "Pause"}
              </Button>
              <Button variant="soft" onClick={() => setRemaining((r) => r + 300)}>
                + 5 minutes
              </Button>
              <Button variant="ghost" onClick={() => setPark((v) => !v)}>
                Park a thought
              </Button>
              <Button variant="ghost" onClick={() => finish(true)}>
                End early
              </Button>
            </div>
            {park && (
              <div className="w-full">
                <CaptureBar compact />
                <div className="text-xs mt-1" style={{ color: "var(--ink-soft)" }}>
                  Ending early is completely fine — your place is kept.
                </div>
              </div>
            )}
          </div>
        )}

        {phase === "ended" && (
          <div className="flex flex-col items-center gap-4 animate-fadein">
            <Ring>
              <div className="text-lg" style={{ color: "var(--accent)" }}>✶</div>
            </Ring>
            <div className="text-lg text-center">{endMsg}</div>
            {item && (
              <Button
                variant="soft"
                onClick={async () => {
                  await completeItem(item.id!);
                  onExit();
                }}
              >
                Mark this done
              </Button>
            )}
            <div className="text-sm" style={{ color: "var(--ink-soft)" }}>
              No rush. What feels right next?
            </div>
            <div className="flex gap-2">
              <Button variant="soft" onClick={onPeekNext}>
                Peek at what's next
              </Button>
              <Button variant="ghost" onClick={() => setPhase("rest")}>
                Rest a moment
              </Button>
            </div>
          </div>
        )}

        {phase === "rest" && (
          <div className="flex flex-col items-center gap-6 py-8 animate-fadein">
            <div
              className="w-24 h-24 rounded-full animate-breathe"
              style={{ background: "var(--accent-soft)", border: "1px solid var(--accent)" }}
            />
            <div className="text-center text-base" style={{ color: "var(--ink-soft)" }}>
              Nothing is required of you right now.
            </div>
            <Button variant="ghost" onClick={onExit}>
              Return whenever you're ready
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}

function CustomDuration({ onPick }: { onPick: (seconds: number) => void }) {
  const [open, setOpen] = useState(false);
  const [mins, setMins] = useState(10);
  if (!open)
    return (
      <Button variant="ghost" onClick={() => setOpen(true)}>
        custom
      </Button>
    );
  return (
    <span className="flex items-center gap-2">
      <input
        type="number"
        min={1}
        max={180}
        value={mins}
        onChange={(e) => setMins(Number(e.target.value))}
        className="w-16 rounded-full px-3 py-1 text-sm"
        style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--ink)" }}
      />
      <Button variant="soft" onClick={() => onPick(Math.max(1, mins) * 60)}>
        set
      </Button>
    </span>
  );
}
