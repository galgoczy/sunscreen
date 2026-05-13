"use client";

import { useEffect, useRef } from "react";
import { adsense } from "@/lib/ads";

interface AdSlotProps {
  slot: string;
  format?: "auto" | "fluid" | "rectangle";
  layout?: string;
  className?: string;
  label?: string;
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
    if (process.env.NODE_ENV !== "production") {
      return (
        <div
          aria-hidden="true"
          className={`my-8 rounded-lg border border-dashed border-ink-mute/40 bg-cream px-4 py-6 text-center text-xs text-ink-mute ${className}`}
        >
          AdSense placeholder · slot &quot;{slot || "unset"}&quot; · set
          NEXT_PUBLIC_ADSENSE_CLIENT_ID to enable
        </div>
      );
    }
    return null;
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
