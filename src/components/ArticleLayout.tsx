import Link from "next/link";
import {
  SITE_PUBLISHED_AT,
  SITE_UPDATED_AT,
  SubpageMeta,
} from "@/lib/subpages";
import { SITE } from "@/lib/site";
import { AdSlot } from "@/components/AdSlot";
import { adsense } from "@/lib/ads";
import { ReapplyWindowTable } from "@/components/ReapplyWindowTable";
import { AuthoritySources } from "@/components/AuthoritySources";

interface Props {
  page: SubpageMeta;
  related: SubpageMeta[];
}

const HOW_OFTEN_SLUG = "how-often-to-reapply-sunscreen";

function formatDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00Z`);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export function ArticleLayout({ page, related }: Props) {
  const isHowOften = page.slug === HOW_OFTEN_SLUG;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: page.title,
    description: page.description,
    mainEntityOfPage: `${SITE.url}/${page.slug}`,
    datePublished: SITE_PUBLISHED_AT,
    dateModified: SITE_UPDATED_AT,
    author: { "@type": "Organization", name: SITE.name },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      logo: { "@type": "ImageObject", url: `${SITE.url}/icon.svg` },
    },
    inLanguage: "en",
  };

  const howToJsonLd = isHowOften
    ? {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: "How to time sunscreen reapplication",
        description:
          "Use the dermatologist two-hour baseline and tighten it based on activity, UV index, and skin type.",
        totalTime: "PT2M",
        step: [
          {
            "@type": "HowToStep",
            name: "Start with the two-hour baseline",
            text: "Every major dermatology body recommends reapplying sunscreen every two hours of sun exposure. That is the default — adjust from there.",
          },
          {
            "@type": "HowToStep",
            name: "Adjust for activity",
            text: "Beach or pool deck shortens the window to about 100 minutes due to reflected UV. Heavy sweating or sports drops it to 80 minutes. Swimming uses 40–80 minutes depending on the bottle's water resistance label.",
          },
          {
            "@type": "HowToStep",
            name: "Adjust for the UV index",
            text: "UV 6–7 (High) shortens the window by about 17%. UV 8–10 (Very High) cuts it by a third. UV 11+ (Extreme) halves it. Low UV (0–2) can stretch the window slightly.",
          },
          {
            "@type": "HowToStep",
            name: "Adjust for skin type",
            text: "Fitzpatrick types I–II (very fair skin) reach a burning dose faster — tighten by about 15%. Types III–VI use the standard window.",
          },
          {
            "@type": "HowToStep",
            name: "Set a timer you'll actually hear",
            text: "Use the Sunscreen Timer with browser notifications enabled so the alert reaches you even with the tab in the background.",
          },
        ],
      }
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {howToJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
        />
      )}

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
          <span className="text-ink-soft truncate">{page.title}</span>
        </nav>

        <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tightest text-ink !mb-3 leading-[1.06]">
          {page.h1}
        </h1>
        <p className="text-[11px] uppercase tracking-[0.18em] font-bold text-ink-mute !mb-5">
          Updated{" "}
          <time dateTime={SITE_UPDATED_AT}>{formatDate(SITE_UPDATED_AT)}</time>
        </p>

        <p className="text-lg text-ink-soft leading-relaxed">{page.intro}</p>

        <div className="mt-9 rounded-2xl bg-gradient-to-br from-sun-50 via-sun-100/60 to-peach-50 border border-sun-200/70 p-4 sm:p-5 not-prose shadow-soft">
          <p className="text-sm text-ink-soft leading-relaxed">
            Want a personalized reapply schedule based on your location and
            skin?{" "}
            <Link
              href="/"
              className="font-bold text-sun-800 underline underline-offset-2 decoration-sun-400 hover:decoration-sun-700 transition"
            >
              Use the smart sunscreen timer →
            </Link>
          </p>
        </div>

        <AdSlot
          slot={adsense.articleTopSlot}
          format="auto"
          label="Sponsored"
          position="Article · top (above the fold on mobile)"
        />

        {isHowOften && <ReapplyWindowTable />}

        {page.sections.map((s, i) => {
          const midpoint = Math.floor(page.sections.length / 2);
          return (
            <section key={s.h2}>
              <h2>{s.h2}</h2>
              <p>{s.body}</p>
              {i === midpoint - 1 && page.sections.length >= 3 && (
                <AdSlot
                  slot={adsense.articleMidSlot}
                  format="fluid"
                  layout="in-article"
                  label="Sponsored"
                  position="Article · mid-content"
                />
              )}
            </section>
          );
        })}

        <AdSlot
          slot={adsense.articleSlot}
          format="auto"
          label="Sponsored"
          position="Article · end-of-content"
        />

        <AuthoritySources />

        {related.length > 0 && (
          <section className="mt-14 not-prose">
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-ink mb-5">
              Related guides
            </h2>
            <ul className="grid sm:grid-cols-2 gap-3">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/${r.slug}`}
                    className="group block rounded-2xl bg-white/70 backdrop-blur-sm border border-sun-100 p-4 hover:border-sun-300 hover:bg-white hover:shadow-soft hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <p className="font-bold text-ink group-hover:text-sun-800 transition-colors">
                      {r.title}
                    </p>
                    <p className="text-sm text-ink-soft mt-1 leading-snug">
                      {r.description}
                    </p>
                    <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-sun-700 group-hover:gap-2 transition-all">
                      Read more
                      <span aria-hidden="true">→</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>
    </>
  );
}
