interface Row {
  activity: string;
  window: string;
  why: string;
}

const rows: Row[] = [
  {
    activity: "Indoor near a window",
    window: "≈ 180 min",
    why: "Glass blocks UVB; UVA still passes for aging effects",
  },
  {
    activity: "Light outdoor (walking, errands)",
    window: "120 min",
    why: "Dermatologist standard baseline",
  },
  {
    activity: "Beach or pool deck",
    window: "≈ 100 min",
    why: "Sand and water reflect 10–25% extra UV",
  },
  {
    activity: "Sports or heavy sweating",
    window: "80 min",
    why: "Sweat and friction strip the layer",
  },
  {
    activity: "Swimming",
    window: "40–80 min",
    why: "Match the bottle's water-resistance label",
  },
];

export function ReapplyWindowTable() {
  return (
    <figure className="not-prose my-8">
      <figcaption className="text-[10px] uppercase tracking-[0.18em] font-bold text-sun-700 mb-2">
        Reapply window by activity
      </figcaption>
      <div className="overflow-x-auto rounded-2xl border border-sun-100/80 bg-white/70 backdrop-blur-sm shadow-soft">
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th
                scope="col"
                className="text-left px-4 py-2.5 text-[10px] uppercase tracking-[0.14em] font-bold text-sun-800 bg-sun-50/60"
              >
                Activity
              </th>
              <th
                scope="col"
                className="text-left px-4 py-2.5 text-[10px] uppercase tracking-[0.14em] font-bold text-sun-800 bg-sun-50/60"
              >
                Reapply window
              </th>
              <th
                scope="col"
                className="text-left px-4 py-2.5 text-[10px] uppercase tracking-[0.14em] font-bold text-sun-800 bg-sun-50/60 hidden sm:table-cell"
              >
                Why
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sun-100">
            {rows.map((r) => (
              <tr key={r.activity}>
                <td className="px-4 py-3 font-semibold text-ink align-top">
                  {r.activity}
                </td>
                <td className="px-4 py-3 font-bold tabular-nums text-sun-800 align-top whitespace-nowrap">
                  {r.window}
                </td>
                <td className="px-4 py-3 text-ink-soft align-top hidden sm:table-cell">
                  {r.why}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-[11px] text-ink-mute sm:hidden">
        Activity reasons hidden on small screens — rotate or expand to see all.
      </p>
    </figure>
  );
}
