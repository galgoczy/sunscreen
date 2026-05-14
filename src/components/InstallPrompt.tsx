"use client";

import { useCallback, useEffect, useState } from "react";
import { SunIcon } from "./SunIcon";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const DISMISS_KEY = "st.installDismissed";
const DISMISS_HOURS = 72;
const SHOW_DELAY_MS = 6000;

function shouldRespectDismiss(): boolean {
  if (typeof window === "undefined") return true;
  try {
    const raw = window.localStorage.getItem(DISMISS_KEY);
    if (!raw) return false;
    const dismissedAt = Number(raw);
    if (Number.isNaN(dismissedAt)) return false;
    return Date.now() - dismissedAt < DISMISS_HOURS * 3600 * 1000;
  } catch {
    return false;
  }
}

function rememberDismiss() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(DISMISS_KEY, Date.now().toString());
  } catch {
    // ignore
  }
}

export function InstallPrompt() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [open, setOpen] = useState(false);
  const [variant, setVariant] = useState<"android" | "ios" | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as Navigator & { standalone?: boolean }).standalone === true;
    if (standalone) return;
    if (shouldRespectDismiss()) return;

    const ua = window.navigator.userAgent;
    const isIos =
      /iPhone|iPad|iPod/i.test(ua) && !/CriOS|FxiOS|EdgiOS|OPiOS|YaBrowser/i.test(ua);

    if (isIos) {
      setVariant("ios");
      const id = window.setTimeout(() => setOpen(true), SHOW_DELAY_MS);
      return () => window.clearTimeout(id);
    }

    function onBeforeInstall(e: Event) {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
      setVariant("android");
      setOpen(true);
    }

    function onInstalled() {
      setOpen(false);
      setDeferred(null);
    }

    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstall);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  const dismiss = useCallback(() => {
    setOpen(false);
    rememberDismiss();
  }, []);

  const install = useCallback(async () => {
    if (!deferred) return;
    try {
      await deferred.prompt();
      const { outcome } = await deferred.userChoice;
      if (outcome === "dismissed") rememberDismiss();
    } catch {
      // ignore
    } finally {
      setDeferred(null);
      setOpen(false);
    }
  }, [deferred]);

  if (!open || !variant) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 px-3 pb-3 pointer-events-none sm:pb-5">
      <div className="pointer-events-auto mx-auto max-w-md rounded-3xl border border-sun-200/70 bg-white/80 backdrop-blur-xl backdrop-saturate-150 shadow-card overflow-hidden">
        <div className="flex items-stretch">
          <div className="relative bg-gradient-to-br from-sun-200 via-sun-400 to-sun-600 flex items-center justify-center px-5">
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent"
            />
            <SunIcon size={38} className="relative animate-pulseSun" />
          </div>
          <div className="flex-1 p-3.5 pr-3">
            <p className="text-sm font-bold text-ink leading-tight tracking-tight">
              Install Sunscreen Timer
            </p>
            <p className="mt-1 text-xs text-ink-soft leading-snug">
              {variant === "ios"
                ? "Add it to your home screen — one tap to start, even with patchy beach signal."
                : "Runs full-screen on your home screen, works offline."}
            </p>
            <div className="mt-3 flex items-center gap-2">
              {variant === "android" ? (
                <button
                  type="button"
                  onClick={install}
                  className="group relative overflow-hidden rounded-xl bg-gradient-to-b from-sun-400 to-sun-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-glow hover:from-sun-300 hover:to-sun-700 transition-all focus:outline-none focus-visible:ring-4 focus-visible:ring-sun-300/60"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-px bg-white/60"
                  />
                  Install
                </button>
              ) : (
                <span className="text-[11px] text-ink-soft leading-snug">
                  Tap <span className="font-semibold text-ink">Share</span> →{" "}
                  <span className="font-semibold text-ink">Add to Home Screen</span>
                </span>
              )}
              <button
                type="button"
                onClick={dismiss}
                className="ml-auto rounded-lg px-2 py-1.5 text-xs font-medium text-ink-mute hover:text-ink hover:bg-cream transition-all"
                aria-label="Dismiss install prompt"
              >
                Not now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
