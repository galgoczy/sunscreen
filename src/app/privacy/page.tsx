import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "Privacy policy for Sunscreen Timer — what we collect, what we don't, and how the geolocation feature works.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 pt-6 sm:pt-10 prose-article">
      <nav aria-label="Breadcrumb" className="text-sm text-ink-mute mb-4">
        <Link href="/" className="hover:text-ink">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-ink-soft">Privacy</span>
      </nav>

      <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-ink !mb-4">
        Privacy policy
      </h1>
      <p className="text-lg text-ink-soft">
        Short version: this site is a free tool that doesn't ask for your
        email, doesn't track you across the web, and doesn't store your
        location on a server.
      </p>

      <h2>What we don't collect</h2>
      <p>
        We don't ask for your name, email, phone number, or any account
        details — there's no signup. We don't track you across other
        websites. We don't sell or share any personal data, because we
        don't have any to sell.
      </p>

      <h2>How geolocation works</h2>
      <p>
        When you tap the "Use my location" button, your browser asks for
        permission and (if granted) returns your approximate latitude and
        longitude to this page. We immediately forward those coordinates
        to <a href="https://currentuvindex.com" target="_blank" rel="noopener noreferrer">currentuvindex.com</a>{" "}
        to fetch the live UV index for that spot, then discard them. No
        coordinates are stored on any server we control.
      </p>
      <p>
        The third-party UV service may log the request as part of its
        normal operation — see their site for details. If you'd rather
        not share location at all, the manual UV slider works identically.
      </p>

      <h2>What we store on your device</h2>
      <p>
        Your selected skin type, SPF, and activity are saved to your
        browser's local storage so the timer remembers your defaults next
        time. This is on your device only — nothing is sent to a server.
        Clear your browser data and it's gone.
      </p>

      <h2>Analytics & ads</h2>
      <p>
        If we add analytics or advertising in the future (typically Google
        Analytics 4 and Google AdSense), we'll list them here and they will
        only collect data per their published terms. As of now, this site
        runs without either.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy? The site is small and independent — use
        the support contact on the GitHub repository or wherever you found
        this tool.
      </p>

      <p className="text-sm text-ink-mute">
        Last updated: {new Date().toISOString().slice(0, 10)}.
      </p>
    </article>
  );
}
