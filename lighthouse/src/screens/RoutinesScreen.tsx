import { useState } from "react";
import { useLiveQuery } from "../lib/useLiveQuery";
import { db } from "../db/db";
import { captureItem, setStatus } from "../lib/items";
import { Card, Button, Label } from "../ui/primitives";

// Routines are opt-in templates, never rigid schedules and never auto-imposed.
// Loading one drops its steps into the flow (NOW/NEXT). No fixed clock times.
export function RoutinesScreen() {
  const routines = useLiveQuery(() => db.routines.toArray(), []) ?? [];
  const [name, setName] = useState("");
  const [steps, setSteps] = useState("");

  const create = async () => {
    if (!name.trim()) return;
    const list = steps.split("\n").map((s) => s.trim()).filter(Boolean);
    await db.routines.add({ name: name.trim(), steps: list, created_at: Date.now() });
    setName("");
    setSteps("");
  };

  const load = async (stepList: string[]) => {
    for (const s of stepList) {
      const id = await captureItem(s);
      if (id > 0) await setStatus(id, "active");
    }
  };

  return (
    <div className="max-w-xl mx-auto flex flex-col gap-5">
      <Card>
        <Label>New routine</Label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Morning, Wind down, Work start"
          className="w-full rounded-full px-4 py-2 mb-2"
          style={{ background: "var(--bg)", border: "1px solid var(--border)", color: "var(--ink)" }}
        />
        <textarea
          value={steps}
          onChange={(e) => setSteps(e.target.value)}
          placeholder="One step per line"
          rows={4}
          className="w-full rounded-xl px-4 py-2 mb-2"
          style={{ background: "var(--bg)", border: "1px solid var(--border)", color: "var(--ink)" }}
        />
        <Button variant="solid" onClick={create}>Save routine</Button>
      </Card>

      {routines.map((r) => (
        <Card key={r.id}>
          <div className="flex items-center justify-between mb-2">
            <div className="text-lg">{r.name}</div>
            <div className="flex gap-2">
              <Button variant="soft" onClick={() => load(r.steps)}>Load when you like</Button>
              <Button variant="ghost" onClick={() => db.routines.delete(r.id!)}>Delete</Button>
            </div>
          </div>
          <ul className="text-sm list-disc pl-5" style={{ color: "var(--ink-soft)" }}>
            {r.steps.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </Card>
      ))}
      {routines.length === 0 && (
        <div className="text-sm text-center" style={{ color: "var(--ink-soft)" }}>
          No routines yet. They're optional — make one only if it would help.
        </div>
      )}
    </div>
  );
}
