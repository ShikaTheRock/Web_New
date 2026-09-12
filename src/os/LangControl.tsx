import { useI18nStore } from '../store/useI18nStore';
import './LangControl.css';

export function LangControl() {
  const lang = useI18nStore((s) => s.lang);
  const setLang = useI18nStore((s) => s.setLang);
  const t = useI18nStore((s) => s.t);

  return (
    <div className="lang-control" role="group" aria-label={t('nav.language')}>
      <button
        type="button"
        className={lang === 'en' ? 'lang-control__btn is-active' : 'lang-control__btn'}
        onClick={() => setLang('en')}
        aria-pressed={lang === 'en'}
      >
        EN
      </button>
      <span className="lang-control__sep" aria-hidden="true">
        /
      </span>
      <button
        type="button"
        className={lang === 'es' ? 'lang-control__btn is-active' : 'lang-control__btn'}
        onClick={() => setLang('es')}
        aria-pressed={lang === 'es'}
      >
        ES
      </button>
    </div>
  );
}
