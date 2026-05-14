const DEFAULT_URL = "https://sunscreen.zentopia.io";

function resolveSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return DEFAULT_URL;
  const withProtocol = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  try {
    // Validate that this parses; strip trailing slash for canonical use.
    const parsed = new URL(withProtocol);
    return parsed.origin + parsed.pathname.replace(/\/$/, "");
  } catch {
    return DEFAULT_URL;
  }
}

export const SITE = {
  name: "Sunscreen Timer",
  shortName: "Sunscreen Timer",
  url: resolveSiteUrl(),
  tagline: "Reapply on time. Every time.",
  description:
    "A UV-aware, personalized sunscreen reapplication timer. Live UV data, skin type, activity, and SPF — calibrated to the dermatologist 2-hour standard.",
};
