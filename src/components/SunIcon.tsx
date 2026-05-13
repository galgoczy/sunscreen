interface SunIconProps {
  size?: number;
  className?: string;
}

export function SunIcon({ size = 32, className }: SunIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle cx="16" cy="16" r="6" fill="#FFB300" />
      <g stroke="#FFB300" strokeWidth="2" strokeLinecap="round">
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="16" y1="26" x2="16" y2="30" />
        <line x1="2" y1="16" x2="6" y2="16" />
        <line x1="26" y1="16" x2="30" y2="16" />
        <line x1="6" y1="6" x2="9" y2="9" />
        <line x1="23" y1="23" x2="26" y2="26" />
        <line x1="6" y1="26" x2="9" y2="23" />
        <line x1="23" y1="9" x2="26" y2="6" />
      </g>
    </svg>
  );
}
