import Link from "next/link";
import { SunIcon } from "./SunIcon";

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-sun-100/70 bg-paper/75 backdrop-blur-md backdrop-saturate-150 supports-[backdrop-filter]:bg-paper/60">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3.5">
        <Link
          href="/"
          className="flex items-center gap-2.5 group"
          aria-label="Sunscreen Timer — home"
        >
          <span className="relative inline-flex items-center justify-center">
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-full bg-sun-300/40 blur-md group-hover:bg-sun-300/60 transition-colors"
            />
            <SunIcon
              size={26}
              className="relative group-hover:rotate-12 transition-transform duration-300 ease-out"
            />
          </span>
          <span className="font-semibold text-ink text-[15px] tracking-tight">
            Sunscreen Timer
          </span>
        </Link>
        <nav
          aria-label="Primary"
          className="flex items-center gap-1 text-sm text-ink-soft"
        >
          <Link
            href="/how-often-to-reapply-sunscreen"
            className="hidden sm:inline-block rounded-lg px-2.5 py-1.5 hover:bg-sun-50 hover:text-ink transition-colors"
          >
            Guide
          </Link>
          <Link
            href="/sunscreen-uv-index-explained"
            className="hidden sm:inline-block rounded-lg px-2.5 py-1.5 hover:bg-sun-50 hover:text-ink transition-colors"
          >
            UV index
          </Link>
          <Link
            href="/#faq"
            className="rounded-lg px-2.5 py-1.5 hover:bg-sun-50 hover:text-ink transition-colors"
          >
            FAQ
          </Link>
        </nav>
      </div>
    </header>
  );
}
