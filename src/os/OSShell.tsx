import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useOSStore } from '../store/useOSStore';
import { APP_REGISTRY } from '../apps/registry';
import { HomeMenu } from './HomeMenu';
import { SystemMenu } from './SystemMenu';
import { SystemButton } from './SystemButton';
import { SongPlayer } from './SongPlayer';
import { OSAtmosphere } from './atmosphere/OSAtmosphere';
import { launchTransition, reducedFade } from '../components/motion/presets';
import './OSShell.css';

export function OSShell() {
  const phase = useOSStore((s) => s.phase);
  const openApp = useOSStore((s) => s.openApp);
  const systemMenuOpen = useOSStore((s) => s.systemMenuOpen);
  const reducedMotion = useOSStore((s) => s.reducedMotion);
  const completeLaunch = useOSStore((s) => s.completeLaunch);
  const completeExit = useOSStore((s) => s.completeExit);
  const openSystem = useOSStore((s) => s.openSystem);
  const closeSystem = useOSStore((s) => s.closeSystem);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape' && e.key !== 'b' && e.key !== 'B') return;
      const state = useOSStore.getState();
      if (state.systemMenuOpen) {
        e.preventDefault();
        state.closeSystem();
        return;
      }
      e.preventDefault();
      state.openSystem();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (phase !== 'launching' && phase !== 'switching' && phase !== 'exiting') return;
    const ms = reducedMotion ? 180 : 640;
    const id = window.setTimeout(() => {
      if (phase === 'exiting') completeExit();
      else completeLaunch();
    }, ms);
    return () => window.clearTimeout(id);
  }, [phase, reducedMotion, completeLaunch, completeExit]);

  const showHome = phase === 'home' || phase === 'launching' || phase === 'exiting';
  const showApp = openApp !== null && phase !== 'home';
  const AppComponent = openApp ? APP_REGISTRY[openApp].Component : null;
  const paused = systemMenuOpen && (phase === 'paused' || phase === 'home');
  const trans = reducedMotion ? reducedFade : launchTransition;

  return (
    <div className="os-shell" data-theme="os">
      <OSAtmosphere />

      <AnimatePresence>
        {showHome && (
          <motion.div
            key="home"
            className="os-home-layer"
            initial={{ opacity: 0 }}
            animate={{
              opacity: phase === 'launching' ? 0 : 1,
              scale: phase === 'launching' ? 1.08 : 1,
              filter: phase === 'launching' ? 'blur(8px)' : 'blur(0px)',
            }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={trans}
          >
            <HomeMenu />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {showApp && AppComponent && openApp && (
          <motion.div
            key={openApp}
            className={`os-app-layer ${paused && phase === 'paused' ? 'app-viewport--paused' : ''}`}
            initial={
              reducedMotion
                ? { opacity: 0 }
                : { opacity: 0, clipPath: 'inset(0 0 100% 0)', scale: 1.08, rotate: -1.5 }
            }
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)', scale: 1, rotate: 0 }}
            exit={
              reducedMotion
                ? { opacity: 0 }
                : { opacity: 0, clipPath: 'inset(100% 0 0 0)', scale: 0.96 }
            }
            transition={trans}
          >
            <AppComponent />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {phase === 'launching' && !reducedMotion && (
          <motion.div
            className="os-launch-wipe"
            aria-hidden="true"
            initial={{ x: '-120%', skewX: -18 }}
            animate={{ x: '120%' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          />
        )}
      </AnimatePresence>

      <SystemButton />
      <SystemMenu />
      <SongPlayer />

      <button type="button" className="sr-only" onClick={paused ? closeSystem : openSystem}>
        System
      </button>
    </div>
  );
}
