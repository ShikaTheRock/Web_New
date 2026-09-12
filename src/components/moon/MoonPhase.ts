export const MoonPhase = {
  New: 0,
  WaxingCrescent: 1,
  FirstQuarter: 2,
  WaxingGibbous: 3,
  Full: 4,
  WaningGibbous: 5,
  LastQuarter: 6,
  WaningCrescent: 7,
} as const;

export type MoonPhase = (typeof MoonPhase)[keyof typeof MoonPhase];

export const MOON_PHASE_NAMES: Record<MoonPhase, string> = {
  [MoonPhase.New]: 'New Moon',
  [MoonPhase.WaxingCrescent]: 'Waxing Crescent',
  [MoonPhase.FirstQuarter]: 'First Quarter',
  [MoonPhase.WaxingGibbous]: 'Waxing Gibbous',
  [MoonPhase.Full]: 'Full Moon',
  [MoonPhase.WaningGibbous]: 'Waning Gibbous',
  [MoonPhase.LastQuarter]: 'Last Quarter',
  [MoonPhase.WaningCrescent]: 'Waning Crescent',
};

export function getRealMoonPhase(date: Date = new Date()): MoonPhase {
  const knownNewMoon = new Date('2000-01-06T18:14:00Z');
  const synodicPeriod = 29.53058867;
  const diff = (date.getTime() - knownNewMoon.getTime()) / (1000 * 60 * 60 * 24);
  const normalized = ((diff % synodicPeriod) + synodicPeriod) % synodicPeriod;
  const fraction = normalized / synodicPeriod;

  if (fraction < 0.0625) return MoonPhase.New;
  if (fraction < 0.1875) return MoonPhase.WaxingCrescent;
  if (fraction < 0.3125) return MoonPhase.FirstQuarter;
  if (fraction < 0.4375) return MoonPhase.WaxingGibbous;
  if (fraction < 0.5625) return MoonPhase.Full;
  if (fraction < 0.6875) return MoonPhase.WaningGibbous;
  if (fraction < 0.8125) return MoonPhase.LastQuarter;
  if (fraction < 0.9375) return MoonPhase.WaningCrescent;
  return MoonPhase.New;
}

export function getMoonPath(phase: MoonPhase): {
  diskPath: string;
  shadowPath: string;
} {
  const cx = 50;
  const cy = 50;
  const r = 45;
  const diskPath = `M ${cx},${cy - r} A ${r},${r} 0 1,1 ${cx},${cy + r} A ${r},${r} 0 1,1 ${cx},${cy - r} Z`;

  if (phase === MoonPhase.Full) {
    return { diskPath, shadowPath: '' };
  }

  if (phase === MoonPhase.New) {
    return { diskPath: '', shadowPath: diskPath };
  }

  let terminatorRx = 0;

  switch (phase) {
    case MoonPhase.WaxingCrescent:
    case MoonPhase.WaxingGibbous:
    case MoonPhase.WaningGibbous:
    case MoonPhase.WaningCrescent:
      terminatorRx = r * 0.7;
      break;
    case MoonPhase.FirstQuarter:
    case MoonPhase.LastQuarter:
      terminatorRx = 0;
      break;
    default:
      return { diskPath, shadowPath: '' };
  }

  let shadowPath = '';

  if (phase === MoonPhase.FirstQuarter) {
    shadowPath = `M ${cx},${cy - r} A ${r},${r} 0 0,0 ${cx},${cy + r} L ${cx},${cy - r} Z`;
  } else if (phase === MoonPhase.LastQuarter) {
    shadowPath = `M ${cx},${cy - r} A ${r},${r} 0 0,1 ${cx},${cy + r} L ${cx},${cy - r} Z`;
  } else if (phase === MoonPhase.WaxingCrescent) {
    shadowPath = `M ${cx},${cy - r} A ${r},${r} 0 0,0 ${cx},${cy + r} A ${terminatorRx},${r} 0 0,0 ${cx},${cy - r} Z`;
  } else if (phase === MoonPhase.WaxingGibbous) {
    shadowPath = `M ${cx},${cy - r} A ${r},${r} 0 0,0 ${cx},${cy + r} A ${terminatorRx},${r} 0 0,1 ${cx},${cy - r} Z`;
  } else if (phase === MoonPhase.WaningGibbous) {
    shadowPath = `M ${cx},${cy - r} A ${r},${r} 0 0,1 ${cx},${cy + r} A ${terminatorRx},${r} 0 0,0 ${cx},${cy - r} Z`;
  } else if (phase === MoonPhase.WaningCrescent) {
    shadowPath = `M ${cx},${cy - r} A ${r},${r} 0 0,1 ${cx},${cy + r} A ${terminatorRx},${r} 0 0,1 ${cx},${cy - r} Z`;
  }

  return { diskPath, shadowPath };
}
