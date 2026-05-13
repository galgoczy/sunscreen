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

      <article className="mx-auto max-w-3xl px-4 pt-6 sm:pt-10 prose-article">
        <nav aria-label="Breadcrumb" className="text-sm text-ink-mute mb-4">
          <Link href="/" className="hover:text-ink">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-ink-soft">{page.title}</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-ink !mb-4">
          {page.h1}
        </h1>
        <p className="text-lg text-ink-soft">{page.intro}</p>

        <div className="mt-8 rounded-xl bg-sun-50 border border-sun-200 p-4 not-prose">
          <p className="text-sm text-ink-soft">
            Want a personalized reapply schedule based on your location and
            skin?{" "}
            <Link
              href="/"
              className="font-semibold text-sun-800 underline-offset-2 hover:underline"
            >
              Use the smart sunscreen timer →
            </Link>
          </p>
        </div>

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
          <section className="mt-12 not-prose">
            <h2 className="text-2xl font-bold text-ink mb-4">Related guides</h2>
            <ul className="space-y-3">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/${r.slug}`}
                    className="text-sky-700 hover:text-sky-900 underline-offset-2 hover:underline font-medium"
                  >
                    {r.title}
                  </Link>
                  <p className="text-sm text-ink-soft mt-0.5">{r.description}</p>
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>
    </>
  );
}
