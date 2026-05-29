import { useState } from "react";
import { useLiveQuery } from "../lib/useLiveQuery";
import { db } from "../db/db";
import type { Item } from "../db/types";
import { looseMatch } from "../lib/search";
import { setStatus, deleteItemAndChildren, completeItem } from "../lib/items";
import { Card, Button, Label } from "../ui/primitives";

// Opened deliberately, never the default. A calm browsable list grouped loosely.
// No dates shouting, no red, no completion percentages.
export function EverythingScreen() {
  const [q, setQ] = useState("");
  const items = useLiveQuery(() => db.items.toArray(), []) ?? [];

  const top = items
    .filter((i) => i.parent_id == null)
    .filter((i) => looseMatch(q, i.raw_text + " " + (i.tone_text ?? "")))
    .sort((a, b) => a.order - b.order);

  const groups: { key: string; title: string; list: Item[] }[] = [
    { key: "active", title: "Today-ish", list: top.filter((i) => i.status === "active") },
    { key: "inbox", title: "Soon-ish", list: top.filter((i) => i.status === "inbox") },
    { key: "someday", title: "Someday", list: top.filter((i) => i.status === "someday") },
    { key: "done", title: "Done", list: top.filter((i) => i.status === "done") },
  ];

  const reorder = async (dragId: number, dropId: number) => {
    const a = items.find((i) => i.id === dragId);
    const b = items.find((i) => i.id === dropId);
    if (!a || !b) return;
    await db.items.update(a.id!, { order: b.order });
    await db.items.update(b.id!, { order: a.order });
  };

  return (
    <div className="max-w-xl mx-auto flex flex-col gap-5">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        spellCheck={false}
        placeholder="Search — rough spelling is fine"
        className="rounded-full px-5 py-3"
        style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--ink)" }}
      />
      {groups.map((g) =>
        g.list.length ? (
          <div key={g.key}>
            <Label>{g.title}</Label>
            <div className="flex flex-col gap-2">
              {g.list.map((it) => (
                <Row key={it.id} item={it} items={items} onReorder={reorder} />
              ))}
            </div>
          </div>
        ) : null,
      )}
      {top.length === 0 && (
        <Card>
          <div className="text-sm" style={{ color: "var(--ink-soft)" }}>
            {q ? "Nothing matches — try a different word." : "Nothing here yet. A clear, quiet space."}
          </div>
        </Card>
      )}
    </div>
  );
}

function Row({
  item,
  items,
  onReorder,
}: {
  item: Item;
  items: Item[];
  onReorder: (dragId: number, dropId: number) => void;
}) {
  const kids = items
    .filter((i) => i.parent_id === item.id)
    .sort((a, b) => a.order - b.order);
  const [open, setOpen] = useState(false);

  return (
    <div
      draggable
      onDragStart={(e) => e.dataTransfer.setData("text/id", String(item.id))}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        const id = Number(e.dataTransfer.getData("text/id"));
        if (id && id !== item.id) onReorder(id, item.id!);
      }}
      className="density-pad rounded-xl p-3"
      style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
    >
      <div className="flex items-center gap-2">
        <span className="cursor-grab select-none" style={{ color: "var(--ink-soft)" }} title="Drag to reorder">⠿</span>
        <span className="flex-1" style={{ textDecoration: item.status === "done" ? "line-through" : "none", color: item.status === "done" ? "var(--ink-soft)" : "var(--ink)" }}>
          {item.tone_text?.trim() || item.raw_text}
        </span>
        {kids.length > 0 && (
          <button className="text-xs" style={{ color: "var(--accent)" }} onClick={() => setOpen((o) => !o)}>
            {open ? "hide steps" : `${kids.length} steps`}
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        {item.status !== "done" && (
          <Button variant="ghost" onClick={() => completeItem(item.id!)}>Done</Button>
        )}
        {item.status !== "someday" && item.status !== "done" && (
          <Button variant="ghost" onClick={() => setStatus(item.id!, "someday")}>Someday</Button>
        )}
        {item.status === "someday" && (
          <Button variant="ghost" onClick={() => setStatus(item.id!, "inbox")}>Bring back</Button>
        )}
        <Button variant="ghost" onClick={() => deleteItemAndChildren(item.id!)}>Remove</Button>
      </div>
      {open && (
        <div className="mt-2 pl-6 flex flex-col gap-1">
          {kids.map((k) => (
            <div key={k.id} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={k.status === "done"}
                onChange={() => (k.status === "done" ? setStatus(k.id!, "active") : completeItem(k.id!))}
              />
              <span style={{ textDecoration: k.status === "done" ? "line-through" : "none", color: "var(--ink-soft)" }}>
                {k.raw_text}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
