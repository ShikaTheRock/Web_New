import type { CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { getMoonPath, MoonPhase, MOON_PHASE_NAMES } from './MoonPhase';

export type MoonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const SIZE_MAP: Record<MoonSize, number> = {
  xs: 12,
  sm: 20,
  md: 36,
  lg: 72,
  xl: 108,
};

interface MoonProps {
  phase: MoonPhase;
  size?: MoonSize;
  animated?: boolean;
  litColor?: string;
  darkColor?: string;
  glowColor?: string;
  className?: string;
  style?: CSSProperties;
  'aria-label'?: string;
}

export function Moon({
  phase,
  size = 'md',
  animated = false,
  litColor,
  darkColor,
  glowColor,
  className,
  style,
  'aria-label': ariaLabel,
}: MoonProps) {
  const px = SIZE_MAP[size];
  const { diskPath, shadowPath } = getMoonPath(phase);
  const lit = litColor ?? 'var(--moon-color-lit)';
  const dark = darkColor ?? 'var(--moon-color-dark)';
  const glow = glowColor ?? 'var(--moon-glow)';
  const label = ariaLabel ?? MOON_PHASE_NAMES[phase];
  const isNew = phase === MoonPhase.New;
  const isFull = phase === MoonPhase.Full;

  return (
    <svg
      width={px}
      height={px}
      viewBox="0 0 100 100"
      className={className}
      style={{
        display: 'block',
        flexShrink: 0,
        filter: isFull ? `drop-shadow(0 0 ${px * 0.12}px ${glow})` : undefined,
        ...style,
      }}
      aria-label={label}
      role="img"
    >
      <title>{label}</title>
      <circle cx="50" cy="50" r="45" fill={dark} />
      {!isNew && (
        <motion.path
          d={diskPath}
          fill={lit}
          animate={{ d: diskPath, opacity: 1 }}
          initial={animated ? { opacity: 0.65 } : false}
          transition={{ duration: animated ? 0.45 : 0, ease: [0.16, 1, 0.3, 1] }}
        />
      )}
      {shadowPath && (
        <motion.path
          d={shadowPath}
          fill={dark}
          animate={{ d: shadowPath }}
          transition={{ duration: animated ? 0.45 : 0, ease: [0.16, 1, 0.3, 1] }}
        />
      )}
      <circle
        cx="50"
        cy="50"
        r="44"
        fill="none"
        stroke={lit}
        strokeWidth="0.6"
        opacity={isNew ? 0.22 : 0.32}
      />
    </svg>
  );
}

export default Moon;
