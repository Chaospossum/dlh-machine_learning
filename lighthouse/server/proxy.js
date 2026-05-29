// Minimal server-side proxy for the AI helpers. The Anthropic key is read
// here, server-side only, and NEVER reaches the browser. The whole app works
// without this running — the frontend silently falls back to manual mode.
import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const KEY = process.env.ANTHROPIC_API_KEY || "";
const MODEL = process.env.ANTHROPIC_MODEL || "claude-haiku-4-5-20251001";
const PORT = process.env.PROXY_PORT || 8787;

// PDA-safe system framing shared by both helpers.
const PDA_RULES =
  "Never use demand words (need, must, now, urgently, should, have to, overdue, " +
  "failed, behind). Use invitation and choice. Be calm, warm, low-pressure.";

app.get("/api/health", (_req, res) => {
  res.json({ hasKey: Boolean(KEY) });
});

async function callClaude(system, prompt, maxTokens = 400) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: maxTokens,
      system,
      messages: [{ role: "user", content: prompt }],
    }),
  });
  if (!res.ok) throw new Error(`anthropic ${res.status}`);
  const data = await res.json();
  return (data.content?.[0]?.text || "").trim();
}

app.post("/api/breakdown", async (req, res) => {
  const text = String(req.body?.text || "").slice(0, 1000);
  if (!KEY || !text) return res.status(400).json({ error: "unavailable" });
  try {
    const out = await callClaude(
      `You break tasks into 3-7 tiny, concrete, physical first-actions for an AuDHD person who struggles to start. ${PDA_RULES} Each step is one small physical move. Return ONLY a JSON array of strings, no prose.`,
      `Task: ${text}`,
      500,
    );
    let steps = [];
    try {
      steps = JSON.parse(out);
    } catch {
      steps = out.split("\n").map((s) => s.replace(/^[-*\d.)\s]+/, "").trim()).filter(Boolean);
    }
    res.json({ steps: steps.slice(0, 7) });
  } catch (e) {
    res.status(502).json({ error: String(e) });
  }
});

app.post("/api/tone", async (req, res) => {
  const text = String(req.body?.text || "").slice(0, 1000);
  const tone = String(req.body?.tone || "gentle");
  if (!KEY || !text) return res.status(400).json({ error: "unavailable" });
  try {
    const out = await callClaude(
      `Rephrase the task in a ${tone} tone for an AuDHD person. ${PDA_RULES} Keep it to one short sentence. Return ONLY the rephrased text, nothing else.`,
      text,
      150,
    );
    res.json({ text: out.replace(/^["']|["']$/g, "") });
  } catch (e) {
    res.status(502).json({ error: String(e) });
  }
});

app.listen(PORT, () => {
  console.log(`Lighthouse AI proxy on :${PORT} (key ${KEY ? "present" : "absent"})`);
});
