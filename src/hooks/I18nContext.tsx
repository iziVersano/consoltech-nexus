import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { translations, Language } from '@/i18n';

const LANG_KEY = 'lang';
const LANG_RESET_KEY = 'lang_reset_v1';

// One-time reset to fix users who had Hebrew set as default
if (!localStorage.getItem(LANG_RESET_KEY)) {
  localStorage.removeItem(LANG_KEY);
  localStorage.setItem(LANG_RESET_KEY, 'true');
}

interface I18nContextProps {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextProps | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>(() => {
    const stored = localStorage.getItem(LANG_KEY);
    return stored === 'he' ? 'he' : 'en';
  });

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr';
    localStorage.setItem(LANG_KEY, lang);
  }, [lang]);

  const t = useCallback(
    (key: string) => translations[lang][key] || key,
    [lang]
  );

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) throw new Error('useI18n must be used within an I18nProvider');
  return context;
}
