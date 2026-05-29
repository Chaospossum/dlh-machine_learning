import { useEffect, useRef, useState } from "react";

// Voice capture via the browser SpeechRecognition API. Degrades silently:
// if unsupported, `supported` is false and the mic button stays hidden.
type SR = typeof window & {
  SpeechRecognition?: any;
  webkitSpeechRecognition?: any;
};

export function useVoice(onResult: (text: string) => void) {
  const [listening, setListening] = useState(false);
  const [supported, setSupported] = useState(false);
  const recRef = useRef<any>(null);

  useEffect(() => {
    const w = window as SR;
    const Ctor = w.SpeechRecognition || w.webkitSpeechRecognition;
    if (!Ctor) return;
    setSupported(true);
    const rec = new Ctor();
    rec.continuous = false;
    rec.interimResults = false;
    rec.lang = navigator.language || "en-US";
    rec.onresult = (e: any) => {
      const text = Array.from(e.results)
        .map((r: any) => r[0].transcript)
        .join(" ");
      if (text.trim()) onResult(text.trim());
    };
    rec.onend = () => setListening(false);
    rec.onerror = () => setListening(false);
    recRef.current = rec;
    return () => {
      try {
        rec.stop();
      } catch {
        /* noop */
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggle = () => {
    const rec = recRef.current;
    if (!rec) return;
    if (listening) {
      rec.stop();
      setListening(false);
    } else {
      try {
        rec.start();
        setListening(true);
      } catch {
        setListening(false);
      }
    }
  };

  return { listening, supported, toggle };
}
