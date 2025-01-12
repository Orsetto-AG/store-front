'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import de from './translations/de.json';
import fr from './translations/fr.json';
import it from './translations/it.json';
import en from './translations/en.json';

const translations = { de, fr, it, en };

type Language = 'de' | 'fr' | 'it' | 'en';

interface LanguageState {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

export const useLanguage = create<LanguageState>()(
  persist(
    (set, get) => ({
      language: 'de',
      setLanguage: (lang) => set({ language: lang }),
      t: (key) => {
        const lang = get().language;
        const keys = key.split('.');
        let value = translations[lang];
        
        for (const k of keys) {
          if (value?.[k] === undefined) {
            console.warn(`Translation key not found: ${key}`);
            return key;
          }
          value = value[k];
        }
        
        return value;
      },
    }),
    {
      name: 'language-storage',
      storage: createJSONStorage(() => {
        return {
          getItem: (name) => {
            if (typeof window === 'undefined') return null;
            return window.localStorage.getItem(name);
          },
          setItem: (name, value) => {
            if (typeof window === 'undefined') return;
            window.localStorage.setItem(name, value);
          },
          removeItem: (name) => {
            if (typeof window === 'undefined') return;
            window.localStorage.removeItem(name);
          },
        };
      }),
    }
  )
);