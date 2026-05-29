export type ItemStatus = "inbox" | "active" | "done" | "someday";

export interface Item {
  id?: number;
  raw_text: string;
  tone_text: string | null;
  status: ItemStatus;
  energy_cost: number | null; // 1-5
  parent_id: number | null;
  order: number;
  created_at: number;
  updated_at: number;
}

export interface Routine {
  id?: number;
  name: string;
  steps: string[];
  created_at: number;
}

export type Tone = "gentle" | "neutral" | "cheerleader" | "dry";
export type Density = "cosy" | "compact";

export interface Settings {
  id: number; // always 1
  tone: Tone;
  theme: string; // accent theme key
  reduce_motion: boolean;
  font: "system" | "atkinson" | "opendyslexic";
  text_scale: number; // 0.9 - 1.4
  line_spacing: number; // 1.4 - 2.0
  density: Density;
  dark_mode: boolean;
  true_dark: boolean;
  low_arousal: boolean;
  energy_today: number; // 1-5
  digital_readout_visible: boolean;
  beam_progress: number; // only ever grows (count of completions)
}

export interface FocusSession {
  id?: number;
  item_id: number | null;
  duration_planned: number; // seconds
  duration_actual: number; // seconds
  ended_early: boolean;
  created_at: number;
}

export interface AppState {
  id: number; // always 1
  last_item_id: number | null;
  last_position: string | null;
}
