export type Activity =
  | "indoor"
  | "light"
  | "beach"
  | "sports"
  | "swimming";

export type SkinType = "I" | "II" | "III" | "IV" | "V" | "VI";

export type Spf = 15 | 30 | 50 | 70 | 100;

export interface CalcInput {
  skinType: SkinType;
  spf: Spf;
  activity: Activity;
  uvIndex: number | null;
}

export interface CalcResult {
  minutes: number;
  baseMinutes: number;
  activityMultiplier: number;
  uvMultiplier: number;
  skinMultiplier: number;
  uvBucket: string;
}

const BASE_MINUTES = 120;
const HARD_FLOOR = 30;
const HARD_CAP = 180;

export const activityOptions: Array<{
  value: Activity;
  label: string;
  hint: string;
  multiplier: number;
}> = [
  { value: "indoor", label: "Indoor near window", hint: "Mostly inside, occasional sun through glass", multiplier: 1.5 },
  { value: "light", label: "Light outdoor", hint: "Walking, errands, patio time", multiplier: 1.0 },
  { value: "beach", label: "Beach or pool deck", hint: "Strong reflected UV from sand or water", multiplier: 0.83 },
  { value: "sports", label: "Sports or sweating", hint: "Active outdoor exercise", multiplier: 0.67 },
  { value: "swimming", label: "Swimming", hint: "In and out of water — match your label's water resistance", multiplier: 0.5 },
];

export const skinTypeOptions: Array<{
  value: SkinType;
  label: string;
  hint: string;
  multiplier: number;
}> = [
  { value: "I", label: "Type I — Very fair, always burns", hint: "Pale skin, freckles, red or blonde hair", multiplier: 0.83 },
  { value: "II", label: "Type II — Fair, usually burns", hint: "Light skin, often sunburns before tanning", multiplier: 0.83 },
  { value: "III", label: "Type III — Medium, sometimes burns", hint: "Light brown skin, tans gradually", multiplier: 1.0 },
  { value: "IV", label: "Type IV — Olive, rarely burns", hint: "Medium brown skin, tans easily", multiplier: 1.0 },
  { value: "V", label: "Type V — Brown, very rarely burns", hint: "Dark brown skin, tans deeply", multiplier: 1.0 },
  { value: "VI", label: "Type VI — Deeply pigmented", hint: "Black skin, almost never burns", multiplier: 1.0 },
];

export const spfOptions: Spf[] = [15, 30, 50, 70, 100];

function uvMultiplier(uv: number | null): { mult: number; bucket: string } {
  if (uv === null || Number.isNaN(uv)) {
    return { mult: 1.0, bucket: "Unknown (using 2-hour default)" };
  }
  if (uv <= 2) return { mult: 1.5, bucket: "Low (0–2)" };
  if (uv <= 5) return { mult: 1.0, bucket: "Moderate (3–5)" };
  if (uv <= 7) return { mult: 0.83, bucket: "High (6–7)" };
  if (uv <= 10) return { mult: 0.67, bucket: "Very high (8–10)" };
  return { mult: 0.5, bucket: "Extreme (11+)" };
}

function activityMultiplier(activity: Activity): number {
  return activityOptions.find((a) => a.value === activity)?.multiplier ?? 1.0;
}

function skinMultiplier(skin: SkinType): number {
  return skinTypeOptions.find((s) => s.value === skin)?.multiplier ?? 1.0;
}

export function calculateReapplyMinutes(input: CalcInput): CalcResult {
  const aMult = activityMultiplier(input.activity);
  const sMult = skinMultiplier(input.skinType);
  const { mult: uMult, bucket } = uvMultiplier(input.uvIndex);

  const raw = BASE_MINUTES * aMult * uMult * sMult;
  const rounded = Math.round(raw / 5) * 5;
  const clamped = Math.max(HARD_FLOOR, Math.min(HARD_CAP, rounded));

  return {
    minutes: clamped,
    baseMinutes: BASE_MINUTES,
    activityMultiplier: aMult,
    uvMultiplier: uMult,
    skinMultiplier: sMult,
    uvBucket: bucket,
  };
}

export function formatDuration(totalSeconds: number): string {
  const safe = Math.max(0, Math.floor(totalSeconds));
  const m = Math.floor(safe / 60);
  const s = safe % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}
