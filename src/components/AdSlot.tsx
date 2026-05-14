"use client";

import { useEffect, useRef } from "react";
import { adsense } from "@/lib/ads";

type Variant = "block" | "banner";

interface AdSlotProps {
  slot: string;
  format?: "auto" | "fluid" | "rectangle" | "horizontal";
  layout?: string;
  className?: string;
  label?: string;
  position?: string;
  variant?: Variant;
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
  variant = "block",
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

  const placeholderHeight = variant === "banner" ? "py-2.5 sm:py-3" : "py-8";
  const placeholderSpacing = variant === "banner" ? "my-3" : "my-8";
  const insMinHeight = variant === "banner" ? 60 : undefined;

  if (!enabled) {
    return (
      <div
        aria-hidden="true"
        className={`${placeholderSpacing} flex items-center justify-center rounded-xl border border-dashed border-sun-300/70 bg-sun-50/50 px-4 ${placeholderHeight} ${className}`}
      >
        <div className="text-center">
          <p className="text-[10px] uppercase tracking-widest text-sun-700 font-bold">
            Ad space{position ? ` · ${position}` : ""}
          </p>
          {variant === "block" && (
            <p className="mt-1 text-xs text-ink-mute">
              Reserved for sponsored content
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`${placeholderSpacing} ${className}`}>
      <div className="text-[10px] uppercase tracking-wider text-ink-mute mb-1 text-center">
        {label}
      </div>
      <ins
        className="adsbygoogle"
        style={{
          display: "block",
          textAlign: "center",
          ...(insMinHeight !== undefined ? { minHeight: insMinHeight } : {}),
        }}
        data-ad-client={adsense.clientId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-ad-layout={layout}
        data-full-width-responsive="true"
      />
    </div>
  );
}
