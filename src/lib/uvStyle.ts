// WHO-aligned UV index color levels.
// Classes are written as literal strings so Tailwind's JIT picks them up.

export interface UvLevelStyle {
  bucket: "Low" | "Moderate" | "High" | "Very High" | "Extreme";
  /** Gradient classes for the bg-gradient-to-br backplate. */
  bg: string;
  border: string;
  /** Light label/accent text (for caps labels). */
  accent: string;
  /** Strong number color. */
  numColor: string;
  /** Refresh-button text color. */
  buttonText: string;
  /** Tailwind border-color for accent ring on icon tile. */
  iconRing: string;
}

const LOW: UvLevelStyle = {
  bucket: "Low",
  bg: "from-emerald-50 to-emerald-100/60",
  border: "border-emerald-200/80",
  accent: "text-emerald-700",
  numColor: "text-emerald-900",
  buttonText: "text-emerald-700 hover:text-emerald-900",
  iconRing: "ring-emerald-200",
};

const MODERATE: UvLevelStyle = {
  bucket: "Moderate",
  bg: "from-amber-50 to-amber-100/60",
  border: "border-amber-200/80",
  accent: "text-amber-700",
  numColor: "text-amber-900",
  buttonText: "text-amber-700 hover:text-amber-900",
  iconRing: "ring-amber-200",
};

const HIGH: UvLevelStyle = {
  bucket: "High",
  bg: "from-orange-50 to-orange-100/60",
  border: "border-orange-200/80",
  accent: "text-orange-700",
  numColor: "text-orange-900",
  buttonText: "text-orange-700 hover:text-orange-900",
  iconRing: "ring-orange-200",
};

const VERY_HIGH: UvLevelStyle = {
  bucket: "Very High",
  bg: "from-red-50 to-red-100/60",
  border: "border-red-200/80",
  accent: "text-red-700",
  numColor: "text-red-900",
  buttonText: "text-red-700 hover:text-red-900",
  iconRing: "ring-red-200",
};

const EXTREME: UvLevelStyle = {
  bucket: "Extreme",
  bg: "from-purple-50 to-purple-100/60",
  border: "border-purple-200/80",
  accent: "text-purple-700",
  numColor: "text-purple-900",
  buttonText: "text-purple-700 hover:text-purple-900",
  iconRing: "ring-purple-200",
};

export function uvLevelStyle(uv: number): UvLevelStyle {
  if (uv <= 2) return LOW;
  if (uv <= 5) return MODERATE;
  if (uv <= 7) return HIGH;
  if (uv <= 10) return VERY_HIGH;
  return EXTREME;
}
