import type { Tone } from "../db/types";
import { applyToneLocally } from "./language";

// AI helpers are a progressive enhancement. Every call tries the local proxy
// (/api/*) and silently falls back to a manual/local result on any failure,
// so capture and the core app are never blocked.

async function proxyAvailable(): Promise<boolean> {
  try {
    const res = await fetch("/api/health", { method: "GET" });
    if (!res.ok) return false;
    const data = await res.json();
    return Boolean(data.hasKey);
  } catch {
    return false;
  }
}

export async function aiEnabled(): Promise<boolean> {
  return proxyAvailable();
}

// Returns 3-7 tiny concrete first-actions. Falls back to a gentle manual nudge.
export async function breakDown(text: string): Promise<string[]> {
  try {
    const res = await fetch("/api/breakdown", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    if (!res.ok) throw new Error("breakdown failed");
    const data = await res.json();
    if (Array.isArray(data.steps) && data.steps.length) {
      return data.steps.slice(0, 7).map((s: string) => String(s));
    }
    throw new Error("no steps");
  } catch {
    // Manual fallback: a single inviting starter step the user can edit/expand.
    return [`A tiny first move toward: ${text}`];
  }
}

export async function rephraseTone(text: string, tone: Tone): Promise<string> {
  try {
    const res = await fetch("/api/tone", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, tone }),
    });
    if (!res.ok) throw new Error("tone failed");
    const data = await res.json();
    if (data.text) return String(data.text);
    throw new Error("no text");
  } catch {
    return applyToneLocally(text, tone);
  }
}
