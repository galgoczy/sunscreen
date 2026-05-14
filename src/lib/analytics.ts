export const analytics = {
  gaId: process.env.NEXT_PUBLIC_GA_ID || "G-77R7MWD4CL",
};

export function isAnalyticsEnabled(): boolean {
  if (!analytics.gaId) return false;
  // Disable in dev unless explicitly enabled, so we don't pollute reports.
  if (process.env.NODE_ENV !== "production") {
    return process.env.NEXT_PUBLIC_GA_DEV === "1";
  }
  return true;
}
