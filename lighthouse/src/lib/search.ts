// Spelling-tolerant search for users who may have dysorthographia.
// We compare on a phonetic-ish normalised form plus a forgiving edit distance,
// so rough or phonetic spellings still match. We never reject or autocorrect.

function normalise(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/(.)\1+/g, "$1") // collapse doubled letters (e.g. "comittee")
    .replace(/ph/g, "f")
    .replace(/ck/g, "k")
    .replace(/[aeiou]/g, "") // drop vowels — phonetic-ish skeleton
    .replace(/\s+/g, " ")
    .trim();
}

function editDistance(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
    }
  }
  return dp[m][n];
}

export function looseMatch(query: string, text: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const t = text.toLowerCase();
  if (t.includes(q)) return true; // exact-ish substring

  const nq = normalise(query);
  // match each query word against any word in the text, tolerantly
  const qWords = nq.split(" ").filter(Boolean);
  const tWords = normalise(text).split(" ").filter(Boolean);
  if (qWords.length === 0) return true;
  return qWords.every((qw) =>
    tWords.some((tw) => {
      if (tw.includes(qw) || qw.includes(tw)) return true;
      const tol = Math.max(1, Math.floor(Math.max(qw.length, tw.length) / 3));
      return editDistance(qw, tw) <= tol;
    }),
  );
}
