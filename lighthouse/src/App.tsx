import { useState } from "react";
import type { Item } from "./db/types";
import { useSettings } from "./lib/settings";
import { nextThemeKey } from "./lib/themes";
import { CaptureBar } from "./ui/CaptureBar";
import { Overwhelm } from "./ui/Overwhelm";
import { NowScreen } from "./screens/NowScreen";
import { FocusMode } from "./screens/FocusMode";
import { EverythingScreen } from "./screens/EverythingScreen";
import { RoutinesScreen } from "./screens/RoutinesScreen";
import { SettingsScreen } from "./screens/SettingsScreen";

type Screen = "now" | "everything" | "routines" | "settings";

const TABS: { key: Screen; label: string }[] = [
  { key: "now", label: "Now" },
  { key: "everything", label: "Everything" },
  { key: "routines", label: "Routines" },
  { key: "settings", label: "Settings" },
];

export function App() {
  const { settings, update } = useSettings();
  const [screen, setScreen] = useState<Screen>("now");
  const [focusItem, setFocusItem] = useState<Item | null>(null);
  const [inFocus, setInFocus] = useState(false);
  const [overwhelmed, setOverwhelmed] = useState(false);

  const enterFocus = (item: Item | null) => {
    setFocusItem(item);
    setInFocus(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* The layout NEVER moves — same elements, same places, every time. */}
      <header className="sticky top-0 z-30 px-4 pt-4 pb-3" style={{ background: "var(--bg)", borderBottom: "1px solid var(--border)" }}>
        <div className="max-w-xl mx-auto flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span aria-hidden>🗼</span>
              <span className="font-semibold">Lighthouse</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => update({ theme: nextThemeKey(settings.theme) })}
                className="text-xs rounded-full px-3 py-1"
                style={{ background: "var(--accent-soft)", color: "var(--ink)" }}
                title="Shuffle accent colour"
              >
                ✦ shuffle
              </button>
              <button
                onClick={() => setOverwhelmed(true)}
                className="text-xs rounded-full px-3 py-1"
                style={{ background: "var(--accent-soft)", color: "var(--ink)" }}
              >
                I'm overwhelmed
              </button>
            </div>
          </div>
          {/* Capture is always visible at the top. */}
          {!inFocus && <CaptureBar />}
        </div>
      </header>

      <main className="flex-1 px-4 py-6">
        {inFocus ? (
          <FocusMode
            item={focusItem}
            onExit={() => {
              setInFocus(false);
              setScreen("now");
            }}
            onPeekNext={() => {
              setInFocus(false);
              setScreen("now");
            }}
          />
        ) : (
          <>
            {screen === "now" && <NowScreen onFocus={enterFocus} />}
            {screen === "everything" && <EverythingScreen />}
            {screen === "routines" && <RoutinesScreen />}
            {screen === "settings" && <SettingsScreen />}
          </>
        )}
      </main>

      {!inFocus && (
        <nav className="sticky bottom-0 z-30 px-4 py-2" style={{ background: "var(--bg)", borderTop: "1px solid var(--border)" }}>
          <div className="max-w-xl mx-auto flex justify-around">
            {TABS.map((t) => (
              <button
                key={t.key}
                onClick={() => setScreen(t.key)}
                className="text-sm rounded-full px-4 py-2"
                style={{
                  color: screen === t.key ? "var(--accent)" : "var(--ink-soft)",
                  fontWeight: screen === t.key ? 600 : 400,
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
        </nav>
      )}

      {overwhelmed && <Overwhelm onClose={() => setOverwhelmed(false)} />}
    </div>
  );
}
