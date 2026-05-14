"use client";

import Script from "next/script";
import { analytics } from "@/lib/analytics";

export function Analytics() {
  if (!analytics.gaId) return null;
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${analytics.gaId}`}
      />
      <Script id="ga-init" strategy="afterInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${analytics.gaId}', { anonymize_ip: true });
      `}</Script>
    </>
  );
}
