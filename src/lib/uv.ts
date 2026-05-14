export interface UvResult {
  /** UV index reported as "now" by the API. */
  uvi: number;
  /** Highest UV index across the lookahead window (next ~2 hours). Equals uvi when forecast is flat or missing. */
  peakUvi: number;
  /** Minutes from "now" until the peak hits. Null when peakUvi === uvi. */
  peakAtMinutes: number | null;
  /** True if the peak is noticeably higher than the current reading (>15%) — worth telling the user. */
  forecastSpike: boolean;
  /** True if the peak is noticeably lower than the current reading — UV is dropping (e.g. evening). */
  forecastDip: boolean;
  latitude: number;
  longitude: number;
  observedAt: string;
}

const LOOKAHEAD_HOURS = 2;
const SPIKE_RATIO = 1.15;
const DIP_RATIO = 0.85;

interface RawNow {
  time: string;
  uvi: number;
}
interface RawForecastEntry {
  time: string;
  uvi: number;
}
interface RawResponse {
  ok?: boolean;
  latitude?: number;
  longitude?: number;
  now?: RawNow;
  forecast?: RawForecastEntry[];
}

export async function fetchUvIndex(
  latitude: number,
  longitude: number,
  signal?: AbortSignal
): Promise<UvResult> {
  const url = `https://currentuvindex.com/api/v1/uvi?latitude=${latitude.toFixed(
    4
  )}&longitude=${longitude.toFixed(4)}`;

  const res = await fetch(url, { signal, cache: "no-store" });
  if (!res.ok) {
    throw new Error(`UV API returned ${res.status}`);
  }
  const data = (await res.json()) as RawResponse;
  if (!data.ok || !data.now || typeof data.now.uvi !== "number") {
    throw new Error("UV API returned unexpected payload");
  }

  const currentUvi = data.now.uvi;
  const nowMs = new Date(data.now.time).getTime();
  const cutoffMs = nowMs + LOOKAHEAD_HOURS * 60 * 60 * 1000;

  let peakUvi = currentUvi;
  let peakAtMs: number | null = null;

  if (Array.isArray(data.forecast)) {
    for (const entry of data.forecast) {
      if (!entry || typeof entry.uvi !== "number" || typeof entry.time !== "string") {
        continue;
      }
      const entryMs = new Date(entry.time).getTime();
      if (Number.isNaN(entryMs)) continue;
      if (entryMs <= nowMs) continue;
      if (entryMs > cutoffMs) break;
      if (entry.uvi > peakUvi) {
        peakUvi = entry.uvi;
        peakAtMs = entryMs;
      }
    }
  }

  const peakAtMinutes =
    peakAtMs !== null ? Math.max(1, Math.round((peakAtMs - nowMs) / 60000)) : null;
  const ratio = currentUvi > 0 ? peakUvi / currentUvi : 1;

  return {
    uvi: currentUvi,
    peakUvi,
    peakAtMinutes,
    forecastSpike: ratio >= SPIKE_RATIO && peakUvi > currentUvi + 0.5,
    forecastDip: ratio <= DIP_RATIO && currentUvi - peakUvi > 0.5,
    latitude: data.latitude ?? latitude,
    longitude: data.longitude ?? longitude,
    observedAt: data.now.time,
  };
}

export function getBrowserPosition(
  timeoutMs = 8000
): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined" || !("geolocation" in navigator)) {
      reject(new Error("Geolocation not available"));
      return;
    }
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: false,
      maximumAge: 10 * 60 * 1000,
      timeout: timeoutMs,
    });
  });
}
