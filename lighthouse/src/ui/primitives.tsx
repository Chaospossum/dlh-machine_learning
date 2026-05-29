import type { ButtonHTMLAttributes, ReactNode } from "react";

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`density-pad rounded-2xl p-5 ${className}`}
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
      }}
    >
      {children}
    </div>
  );
}

type BtnProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "solid" | "soft" | "ghost";
};

export function Button({ variant = "soft", className = "", ...rest }: BtnProps) {
  const base =
    "rounded-full px-4 py-2 text-sm transition-colors disabled:opacity-40 focus:outline-none focus-visible:ring-2";
  const styles =
    variant === "solid"
      ? { background: "var(--accent)", color: "white" }
      : variant === "soft"
        ? { background: "var(--accent-soft)", color: "var(--ink)" }
        : { background: "transparent", color: "var(--ink-soft)" };
  return <button {...rest} className={`${base} ${className}`} style={styles} />;
}

export function Label({ children }: { children: ReactNode }) {
  return (
    <div className="text-xs uppercase tracking-wide mb-2" style={{ color: "var(--ink-soft)" }}>
      {children}
    </div>
  );
}
