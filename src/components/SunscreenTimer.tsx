"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Activity,
  CalcResult,
  SkinType,
  Spf,
  activityOptions,
  calculateReapplyMinutes,
  skinTypeOptions,
  spfOptions,
} from "@/lib/calculate";
import { fetchUvIndex, getBrowserPosition } from "@/lib/uv";
import { uvLevelStyle } from "@/lib/uvStyle";
import { CountdownRing } from "./CountdownRing";
import { SunIcon } from "./SunIcon";

type LocationStatus =
  | "idle"
  | "requesting"
  | "fetching"
  | "ready"
  | "denied"
  | "unavailable"
  | "error";

type NotifPermissionState = "default" | "granted" | "denied";

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

function PinIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M12 2.25c-3.866 0-7 3.134-7 7 0 5.25 7 12.75 7 12.75s7-7.5 7-12.75c0-3.866-3.134-7-7-7z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="9.25" r="2.5" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function RefreshIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 4v6h6M20 20v-6h-6M20 8a8 8 0 00-14.9 1M4 16a8 8 0 0014.9-1"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SunscreenTimer() {
  const [skinType, setSkinType] = useState<SkinType>("III");
  const [spf, setSpf] = useState<Spf>(30);
  const [activity, setActivity] = useState<Activity>("light");
  const [uvSource, setUvSource] = useState<"auto" | "manual">("auto");
  const [manualUv, setManualUv] = useState<number>(5);
  const [liveUv, setLiveUv] = useState<number | null>(null);
  const [livePeakUv, setLivePeakUv] = useState<number | null>(null);
  const [livePeakAtMin, setLivePeakAtMin] = useState<number | null>(null);
  const [liveForecastSpike, setLiveForecastSpike] = useState(false);
  const [liveForecastDip, setLiveForecastDip] = useState(false);
  const [locationStatus, setLocationStatus] = useState<LocationStatus>("idle");
  const [locationLabel, setLocationLabel] = useState<string | null>(null);

  const [endsAt, setEndsAt] = useState<number | null>(null);
  const [now, setNow] = useState<number>(Date.now());
  const [totalSec, setTotalSec] = useState<number>(0);
  const [warned10, setWarned10] = useState(false);
  const [expired, setExpired] = useState(false);
  const [flashOnExpiry, setFlashOnExpiry] = useState(false);

  const [notifPermission, setNotifPermission] = useState<NotifPermissionState>("default");
  const [showNotifExplainer, setShowNotifExplainer] = useState(false);

  const hydratedRef = useRef(false);
  useEffect(() => {
    if (hydratedRef.current) return;
    hydratedRef.current = true;
    setSkinType(loadStored<SkinType>("st.skin", "III", isSkinType));
    setSpf(loadStored<Spf>("st.spf", 30, isSpf));
    setActivity(loadStored<Activity>("st.activity", "light", isActivity));
    if (typeof window !== "undefined" && "Notification" in window) {
      setNotifPermission(Notification.permission as NotifPermissionState);
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
    // Use the peak forecast UV (safer reapply window when UV is climbing).
    return livePeakUv ?? liveUv;
  }, [uvSource, manualUv, liveUv, livePeakUv]);

  const result: CalcResult = useMemo(
    () => calculateReapplyMinutes({ skinType, spf, activity, uvIndex: effectiveUv }),
    [skinType, spf, activity, effectiveUv]
  );

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

  const ensureNotificationPermission = useCallback(async () => {
    if (typeof window === "undefined" || !("Notification" in window)) return;
    if (Notification.permission === "default") {
      try {
        const result = await Notification.requestPermission();
        setNotifPermission(result as NotifPermissionState);
      } catch {
        // user dismissed — leave default
      }
    } else {
      setNotifPermission(Notification.permission as NotifPermissionState);
    }
  }, []);

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
      setLivePeakUv(uv.peakUvi);
      setLivePeakAtMin(uv.peakAtMinutes);
      setLiveForecastSpike(uv.forecastSpike);
      setLiveForecastDip(uv.forecastDip);
      setLocationLabel(`Lat ${uv.latitude.toFixed(2)}, Lon ${uv.longitude.toFixed(2)}`);
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
    }
  }, []);

  const beginTimer = useCallback((seconds: number) => {
    setTotalSec(seconds);
    setEndsAt(Date.now() + seconds * 1000);
    setNow(Date.now());
    setWarned10(false);
    setExpired(false);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("st:request-install"));
    }
  }, []);

  const handleStart = useCallback(() => {
    const canAskForPermission =
      typeof window !== "undefined" &&
      "Notification" in window &&
      Notification.permission === "default";
    if (canAskForPermission) {
      setShowNotifExplainer(true);
      return;
    }
    beginTimer(result.minutes * 60);
  }, [beginTimer, result.minutes]);

  const handleAllowAndStart = useCallback(async () => {
    setShowNotifExplainer(false);
    await ensureNotificationPermission();
    beginTimer(result.minutes * 60);
  }, [beginTimer, ensureNotificationPermission, result.minutes]);

  const handleSkipAndStart = useCallback(() => {
    setShowNotifExplainer(false);
    beginTimer(result.minutes * 60);
  }, [beginTimer, result.minutes]);

  const handleStop = useCallback(() => {
    setEndsAt(null);
    setWarned10(false);
    setExpired(false);
  }, []);

  const handleRestart = useCallback(() => {
    beginTimer(result.minutes * 60);
  }, [beginTimer, result.minutes]);

  const handleSnooze = useCallback(() => {
    beginTimer(15 * 60);
  }, [beginTimer]);

  const isRunning = endsAt !== null && remainingSec !== null && remainingSec > 0;
  const isExpired = endsAt !== null && remainingSec === 0;
  const isLocationBusy = locationStatus === "requesting" || locationStatus === "fetching";
  const isLocationProblem =
    locationStatus === "denied" || locationStatus === "unavailable" || locationStatus === "error";

  return (
    <section
      aria-labelledby="timer-heading"
      className={`timer-card-min relative overflow-hidden rounded-[28px] border border-sun-100/80 bg-gradient-to-br from-white via-white to-sun-50/50 shadow-card p-6 sm:p-8 ${
        flashOnExpiry ? "animate-flash" : ""
      }`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-sun-300/70 to-transparent"
      />
      <h1 id="timer-heading" className="sr-only">
        Sunscreen reapplication timer
      </h1>

      {/* === Notification permission explainer === */}
      {showNotifExplainer ? (
        <div className="flex flex-col items-center text-center py-4 sm:py-6">
          <div className="relative mb-6">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -m-3 rounded-full bg-gradient-to-br from-sun-300/40 to-sun-500/20 blur-xl"
            />
            <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-sun-100 to-sun-300 flex items-center justify-center animate-pulseSun ring-1 ring-sun-300/50 shadow-glow">
              <SunIcon size={46} />
            </div>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-ink">
            Go enjoy the sun
          </h2>
          <p className="mt-3 text-ink-soft max-w-sm leading-relaxed">
            Let us nudge you when it's time to reapply — so you can relax in
            the sun instead of watching the clock. One browser notification
            at reapply time. No spam, no follow-ups.
          </p>
          <div className="mt-7 w-full max-w-sm grid gap-2.5">
            <button
              type="button"
              onClick={handleAllowAndStart}
              className="group relative rounded-2xl bg-gradient-to-b from-sun-400 to-sun-600 px-5 py-3.5 text-base font-bold text-white shadow-glow hover:from-sun-300 hover:to-sun-700 active:translate-y-px transition-all duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-sun-300/60 overflow-hidden"
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px bg-white/60"
              />
              Allow notifications & start
            </button>
            <button
              type="button"
              onClick={handleSkipAndStart}
              className="rounded-2xl bg-white/70 backdrop-blur border border-ink-mute/15 text-ink-soft px-5 py-3 text-sm font-semibold hover:bg-white hover:text-ink transition-all"
            >
              Skip — just start the timer
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* === Big number readout (idle) or Ring (running/expired) === */}
          {isRunning || isExpired ? (
            <div className="mt-2 mb-2">
              <CountdownRing
                remainingSec={remainingSec ?? 0}
                totalSec={totalSec}
                expired={isExpired}
              />
              {!isExpired && (
                <p className="text-center mt-3 text-xs text-ink-mute">
                  {effectiveUv !== null
                    ? `UV ${effectiveUv.toFixed(1)} · ${result.uvBucket} · ${activityOptions
                        .find((a) => a.value === activity)
                        ?.label.toLowerCase()}`
                    : "Using the dermatologist 2-hour default"}
                </p>
              )}
            </div>
          ) : (
            <div className="text-center pt-1">
              <div className="text-[10px] uppercase tracking-[0.2em] font-semibold text-ink-mute mb-3">
                Reapply in
              </div>
              <div className="font-display font-extrabold tabular-nums leading-none tracking-tightest">
                <span className="text-7xl sm:text-[88px] bg-gradient-to-br from-ink to-ink-soft bg-clip-text text-transparent">
                  {result.minutes}
                </span>
                <span className="text-3xl sm:text-4xl text-ink-mute ml-2 font-bold">
                  min
                </span>
              </div>
              <p className="mt-4 text-sm text-ink-soft max-w-xs mx-auto">
                {effectiveUv === null
                  ? "Using the dermatologist 2-hour default — use your location for a precise reading."
                  : `UV ${effectiveUv.toFixed(1)} · ${result.uvBucket} · ${activityOptions
                      .find((a) => a.value === activity)
                      ?.label.toLowerCase()}`}
              </p>
            </div>
          )}

          {/* === Live UV chip (when location ready) === */}
          {!isRunning && !isExpired && uvSource === "auto" && liveUv !== null && locationStatus === "ready" && (() => {
            const displayUv = livePeakUv ?? liveUv;
            const style = uvLevelStyle(displayUv);
            const showSpikeNote = liveForecastSpike && livePeakAtMin !== null;
            const showDipNote = liveForecastDip && livePeakAtMin !== null;
            return (
              <div
                className={`mt-6 rounded-2xl bg-gradient-to-br ${style.bg} border ${style.border} px-4 py-3.5 flex items-center justify-between gap-3 shadow-soft`}
              >
                <div className="min-w-0 flex items-center gap-3">
                  <div
                    className={`flex-shrink-0 w-10 h-10 rounded-xl bg-white/80 flex items-center justify-center ring-1 ${style.iconRing}`}
                  >
                    <span className="text-[18px]" aria-hidden="true">📍</span>
                  </div>
                  <div className="min-w-0">
                    <div
                      className={`text-[10px] uppercase tracking-[0.18em] font-bold ${style.accent}`}
                    >
                      {showSpikeNote
                        ? "Live UV · 2hr forecast peak"
                        : "Live UV · your location"}
                    </div>
                    <div className="flex items-baseline gap-2 mt-0.5">
                      <span
                        className={`text-2xl sm:text-[28px] font-extrabold tabular-nums leading-none ${style.numColor}`}
                      >
                        {displayUv.toFixed(1)}
                      </span>
                      <span className={`text-xs font-semibold ${style.accent}`}>
                        {style.bucket}
                      </span>
                    </div>
                    {showSpikeNote && (
                      <div className="text-[11px] text-ink-soft mt-1 leading-tight">
                        Currently {liveUv.toFixed(1)} · peak in ~{livePeakAtMin} min
                      </div>
                    )}
                    {showDipNote && (
                      <div className="text-[11px] text-ink-soft mt-1 leading-tight">
                        Currently {liveUv.toFixed(1)} · easing through the next 2 hr
                      </div>
                    )}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleUseLocation}
                  disabled={isLocationBusy}
                  className={`flex items-center gap-1.5 rounded-xl bg-white px-3 py-2 text-xs font-semibold disabled:opacity-60 transition-all border ${style.border} shadow-soft ${style.buttonText}`}
                >
                  <RefreshIcon />
                  <span>Refresh</span>
                </button>
              </div>
            );
          })()}

          {/* === Big location CTA (when location not yet used) === */}
          {!isRunning && !isExpired && uvSource === "auto" && locationStatus !== "ready" && (
            <button
              type="button"
              onClick={handleUseLocation}
              disabled={isLocationBusy}
              className="group relative mt-6 w-full overflow-hidden rounded-2xl bg-gradient-to-br from-sky-500 via-sky-600 to-sky-800 text-white text-left shadow-[0_10px_30px_-10px_rgba(37,99,235,0.5)] hover:shadow-[0_14px_36px_-10px_rgba(37,99,235,0.6)] hover:-translate-y-px active:translate-y-0 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-300/60 px-5 py-4"
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px bg-white/40"
              />
              <span
                aria-hidden="true"
                className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-white/10 blur-2xl group-hover:bg-white/20 transition-colors"
              />
              <div className="relative flex items-center gap-4">
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center ring-1 ring-white/25 backdrop-blur-sm">
                  <PinIcon className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-lg font-extrabold leading-tight">
                    {isLocationBusy
                      ? locationStatus === "requesting"
                        ? "Asking your browser…"
                        : "Pulling live UV…"
                      : isLocationProblem
                      ? "Try location again"
                      : "Calculate for where I am right now"}
                  </div>
                  <div className="text-sm text-sky-100 mt-0.5 leading-snug">
                    {locationStatus === "requesting"
                      ? "Tap allow on the browser prompt"
                      : locationStatus === "fetching"
                      ? "Fetching the live UV index for your spot"
                      : locationStatus === "denied"
                      ? "Permission denied — tap to retry, or use the slider below"
                      : locationStatus === "unavailable"
                      ? "Your browser doesn't support geolocation — use the slider below"
                      : locationStatus === "error"
                      ? "Couldn't reach the UV service — tap to retry"
                      : "Get a live UV reading for your exact spot"}
                  </div>
                </div>
                {!isLocationBusy && (
                  <div
                    className="flex-shrink-0 text-2xl text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all"
                    aria-hidden="true"
                  >
                    →
                  </div>
                )}
              </div>
            </button>
          )}

          {/* === Toggle to manual / back to auto === */}
          {!isRunning && !isExpired && (
            <div className="mt-3 text-center">
              <button
                type="button"
                onClick={() =>
                  setUvSource(uvSource === "auto" ? "manual" : "auto")
                }
                className="text-xs text-sky-700 hover:text-sky-900 underline underline-offset-2"
              >
                {uvSource === "auto"
                  ? "Or set the UV index manually"
                  : "Use my live location instead"}
              </button>
            </div>
          )}

          {/* === Manual UV slider === */}
          {!isRunning && !isExpired && uvSource === "manual" && (
            <div className="mt-4 rounded-2xl bg-gradient-to-br from-sky-50 to-cream p-4 border border-sky-100">
              <div className="flex items-baseline justify-between mb-2">
                <span className="text-[10px] uppercase tracking-[0.18em] text-sky-700 font-bold">
                  Manual UV index
                </span>
                <span className="text-2xl font-extrabold text-sky-800 tabular-nums leading-none">
                  {manualUv}
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={12}
                step={1}
                value={manualUv}
                onChange={(e) => setManualUv(Number(e.target.value))}
                className="w-full accent-sky-600"
                aria-label="Manual UV index"
              />
              <div className="flex justify-between text-[10px] text-ink-mute mt-1">
                <span>0</span>
                <span>3</span>
                <span>6</span>
                <span>9</span>
                <span>11+</span>
              </div>
            </div>
          )}

          {/* === Settings (skin / activity / SPF) === */}
          {!isRunning && !isExpired && (
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="skin"
                  className="block text-sm font-semibold text-ink mb-1.5"
                >
                  Skin type
                </label>
                <select
                  id="skin"
                  value={skinType}
                  onChange={(e) => setSkinType(e.target.value as SkinType)}
                  className="block w-full rounded-xl border border-ink-faint/40 bg-white/80 backdrop-blur-sm px-3.5 py-2.5 text-base text-ink shadow-soft hover:border-sun-300 focus:outline-none focus:border-sun-400 focus:ring-4 focus:ring-sun-200/50 transition-all appearance-none cursor-pointer"
                >
                  {skinTypeOptions.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="activity"
                  className="block text-sm font-semibold text-ink mb-1.5"
                >
                  Activity
                </label>
                <select
                  id="activity"
                  value={activity}
                  onChange={(e) => setActivity(e.target.value as Activity)}
                  className="block w-full rounded-xl border border-ink-faint/40 bg-white/80 backdrop-blur-sm px-3.5 py-2.5 text-base text-ink shadow-soft hover:border-sun-300 focus:outline-none focus:border-sun-400 focus:ring-4 focus:ring-sun-200/50 transition-all appearance-none cursor-pointer"
                >
                  {activityOptions.map((a) => (
                    <option key={a.value} value={a.value}>
                      {a.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <span className="block text-sm font-semibold text-ink mb-2">
                  SPF
                </span>
                <div className="grid grid-cols-5 gap-1.5 rounded-2xl bg-cream/70 p-1 border border-sun-100/60">
                  {spfOptions.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSpf(s)}
                      className={`relative rounded-xl px-2 py-2.5 text-sm font-bold transition-all ${
                        spf === s
                          ? "bg-gradient-to-b from-sun-400 to-sun-600 text-white shadow-glow"
                          : "text-ink-soft hover:bg-white/70 hover:text-ink"
                      }`}
                      aria-pressed={spf === s}
                    >
                      {spf === s && (
                        <span
                          aria-hidden="true"
                          className="absolute inset-x-2 top-0 h-px bg-white/50"
                        />
                      )}
                      {s === 100 ? "100+" : s}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={handleStart}
                className="group relative sm:col-span-2 mt-3 overflow-hidden rounded-2xl bg-gradient-to-b from-sun-400 to-sun-600 px-6 py-4 text-lg font-extrabold text-white shadow-glow hover:from-sun-300 hover:to-sun-700 hover:shadow-[0_12px_32px_-8px_rgba(245,158,11,0.55)] hover:-translate-y-px active:translate-y-0 active:from-sun-500 active:to-sun-700 transition-all duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-sun-300/60"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px bg-white/60"
                />
                <span
                  aria-hidden="true"
                  className="absolute -top-12 -right-10 h-32 w-32 rounded-full bg-white/15 blur-2xl group-hover:bg-white/25 transition-colors"
                />
                <span className="relative tracking-tight">Start Timer</span>
              </button>
            </div>
          )}

          {/* === Running / Expired controls === */}
          {isRunning && (
            <div className="mt-6 flex flex-col gap-3">
              <button
                type="button"
                onClick={handleStop}
                className="rounded-2xl bg-white/70 backdrop-blur border border-ink-faint/30 text-ink-soft px-4 py-3 font-semibold hover:bg-white hover:text-ink hover:border-ink-faint/50 transition-all"
              >
                Cancel timer
              </button>
              {notifPermission !== "granted" && (
                <p className="text-[11px] text-ink-mute text-center">
                  Tip: allow notifications next time and you can leave this
                  tab — we'll buzz you.
                </p>
              )}
            </div>
          )}

          {isExpired && (
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={handleRestart}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-b from-sun-400 to-sun-600 px-4 py-3.5 font-extrabold text-white shadow-glow hover:from-sun-300 hover:to-sun-700 hover:-translate-y-px active:translate-y-0 transition-all"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px bg-white/60"
                />
                Reapply done — restart
              </button>
              <button
                type="button"
                onClick={handleSnooze}
                className="rounded-2xl bg-white/70 backdrop-blur border border-ink-faint/30 text-ink px-4 py-3.5 font-semibold hover:bg-white hover:border-ink-faint/50 transition-all"
              >
                Snooze 15 min
              </button>
            </div>
          )}

          <p className="mt-6 text-center text-[11px] text-ink-mute">
            Based on the dermatologist 2-hour standard, adjusted for your
            conditions. Not medical advice.
          </p>
        </>
      )}
    </section>
  );
}
