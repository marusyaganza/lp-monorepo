import React, {
  createContext,
  PropsWithChildren,
  useState,
  useEffect
} from 'react';
import { useAuth, loginFuncType, logoutFuncType } from '../hooks/auth-hook';
import { NotificationProps } from '@lp/ui';
import { Language } from '../generated/graphql';

const LANGUAGE = 'language';

type Context = {
  login: loginFuncType;
  logout: logoutFuncType;
  userId?: string | null;
  token?: string | null;
  notification?: NotificationProps;
  setNotification: (notification?: NotificationProps) => void;
  language: Language;
  saveLanguage: (lang: Language) => void;
};

export const AppContext: React.Context<Context> = createContext({} as Context);

export const AppProvider = ({ children }: PropsWithChildren<unknown>) => {
  const { userId, token, login, logout } = useAuth();
  const [language, setLanguage] = useState<Language>(Language.English);
  const [notification, setNotification] = useState<
    NotificationProps | undefined
  >();

  useEffect(() => {
    //TODO consider creating an util function to work with localStorage
    const storedLanguage = localStorage.getItem(LANGUAGE);
    let lang: Language = Language.English;
    if (storedLanguage) {
      lang = JSON.parse(storedLanguage) as Language;
    }
    if (lang) {
      setLanguage(lang);
    }
  }, []);

  const saveLanguage = (lang: Language) => {
    localStorage.setItem(LANGUAGE, JSON.stringify(lang));
    setLanguage(lang);
  };

  const value: Context = {
    login,
    logout,
    userId,
    token,
    notification,
    setNotification,
    language,
    saveLanguage
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
