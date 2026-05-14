import Link from "next/link";
import type { Metadata } from "next";
import { SunscreenTimer } from "@/components/SunscreenTimer";
import { AdSlot } from "@/components/AdSlot";
import { subpages } from "@/lib/subpages";
import { SITE } from "@/lib/site";
import { adsense } from "@/lib/ads";

export const metadata: Metadata = {
  title: `${SITE.name} — ${SITE.tagline}`,
  description: SITE.description,
  alternates: { canonical: "/" },
};

const faq = [
  {
    q: "How often should I reapply sunscreen?",
    a: "Dermatologists recommend every two hours of sun exposure as a baseline. The smart sunscreen timer tightens that window automatically when UV is high or you're swimming, sweating, or at the beach — and stretches it slightly only for low UV or indoor light exposure.",
  },
  {
    q: "Does SPF determine how long sunscreen lasts?",
    a: "No. SPF measures how much UVB radiation gets blocked at a given moment, not how many hours of protection you get. Even SPF 100 breaks down on your skin at roughly the same rate as SPF 30. Reapply every two hours regardless of SPF strength.",
  },
  {
    q: "How accurate is this UV-based timer?",
    a: "The live UV index is pulled from currentuvindex.com, which sources NOAA data. The reapply calculation uses dermatology-standard intervals (2-hour baseline, shortened for high UV / heavy activity / water). It's a guide, not a medical instrument — when in doubt, reapply early.",
  },
  {
    q: "Do I need to reapply sunscreen indoors?",
    a: "Probably not — unless you're sitting near a window for prolonged periods. Window glass blocks UVB but lets UVA through, which contributes to skin aging. For most indoor activities, the timer's 'Indoor near window' setting (which extends the window to about 3 hours) is appropriate.",
  },
  {
    q: "Is this timer suitable for children?",
    a: "Yes. For kids, drop the activity setting to Sports or sweating if they're playing actively — it tightens the reapply window to 80–90 minutes, which matches pediatric guidance. Babies under six months should be kept out of direct sun rather than relying on sunscreen.",
  },
  {
    q: "What if I deny the location permission?",
    a: "The timer falls back to a manual UV slider (0–12). You can read your local UV index from any weather app or the iPhone weather widget and enter it directly. The calculation is identical.",
  },
  {
    q: "Why does the calculation use Fitzpatrick skin type?",
    a: "Fair skin (Fitzpatrick I–II) reaches a burning dose faster than darker skin. The timer adds about 15% urgency for those types. Darker skin types (V–VI) still use the standard 2-hour baseline — natural melanin extends safe exposure but doesn't change the rate sunscreen wears off.",
  },
  {
    q: "Does the timer keep running if I switch tabs?",
    a: "Yes. The countdown is based on a target end time rather than a tick counter, so it stays accurate when the tab is in the background. If you allow browser notifications, you'll also get an alert at the 10-minute warning and at zero — even if this tab isn't focused.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: SITE.name,
  url: SITE.url,
  applicationCategory: "HealthApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description: SITE.description,
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
      />

      <div className="relative mx-auto max-w-3xl px-4 pt-10 sm:pt-16 pb-5">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -z-10 h-72 w-72 sm:h-96 sm:w-96 rounded-full bg-gradient-to-br from-sun-200/60 via-sun-300/30 to-transparent blur-3xl"
        />
        <div className="flex justify-center mb-5">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur-sm border border-sun-200/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-sun-800 shadow-soft">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-sun-500 animate-pulseSun"
            />
            Live UV · Personalized
          </span>
        </div>
        <h1 className="text-center font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tightest text-ink leading-[1.02]">
          Sunscreen,{" "}
          <span className="relative inline-block">
            <span className="bg-gradient-to-br from-sun-500 via-sun-600 to-peach-400 bg-clip-text text-transparent">
              on a schedule.
            </span>
          </span>
        </h1>
        <p className="mt-5 sm:mt-6 text-center text-base sm:text-lg text-ink-soft max-w-xl mx-auto leading-relaxed">
          A smart sunscreen timer that pulls live UV for your spot and tells
          you exactly when to reapply — calibrated to the dermatologist
          two-hour standard.
        </p>
        <p className="mt-5 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-sun-50/80 backdrop-blur-sm border border-sun-200/80 px-3.5 py-1.5 text-xs font-semibold text-sun-800 shadow-soft">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-3.5 w-3.5"
              aria-hidden="true"
            >
              <rect
                x="7"
                y="2"
                width="10"
                height="20"
                rx="2.5"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <line
                x1="11"
                y1="18.5"
                x2="13"
                y2="18.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            Install as an app — full-screen, works offline
          </span>
        </p>
      </div>

      <div className="mx-auto max-w-2xl px-4">
        <AdSlot
          slot={adsense.homeTopSlot}
          format="horizontal"
          variant="banner"
          label="Sponsored"
          position="Home · banner above timer"
        />
      </div>

      <div className="mx-auto max-w-2xl px-4">
        <SunscreenTimer />
      </div>

      <div className="mx-auto max-w-3xl px-4">
        <AdSlot
          slot={adsense.homeSlot}
          format="auto"
          label="Sponsored"
          position="Home · between tool and content"
        />
      </div>

      <section className="mx-auto max-w-3xl px-4 mt-16 prose-article">
        <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-ink !mb-4">
          How the smart sunscreen timer works
        </h2>
        <p>
          Every dermatology body — the American Academy of Dermatology, the
          Skin Cancer Foundation, the British Association of Dermatologists —
          agrees on the same baseline rule: reapply sunscreen every two hours
          of sun exposure. The smart sunscreen timer starts from that 120-minute
          baseline, then adjusts in two directions based on conditions you
          actually face.
        </p>
        <p>
          When you allow location access, the timer pulls the live UV index
          from <a href="https://currentuvindex.com" target="_blank" rel="noopener noreferrer">currentuvindex.com</a>{" "}
          (sourced from NOAA). High UV shortens the window; low UV
          slightly extends it. Your activity matters too — swimming, sweating,
          and beach reflection all cut sunscreen's effective lifetime.
        </p>

        <h2>What the timer factors in</h2>
        <p>
          <strong>Skin type (Fitzpatrick I–VI).</strong> Fair skin reaches a
          burning dose of UV faster, so the timer adds a 15% urgency
          adjustment for Types I and II. Darker skin types use the standard
          2-hour baseline because natural melanin extends safe exposure —
          but protection still wears off at the same rate.{" "}
          <Link href="/sunscreen-fitzpatrick-skin-type-guide">
            Full Fitzpatrick guide
          </Link>
          .
        </p>
        <p>
          <strong>SPF strength.</strong> Saved with your preferences so the
          timer remembers, but the reapply window does not scale with SPF.
          That's a common myth — higher SPF doesn't last longer.{" "}
          <Link href="/spf-30-vs-spf-50-reapplication">
            SPF 30 vs SPF 50 explained
          </Link>
          .
        </p>
        <p>
          <strong>Activity.</strong> Indoor near a window extends the window
          to roughly 3 hours. Beach or pool deck cuts it to 100 minutes
          because reflected UV from sand and water amplifies your dose.
          Sports or heavy sweating drops to 80 minutes. Swimming uses 60
          minutes by default — match your bottle's water resistance label.{" "}
          <Link href="/sunscreen-while-swimming">Swimming guide</Link>.
        </p>
        <p>
          <strong>UV index.</strong> Live, point-in-time, from your exact
          coordinates. UV 6–7 (High) shortens the window by 17%. UV 8–10
          (Very High) cuts it by a third. UV 11+ (Extreme) halves it. If
          you'd rather not share location, use the manual slider — the
          calculation is identical.{" "}
          <Link href="/sunscreen-uv-index-explained">UV index explained</Link>.
        </p>

        <h2>Why not just trust the SPF number?</h2>
        <p>
          Existing online sunscreen calculators get this wrong. They
          multiply SPF by some assumed "minimum erythemal dose" to spit out
          a reapply time. That math has no basis in real dermatology — SPF
          measures UVB blocking at a single moment, not duration. Two
          hours has been the standard since the 1980s, and that's what
          this timer uses.
        </p>

        <h2>Quick guides</h2>
        <p>Specific situations, real answers:</p>
        <ul className="grid sm:grid-cols-2 gap-2 !list-none !pl-0 mt-3 not-prose">
          {subpages.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/${p.slug}`}
                className="group flex items-center justify-between gap-2 rounded-xl border border-sun-100/80 bg-white/60 backdrop-blur-sm px-3.5 py-2.5 text-sm font-medium text-ink-soft hover:border-sun-300 hover:bg-white hover:text-ink hover:shadow-soft transition-all"
              >
                <span>{p.title}</span>
                <span
                  className="text-sun-500 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                  aria-hidden="true"
                >
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <div className="mx-auto max-w-3xl px-4">
        <AdSlot
          slot={adsense.homeMidSlot}
          format="auto"
          label="Sponsored"
          position="Home · between guides and FAQ"
        />
      </div>

      <section id="faq" className="mx-auto max-w-3xl px-4 mt-16 prose-article">
        <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-ink !mb-5">
          Frequently asked questions
        </h2>
        {faq.map((item) => (
          <details
            key={item.q}
            className="group border-b border-sun-100/80 py-5 transition"
          >
            <summary className="font-semibold text-ink cursor-pointer list-none flex justify-between items-center">
              <span>{item.q}</span>
              <span className="ml-3 text-sun-600 group-open:rotate-45 transition-transform text-xl leading-none">
                +
              </span>
            </summary>
            <p className="mt-3 text-ink-soft">{item.a}</p>
          </details>
        ))}
      </section>
    </>
  );
}
