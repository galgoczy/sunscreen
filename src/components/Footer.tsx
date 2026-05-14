import Link from "next/link";
import { subpages } from "@/lib/subpages";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-sun-100/70 bg-paper/70 backdrop-blur-sm">
      <div className="mx-auto max-w-5xl px-4 py-12 text-sm text-ink-soft">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="mb-3 text-[11px] uppercase tracking-[0.18em] font-bold text-sun-700">
              Guides
            </h3>
            <ul className="space-y-2">
              {subpages.slice(0, 5).map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/${p.slug}`}
                    className="text-ink-soft hover:text-ink transition-colors"
                  >
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-[11px] uppercase tracking-[0.18em] font-bold text-sun-700">
              Activities
            </h3>
            <ul className="space-y-2">
              {subpages
                .filter((p) => p.category === "activity")
                .map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/${p.slug}`}
                      className="text-ink-soft hover:text-ink transition-colors"
                    >
                      {p.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-[11px] uppercase tracking-[0.18em] font-bold text-sun-700">
              Products & myths
            </h3>
            <ul className="space-y-2">
              {subpages
                .filter((p) => p.category === "product" || p.category === "myth")
                .slice(0, 5)
                .map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/${p.slug}`}
                      className="text-ink-soft hover:text-ink transition-colors"
                    >
                      {p.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-[11px] uppercase tracking-[0.18em] font-bold text-sun-700">
              About
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="text-ink-soft hover:text-ink transition-colors"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-ink-soft hover:text-ink transition-colors"
                >
                  Home
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-sun-100/70 pt-6 text-xs text-ink-mute leading-relaxed">
          <p>
            UV data provided by{" "}
            <a
              href="https://currentuvindex.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 decoration-sun-300 hover:text-ink hover:decoration-sun-500 transition"
            >
              currentuvindex.com
            </a>{" "}
            (CC BY 4.0). Sourced from NOAA.
          </p>
          <p className="mt-2">
            Educational tool, not medical advice. Talk to a dermatologist about your skin.
          </p>
          <p className="mt-3 text-ink-faint">
            © {new Date().getFullYear()} Sunscreen Timer.
          </p>
        </div>
      </div>
    </footer>
  );
}
