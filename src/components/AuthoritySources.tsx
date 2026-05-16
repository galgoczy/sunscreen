interface Source {
  title: string;
  href: string;
  note: string;
}

const sources: Source[] = [
  {
    title: "American Academy of Dermatology",
    href: "https://www.aad.org/public/everyday-care/sun-protection/sunscreen-patients/sunscreen-faqs",
    note: "Official sunscreen and reapplication guidance",
  },
  {
    title: "Skin Cancer Foundation",
    href: "https://www.skincancer.org/skin-cancer-prevention/sun-protection/",
    note: "Reapplication and water-resistance standards",
  },
  {
    title: "Cleveland Clinic",
    href: "https://health.clevelandclinic.org/how-often-to-reapply-sunscreen",
    note: "Practical reapply advice across activities",
  },
  {
    title: "World Health Organization (WHO)",
    href: "https://www.who.int/news-room/questions-and-answers/item/radiation-the-ultraviolet-(uv)-index",
    note: "The UV index scale and risk categories",
  },
  {
    title: "NOAA UV index data (via currentuvindex.com)",
    href: "https://currentuvindex.com/",
    note: "Live UV reading source used by this timer",
  },
];

export function AuthoritySources() {
  return (
    <aside
      aria-label="Trusted sources"
      className="not-prose mt-14 rounded-2xl bg-white/60 backdrop-blur-sm border border-sun-100 p-5 shadow-soft"
    >
      <h2 className="text-[11px] uppercase tracking-[0.18em] font-bold text-sun-700">
        Trusted sources
      </h2>
      <p className="mt-2 text-xs text-ink-mute leading-snug">
        This page draws on the consensus of these dermatology and public-health
        authorities. The reapply windows and UV-index categories used
        throughout the site align with their published guidance.
      </p>
      <ul className="mt-3 space-y-2">
        {sources.map((s) => (
          <li key={s.href} className="text-sm leading-snug">
            <a
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-sun-800 underline underline-offset-2 decoration-sun-300 hover:decoration-sun-700 transition"
            >
              {s.title}
            </a>
            <span className="text-ink-soft"> — {s.note}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
