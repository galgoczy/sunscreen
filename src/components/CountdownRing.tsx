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
          <radialGradient id="sunFace" cx="35%" cy="32%" r="72%">
            <stop offset="0%" stopColor="#FFFEF6" />
            <stop offset="55%" stopColor="#FFE082" />
            <stop offset="100%" stopColor="#FFC107" />
          </radialGradient>
          <linearGradient id="ringProgress" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={expired ? "#D84315" : "#FF8F00"} />
            <stop offset="100%" stopColor={expired ? "#B71C1C" : "#E65100"} />
          </linearGradient>
          <filter id="sunGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Sun rays */}
        <g
          stroke={expired ? "#FF6F00" : "#FFC107"}
          strokeWidth="9"
          strokeLinecap="round"
          className={expired ? "" : "animate-pulseRays"}
          style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
        >
          {rays.map((r, i) => (
            <line key={i} x1={r.x1} y1={r.y1} x2={r.x2} y2={r.y2} />
          ))}
        </g>

        {/* Sun face (filled disc) */}
        <circle
          cx={CENTER}
          cy={CENTER}
          r={RING_RADIUS - STROKE / 2 - 2}
          fill="url(#sunFace)"
          filter="url(#sunGlow)"
        />

        {/* Track ring */}
        <circle
          cx={CENTER}
          cy={CENTER}
          r={RING_RADIUS}
          fill="none"
          stroke="rgba(255,248,225,0.65)"
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
          className={`font-extrabold tabular-nums leading-none text-5xl sm:text-[3.75rem] ${
            expired ? "text-sun-800" : "text-ink"
          }`}
          aria-live="polite"
        >
          {expired ? "00:00" : formatDuration(remainingSec)}
        </div>
        <div className="mt-2 text-[10px] uppercase tracking-widest font-semibold text-ink-mute">
          {expired ? "Reapply now" : "Until reapply"}
        </div>
      </div>
    </div>
  );
}
