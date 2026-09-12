import { useCallback, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useOSStore, type AppId } from '../store/useOSStore';
import { useI18nStore } from '../store/useI18nStore';
import { APP_RAIL, APP_REGISTRY } from '../apps/registry';
import { Moon } from '../components/moon/Moon';
import { ProfileCard } from './ProfileCard';
import { LangControl } from './LangControl';
import { easeGame, selectTransition } from '../components/motion/presets';
import './HomeMenu.css';

function wrapIndex(i: number, len: number) {
  return (i + len) % len;
}

export function HomeMenu() {
  const selectedApp = useOSStore((s) => s.selectedApp);
  const phase = useOSStore((s) => s.phase);
  const systemMenuOpen = useOSStore((s) => s.systemMenuOpen);
  const reducedMotion = useOSStore((s) => s.reducedMotion);
  const select = useOSStore((s) => s.select);
  const launch = useOSStore((s) => s.launch);
  const t = useI18nStore((s) => s.t);
  const dirRef = useRef(1);
  const lastIndex = useRef(APP_RAIL.indexOf(selectedApp));

  const selectedIndex = APP_RAIL.indexOf(selectedApp);
  const active = APP_REGISTRY[selectedApp];
  const prevId = APP_RAIL[wrapIndex(selectedIndex - 1, APP_RAIL.length)];
  const nextId = APP_RAIL[wrapIndex(selectedIndex + 1, APP_RAIL.length)];

  useEffect(() => {
    const next = APP_RAIL.indexOf(selectedApp);
    dirRef.current = next >= lastIndex.current ? 1 : -1;
    lastIndex.current = next;
  }, [selectedApp]);

  const move = useCallback(
    (delta: number) => {
      const idx = APP_RAIL.indexOf(useOSStore.getState().selectedApp);
      select(APP_RAIL[wrapIndex(idx + delta, APP_RAIL.length)]);
    },
    [select],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (phase !== 'home' || systemMenuOpen) return;
      const k = e.key;
      if (k === 'ArrowRight' || k === 'd' || k === 'D') {
        e.preventDefault();
        move(1);
      } else if (k === 'ArrowLeft' || k === 'a' || k === 'A') {
        e.preventDefault();
        move(-1);
      } else if (k === 'Enter' || k === 'z' || k === 'Z') {
        e.preventDefault();
        launch();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [phase, systemMenuOpen, move, launch]);

  const handleActivate = (id: AppId, pointerType: string) => {
    if (pointerType !== 'mouse' && id !== selectedApp) {
      select(id);
      return;
    }
    if (id !== selectedApp) select(id);
    launch(id);
  };

  const trans = reducedMotion ? { duration: 0.16 } : { ...selectTransition, stagger: 0.06 };

  return (
    <main className="home-menu" aria-label={t('os.systemName')}>
      <div className="home-identity">
        <span className="home-identity__name">SHIKA</span>
        <span className="home-identity__os">THE ROCK</span>
        <span className="home-identity__ver">{t('os.version')}</span>
      </div>

      <div className="home-chrome-right">
        <LangControl />
      </div>

      <div className="home-stage">
        <AnimatePresence mode="popLayout" custom={dirRef.current}>
          <motion.div
            key={selectedApp}
            className="home-stage__copy"
            custom={dirRef.current}
            initial={
              reducedMotion
                ? { opacity: 0 }
                : { opacity: 0, x: dirRef.current * 80, y: -24, rotate: -6, clipPath: 'inset(0 40% 0 0)' }
            }
            animate={{ opacity: 1, x: 0, y: 0, rotate: -4, clipPath: 'inset(0 0% 0 0)' }}
            exit={
              reducedMotion
                ? { opacity: 0 }
                : { opacity: 0, x: dirRef.current * -60, y: 18, rotate: 3 }
            }
            transition={{ duration: reducedMotion ? 0.16 : 0.48, ease: easeGame }}
          >
            <p className="home-stage__kicker">{t(active.subKey)}</p>
            <h1 className="home-stage__title" style={{ color: active.accent }}>
              {t(active.titleKey)}
            </h1>
            <p className="home-stage__hint">{t('home.confirmHint')}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <motion.div
        className="home-symbol"
        animate={
          reducedMotion
            ? { rotate: 0, scale: 1 }
            : { rotate: selectedIndex * -12, scale: [0.86, 1.08, 1] }
        }
        transition={trans}
      >
        <active.Icon size={88} color={active.accent} />
      </motion.div>

      <div className="home-moon">
        <Moon phase={active.selectionMoonPhase} size="lg" animated />
      </div>

      <nav className="home-rail" aria-label={t('os.navigate')}>
        {APP_RAIL.map((id, i) => {
          const def = APP_REGISTRY[id];
          const offset = i - selectedIndex;
          const isSelected = id === selectedApp;
          return (
            <motion.button
              key={id}
              type="button"
              className={`home-rail__item ${isSelected ? 'is-selected' : ''}`}
              aria-current={isSelected ? 'true' : undefined}
              aria-label={t(def.titleKey)}
              onPointerEnter={(e) => {
                if (e.pointerType === 'mouse') select(id);
              }}
              onClick={(e) => handleActivate(id, (e.nativeEvent as PointerEvent).pointerType ?? 'mouse')}
              animate={{
                x: offset * (reducedMotion ? 72 : 108),
                y: isSelected ? -18 : Math.abs(offset) * 8,
                scale: isSelected ? 1 : Math.abs(offset) === 1 ? 0.72 : 0.55,
                opacity: isSelected ? 1 : Math.abs(offset) === 1 ? 0.62 : 0.28,
                rotate: isSelected ? -3 : offset * 4,
              }}
              transition={reducedMotion ? { duration: 0.16 } : { duration: 0.5, ease: easeGame, delay: Math.abs(offset) * 0.04 }}
            >
              <span className="home-rail__icon" style={{ color: isSelected ? def.accent : 'currentColor' }}>
                <def.Icon size={isSelected ? 36 : 26} color="currentColor" />
              </span>
              <span className="home-rail__label">{t(def.titleKey)}</span>
            </motion.button>
          );
        })}
      </nav>

      <p className="home-neighbors sr-only">
        {t(APP_REGISTRY[prevId].titleKey)} / {t(active.titleKey)} / {t(APP_REGISTRY[nextId].titleKey)}
      </p>

      <div className="home-profile">
        <ProfileCard />
      </div>

      <div className="home-hints control-hints" aria-hidden="true">
        <div className="control-hint">
          <span className="control-key">← →</span>
          <span>{t('controls.arrowsNavigate')}</span>
        </div>
        <div className="control-hint">
          <span className="control-key">↵</span>
          <span>{t('controls.enterConfirm')}</span>
        </div>
        <div className="control-hint">
          <span className="control-key">ESC</span>
          <span>{t('controls.escBack')}</span>
        </div>
      </div>
    </main>
  );
}
