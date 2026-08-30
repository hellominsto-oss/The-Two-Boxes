import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { Lang, Dict, translations } from './translations';

interface I18nContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggleLang: () => void;
  t: Dict;
  dir: 'ltr' | 'rtl';
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en');
  const toggleLang = useCallback(() => setLang((l) => (l === 'en' ? 'ar' : 'en')), []);
  const dir = lang === 'ar' ? 'rtl' : 'ltr';
  const value: I18nContextValue = {
    lang,
    setLang,
    toggleLang,
    t: translations[lang],
    dir,
  };
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}
