import Link from "next/link";
import { subpages } from "@/lib/subpages";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-sun-100/70 bg-cream">
      <div className="mx-auto max-w-5xl px-4 py-10 text-sm text-ink-soft">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="mb-3 font-semibold text-ink">Guides</h3>
            <ul className="space-y-2">
              {subpages.slice(0, 5).map((p) => (
                <li key={p.slug}>
                  <Link href={`/${p.slug}`} className="hover:text-ink">
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-3 font-semibold text-ink">Activities</h3>
            <ul className="space-y-2">
              {subpages
                .filter((p) => p.category === "activity")
                .map((p) => (
                  <li key={p.slug}>
                    <Link href={`/${p.slug}`} className="hover:text-ink">
                      {p.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-3 font-semibold text-ink">Products & myths</h3>
            <ul className="space-y-2">
              {subpages
                .filter((p) => p.category === "product" || p.category === "myth")
                .slice(0, 5)
                .map((p) => (
                  <li key={p.slug}>
                    <Link href={`/${p.slug}`} className="hover:text-ink">
                      {p.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-3 font-semibold text-ink">About</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="hover:text-ink">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-ink">
                  Home
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-sun-100/70 pt-6 text-xs text-ink-mute">
          <p>
            UV data provided by{" "}
            <a
              href="https://currentuvindex.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-ink"
            >
              currentuvindex.com
            </a>{" "}
            (CC BY 4.0). Sourced from NOAA.
          </p>
          <p className="mt-2">
            Educational tool, not medical advice. Talk to a dermatologist about your skin.
          </p>
          <p className="mt-2">© {new Date().getFullYear()} Sunscreen Timer.</p>
        </div>
      </div>
    </footer>
  );
}
