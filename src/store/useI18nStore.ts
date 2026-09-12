import { create } from 'zustand';
import { en } from '../content/i18n/en';
import { es } from '../content/i18n/es';
import type { Locale } from '../content/i18n/types';

export type Lang = 'en' | 'es';

const STORAGE_KEY = 'shika-lang';

const locales: Record<Lang, Locale> = { en, es };

function resolve(obj: Record<string, unknown>, path: string): string {
  const keys = path.split('.');
  let current: unknown = obj;
  for (const key of keys) {
    if (current == null || typeof current !== 'object') return path;
    current = (current as Record<string, unknown>)[key];
  }
  if (typeof current === 'string') return current;
  return path;
}

function applyDocumentLang(lang: Lang): void {
  if (typeof document === 'undefined') return;
  document.documentElement.lang = lang;
}

interface I18nState {
  lang: Lang;
  t: (key: string) => string;
  loc: (enText: string, esText: string) => string;
  setLang: (lang: Lang) => void;
}

function makeT(lang: Lang) {
  return (key: string): string => {
    const locale = locales[lang] as unknown as Record<string, unknown>;
    return resolve(locale, key);
  };
}

const stored = typeof localStorage !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
const initialLang: Lang = stored === 'es' ? 'es' : 'en';
applyDocumentLang(initialLang);

export const useI18nStore = create<I18nState>((set, get) => ({
  lang: initialLang,
  t: makeT(initialLang),

  loc: (enText, esText) => (get().lang === 'es' ? esText : enText),

  setLang: (lang) => {
    localStorage.setItem(STORAGE_KEY, lang);
    applyDocumentLang(lang);
    set({
      lang,
      t: makeT(lang),
      loc: (enText, esText) => (lang === 'es' ? esText : enText),
    });
  },
}));
