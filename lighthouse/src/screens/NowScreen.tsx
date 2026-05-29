import { useEffect, useState } from "react";
import { useLiveQuery } from "../lib/useLiveQuery";
import { useSettings } from "../lib/settings";
import { db, getAppState } from "../db/db";
import type { Item } from "../db/types";
import {
  selectNowNext,
  completeItem,
  notToday,
  rerollNow,
  addSubSteps,
  updateText,
} from "../lib/items";
import { breakDown, rephraseTone, aiEnabled } from "../lib/ai";
import { startInvitation, encouragement } from "../lib/language";
import { Card, Button, Label } from "../ui/primitives";
import { EnergySlider } from "../ui/EnergySlider";
import { Beam } from "../ui/Beam";

function displayText(item: Item): string {
  return item.tone_text?.trim() || item.raw_text;
}

export function NowScreen({ onFocus }: { onFocus: (item: Item | null) => void }) {
  const { settings } = useSettings();
  const energy = settings.energy_today;

  const pair = useLiveQuery(() => selectNowNext(energy), [energy]);
  const appState = useLiveQuery(() => getAppState(), []);
  const [rerolled, setRerolled] = useState<Item | null>(null);
  const [flash, setFlash] = useState<string | null>(null);
  const [aiOn, setAiOn] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    void aiEnabled().then(setAiOn);
  }, []);

  // Reset reroll when the underlying NOW changes.
  useEffect(() => setRerolled(null), [pair?.now?.id]);

  const now = rerolled ?? pair?.now ?? null;
  const next = pair?.next ?? null;

  const resumeItem = useLiveQuery(async () => {
    const st = await getAppState();
    if (st.last_item_id == null) return null;
    const it = await db.items.get(st.last_item_id);
    return it && it.status !== "done" ? it : null;
  }, [appState?.last_item_id]);

  const doComplete = async (item: Item) => {
    await completeItem(item.id!);
    setFlash(encouragement(settings.tone));
    setRerolled(null);
    window.setTimeout(() => setFlash(null), 1600);
  };

  const doReroll = async () => {
    const r = await rerollNow(energy, now?.id ?? null);
    setRerolled(r);
  };

  const doBreakdown = async (item: Item) => {
    setBusy(true);
    const steps = await breakDown(item.raw_text);
    await addSubSteps(item.id!, steps);
    setBusy(false);
  };

  const doTone = async (item: Item) => {
    setBusy(true);
    const t = await rephraseTone(item.raw_text, settings.tone);
    await updateText(item.id!, { tone_text: t });
    setBusy(false);
  };

  return (
    <div className="max-w-xl mx-auto flex flex-col gap-5">
      <Card>
        <EnergySlider />
      </Card>

      {resumeItem && (
        <Card className="animate-fadein">
          <Label>Where you were</Label>
          <div className="text-base mb-3">{displayText(resumeItem)}</div>
          <Button variant="soft" onClick={() => onFocus(resumeItem)}>
            Pick this back up, if you like
          </Button>
        </Card>
      )}

      {/* NOW card — the single suggested action */}
      <Card className="animate-fadein">
        <div className="flex items-center justify-between mb-2">
          <Label>Right now</Label>
          {now && (
            <button
              onClick={doReroll}
              className="text-xs"
              style={{ color: "var(--accent)" }}
              title="Show me a different one"
            >
              ↻ a different one
            </button>
          )}
        </div>
        {now ? (
          <>
            <div className="text-2xl leading-snug mb-1">{displayText(now)}</div>
            {now.tone_text && (
              <div className="text-xs mb-3" style={{ color: "var(--ink-soft)" }}>
                {now.raw_text}
              </div>
            )}
            <div className="flex flex-wrap gap-2 mt-3">
              <Button variant="solid" onClick={() => onFocus(now)}>
                {startInvitation(settings.tone)}
              </Button>
              <Button variant="soft" onClick={() => doComplete(now)}>
                Done
              </Button>
              <Button variant="ghost" onClick={() => notToday(now.id!)}>
                Not today
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              <Button variant="ghost" disabled={busy} onClick={() => doBreakdown(now)}>
                {aiOn ? "Break this down" : "Break into steps"}
              </Button>
              <Button variant="ghost" disabled={busy} onClick={() => doTone(now)}>
                Soften the wording
              </Button>
            </div>
          </>
        ) : (
          <div className="text-base" style={{ color: "var(--ink-soft)" }}>
            Nothing is asked of you right now. Capture a thought above whenever
            one floats by — or simply rest.
          </div>
        )}
      </Card>

      {/* NEXT card — calm preview, never a surprise */}
      <Card>
        <Label>After that</Label>
        {next ? (
          <div className="text-base" style={{ color: "var(--ink-soft)" }}>
            {displayText(next)}
          </div>
        ) : (
          <div className="text-sm" style={{ color: "var(--ink-soft)" }}>
            Nothing waiting. A clear horizon.
          </div>
        )}
      </Card>

      <Beam />

      {flash && (
        <div
          className="fixed left-1/2 -translate-x-1/2 bottom-24 px-5 py-3 rounded-full animate-pop text-sm"
          style={{ background: "var(--accent)", color: "white" }}
        >
          {flash}
        </div>
      )}
    </div>
  );
}

// expose helper for focus screen reuse
export { displayText };
