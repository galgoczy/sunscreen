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
      <circle cx="16" cy="16" r="7" fill="#F59E0B" />
      <circle cx="14.5" cy="14.5" r="3.5" fill="#FCD34D" opacity="0.7" />
      <g
        stroke="#F59E0B"
        strokeWidth="2.25"
        strokeLinecap="round"
      >
        <line x1="16" y1="2.5" x2="16" y2="5.5" />
        <line x1="16" y1="26.5" x2="16" y2="29.5" />
        <line x1="2.5" y1="16" x2="5.5" y2="16" />
        <line x1="26.5" y1="16" x2="29.5" y2="16" />
        <line x1="6.5" y1="6.5" x2="8.6" y2="8.6" />
        <line x1="23.4" y1="23.4" x2="25.5" y2="25.5" />
        <line x1="6.5" y1="25.5" x2="8.6" y2="23.4" />
        <line x1="23.4" y1="8.6" x2="25.5" y2="6.5" />
      </g>
    </svg>
  );
}
