import type { Tone } from "../db/types";

// PDA-safe language layer. We never use demand words anywhere the user reads:
// need, must, now, urgently, should, have to, overdue, failed, behind.
// Everything is invitation and choice.

const DEMAND_WORDS = /\b(need to|needs to|need|must|should|have to|has to|gotta|urgent(ly)?|asap|now|immediately|overdue|deadline|failed|behind)\b/gi;

// Local (no-AI) tone rephrasing: strip demand words and wrap as invitation.
export function applyToneLocally(text: string, tone: Tone): string {
  let core = text.trim();
  core = core.replace(DEMAND_WORDS, "").replace(/\s{2,}/g, " ").trim();
  // strip a leading "to " left over from "need to ..."
  core = core.replace(/^to\s+/i, "");
  if (!core) core = text.trim();
  const lower = core.charAt(0).toLowerCase() + core.slice(1);
  switch (tone) {
    case "gentle":
      return `Whenever you're ready, maybe ${lower}`;
    case "cheerleader":
      return `You've got this — how about ${lower}? ✨`;
    case "dry":
      return `${core}. Or not. Your call.`;
    case "neutral":
    default:
      return core;
  }
}

// Invitation phrasing for the NOW card call-to-action.
export function startInvitation(tone: Tone): string {
  switch (tone) {
    case "cheerleader":
      return "Let's gently begin ✨";
    case "dry":
      return "Begin, if you like.";
    case "gentle":
      return "Want to start with this?";
    case "neutral":
    default:
      return "Start when you're ready";
  }
}

const FINISH_LINES: Record<Tone, string[]> = {
  gentle: [
    "Nice — you stayed with it for {m}.",
    "That was {m} of showing up. Lovely.",
    "{m} done, gently. Rest if you like.",
    "You gave it {m}. That's plenty.",
    "Soft landing after {m}. Well done you.",
  ],
  neutral: [
    "{m} of focus logged.",
    "Session done — {m}.",
    "That's {m} in.",
    "Wrapped up {m}.",
    "{m} complete.",
  ],
  cheerleader: [
    "Yes! {m} of focus — you did that! ✨",
    "Brilliant — {m} down! 🌟",
    "Look at you, {m} of staying with it! 🎉",
    "{m}?! Amazing work. 💫",
    "That was a great {m}. Proud of you! 🌈",
  ],
  dry: [
    "{m}. Acceptable.",
    "Survived {m}. Congratulations, technically.",
    "{m} of focus. The lighthouse approves.",
    "Well, that was {m}.",
    "{m} done. Nobody can take that from you.",
  ],
};

let lastFinishIndex = -1;
export function finishMessage(tone: Tone, minutes: number): string {
  const lines = FINISH_LINES[tone];
  let i = Math.floor(Math.random() * lines.length);
  if (i === lastFinishIndex) i = (i + 1) % lines.length; // never the same twice in a row
  lastFinishIndex = i;
  const m =
    minutes <= 0
      ? "a moment"
      : minutes === 1
        ? "1 minute"
        : `${minutes} minutes`;
  return lines[i].replace("{m}", m);
}

const ENCOURAGE: Record<Tone, string[]> = {
  gentle: ["One small thing done.", "That counts.", "Kind work.", "Lovely."],
  neutral: ["Done.", "Logged.", "Marked complete.", "Noted."],
  cheerleader: ["Woohoo! 🎉", "Crushed it! ✨", "Amazing! 🌟", "Yes yes yes! 💫"],
  dry: ["Sure. Fine. Good.", "Noted, hero.", "Impressive, allegedly.", "A win, technically."],
};

let lastEncourageIndex = -1;
export function encouragement(tone: Tone): string {
  const lines = ENCOURAGE[tone];
  let i = Math.floor(Math.random() * lines.length);
  if (i === lastEncourageIndex) i = (i + 1) % lines.length;
  lastEncourageIndex = i;
  return lines[i];
}
