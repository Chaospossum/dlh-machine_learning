import Dexie, { type Table } from "dexie";
import type {
  Item,
  Routine,
  Settings,
  FocusSession,
  AppState,
} from "./types";

export const DEFAULT_SETTINGS: Settings = {
  id: 1,
  tone: "gentle",
  theme: "sea",
  reduce_motion: false,
  font: "system",
  text_scale: 1,
  line_spacing: 1.6,
  density: "cosy",
  dark_mode: false,
  true_dark: false,
  low_arousal: false,
  energy_today: 3,
  digital_readout_visible: false,
  beam_progress: 0,
};

export class LighthouseDB extends Dexie {
  items!: Table<Item, number>;
  routines!: Table<Routine, number>;
  settings!: Table<Settings, number>;
  focus_sessions!: Table<FocusSession, number>;
  app_state!: Table<AppState, number>;

  constructor() {
    super("lighthouse");
    this.version(1).stores({
      items: "++id, status, parent_id, order, created_at",
      routines: "++id, name, created_at",
      settings: "id",
      focus_sessions: "++id, item_id, created_at",
      app_state: "id",
    });
  }
}

export const db = new LighthouseDB();

export async function getSettings(): Promise<Settings> {
  const existing = await db.settings.get(1);
  if (existing) return { ...DEFAULT_SETTINGS, ...existing, id: 1 };
  await db.settings.put(DEFAULT_SETTINGS);
  return DEFAULT_SETTINGS;
}

export async function patchSettings(patch: Partial<Settings>): Promise<void> {
  const current = await getSettings();
  await db.settings.put({ ...current, ...patch, id: 1 });
}

export async function getAppState(): Promise<AppState> {
  const existing = await db.app_state.get(1);
  if (existing) return existing;
  const fresh: AppState = { id: 1, last_item_id: null, last_position: null };
  await db.app_state.put(fresh);
  return fresh;
}

export async function patchAppState(patch: Partial<AppState>): Promise<void> {
  const current = await getAppState();
  await db.app_state.put({ ...current, ...patch, id: 1 });
}
