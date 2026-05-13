"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Activity,
  CalcResult,
  SkinType,
  Spf,
  activityOptions,
  calculateReapplyMinutes,
  formatDuration,
  skinTypeOptions,
  spfOptions,
} from "@/lib/calculate";
import { fetchUvIndex, getBrowserPosition } from "@/lib/uv";

type LocationStatus =
  | "idle"
  | "requesting"
  | "fetching"
  | "ready"
  | "denied"
  | "unavailable"
  | "error";

type NotificationPermissionState = "default" | "granted" | "denied";

function loadStored<T>(key: string, fallback: T, validate: (v: unknown) => v is T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return validate(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

function persist(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // localStorage may be unavailable in private mode — ignore
  }
}

function isSkinType(v: unknown): v is SkinType {
  return v === "I" || v === "II" || v === "III" || v === "IV" || v === "V" || v === "VI";
}
function isSpf(v: unknown): v is Spf {
  return v === 15 || v === 30 || v === 50 || v === 70 || v === 100;
}
function isActivity(v: unknown): v is Activity {
  return v === "indoor" || v === "light" || v === "beach" || v === "sports" || v === "swimming";
}

function playBeep(durationMs = 300, frequency = 880) {
  if (typeof window === "undefined") return;
  try {
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new Ctx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.value = frequency;
    osc.type = "sine";
    osc.connect(gain);
    gain.connect(ctx.destination);
    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.25, ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + durationMs / 1000);
    osc.start();
    osc.stop(ctx.currentTime + durationMs / 1000);
    setTimeout(() => ctx.close().catch(() => undefined), durationMs + 100);
  } catch {
    // AudioContext unavailable — silent fallback
  }
}

