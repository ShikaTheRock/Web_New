import type { CSSProperties } from 'react';

export interface IconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function IconWildCard({ size = 24, color = 'currentColor', className, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style} aria-hidden="true">
      <rect x="5" y="3.5" width="14" height="17" stroke={color} strokeWidth="1.3" />
      <rect x="7.2" y="5.5" width="9.6" height="7.2" stroke={color} strokeWidth="1.1" />
      <circle cx="12" cy="9.1" r="1.6" stroke={color} strokeWidth="1.1" />
      <path d="M8.2 14.2 H15.8 M8.2 16.4 H13.4" stroke={color} strokeWidth="1.1" />
      <path d="M16.6 19.2 L18.1 20.8 M18.1 19.2 L16.6 20.8" stroke={color} strokeWidth="1.1" />
    </svg>
  );
}

export function IconGrimoire({ size = 24, color = 'currentColor', className, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style} aria-hidden="true">
      <path d="M5 5.2 C8.2 4.2 10.4 4.6 12 6.2 C13.6 4.6 15.8 4.2 19 5.2 V18.4 C16 17.5 13.8 17.8 12 19.2 C10.2 17.8 8 17.5 5 18.4 Z" stroke={color} strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M12 6.4 V18.8" stroke={color} strokeWidth="1.2" />
      <circle cx="15.6" cy="11.2" r="1.35" stroke={color} strokeWidth="1" />
    </svg>
  );
}

export function IconShapeshifter({ size = 24, color = 'currentColor', className, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style} aria-hidden="true">
      <rect x="4.2" y="6.4" width="10.2" height="12.2" stroke={color} strokeWidth="1.2" transform="rotate(-11 9.3 12.5)" opacity="0.55" />
      <rect x="6.6" y="5.2" width="10.2" height="12.4" stroke={color} strokeWidth="1.2" />
      <rect x="9.4" y="4.2" width="10.2" height="12.2" stroke={color} strokeWidth="1.2" transform="rotate(9 14.5 10.3)" />
    </svg>
  );
}

export function IconContact({ size = 24, color = 'currentColor', className, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style} aria-hidden="true">
      <rect x="3.5" y="6.5" width="17" height="11.5" stroke={color} strokeWidth="1.3" />
      <path d="M4 7.2 L12 13.1 L20 7.2" stroke={color} strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  );
}

export function IconHome({ size = 24, color = 'currentColor', className, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style} aria-hidden="true">
      <path d="M4 11.2 L12 4.4 L20 11.2 V19.2 H4 Z" stroke={color} strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M10 19.2 V13.4 H14 V19.2" stroke={color} strokeWidth="1.3" />
    </svg>
  );
}

export function IconAudio({ size = 24, color = 'currentColor', className, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style} aria-hidden="true">
      <path d="M9 17.5 V7.2 L19 4.8 V15.2" stroke={color} strokeWidth="1.3" strokeLinejoin="round" />
      <circle cx="7" cy="17.5" r="2.3" stroke={color} strokeWidth="1.3" />
      <circle cx="17" cy="15.2" r="2.3" stroke={color} strokeWidth="1.3" />
    </svg>
  );
}

export {
  IconWildCard as WildCardIcon,
  IconGrimoire as GrimoireIcon,
  IconShapeshifter as ShapeshifterIcon,
  IconContact as ContactIcon,
  IconHome as HomeIcon,
  IconAudio as AudioIcon,
};
