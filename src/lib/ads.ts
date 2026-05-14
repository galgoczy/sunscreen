export const adsense = {
  clientId: process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "",
  homeTopSlot: process.env.NEXT_PUBLIC_ADSENSE_HOME_TOP_SLOT || "",
  homeSlot: process.env.NEXT_PUBLIC_ADSENSE_HOME_SLOT || "",
  homeMidSlot: process.env.NEXT_PUBLIC_ADSENSE_HOME_MID_SLOT || "",
  articleTopSlot: process.env.NEXT_PUBLIC_ADSENSE_ARTICLE_TOP_SLOT || "",
  articleMidSlot: process.env.NEXT_PUBLIC_ADSENSE_ARTICLE_MID_SLOT || "",
  articleSlot: process.env.NEXT_PUBLIC_ADSENSE_ARTICLE_SLOT || "",
} as const;

export function isAdsenseEnabled(): boolean {
  return Boolean(adsense.clientId);
}
