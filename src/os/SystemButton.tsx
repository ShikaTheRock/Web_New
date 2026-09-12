import { useOSStore } from '../store/useOSStore';
import { useI18nStore } from '../store/useI18nStore';
import { Moon } from '../components/moon/Moon';
import { getRealMoonPhase } from '../components/moon/MoonPhase';
import './SystemButton.css';

export function SystemButton() {
  const systemMenuOpen = useOSStore((s) => s.systemMenuOpen);
  const openSystem = useOSStore((s) => s.openSystem);
  const closeSystem = useOSStore((s) => s.closeSystem);
  const t = useI18nStore((s) => s.t);

  return (
    <div className="system-button-wrapper">
      <button
        type="button"
        id="system-button"
        className={`system-button ${systemMenuOpen ? 'is-open' : ''}`}
        onClick={() => (systemMenuOpen ? closeSystem() : openSystem())}
        aria-label={t('os.menuLabel')}
        aria-expanded={systemMenuOpen}
        aria-controls="system-menu"
      >
        <Moon phase={getRealMoonPhase()} size="xs" />
        <span className="system-button__label">{t('os.menuLabel')}</span>
      </button>
    </div>
  );
}
