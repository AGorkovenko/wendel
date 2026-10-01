type IconProps = { size?: number; className?: string };

export function ArrowIcon({ size = 18, className }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M4 10h11M11 6l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PinIcon({ size = 18, className }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M15.5 8c0 4-5.5 8.5-5.5 8.5S4.5 12 4.5 8a5.5 5.5 0 1 1 11 0Z" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="10" cy="8" r="1.8" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function SunIcon({ size = 18, className }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="3.3" stroke="currentColor" strokeWidth="1.4" />
      <path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.35 4.35l1.4 1.4M14.25 14.25l1.4 1.4M15.65 4.35l-1.4 1.4M5.75 14.25l-1.4 1.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
