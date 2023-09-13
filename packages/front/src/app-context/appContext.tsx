import React, {
  createContext,
  PropsWithChildren,
  useState,
  useEffect,
  useMemo
} from 'react';
import { useAuth, loginFuncType, logoutFuncType } from '../hooks/auth-hook';
import { NotificationProps as CoreNotificationProps } from '@lp/ui';
import { Language } from '../generated/graphql';
import { getStoredData, storeData } from '../util/localStorageUtils';

interface NotificationProps extends CoreNotificationProps {
  sameLocation?: boolean;
}

type Context = {
  login: loginFuncType;
  logout: logoutFuncType;
  userId?: string | null;
  token?: string | null;
  notification?: NotificationProps;
  setNotification: (notification?: NotificationProps) => void;
  language: Language;
  isDevEnv?: boolean;
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

  const isDevEnv = useMemo(() => process?.env?.NODE_ENV !== 'production', []);

  const value: Context = {
    login,
    logout,
    userId,
    token,
    notification,
    setNotification,
    language,
    saveLanguage,
    isDevEnv
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
