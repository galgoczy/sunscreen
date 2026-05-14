import Link from "next/link";
import { SubpageMeta } from "@/lib/subpages";
import { SITE } from "@/lib/site";
import { AdSlot } from "@/components/AdSlot";
import { adsense } from "@/lib/ads";

interface Props {
  page: SubpageMeta;
  related: SubpageMeta[];
}

export function ArticleLayout({ page, related }: Props) {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: page.title,
    description: page.description,
    mainEntityOfPage: `${SITE.url}/${page.slug}`,
    author: { "@type": "Organization", name: SITE.name },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      logo: { "@type": "ImageObject", url: `${SITE.url}/icon.svg` },
    },
    inLanguage: "en",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <article className="mx-auto max-w-3xl px-4 pt-8 sm:pt-12 prose-article">
        <nav aria-label="Breadcrumb" className="text-xs text-ink-mute mb-5 flex items-center gap-1.5">
          <Link
            href="/"
            className="hover:text-ink transition-colors font-medium"
          >
            Home
          </Link>
          <span className="text-ink-faint" aria-hidden="true">/</span>
          <span className="text-ink-soft truncate">{page.title}</span>
        </nav>

        <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tightest text-ink !mb-5 leading-[1.06]">
          {page.h1}
        </h1>
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
