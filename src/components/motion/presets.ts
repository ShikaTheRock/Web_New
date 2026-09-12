export const easeGame = [0.16, 1, 0.3, 1] as const;
export const easeSharp = [0.4, 0, 0.2, 1] as const;
export const easeSpring = [0.34, 1.56, 0.64, 1] as const;

export const dur = {
  instant: 0.08,
  fast: 0.15,
  normal: 0.28,
  slow: 0.45,
  launch: 0.62,
} as const;

export const selectTransition = {
  duration: 0.48,
  ease: easeGame,
};

export const launchTransition = {
  duration: 0.62,
  ease: easeGame,
};

export const reducedFade = {
  duration: 0.18,
  ease: easeSharp,
};
