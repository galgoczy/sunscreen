"use client";

import { formatDuration } from "@/lib/calculate";

interface Props {
  remainingSec: number;
  totalSec: number;
  expired: boolean;
}

const SIZE = 280;
const CENTER = SIZE / 2;
const RING_RADIUS = 100;
const STROKE = 14;
const RAY_INNER = 124;
const RAY_OUTER = 138;
const RAY_COUNT = 12;

export function CountdownRing({ remainingSec, totalSec, expired }: Props) {
  const circumference = 2 * Math.PI * RING_RADIUS;
  const progress =
    totalSec > 0 ? Math.max(0, Math.min(1, remainingSec / totalSec)) : 0;
  const dashOffset = circumference * (1 - progress);

  const rays = Array.from({ length: RAY_COUNT }).map((_, i) => {
    const angle = (i / RAY_COUNT) * Math.PI * 2 - Math.PI / 2;
    return {
      x1: CENTER + Math.cos(angle) * RAY_INNER,
      y1: CENTER + Math.sin(angle) * RAY_INNER,
      x2: CENTER + Math.cos(angle) * RAY_OUTER,
      y2: CENTER + Math.sin(angle) * RAY_OUTER,
    };
  });

  return (
    <div className="relative mx-auto w-full max-w-[300px] aspect-square">
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="w-full h-full"
        role="img"
        aria-label={
          expired
            ? "Time to reapply now"
            : `${formatDuration(remainingSec)} until reapply`
        }
      >
        <defs>
          <radialGradient id="sunFace" cx="32%" cy="28%" r="78%">
            <stop offset="0%" stopColor="#FFFEF6" />
            <stop offset="45%" stopColor="#FDE68A" />
            <stop offset="100%" stopColor="#F59E0B" />
          </radialGradient>
          <linearGradient id="ringProgress" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={expired ? "#DC2626" : "#F59E0B"} />
            <stop offset="100%" stopColor={expired ? "#7F1D1D" : "#B45309"} />
          </linearGradient>
          <filter id="sunGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="auraGlow" cx="50%" cy="50%" r="50%">
            <stop offset="60%" stopColor="rgba(252,211,77,0.0)" />
            <stop offset="100%" stopColor="rgba(252,211,77,0.4)" />
          </radialGradient>
        </defs>

        {/* Soft outer aura */}
        <circle cx={CENTER} cy={CENTER} r={RAY_OUTER + 4} fill="url(#auraGlow)" />

        {/* Sun rays — slow rotation + pulse */}
        <g
          stroke={expired ? "#F59E0B" : "#FCD34D"}
          strokeWidth="10"
          strokeLinecap="round"
          className={expired ? "" : "animate-pulseRays"}
          style={{
            transformOrigin: `${CENTER}px ${CENTER}px`,
            transformBox: "fill-box",
          }}
        >
          <g
            className={expired ? "" : "animate-spinSlow"}
            style={{
              transformOrigin: `${CENTER}px ${CENTER}px`,
              transformBox: "fill-box",
            }}
          >
            {rays.map((r, i) => (
              <line key={i} x1={r.x1} y1={r.y1} x2={r.x2} y2={r.y2} />
            ))}
          </g>
        </g>

        {/* Sun face (filled disc with glow) */}
        <circle
          cx={CENTER}
          cy={CENTER}
          r={RING_RADIUS - STROKE / 2 - 2}
          fill="url(#sunFace)"
          filter="url(#sunGlow)"
        />

        {/* Inner highlight */}
        <circle
          cx={CENTER - 18}
          cy={CENTER - 22}
          r={28}
          fill="rgba(255,255,255,0.35)"
        />

        {/* Track ring */}
        <circle
          cx={CENTER}
          cy={CENTER}
          r={RING_RADIUS}
          fill="none"
          stroke="rgba(255,248,225,0.7)"
          strokeWidth={STROKE}
        />

        {/* Progress arc */}
        <circle
          cx={CENTER}
          cy={CENTER}
          r={RING_RADIUS}
          fill="none"
          stroke="url(#ringProgress)"
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={expired ? circumference : dashOffset}
          transform={`rotate(-90 ${CENTER} ${CENTER})`}
          style={{ transition: "stroke-dashoffset 0.9s linear" }}
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <div
          className={`font-display font-extrabold tabular-nums tracking-tightest leading-none text-5xl sm:text-[3.75rem] ${
            expired ? "text-red-800" : "text-ink"
          }`}
          aria-live="polite"
        >
          {expired ? "00:00" : formatDuration(remainingSec)}
        </div>
        <div className="mt-2.5 text-[10px] uppercase tracking-[0.22em] font-bold text-ink-mute">
          {expired ? "Reapply now" : "Until reapply"}
        </div>
      </div>
    </div>
  );
}
