import { db, patchSettings, getSettings } from "../db/db";
import type { Item } from "../db/types";

export async function captureItem(rawText: string): Promise<number> {
  const text = rawText.trim();
  if (!text) return -1;
  const now = Date.now();
  const maxOrder = await db.items.orderBy("order").last();
  const id = await db.items.add({
    raw_text: text,
    tone_text: null,
    status: "inbox",
    energy_cost: null,
    parent_id: null,
    order: (maxOrder?.order ?? 0) + 1,
    created_at: now,
    updated_at: now,
  });
  return id as number;
}

export async function completeItem(id: number): Promise<void> {
  await db.items.update(id, { status: "done", updated_at: Date.now() });
  // The lighthouse beam only ever grows — never shrinks or resets.
  const s = await getSettings();
  await patchSettings({ beam_progress: s.beam_progress + 1 });
}

// "Not today" rolls forward silently and neutrally — no guilt, no red.
export async function notToday(id: number): Promise<void> {
  const maxOrder = await db.items.orderBy("order").last();
  await db.items.update(id, {
    order: (maxOrder?.order ?? 0) + 1,
    updated_at: Date.now(),
  });
}

export async function setEnergyCost(id: number, cost: number | null): Promise<void> {
  await db.items.update(id, { energy_cost: cost, updated_at: Date.now() });
}

export async function setStatus(id: number, status: Item["status"]): Promise<void> {
  await db.items.update(id, { status, updated_at: Date.now() });
}

export async function updateText(
  id: number,
  patch: Partial<Pick<Item, "raw_text" | "tone_text">>,
): Promise<void> {
  await db.items.update(id, { ...patch, updated_at: Date.now() });
}

export async function deleteItemAndChildren(id: number): Promise<void> {
  const kids = await db.items.where("parent_id").equals(id).toArray();
  await Promise.all(kids.map((k) => db.items.delete(k.id!)));
  await db.items.delete(id);
}

export async function addSubSteps(parentId: number, steps: string[]): Promise<void> {
  const now = Date.now();
  const existing = await db.items.where("parent_id").equals(parentId).count();
  let order = existing;
  for (const step of steps) {
    await db.items.add({
      raw_text: step,
      tone_text: null,
      status: "active",
      energy_cost: null,
      parent_id: parentId,
      order: order++,
      created_at: now,
      updated_at: now,
    });
  }
  // Parent becomes active and stays as the umbrella task.
  await db.items.update(parentId, { status: "active", updated_at: now });
}

// Surface logic: pick the single visible action. If an active task has open
// sub-steps, only the FIRST open sub-step is the candidate (initiation help).
// Energy-matched: at low energy, only the tiniest (low energy_cost) surface.
export interface NowNext {
  now: Item | null;
  next: Item | null;
  parentOf: (item: Item) => Promise<Item | undefined>;
}

export async function selectNowNext(energyToday: number): Promise<{
  now: Item | null;
  next: Item | null;
}> {
  const all = await db.items
    .where("status")
    .anyOf("inbox", "active")
    .toArray();

  // sub-steps eligible only if they are the first open step of their parent
  const childrenByParent = new Map<number, Item[]>();
  for (const it of all) {
    if (it.parent_id != null) {
      const arr = childrenByParent.get(it.parent_id) ?? [];
      arr.push(it);
      childrenByParent.set(it.parent_id, arr);
    }
  }

  const candidates: Item[] = [];
  for (const it of all) {
    if (it.parent_id != null) continue; // children handled via parents
    const kids = (childrenByParent.get(it.id!) ?? [])
      .filter((k) => k.status !== "done")
      .sort((a, b) => a.order - b.order);
    if (kids.length > 0) {
      candidates.push(kids[0]); // only the first open step shows
    } else if (it.status !== "done") {
      candidates.push(it);
    }
  }

  // Energy match: low energy (1-2) surfaces only low-cost / uncosted-light items.
  const energyOk = (it: Item) => {
    if (it.energy_cost == null) return true; // unknown cost is always allowed
    if (energyToday <= 2) return it.energy_cost <= 2;
    if (energyToday === 3) return it.energy_cost <= 3;
    return true; // high energy: everything is fair game
  };

  let pool = candidates.filter(energyOk);
  if (pool.length === 0) pool = candidates; // never show an empty screen if work exists

  pool.sort((a, b) => a.order - b.order);
  return { now: pool[0] ?? null, next: pool[1] ?? null };
}

// Reroll: pick a different surfaced candidate for the NOW card (ADHD novelty).
export async function rerollNow(
  energyToday: number,
  excludeId: number | null,
): Promise<Item | null> {
  const { now, next } = await selectNowNext(energyToday);
  if (next && next.id !== excludeId) return next;
  if (now && now.id !== excludeId) return now;
  return now;
}