export function SunscreenTimer() {
  const [skinType, setSkinType] = useState<SkinType>("III");
  const [spf, setSpf] = useState<Spf>(30);
  const [activity, setActivity] = useState<Activity>("light");
  const [uvSource, setUvSource] = useState<"auto" | "manual">("auto");
  const [manualUv, setManualUv] = useState<number>(5);
  const [liveUv, setLiveUv] = useState<number | null>(null);
  const [locationStatus, setLocationStatus] = useState<LocationStatus>("idle");
  const [locationLabel, setLocationLabel] = useState<string | null>(null);

  const [endsAt, setEndsAt] = useState<number | null>(null);
  const [now, setNow] = useState<number>(Date.now());
  const [warned10, setWarned10] = useState(false);
  const [expired, setExpired] = useState(false);
  const [flashOnExpiry, setFlashOnExpiry] = useState(false);

  const [notifPermission, setNotifPermission] = useState<NotificationPermissionState>("default");

  const hydratedRef = useRef(false);
  // Load saved preferences after mount to avoid SSR mismatch
  useEffect(() => {
    if (hydratedRef.current) return;
    hydratedRef.current = true;
    setSkinType(loadStored<SkinType>("st.skin", "III", isSkinType));
    setSpf(loadStored<Spf>("st.spf", 30, isSpf));
    setActivity(loadStored<Activity>("st.activity", "light", isActivity));
    if (typeof window !== "undefined" && "Notification" in window) {
      setNotifPermission(Notification.permission as NotificationPermissionState);
    }
  }, []);

  useEffect(() => {
    persist("st.skin", skinType);
  }, [skinType]);
  useEffect(() => {
    persist("st.spf", spf);
  }, [spf]);
  useEffect(() => {
    persist("st.activity", activity);
  }, [activity]);

  const effectiveUv = useMemo<number | null>(() => {
    if (uvSource === "manual") return manualUv;
    return liveUv;
  }, [uvSource, manualUv, liveUv]);

  const result: CalcResult = useMemo(
    () => calculateReapplyMinutes({ skinType, spf, activity, uvIndex: effectiveUv }),
    [skinType, spf, activity, effectiveUv]
  );

  // Countdown tick
  useEffect(() => {
    if (endsAt === null) return;
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [endsAt]);

  const remainingSec = endsAt === null ? null : Math.max(0, Math.floor((endsAt - now) / 1000));

  const sendNotification = useCallback((title: string, body: string) => {
    if (typeof window === "undefined" || !("Notification" in window)) return;
    if (Notification.permission !== "granted") return;
    try {
      new Notification(title, { body, icon: "/icon.svg", tag: "sunscreen-timer" });
    } catch {
      // some browsers require service worker registration — silently skip
    }
  }, []);

  // Notification permission requested only on Start
  const ensureNotificationPermission = useCallback(async () => {
    if (typeof window === "undefined" || !("Notification" in window)) return;
    if (Notification.permission === "default") {
      try {
        const result = await Notification.requestPermission();
        setNotifPermission(result as NotificationPermissionState);
      } catch {
        // ignore — user may have closed the prompt
      }
    } else {
      setNotifPermission(Notification.permission as NotificationPermissionState);
    }
  }, []);

  // Warning + expiry triggers
  useEffect(() => {
    if (remainingSec === null) return;
    if (!warned10 && remainingSec <= 600 && remainingSec > 0) {
      setWarned10(true);
      playBeep(200, 660);
      sendNotification(
        "10 minutes to reapply",
        "Heads up — your sunscreen reapply window is almost up."
      );
    }
    if (!expired && remainingSec === 0) {
      setExpired(true);
      setFlashOnExpiry(true);
      playBeep(400, 880);
      setTimeout(() => playBeep(400, 1100), 500);
      sendNotification(
        "Reapply sunscreen now",
        "Two-hour-ish window is up. Apply a fresh layer before going back into the sun."
      );
      window.setTimeout(() => setFlashOnExpiry(false), 3500);
    }
  }, [remainingSec, warned10, expired, sendNotification]);

  const handleUseLocation = useCallback(async () => {
    setLocationStatus("requesting");
    try {
      const pos = await getBrowserPosition();
      setLocationStatus("fetching");
      const uv = await fetchUvIndex(pos.coords.latitude, pos.coords.longitude);
      setLiveUv(uv.uvi);
      setLocationLabel(
        `Lat ${uv.latitude.toFixed(2)}, Lon ${uv.longitude.toFixed(2)}`
      );
      setLocationStatus("ready");
      setUvSource("auto");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      if (message.toLowerCase().includes("denied") || message.includes("PERMISSION")) {
        setLocationStatus("denied");
      } else if (message.toLowerCase().includes("not available")) {
        setLocationStatus("unavailable");
      } else {
        setLocationStatus("error");
      }
      setUvSource("manual");
    }
  }, []);

  const handleStart = useCallback(async () => {
    await ensureNotificationPermission();
    const ends = Date.now() + result.minutes * 60 * 1000;
    setEndsAt(ends);
    setNow(Date.now());
    setWarned10(false);
    setExpired(false);
  }, [ensureNotificationPermission, result.minutes]);

  const handleStop = useCallback(() => {
    setEndsAt(null);
    setWarned10(false);
    setExpired(false);
  }, []);

  const handleRestart = useCallback(() => {
    const ends = Date.now() + result.minutes * 60 * 1000;
    setEndsAt(ends);
    setNow(Date.now());
    setWarned10(false);
    setExpired(false);
  }, [result.minutes]);

  const handleSnooze = useCallback(() => {
    const ends = Date.now() + 15 * 60 * 1000;
    setEndsAt(ends);
    setNow(Date.now());
    setWarned10(false);
    setExpired(false);
  }, []);

  const isRunning = endsAt !== null && remainingSec !== null && remainingSec > 0;
  const isExpired = endsAt !== null && remainingSec === 0;

  return (
    <section
      aria-labelledby="timer-heading"
      className={`timer-card-min relative rounded-2xl border border-sun-100 bg-white shadow-card p-6 sm:p-8 ${
        flashOnExpiry ? "animate-flash" : ""
      }`}
    >
      <h1 id="timer-heading" className="sr-only">
        Sunscreen reapplication timer
      </h1>

      {/* Big readout */}
      <div className="text-center">
        <div className="text-sm uppercase tracking-wider text-ink-mute mb-2">
          {isRunning ? "Time until reapply" : isExpired ? "Reapply now" : "Reapply in"}
        </div>
        <div
          className={`font-bold tabular-nums leading-none ${
            isExpired ? "text-sun-800" : "text-ink"
          } text-6xl sm:text-7xl`}
          aria-live="polite"
        >
          {isRunning && remainingSec !== null
            ? formatDuration(remainingSec)
            : isExpired
            ? "00:00"
            : `${result.minutes} min`}
        </div>
        <p className="mt-3 text-sm text-ink-soft">
          {effectiveUv === null
            ? "Using the dermatologist 2-hour default (no UV data yet)."
            : `Based on UV ${effectiveUv.toFixed(1)} — ${result.uvBucket}, ${activityOptions.find(a => a.value === activity)?.label.toLowerCase()}.`}
        </p>
      </div>

      {/* Controls */}
      {!isRunning && !isExpired && (
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="skin" className="block text-sm font-medium text-ink mb-1.5">
              Skin type (Fitzpatrick)
            </label>
            <select
              id="skin"
              value={skinType}
              onChange={(e) => setSkinType(e.target.value as SkinType)}
              className="block w-full rounded-lg border border-ink-mute/30 bg-white px-3 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-sun-500"
            >
              {skinTypeOptions.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="activity" className="block text-sm font-medium text-ink mb-1.5">
              Activity
            </label>
            <select
              id="activity"
              value={activity}
              onChange={(e) => setActivity(e.target.value as Activity)}
              className="block w-full rounded-lg border border-ink-mute/30 bg-white px-3 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-sun-500"
            >
              {activityOptions.map((a) => (
                <option key={a.value} value={a.value}>
                  {a.label}
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-2">
            <span className="block text-sm font-medium text-ink mb-1.5">SPF</span>
            <div className="grid grid-cols-5 gap-2">
              {spfOptions.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSpf(s)}
                  className={`rounded-lg px-3 py-2.5 text-sm font-semibold transition ${
                    spf === s
                      ? "bg-sun-500 text-white shadow-card"
                      : "bg-sun-50 text-ink hover:bg-sun-100"
                  }`}
                  aria-pressed={spf === s}
                >
                  {s === 100 ? "100+" : s}
                </button>
              ))}
            </div>
          </div>

          <div className="sm:col-span-2">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm font-medium text-ink">UV index</span>
              <button
                type="button"
                onClick={handleUseLocation}
                disabled={locationStatus === "requesting" || locationStatus === "fetching"}
                className="text-xs font-medium text-sky-700 hover:text-sky-800 disabled:opacity-50"
              >
                {locationStatus === "requesting"
                  ? "Requesting…"
                  : locationStatus === "fetching"
                  ? "Fetching UV…"
                  : locationStatus === "ready"
                  ? "Refresh"
                  : "Use my location"}
              </button>
            </div>

            <div className="flex gap-2 mb-2">
              <button
                type="button"
                onClick={() => setUvSource("auto")}
                className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium ${
                  uvSource === "auto"
                    ? "bg-sky-100 text-sky-800 ring-1 ring-sky-300"
                    : "bg-cream text-ink-soft"
                }`}
              >
                Live{liveUv !== null ? ` (${liveUv.toFixed(1)})` : ""}
              </button>
              <button
                type="button"
                onClick={() => setUvSource("manual")}
                className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium ${
                  uvSource === "manual"
                    ? "bg-sky-100 text-sky-800 ring-1 ring-sky-300"
                    : "bg-cream text-ink-soft"
                }`}
              >
                Manual ({manualUv})
              </button>
            </div>

            {uvSource === "manual" && (
              <div>
                <input
                  type="range"
                  min={0}
                  max={12}
                  step={1}
                  value={manualUv}
                  onChange={(e) => setManualUv(Number(e.target.value))}
                  aria-label="Manual UV index"
                  className="w-full accent-sky-600"
                />
                <div className="flex justify-between text-xs text-ink-mute mt-1">
                  <span>0</span>
                  <span>3</span>
                  <span>6</span>
                  <span>9</span>
                  <span>11+</span>
                </div>
              </div>
            )}

            {locationStatus === "denied" && (
              <p className="mt-2 text-xs text-ink-soft">
                Location denied — using manual UV. You can change this in your browser settings.
              </p>
            )}
            {locationStatus === "unavailable" && (
              <p className="mt-2 text-xs text-ink-soft">
                Your browser doesn't support geolocation — use the manual slider.
              </p>
            )}
            {locationStatus === "error" && (
              <p className="mt-2 text-xs text-ink-soft">
                Couldn't reach the UV service. Manual slider works fine.
              </p>
            )}
            {locationStatus === "ready" && locationLabel && (
              <p className="mt-2 text-xs text-ink-mute">{locationLabel}</p>
            )}
          </div>

          <button
            type="button"
            onClick={handleStart}
            className="sm:col-span-2 mt-2 rounded-xl bg-sun-500 px-6 py-4 text-lg font-bold text-white shadow-card hover:bg-sun-600 active:bg-sun-700 transition focus:outline-none focus:ring-4 focus:ring-sun-200"
          >
            Start Timer
          </button>
        </div>
      )}

      {isRunning && (
        <div className="mt-6 flex flex-col gap-3">
          <button
            type="button"
            onClick={handleStop}
            className="rounded-xl bg-cream text-ink-soft px-4 py-3 font-semibold hover:bg-sun-50 transition"
          >
            Cancel timer
          </button>
          {notifPermission !== "granted" && (
            <p className="text-xs text-ink-mute text-center">
              Tip: allow notifications so the alert still hits if this tab is in the background.
            </p>
          )}
        </div>
      )}

      {isExpired && (
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={handleRestart}
            className="rounded-xl bg-sun-500 px-4 py-3 font-bold text-white shadow-card hover:bg-sun-600"
          >
            Reapply done — restart
          </button>
          <button
            type="button"
            onClick={handleSnooze}
            className="rounded-xl bg-cream text-ink px-4 py-3 font-semibold hover:bg-sun-50 transition"
          >
            Snooze 15 min
          </button>
        </div>
      )}

      <p className="mt-6 text-center text-xs text-ink-mute">
        Based on the dermatologist 2-hour standard, adjusted for your conditions. Not medical advice.
      </p>
    </section>
  );
}
