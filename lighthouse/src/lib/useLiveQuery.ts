import { useEffect, useState } from "react";
import { liveQuery } from "dexie";

// Minimal live-query hook so React re-renders when IndexedDB changes.
export function useLiveQuery<T>(querier: () => Promise<T>, deps: unknown[] = []) {
  const [value, setValue] = useState<T | undefined>(undefined);
  useEffect(() => {
    const sub = liveQuery(querier).subscribe({
      next: (v) => setValue(v),
      error: (e) => console.error("liveQuery error", e),
    });
    return () => sub.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return value;
}
