import { useState } from "react";
import { useVoice } from "../lib/useVoice";
import { captureItem } from "../lib/items";

// One always-visible, zero-friction capture point. Type or speak any thought.
// No category, no due date, no priority. Submitting takes under 2 seconds.
export function CaptureBar({ compact = false }: { compact?: boolean }) {
  const [text, setText] = useState("");
  const [justSaved, setJustSaved] = useState(false);

  const save = async (value: string) => {
    const v = value.trim();
    if (!v) return;
    await captureItem(v);
    setText("");
    setJustSaved(true);
    window.setTimeout(() => setJustSaved(false), 1200);
  };

  const voice = useVoice((t) => {
    // Append spoken text; never autocorrect or reject.
    setText((prev) => (prev ? `${prev} ${t}` : t));
  });

  return (
    <div className="w-full">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          void save(text);
        }}
        className="flex items-center gap-2"
      >
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          // spellCheck off: we never aggressively autocorrect the user.
          spellCheck={false}
          autoComplete="off"
          placeholder={compact ? "Park a thought…" : "Drop any thought here — type or speak"}
          aria-label="Capture a thought"
          className="flex-1 rounded-full px-5 py-3 text-base focus:outline-none focus-visible:ring-2"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            color: "var(--ink)",
          }}
        />
        {voice.supported && (
          <button
            type="button"
            onClick={voice.toggle}
            aria-label={voice.listening ? "Stop voice capture" : "Capture by voice"}
            title="Speak your thought"
            className="rounded-full w-12 h-12 flex items-center justify-center text-lg shrink-0"
            style={{
              background: voice.listening ? "var(--accent)" : "var(--accent-soft)",
              color: voice.listening ? "white" : "var(--ink)",
            }}
          >
            {voice.listening ? "●" : "🎙"}
          </button>
        )}
        <button
          type="submit"
          className="rounded-full px-5 py-3 text-sm shrink-0"
          style={{ background: "var(--accent)", color: "white" }}
        >
          Keep
        </button>
      </form>
      {justSaved && (
        <div className="text-xs mt-2 pl-2 animate-fadein" style={{ color: "var(--ink-soft)" }}>
          Got it — out of your head and safely kept.
        </div>
      )}
    </div>
  );
}
