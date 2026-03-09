"use client";

export function Ripple({ className }: { className?: string }) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        background:
          "radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%)",
      }}
    />
  );
}