import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  PropsWithChildren
} from 'react';
import { Language } from '../generated/graphql';
import { getStoredData, storeData } from '../util/localStorageUtils';

export interface LanguageContextType {
  language: Language;
  saveLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider = ({ children }: PropsWithChildren<unknown>) => {
  const [language, setLanguage] = useState<Language>(Language.English);

  useEffect(() => {
    const storedLanguage = getStoredData('language');
    const lang: Language = storedLanguage || Language.English;
    if (lang) {
      setLanguage(lang);
    }
  }, []);

  const saveLanguage = (lang: Language) => {
    storeData('language', lang);
    setLanguage(lang);
  };

  const value: LanguageContextType = {
    language,
    saveLanguage
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguageContext = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error(
      'useLanguageContext must be used within a LanguageProvider'
    );
  }
  return context;
};
