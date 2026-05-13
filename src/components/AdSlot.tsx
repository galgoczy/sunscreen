"use client";

import { useEffect, useRef } from "react";
import { adsense } from "@/lib/ads";

interface AdSlotProps {
  slot: string;
  format?: "auto" | "fluid" | "rectangle";
  layout?: string;
  className?: string;
  label?: string;
  position?: string;
}

declare global {
  interface Window {
    adsbygoogle?: Array<Record<string, unknown>>;
  }
}

export function AdSlot({
  slot,
  format = "auto",
  layout,
  className = "",
  label = "Advertisement",
  position,
}: AdSlotProps) {
  const pushedRef = useRef(false);
  const enabled = Boolean(adsense.clientId && slot);

  useEffect(() => {
    if (!enabled || pushedRef.current) return;
    pushedRef.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // adsbygoogle may not be loaded yet on first render — script handles retry
    }
  }, [enabled]);

  if (!enabled) {
    return (
      <div
        aria-hidden="true"
        className={`my-8 flex items-center justify-center rounded-xl border border-dashed border-sun-300/70 bg-sun-50/50 px-4 py-8 ${className}`}
      >
        <div className="text-center">
          <p className="text-[10px] uppercase tracking-widest text-sun-700 font-bold">
            Ad space{position ? ` · ${position}` : ""}
          </p>
          <p className="mt-1 text-xs text-ink-mute">
            Reserved for sponsored content
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`my-8 ${className}`}>
      <div className="text-[10px] uppercase tracking-wider text-ink-mute mb-1 text-center">
        {label}
      </div>
      <ins
        className="adsbygoogle"
        style={{ display: "block", textAlign: "center" }}
        data-ad-client={adsense.clientId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-ad-layout={layout}
        data-full-width-responsive="true"
      />
    </div>
  );
}
