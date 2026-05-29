# 🗼 Lighthouse

A calm, local-first focus tool for AuDHD brains (autism + ADHD together). It
serves both sides at once: stable, predictable structure underneath, with a
little novelty on the surface. One frictionless capture point, automatic
breakdown of vague tasks into tiny steps, and only what matters right now on
screen — everything else stays out of sight.

**All your data is stored locally on your device** (IndexedDB via Dexie). No
account, no login, no backend needed for the core app.

## Run it

```bash
cd lighthouse
npm install
npm run dev        # http://localhost:5173
```

That's the whole app — capture, Now/Next, focus mode, everything view,
routines, and all the sensory/accessibility settings work with no key.

## Optional: AI helpers

Two features become effortless when an Anthropic key is present:

- **Break this down** — turns a vague task into 3–7 tiny first-actions.
- **Soften the wording** — rephrases a task in your chosen tone.

Without a key, both still work manually (a starter step / a local word-swap),
and nothing errors.

The key is read **only** by a small local proxy (`server/proxy.js`) and never
reaches the browser.

```bash
cp .env.example .env
# edit .env and set ANTHROPIC_API_KEY=sk-ant-...
npm run proxy      # runs the AI proxy on :8787
npm run dev        # in another terminal; /api is proxied automatically
```

## Design promises

- No streaks that break, no percentages, no "overdue", no red, no guilt.
- No surprise pop-ups, no forced onboarding, no long default lists.
- No rigid clock schedules, no forced Pomodoro/breaks, no required fields.
- PDA-safe language everywhere: invitation and choice, never demands.
- "I'm overwhelmed" and low-arousal mode are always one tap away.

## Phases

1. Capture + Now Screen · 2. Focus Mode · 3. AI helpers (optional)
4. Sensory & accessibility + safety valves · 5. Everything view + routines
6. The two-sided AuDHD personality
