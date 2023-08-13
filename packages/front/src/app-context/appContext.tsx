import React, {
  createContext,
  PropsWithChildren,
  useState,
  useEffect
} from 'react';
import { useAuth, loginFuncType, logoutFuncType } from '../hooks/auth-hook';
import { NotificationProps } from '@lp/ui';
import { Language } from '../generated/graphql';
import { getStoredData, storeData } from '../util/localStorageUtils';

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
    const storedLanguage = getStoredData<'language'>('language');
    const lang: Language = storedLanguage || Language.English;
    if (lang) {
      setLanguage(lang);
    }
  }, []);

  const saveLanguage = (lang: Language) => {
    storeData('language', lang);
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
