"use client";

import Script from "next/script";
import { analytics } from "@/lib/analytics";

export function Analytics() {
  if (!analytics.gaId) return null;
  return (
    <>
      <Script
        id="ga-loader"
        strategy="beforeInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${analytics.gaId}`}
      />
      <Script id="ga-init" strategy="beforeInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${analytics.gaId}', { anonymize_ip: true });
      `}</Script>
    </>
  );
}
