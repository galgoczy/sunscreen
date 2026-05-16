import Link from "next/link";
import type { Metadata } from "next";
import { AuthoritySources } from "@/components/AuthoritySources";
import { SITE } from "@/lib/site";
import { SITE_PUBLISHED_AT, SITE_UPDATED_AT } from "@/lib/subpages";

export const metadata: Metadata = {
  title: "How the Timer Calculates Your Reapply Window",
  description:
    "Full methodology behind the Sunscreen Timer: the 2-hour dermatologist baseline, every multiplier, worked examples, the forecast-aware logic, and the sources we draw on.",
  alternates: { canonical: "/about-the-timer" },
};

function formatDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00Z`);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

const techArticleJsonLd = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: "How the Sunscreen Timer calculates your reapply window",
  description:
    "Full methodology: the 2-hour dermatologist baseline, activity / UV index / skin-type multipliers, the 2-hour forecast peak logic, and worked examples.",
  mainEntityOfPage: `${SITE.url}/about-the-timer`,
  datePublished: SITE_PUBLISHED_AT,
  dateModified: SITE_UPDATED_AT,
  inLanguage: "en",
  author: { "@type": "Organization", name: SITE.name },
  publisher: {
    "@type": "Organization",
    name: SITE.name,
    logo: { "@type": "ImageObject", url: `${SITE.url}/icon.svg` },
  },
};

const toc: Array<{ id: string; label: string }> = [
  { id: "baseline", label: "The 2-hour baseline" },
  { id: "activity", label: "Activity multiplier" },
  { id: "uv-index", label: "UV index multiplier" },
  { id: "skin-type", label: "Skin type adjustment" },
  { id: "rounding", label: "Floor, cap, rounding" },
  { id: "forecast", label: "2-hour forecast peak" },
  { id: "examples", label: "Worked examples" },
  { id: "not-done", label: "What we deliberately don't do" },
];

export default function AboutTheTimerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(techArticleJsonLd) }}
      />

      <article className="mx-auto max-w-3xl px-4 pt-8 sm:pt-12 prose-article">
        <nav
          aria-label="Breadcrumb"
          className="text-xs text-ink-mute mb-5 flex items-center gap-1.5"
        >
          <Link
            href="/"
            className="hover:text-ink transition-colors font-medium"
          >
            Home
          </Link>
          <span className="text-ink-faint" aria-hidden="true">/</span>
          <span className="text-ink-soft truncate">Methodology</span>
        </nav>

        <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tightest text-ink !mb-3 leading-[1.06]">
          How the timer calculates your reapply window
        </h1>
        <p className="text-[11px] uppercase tracking-[0.18em] font-bold text-ink-mute !mb-5">
          Updated{" "}
          <time dateTime={SITE_UPDATED_AT}>{formatDate(SITE_UPDATED_AT)}</time>
        </p>

        <p className="text-lg text-ink-soft leading-relaxed">
          Most online sunscreen calculators are black boxes. This one isn't.
          Below is the exact formula, every multiplier we use, the sources
          we draw on, and three worked examples so you can spot-check the
          number the tool gave you.
        </p>

        <aside className="not-prose my-7 rounded-2xl border border-sun-200/70 bg-sun-50/50 p-5">
          <p className="text-[10px] uppercase tracking-[0.18em] font-bold text-sun-700">
            The formula
          </p>
          <p className="mt-2 font-mono text-sm sm:text-base text-ink leading-relaxed">
            reapply_minutes = round_to_5(
            <br className="sm:hidden" />
            &nbsp;&nbsp;120 × activity × uv × skin_type
            <br className="sm:hidden" />
            )
          </p>
          <p className="mt-2 text-xs text-ink-mute">
            Floor at 30 min, cap at 180 min. Source code:{" "}
            <a
              href="https://github.com/galgoczy/sunscreen/blob/main/src/lib/calculate.ts"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold underline underline-offset-2 decoration-sun-300 hover:decoration-sun-700 transition"
            >
              calculate.ts
            </a>
            .
          </p>
        </aside>

        <nav
          aria-label="On this page"
          className="not-prose my-8 rounded-2xl border border-sun-100 bg-white/60 backdrop-blur-sm p-5"
        >
          <p className="text-[10px] uppercase tracking-[0.18em] font-bold text-sun-700">
            On this page
          </p>
          <ol className="mt-3 grid sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm">
            {toc.map((item, i) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="text-ink-soft hover:text-sun-800 underline underline-offset-2 decoration-transparent hover:decoration-sun-400 transition"
                >
                  <span className="text-ink-faint mr-1.5 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {item.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <section>
          <h2 id="baseline">The 2-hour baseline</h2>
          <p>
            Every major dermatology body uses the same starting number: 120
            minutes. The American Academy of Dermatology, the Skin Cancer
            Foundation, the British Association of Dermatologists, the
            Australian Cancer Council — all converge on "reapply every two
            hours of sun exposure" as the default. That figure is not a
            random round number. It tracks how long a properly applied layer
            stays evenly distributed on real skin before sweating, friction
            against clothing, and the skin's natural oils begin to thin it.
          </p>
          <p>
            We start every calculation from 120 minutes, then adjust in two
            directions based on what you're actually doing and what the sun
            is actually doing.
          </p>
        </section>

        <section>
          <h2 id="activity">Activity multiplier</h2>
          <p>
            Activity matters because it determines how fast the layer comes
            off — through sweat, water, sand, towels, or simple friction
            against clothing.
          </p>
          <figure className="not-prose my-6">
            <div className="overflow-x-auto rounded-2xl border border-sun-100/80 bg-white/70 backdrop-blur-sm shadow-soft">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th className="text-left px-4 py-2.5 text-[10px] uppercase tracking-[0.14em] font-bold text-sun-800 bg-sun-50/60">
                      Activity
                    </th>
                    <th className="text-left px-4 py-2.5 text-[10px] uppercase tracking-[0.14em] font-bold text-sun-800 bg-sun-50/60">
                      Multiplier
                    </th>
                    <th className="text-left px-4 py-2.5 text-[10px] uppercase tracking-[0.14em] font-bold text-sun-800 bg-sun-50/60 hidden sm:table-cell">
                      Rationale
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sun-100">
                  <tr>
                    <td className="px-4 py-3 font-semibold text-ink align-top">Indoor near window</td>
                    <td className="px-4 py-3 font-bold tabular-nums text-sun-800 align-top whitespace-nowrap">×1.5</td>
                    <td className="px-4 py-3 text-ink-soft align-top hidden sm:table-cell">Glass blocks UVB; UVA still passes (matters for long-term aging)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-ink align-top">Light outdoor</td>
                    <td className="px-4 py-3 font-bold tabular-nums text-sun-800 align-top whitespace-nowrap">×1.0</td>
                    <td className="px-4 py-3 text-ink-soft align-top hidden sm:table-cell">Dermatologist standard, no adjustment</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-ink align-top">Beach / pool deck</td>
                    <td className="px-4 py-3 font-bold tabular-nums text-sun-800 align-top whitespace-nowrap">×0.83</td>
                    <td className="px-4 py-3 text-ink-soft align-top hidden sm:table-cell">Sand reflects 15–25% UV; water surface ≈10%</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-ink align-top">Sports / sweating</td>
                    <td className="px-4 py-3 font-bold tabular-nums text-sun-800 align-top whitespace-nowrap">×0.67</td>
                    <td className="px-4 py-3 text-ink-soft align-top hidden sm:table-cell">Sweat strips the layer, friction with clothing accelerates loss</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-ink align-top">Swimming</td>
                    <td className="px-4 py-3 font-bold tabular-nums text-sun-800 align-top whitespace-nowrap">×0.5</td>
                    <td className="px-4 py-3 text-ink-soft align-top hidden sm:table-cell">Matches the lower end of the FDA's water-resistant labeling</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </figure>
          <p>
            The numbers are calibrated against the FDA's official water-resistant labeling (40 / 80 minutes), the Skin Cancer Foundation's beach guidance (≤100 minute reapply), and the AAD's sport-specific advice (every 80 minutes when actively sweating).
          </p>
        </section>

        <section>
          <h2 id="uv-index">UV index multiplier</h2>
          <p>
            The WHO UV index is the global standard for ambient UV intensity. We map its five categories to multipliers that tighten the reapply window as UV climbs.
          </p>
          <figure className="not-prose my-6">
            <div className="overflow-x-auto rounded-2xl border border-sun-100/80 bg-white/70 backdrop-blur-sm shadow-soft">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th className="text-left px-4 py-2.5 text-[10px] uppercase tracking-[0.14em] font-bold text-sun-800 bg-sun-50/60">UV index</th>
                    <th className="text-left px-4 py-2.5 text-[10px] uppercase tracking-[0.14em] font-bold text-sun-800 bg-sun-50/60">WHO category</th>
                    <th className="text-left px-4 py-2.5 text-[10px] uppercase tracking-[0.14em] font-bold text-sun-800 bg-sun-50/60">Multiplier</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sun-100">
                  <tr><td className="px-4 py-3 font-semibold text-ink whitespace-nowrap">0–2</td><td className="px-4 py-3 text-emerald-700 font-semibold">Low</td><td className="px-4 py-3 font-bold tabular-nums text-sun-800">×1.5</td></tr>
                  <tr><td className="px-4 py-3 font-semibold text-ink whitespace-nowrap">3–5</td><td className="px-4 py-3 text-amber-700 font-semibold">Moderate</td><td className="px-4 py-3 font-bold tabular-nums text-sun-800">×1.0</td></tr>
                  <tr><td className="px-4 py-3 font-semibold text-ink whitespace-nowrap">6–7</td><td className="px-4 py-3 text-orange-700 font-semibold">High</td><td className="px-4 py-3 font-bold tabular-nums text-sun-800">×0.83</td></tr>
                  <tr><td className="px-4 py-3 font-semibold text-ink whitespace-nowrap">8–10</td><td className="px-4 py-3 text-red-700 font-semibold">Very High</td><td className="px-4 py-3 font-bold tabular-nums text-sun-800">×0.67</td></tr>
                  <tr><td className="px-4 py-3 font-semibold text-ink whitespace-nowrap">11+</td><td className="px-4 py-3 text-purple-700 font-semibold">Extreme</td><td className="px-4 py-3 font-bold tabular-nums text-sun-800">×0.5</td></tr>
                </tbody>
              </table>
            </div>
          </figure>
          <p>
            Live UV readings come from <a href="https://currentuvindex.com" target="_blank" rel="noopener noreferrer">currentuvindex.com</a>, which sources NOAA satellite data. If you'd rather not share location, the manual slider feeds the same multiplier table.
          </p>
        </section>

        <section>
          <h2 id="skin-type">Skin type adjustment</h2>
          <p>
            The Fitzpatrick scale, developed at Harvard Medical School in 1975, classifies skin by how it responds to UV exposure. Very fair skin reaches a "minimal erythemal dose" — the point of visible reddening — much faster than darker skin, so the reapply window for those types is tightened by 15%.
          </p>
          <figure className="not-prose my-6">
            <div className="overflow-x-auto rounded-2xl border border-sun-100/80 bg-white/70 backdrop-blur-sm shadow-soft">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th className="text-left px-4 py-2.5 text-[10px] uppercase tracking-[0.14em] font-bold text-sun-800 bg-sun-50/60">Type</th>
                    <th className="text-left px-4 py-2.5 text-[10px] uppercase tracking-[0.14em] font-bold text-sun-800 bg-sun-50/60">Description</th>
                    <th className="text-left px-4 py-2.5 text-[10px] uppercase tracking-[0.14em] font-bold text-sun-800 bg-sun-50/60">Multiplier</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sun-100">
                  <tr><td className="px-4 py-3 font-semibold text-ink whitespace-nowrap">I</td><td className="px-4 py-3 text-ink-soft">Very fair — always burns, never tans</td><td className="px-4 py-3 font-bold tabular-nums text-sun-800">×0.83</td></tr>
                  <tr><td className="px-4 py-3 font-semibold text-ink whitespace-nowrap">II</td><td className="px-4 py-3 text-ink-soft">Fair — usually burns, lightly tans</td><td className="px-4 py-3 font-bold tabular-nums text-sun-800">×0.83</td></tr>
                  <tr><td className="px-4 py-3 font-semibold text-ink whitespace-nowrap">III</td><td className="px-4 py-3 text-ink-soft">Medium — sometimes burns, tans gradually</td><td className="px-4 py-3 font-bold tabular-nums text-sun-800">×1.0</td></tr>
                  <tr><td className="px-4 py-3 font-semibold text-ink whitespace-nowrap">IV</td><td className="px-4 py-3 text-ink-soft">Olive — rarely burns, tans easily</td><td className="px-4 py-3 font-bold tabular-nums text-sun-800">×1.0</td></tr>
                  <tr><td className="px-4 py-3 font-semibold text-ink whitespace-nowrap">V</td><td className="px-4 py-3 text-ink-soft">Brown — very rarely burns</td><td className="px-4 py-3 font-bold tabular-nums text-sun-800">×1.0</td></tr>
                  <tr><td className="px-4 py-3 font-semibold text-ink whitespace-nowrap">VI</td><td className="px-4 py-3 text-ink-soft">Deeply pigmented — almost never burns</td><td className="px-4 py-3 font-bold tabular-nums text-sun-800">×1.0</td></tr>
                </tbody>
              </table>
            </div>
          </figure>
          <p>
            Critically: darker skin still needs sunscreen. The Fitzpatrick scale only tells us how fast a visible burn forms, not how much UV damage is occurring. Melanoma in deeply pigmented skin is often diagnosed later and at more advanced stages.
          </p>
        </section>

        <section>
          <h2 id="rounding">Floor, cap, rounding</h2>
          <p>
            After the multipliers, we apply three small post-processing steps:
          </p>
          <ul>
            <li><strong>Round to the nearest 5 minutes</strong> — produces a clean number that fits a real timer instead of "67 minutes".</li>
            <li><strong>Floor at 30 minutes</strong> — even under the worst possible combination (extreme UV + swimming + fair skin) we don't recommend a reapply window shorter than half an hour. Below that, you should be seeking shade rather than relying on sunscreen.</li>
            <li><strong>Cap at 180 minutes</strong> — even in low UV indoors, we don't suggest stretching past three hours. UVA is always present.</li>
          </ul>
        </section>

        <section>
          <h2 id="forecast">2-hour forecast peak</h2>
          <p>
            The currentuvindex.com API returns not just the current UV reading but a forecast for the next several hours. We look ahead 2 hours and take the highest expected UV in that window — then use that for the calculation, not just the right-now value.
          </p>
          <p>
            Why: if you're at UV 5 right now but it's going to climb to UV 8 in 45 minutes, the safer reapply schedule is the one tuned to UV 8. The timer surfaces both numbers on screen ("Currently 5.2 · peak in ~45 min") so you can see what we did.
          </p>
        </section>

        <section>
          <h2 id="examples">Worked examples</h2>
          <p>Three real-world combinations, traced step by step:</p>

          <div className="not-prose grid gap-4 my-6">
            <div className="rounded-2xl border border-sun-100 bg-white/70 backdrop-blur-sm p-5 shadow-soft">
              <p className="text-[10px] uppercase tracking-[0.18em] font-bold text-sun-700">Example 1 · Beach day, fair skin</p>
              <p className="mt-2 text-sm text-ink-soft">
                <strong className="text-ink">Inputs:</strong> Beach activity, UV index 8 (Very High), Fitzpatrick II.
              </p>
              <p className="mt-2 font-mono text-xs sm:text-sm text-ink leading-relaxed bg-sun-50/40 rounded-lg px-3 py-2 border border-sun-100">
                120 × 0.83 × 0.67 × 0.83 = 55.4 min<br />
                → rounded to 55 min
              </p>
              <p className="mt-2 text-sm text-ink-soft">
                A Mediterranean beach in July with Type II skin: reapply just under an hour.
              </p>
            </div>

            <div className="rounded-2xl border border-sun-100 bg-white/70 backdrop-blur-sm p-5 shadow-soft">
              <p className="text-[10px] uppercase tracking-[0.18em] font-bold text-sun-700">Example 2 · Walk to the park</p>
              <p className="mt-2 text-sm text-ink-soft">
                <strong className="text-ink">Inputs:</strong> Light outdoor, UV index 5 (Moderate), Fitzpatrick III.
              </p>
              <p className="mt-2 font-mono text-xs sm:text-sm text-ink leading-relaxed bg-sun-50/40 rounded-lg px-3 py-2 border border-sun-100">
                120 × 1.0 × 1.0 × 1.0 = 120 min
              </p>
              <p className="mt-2 text-sm text-ink-soft">
                A late-spring afternoon walk: the textbook two-hour interval.
              </p>
            </div>

            <div className="rounded-2xl border border-sun-100 bg-white/70 backdrop-blur-sm p-5 shadow-soft">
              <p className="text-[10px] uppercase tracking-[0.18em] font-bold text-sun-700">Example 3 · Swimming under extreme UV</p>
              <p className="mt-2 text-sm text-ink-soft">
                <strong className="text-ink">Inputs:</strong> Swimming, UV index 11+ (Extreme), Fitzpatrick III.
              </p>
              <p className="mt-2 font-mono text-xs sm:text-sm text-ink leading-relaxed bg-sun-50/40 rounded-lg px-3 py-2 border border-sun-100">
                120 × 0.5 × 0.5 × 1.0 = 30 min<br />
                → hits the 30-minute floor
              </p>
              <p className="mt-2 text-sm text-ink-soft">
                Pool day at the equator under direct midday sun: reapply every 30 minutes — or seek shade and skip the calculation entirely.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 id="not-done">What we deliberately don't do</h2>
          <p>
            A few decisions worth being explicit about:
          </p>
          <ul>
            <li>
              <strong>SPF strength is not a time multiplier.</strong> Many online sunscreen calculators multiply SPF by an assumed "minimum erythemal dose" to spit out a reapply window. There is no dermatological basis for this — SPF measures UVB blocking at the moment of application, not duration. Reapply intervals are the same for SPF 30 and SPF 50.{" "}
              <Link href="/spf-30-vs-spf-50-reapplication">More on this.</Link>
            </li>
            <li>
              <strong>We don't trust "waterproof" claims.</strong> The FDA banned that term in 2011 for a reason. The Swimming activity multiplier is set to the lower bound of FDA's water-resistant testing (40 minutes), not the upper bound.
            </li>
            <li>
              <strong>We don't extend the window for cloudy skies.</strong> Light cloud cover blocks only ~10% of UV; the live UV index already reflects what's getting through.{" "}
              <Link href="/cloudy-day-sunscreen">More.</Link>
            </li>
            <li>
              <strong>We don't store your location.</strong> Coordinates are passed once to the UV API and discarded. No analytics fingerprinting beyond standard GA4 page-view collection.{" "}
              <Link href="/privacy">Privacy details.</Link>
            </li>
          </ul>
        </section>

        <AuthoritySources />

        <section className="mt-14 not-prose">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-2xl bg-gradient-to-b from-sun-400 to-sun-600 px-5 py-3.5 text-base font-bold text-white shadow-glow hover:from-sun-300 hover:to-sun-700 hover:-translate-y-px transition-all"
          >
            Try the timer
            <span aria-hidden="true" className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </section>
      </article>
    </>
  );
}
