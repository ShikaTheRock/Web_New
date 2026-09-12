import { create } from 'zustand';

export type AppId = 'wildcard' | 'grimoire' | 'shapeshifter' | 'contact';

export type OSPhase =
  | 'home'
  | 'launching'
  | 'app'
  | 'paused'
  | 'exiting'
  | 'switching';

export const APP_ORDER: AppId[] = [
  'shapeshifter',
  'wildcard',
  'grimoire',
  'contact',
];

export interface OSState {
  selectedApp: AppId;
  openApp: AppId | null;
  previousApp: AppId | null;
  systemMenuOpen: boolean;
  phase: OSPhase;
  reducedMotion: boolean;

  select: (app: AppId) => void;
  launch: (app?: AppId) => void;
  completeLaunch: () => void;
  openSystem: () => void;
  closeSystem: () => void;
  goHome: () => void;
  completeExit: () => void;
  switchApp: (app: AppId | 'home') => void;
  setReducedMotion: (value: boolean) => void;
}

function canSelect(phase: OSPhase, systemMenuOpen: boolean): boolean {
  return phase === 'home' && !systemMenuOpen;
}

export const useOSStore = create<OSState>((set, get) => ({
  selectedApp: 'wildcard',
  openApp: null,
  previousApp: null,
  systemMenuOpen: false,
  phase: 'home',
  reducedMotion: false,

  select: (app) => {
    const { phase, systemMenuOpen } = get();
    if (canSelect(phase, systemMenuOpen)) {
      set({ selectedApp: app });
    }
  },

  launch: (app) => {
    const { phase, selectedApp } = get();
    if (phase !== 'home') return;
    const target = app ?? selectedApp;
    set({
      selectedApp: target,
      openApp: target,
      systemMenuOpen: false,
      phase: 'launching',
    });
  },

  completeLaunch: () => {
    const { phase } = get();
    if (phase === 'launching' || phase === 'switching') {
      set({ phase: 'app', previousApp: null });
    }
  },

  openSystem: () => {
    const { phase } = get();
    if (phase === 'launching' || phase === 'exiting' || phase === 'switching') return;
    set({
      systemMenuOpen: true,
      phase: phase === 'app' || phase === 'paused' ? 'paused' : phase,
    });
  },

  closeSystem: () => {
    const { openApp } = get();
    set({
      systemMenuOpen: false,
      phase: openApp ? 'app' : 'home',
    });
  },

  goHome: () => {
    const { openApp } = get();
    if (!openApp) {
      set({ systemMenuOpen: false, phase: 'home' });
      return;
    }
    set({
      previousApp: openApp,
      systemMenuOpen: false,
      phase: 'exiting',
    });
  },

  completeExit: () => {
    set({
      openApp: null,
      previousApp: null,
      phase: 'home',
      systemMenuOpen: false,
    });
  },

  switchApp: (app) => {
    const { openApp } = get();
    if (app === 'home') {
      get().goHome();
      return;
    }
    if (app === openApp) {
      set({ systemMenuOpen: false, phase: 'app' });
      return;
    }
    set({
      previousApp: openApp,
      selectedApp: app,
      openApp: app,
      systemMenuOpen: false,
      phase: 'switching',
    });
  },

  setReducedMotion: (value) => set({ reducedMotion: value }),
}));
