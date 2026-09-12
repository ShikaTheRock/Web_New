import { AnimatePresence, motion } from 'framer-motion';
import { useOSStore, type AppId } from '../store/useOSStore';
import { useI18nStore } from '../store/useI18nStore';
import { APP_RAIL, APP_REGISTRY } from '../apps/registry';
import { Moon } from '../components/moon/Moon';
import { getRealMoonPhase } from '../components/moon/MoonPhase';
import { IconHome } from '../components/icons';
import { LangControl } from './LangControl';
import { ProfileCard } from './ProfileCard';
import { easeGame } from '../components/motion/presets';
import './SystemMenu.css';

export function SystemMenu() {
  const open = useOSStore((s) => s.systemMenuOpen);
  const openApp = useOSStore((s) => s.openApp);
  const closeSystem = useOSStore((s) => s.closeSystem);
  const switchApp = useOSStore((s) => s.switchApp);
  const reducedMotion = useOSStore((s) => s.reducedMotion);
  const t = useI18nStore((s) => s.t);
  const moon = getRealMoonPhase();

  const go = (id: AppId | 'home') => {
    if (id === 'home') switchApp('home');
    else switchApp(id);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            className="sys-scrim"
            aria-label={t('os.back')}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSystem}
          />
          <motion.div
            id="system-menu"
            className="sys-hud"
            role="dialog"
            aria-modal="true"
            aria-label={t('os.systemName')}
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -40, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 24, clipPath: 'inset(100% 0 0 0)' }}
            transition={{ duration: reducedMotion ? 0.16 : 0.45, ease: easeGame }}
          >
            <div className="sys-hud__mast">
              <Moon phase={moon} size="md" animated />
              <div>
                <p className="sys-hud__paused">{t('os.paused')}</p>
                <h2 className="sys-hud__title">{t('os.systemName')}</h2>
              </div>
            </div>

            <nav className="sys-hud__nav">
              <button
                type="button"
                className={`sys-hud__item ${openApp === null ? 'is-current' : ''}`}
                onClick={() => go('home')}
              >
                <IconHome size={18} color="currentColor" />
                {t('nav.home')}
              </button>
              {APP_RAIL.map((id, i) => {
                const def = APP_REGISTRY[id];
                return (
                  <motion.button
                    key={id}
                    type="button"
                    className={`sys-hud__item ${openApp === id ? 'is-current' : ''}`}
                    onClick={() => go(id)}
                    initial={reducedMotion ? false : { x: -40, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.05 * i, duration: 0.35, ease: easeGame }}
                  >
                    <def.Icon size={18} color="currentColor" />
                    {t(def.navKey)}
                  </motion.button>
                );
              })}
            </nav>

            <div className="sys-hud__meta">
              <LangControl />
              <button type="button" className="sys-hud__resume" onClick={closeSystem}>
                {t('os.resumeApp')}
              </button>
            </div>

            <div className="sys-hud__profile">
              <ProfileCard />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
