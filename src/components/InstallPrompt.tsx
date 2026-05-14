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
      <div className="pointer-events-auto mx-auto max-w-md rounded-2xl border border-sun-200 bg-white shadow-card overflow-hidden">
        <div className="flex items-stretch">
          <div className="bg-gradient-to-br from-sun-300 to-sun-500 flex items-center justify-center px-4">
            <SunIcon size={36} className="animate-pulseSun" />
          </div>
          <div className="flex-1 p-3.5 pr-3">
            <p className="text-sm font-bold text-ink leading-tight">
              Install the Sunscreen Timer
            </p>
            <p className="mt-1 text-xs text-ink-soft leading-snug">
              {variant === "ios"
                ? "Add it to your home screen so you can start the timer in one tap, even with patchy beach signal."
                : "One-tap install — runs full-screen on your home screen, even offline."}
            </p>
            <div className="mt-2.5 flex items-center gap-2">
              {variant === "android" ? (
                <button
                  type="button"
                  onClick={install}
                  className="rounded-lg bg-sun-500 px-3 py-1.5 text-xs font-bold text-white hover:bg-sun-600 transition focus:outline-none focus:ring-2 focus:ring-sun-300"
                >
                  Install
                </button>
              ) : (
                <span className="text-[11px] text-ink-soft">
                  Tap <span className="font-semibold">Share</span> →{" "}
                  <span className="font-semibold">Add to Home Screen</span>
                </span>
              )}
              <button
                type="button"
                onClick={dismiss}
                className="ml-auto rounded-lg px-2 py-1.5 text-xs font-medium text-ink-mute hover:text-ink hover:bg-cream transition"
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
