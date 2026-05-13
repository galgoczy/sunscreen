export interface UvResult {
  uvi: number;
  latitude: number;
  longitude: number;
  observedAt: string;
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
  const data = (await res.json()) as {
    ok?: boolean;
    latitude?: number;
    longitude?: number;
    now?: { time: string; uvi: number };
  };
  if (!data.ok || !data.now || typeof data.now.uvi !== "number") {
    throw new Error("UV API returned unexpected payload");
  }
  return {
    uvi: data.now.uvi,
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
