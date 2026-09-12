import { create } from 'zustand';
import type { Song } from '../content/playlist/playlist';
import { playlist } from '../content/playlist/playlist';

// ── HELPERS ──────────────────────────────────────────────────────────────────

function getDayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

function getTodayIndex(): number {
  if (playlist.length === 0) return 0;
  return getDayOfYear(new Date()) % playlist.length;
}

// ── STORE ──────────────────────────────────────────────────────────────────

export interface AudioState {
  playlist: Song[];
  todayIndex: number;
  currentIndex: number;
  isPlaying: boolean;
  volume: number;
  audioRef: HTMLAudioElement | null;

  // Actions
  setAudioRef: (ref: HTMLAudioElement | null) => void;
  toggle: () => void;
  setVolume: (v: number) => void;
  nextSong: () => void;
  prevSong: () => void;
  playSong: (index: number) => void;
  getCurrentSong: () => Song | null;
}

export const useAudioStore = create<AudioState>((set, get) => ({
  playlist,
  todayIndex: getTodayIndex(),
  currentIndex: getTodayIndex(),
  isPlaying: false,
  volume: 0.7,
  audioRef: null,

  setAudioRef: (ref) => {
    set({ audioRef: ref });
    if (ref) {
      ref.volume = get().volume;
    }
  },

  toggle: () => {
    const { audioRef, isPlaying } = get();
    if (!audioRef) return;
    if (isPlaying) {
      audioRef.pause();
      set({ isPlaying: false });
    } else {
      audioRef.play().catch(() => {
        // Autoplay policy: user gesture required — gracefully ignore
        set({ isPlaying: false });
      });
      set({ isPlaying: true });
    }
  },

  setVolume: (v) => {
    const { audioRef } = get();
    const clamped = Math.max(0, Math.min(1, v));
    if (audioRef) audioRef.volume = clamped;
    set({ volume: clamped });
  },

  nextSong: () => {
    const { currentIndex, playlist } = get();
    const next = (currentIndex + 1) % playlist.length;
    get().playSong(next);
  },

  prevSong: () => {
    const { currentIndex, playlist } = get();
    const prev = (currentIndex - 1 + playlist.length) % playlist.length;
    get().playSong(prev);
  },

  playSong: (index) => {
    const { audioRef, playlist, volume } = get();
    const song = playlist[index];
    if (!song) return;
    set({ currentIndex: index, isPlaying: false });
    if (audioRef && song.audioSrc) {
      audioRef.src = song.audioSrc;
      audioRef.volume = volume;
      audioRef.load();
      audioRef.play().then(() => {
        set({ isPlaying: true });
      }).catch(() => {
        set({ isPlaying: false });
      });
    }
  },

  getCurrentSong: () => {
    const { playlist, currentIndex } = get();
    return playlist[currentIndex] ?? null;
  },
}));
