import Link from "next/link";
import { SunIcon } from "./SunIcon";

export function Header() {
  return (
    <header className="border-b border-sun-100/70 bg-cream/80 backdrop-blur sticky top-0 z-30">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 group">
          <SunIcon size={28} className="group-hover:rotate-12 transition-transform" />
          <span className="font-bold text-ink text-lg tracking-tight">
            Sunscreen Timer
          </span>
        </Link>
        <nav className="flex items-center gap-4 text-sm text-ink-soft">
          <Link href="/how-often-to-reapply-sunscreen" className="hover:text-ink hidden sm:inline">
            Guide
          </Link>
          <Link href="/sunscreen-uv-index-explained" className="hover:text-ink hidden sm:inline">
            UV index
          </Link>
          <Link href="/#faq" className="hover:text-ink">
            FAQ
          </Link>
        </nav>
      </div>
    </header>
  );
}
